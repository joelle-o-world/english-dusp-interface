const {Predicate, Sentence} = require('english-io')
const {quick} = require('dusp')
const S = Sentence.S
const entify = require('../../entify')

const Modulate = new Predicate({
  forms:[
    {verb:'modulate', params:['subject', 'object']},
    {verb:'be modulated by', params:['object', 'subject']}
  ],

  begin({outlet}, {inlet}) {
    if(inlet.type == 'frequency')
      inlet.set(
        quick.multiply(
          quick.semitoneToRatio(
            quick.multiply(outlet, 12)
          ),
          inlet.get()
        )
      )
    else
      inlet.set(quick.sum(inlet.get(), outlet))
  },

  problem(outlet, inlet) {
    if(!inlet.is_a('inlet') || !outlet.is_a('outlet'))
      return true
  },

  replace(a, b) {
    // allow for sloppy usage
    if(a.is_a('outlet') && b.is_a('inlet'))
      return false // things are already as they should be, no replacement.

    if(a.is_a('unit'))
      a = entify(a.unit.defaultOutlet)
    if(b.is_a('unit'))
      b = entify(b.unit.firstFreeInlet || b.unit.defaultInlet)

    return S(Modulate, a, b)
  }
})
module.exports.Modulate = Modulate

const BeAddedTo = new Predicate({
  forms: [
    {verb:'be added', params:['subject', 'to']},
    {verb:'be mixed', params:['subject', 'with']}
  ],

  begin(a, b) {
    let sum = quick.sum(a.outlet, b.outlet)
  },

  problem(a, b) {
    if(!a.is_a('outlet') || !b.is_a('outlet'))
      return true
  },

  replace(a, b) {
    // allow for sloppy usage
    if(a.is_a('outlet') && b.is_a('outlet'))
      return false // things are already as they should be, no replacement.

    if(a.is_a('unit'))
      a = entify(a.unit.defaultOutlet)
    if(b.is_a('unit'))
      b = entify(b.unit.defaultOutlet)

    return S(BeAddedTo, a, b)
  },

  /* Needs work:
  check(a, b) {
    let outlet1 = a.outlet
    let outlet2 = b.outlet

    for(let {unit} of outlet1.connections)
      if(unit.isSum && unit.inletsOrdered.some(inlet => inlet.outlet == outlet2))
        return true

    // otherwise
    return false
  }*/
})
module.exports.BeAddedTo = BeAddedTo

const BeMultipliedBy = new Predicate({
  forms: [
    {verb:'be multiplied', params:['subject', 'by']},
    {verb:'be attenuated', params:['subject', 'by']},
    {verb:'attenuate', params:['subject', 'object']},
  ],

  begin(a, b) {
    let mult = quick.multiply(a.outlet, b.outlet)
    console.log('BeMultipliedBy.begin', mult)
  },

  problem(a, b) {
    if(!a.is_a('outlet') || !b.is_a('outlet'))
      return true
  },

  replace(a, b) {
    // allow for sloppy usage
    if(a.is_a('outlet') && b.is_a('outlet'))
      return false // things are already as they should be, no replacement.

    if(a.is_a('unit'))
      a = entify(a.unit.defaultOutlet)
    if(b.is_a('unit'))
      b = entify(b.unit.defaultOutlet)

    return S(BeMultipliedBy, a, b)
  }
})
module.exports.BeMultipliedBy = BeMultipliedBy

const BeDisconnectedFrom = new Predicate({
  forms: [
    {verb: 'be disconnected', params:['subject', 'from']},
    {verb: 'be disconnected', params:['from', 'subject']}
  ],


  replace(a, b) {
    if(a.is_a('inlet') && b.is_a('outlet'))
      return null
    if(b.is_a('inlet') && b.is_a('outlet'))
      return S(BeDisconnectedFrom, b, a)

    if(b.is_a('unit')) {
      let tmp = a
      a = b
      b = tmp
    }

    if(a.is_a('unit')) {
      if(b.is_a('inlet') && b.inlet.outlet.unit == a.unit)
        // a is a unit and b is an inlet
        return S(BeDisconnectedFrom, b, entify(b.inlet.outlet))

      else if(b.is_a('outlet')) {
        // a is a unit and b is an outlet
        return b.outlet.connections.filter( // get a list of inlets
          inlet => inlet.unit == a.unit
        ).map(
          inlet => S(BeDisconnectedFrom, entify(inlet), b)
        )
      } else if(b.is_a('unit')) {
        // both a and b are units, get all connections
        let bToA = a.unit.inletsOrdered.filter(
          inlet => inlet.outlet && inlet.outlet.unit == b.unit
        ).map(
          inlet => S(BeDisconnectedFrom, entify(inlet), entify(inlet.outlet))
        )
        let aToB = b.unit.inletsOrdered.filter(
          inlet => inlet.outlet && inlet.outlet.unit == a.unit
        ).map(
          inlet => S(BeDisconnectedFrom, entify(inlet), entify(inlet.outlet))
        )

        return [...bToA, ...aToB]
      }
    }
  },
  check(inlet, outlet) {
    return inlet.inlet.outlet != outlet.outlet
  },
  problem(inlet, outlet) {
    return !inlet.is_a('inlet') || !outlet.is_a('outlet')
  },
  begin({inlet}, {outlet}) {
    inlet.disconnect()
  },
  until: callback => callback(),
})
module.exports.BeDisconnectedFrom = BeDisconnectedFrom

const Retrigger = new Predicate({
  forms:[
    {verb:'retrigger', params:['subject']},
    {verb:'trigger', params:['subject']},
    {verb:'start', params:['subject']},
    {verb:'restart', params:['subject']},
  ],

  problem(e) {
    return !e.is_a('envelope')
  },

  begin(e) {
    e.unit.trigger()
  }
})
module.exports.Retrigger = Retrigger
