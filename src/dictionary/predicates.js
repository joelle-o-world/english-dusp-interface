const {Predicate} = require('english-io')



const BeAnInputOf = new Predicate({
  verb: 'be an input', params:['subject', 'of'],

  problem(inlet) {
    return !inlet.is_a('input')
  },
  begin(inlet, unit) {
    inlet.addClause('of', unit)
  },
  permanent: true,
})

const BeAnOutputOf = new Predicate({
  verb: 'be an output', params:['subject', 'of'],

  problem(outlet) {
    return !outlet.is_a('output')
  },
  begin(outlet, unit) {
    outlet.addClause('of', unit)
  },
  permanent: true,
})

const BeRoutedTo = new Predicate({
  verb: 'be routed', params:['subject', 'to'],

  problem(outlet, inlet) {
    return !inlet.is_a('input') || !outlet.is_a('output')
  },
  begin(outlet, inlet) {
    inlet.inlet.connect(outlet.outlet)
  },
  check(outlet, inlet) {
    return inlet.inlet.outlet == outlet.outlet
  }
})

const BeSetTo = new Predicate({
  verb:'be set', params:['subject', '@to'],

  problem(inlet, value) {
    return !inlet.is_a('input')
  },
  begin(inlet, value) {
    value = parseFloat(value)
    inlet.inlet.setConstant(value)
  },
  check(inlet, value) {
    value = parseFloat(value)
    return inlet.inlet.constant == value
  }

})

module.exports = {
  BeAnInputOf: BeAnInputOf,
  BeAnOutputOf: BeAnOutputOf,
  BeRoutedTo: BeRoutedTo,
  BeSetTo: BeSetTo,
}
