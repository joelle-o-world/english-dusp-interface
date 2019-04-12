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

module.exports = {
  modulate: modulate,
  beConnectedTo:beConnectedTo,
  beSummedWith:beSummedWith,
  beAnInputOf: beAnInputOf,
  beAnOutputOf: beAnOutputOf,
  be: be
}
