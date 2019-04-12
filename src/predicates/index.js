const {Predicate} = require('english-io')

const modulate = new Predicate({
  forms: [
    {verb: 'modulate', params:['subject', 'object']},
    {verb: 'be modulated', params:['by', 'subject']}
  ]
})

const beConnectedTo = new Predicate({
  verb: 'be connected',
  params:['subject', 'to'],

  begin(A, B) {
    let inlet, outlet

    if(A.is('input') && B.is('output')) {
      inlet = A.inlet
      outlet = B.outlet
    } else if(A.is('output') && B.is('input')) {
      inlet = B.inlet
      outlet = A.outlet
    }

    if(inlet && outlet && inlet.isInlet && outlet.isInlet) {
      inlet.connect(outlet)
    }
  }
})

const beSummedWith = new Predicate({
  forms: [
    {verb: 'be summed', params:['subject', 'with']},
    {verb: 'be added', params:['subject', 'to']}
  ]
})

const beAnInputOf = new Predicate({
  forms: [
    {verb: 'be an input', params:['subject', 'of']}
  ]
})

const beAnOutputOf = new Predicate({
  forms: [
    {verb: 'be an output', params:['subject', 'of']}
  ]
})

const be = new Predicate({
  forms: [
    {verb: 'be', params:['subject', '@object']},
  ]
})

Object.assign(module.exports, {
  modulate: modulate,
  beConnectedTo:beConnectedTo,
  beSummedWith:beSummedWith,
  beAnInputOf: beAnInputOf,
  beAnOutputOf: beAnOutputOf,
  be: be
})
