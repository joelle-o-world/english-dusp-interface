const {Predicate} = require('english-io')

const BeAnInputOf = new Predicate({
  verb: 'be an input', params:['subject', 'of']
})
const BeAnOutputOf = new Predicate({
  verb: 'be an output', params:['subject', 'of'],
})
const BeRoutedTo = new Predicate({
  verb: 'be routed', params:['subject', 'to']
})

module.exports = {
  BeAnInputOf: BeAnInputOf,
  BeAnOutputOf: BeAnOutputOf,
  BeRoutedTo: BeRoutedTo,
}
