const {Predicate} = require('english-io')



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
  verb: 'be routed', params:['subject', 'to'],

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

module.exports = {
  BeAnInletOf: BeAnInletOf,
  BeAnOutletOf: BeAnOutletOf,
  BeRoutedTo: BeRoutedTo,
  BeSetTo: BeSetTo,
}
