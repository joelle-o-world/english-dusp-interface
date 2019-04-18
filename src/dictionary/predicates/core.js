const {Predicate, Sentence} = require('english-io')
const S = Sentence.S
const entify = require('../../entify')



const BeAnInletOf = new Predicate({
  verb: 'be an inlet', params:['subject', 'of'],

  problem(inlet) {
    return !inlet.is_a('inlet')
  },
  begin(inlet, unit) {
    inlet.addClause('of', unit)
  },
  permanent: true,
})

const BeAnOutletOf = new Predicate({
  verb: 'be an outlet', params:['subject', 'of'],

  problem(outlet) {
    return !outlet.is_a('outlet')
  },
  begin(outlet, unit) {
    outlet.addClause('of', unit)
  },
  permanent: true,
})

const BeRoutedTo = new Predicate({
  forms:[
    {verb: 'be routed', params:['subject', 'to']},
    {verb: 'be connected', params:['subject', 'to']}
  ],

  problem(outlet, inlet) {
    return !inlet.is_a('inlet') || !outlet.is_a('outlet')
  },
  begin(outlet, inlet) {
    inlet.inlet.connect(outlet.outlet)
  },
  check(outlet, inlet) {
    return inlet.inlet.outlet == outlet.outlet
  },
  until(callback, outlet, inlet) {
    inlet.inlet.once('disconnect', callback)
  },
  replace(a, b) {
    // allow for sloppy usage
    if(a.is_a('outlet') && b.is_a('inlet'))
      return false // things are already as they should be, no replacement.

    if(b.is_a('outlet') || a.is_a('inlet')) {
      let tmp = a
      a = b
      b = tmp
    }

    if(a.is_a('unit'))
      a = entify(a.unit.defaultOutlet)
    if(b.is_a('unit'))
      b = entify(b.unit.firstFreeInlet || b.unit.defaultInlet)

    return S(BeRoutedTo, a, b)
  }
})

const BeSetTo = new Predicate({
  verb:'be set', params:['subject', '@to'],

  problem(inlet, value) {
    return !inlet.is_a('inlet')
  },
  begin(inlet, value) {
    value = parseFloat(value)
    inlet.inlet.setConstant(value)
  },
  check(inlet, value) {
    value = parseFloat(value)
    return inlet.inlet.constant == value
  },
  until(callback, inlet) {
    inlet.inlet.once('change', callback)
  }
})

const BeTheRenderingOutlet = new Predicate({
  forms: [
    {verb: 'be the rendering outlet', params:['subject']},
    {verb: 'be the main output', params:['subject']}
  ],

  replace(outlet) {
    if(outlet.is_a('unit'))
      return S(BeTheRenderingOutlet, entify(outlet.unit.defaultOutlet))
  },
  problem(outlet) {
    if(!outlet.is_a('outlet'))
      return true
  },
  begin(e) {
    e.isRenderingOutlet = true
  },
})

Object.assign(module.exports, {
  BeAnInletOf: BeAnInletOf,
  BeAnOutletOf: BeAnOutletOf,
  BeRoutedTo: BeRoutedTo,
  BeSetTo: BeSetTo,
  BeTheRenderingOutlet: BeTheRenderingOutlet,
})
