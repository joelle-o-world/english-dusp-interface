const {Predicate} = require('english-io')

const BeAnInputOf = new Predicate({
  verb: 'be an input', params:['subject', 'of'],

  problem(inlet) {
    return !inlet.is_a('input')
  }
})

const BeAnOutputOf = new Predicate({
  verb: 'be an output', params:['subject', 'of'],

  problem(outlet) {
    return !outlet.is_a('output')
  },
})

const BeRoutedTo = new Predicate({
  verb: 'be routed', params:['subject', 'to'],

  problem(inlet, outlet) {
    return !(inlet.is_a('input') && outlet.is_a('output'))
  },
})

module.exports = {
  BeAnInputOf: BeAnInputOf,
  BeAnOutputOf: BeAnOutputOf,
  BeRoutedTo: BeRoutedTo,
}
