const {EntitySpawner} = require('english-io')
const dusp = require('dusp')

const entify = require('../entify')

const SumOfAnd = new EntitySpawner({
  template:'sum of L_',
  construct(args) {
    for(let i in args) {
      if(args[i].is_a('unit'))
        args[i] = args[i].unit.defaultOutlet
      else if(args[i].is_a('outlet'))
        args[i] = args[i].outlet
    }

    return entify(dusp.quick.mix(...args).OUT.unit)
  }
})

const MultipliedBy = new EntitySpawner({
  template:'_ multiplied by _', phraseletMode: false,
  construct(a, b) {
    if(a.unit)
      a = entify(a.unit.defaultOutlet)
    if(b.unit)
      b = entify(b.unit.defaultOutlet)

    if(a.outlet && b.outlet) {
      return entify(dusp.quick.multiply(a.outlet, b.outlet))
    }
  }
})

const HzSineWave = new EntitySpawner({
  template: '#_Hz sine wave',
  construct(frequency) {
    let osc = new dusp.components.Osc(frequency)
    return entify(osc)
  }
})
const HzSawWave = new EntitySpawner({
  template: '#_Hz sawtooth wave',
  construct(frequency) {
    let osc = new dusp.components.Osc(frequency, 'saw')
    return entify(osc)
  }
})
const HzSquareWave = new EntitySpawner({
  template: '#_Hz square wave',
  construct(frequency) {
    let osc = new dusp.components.Osc(frequency, 'square')
    return entify(osc)
  }
})
const HzTriangleWave = new EntitySpawner({
  template: '#_Hz triangle wave',
  construct(frequency) {
    let osc = new dusp.components.Osc(frequency, 'triangle')
    return entify(osc)
  }
})

const SecondDecayEnvelope = new EntitySpawner({
  template: '#_(?:s| second) decay envelope',
  construct(duration) {
    let shape = new dusp.components.Shape('decay', duration)
    shape.trigger()
    return entify(shape)
  }
})
const SecondAttackEnvelope = new EntitySpawner({
  template: '#_(?:s| second) decay envelope',
  construct(duration) {
    let shape = new dusp.components.Shape('attack', duration)
    shape.trigger()
    return entify(shape)
  }
})


module.exports = [
  SumOfAnd, MultipliedBy,
  HzSineWave, HzSquareWave, HzSawWave, HzTriangleWave,
  SecondDecayEnvelope, SecondAttackEnvelope,
]
