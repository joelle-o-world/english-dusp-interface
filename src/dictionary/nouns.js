const {Osc, Sum, Multiply, Shape, Noise} = require('dusp').components
const entify = require('../entify')

module.exports = [
  'unit',

  'input',

  'output',


  // Units:
  { noun:'oscillator',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Osc()
        entify(e.unit, e)
      }
    },
  },

  { noun:'summing unit',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Sum
        entify(e.unit, e)
      }
    }
  },

  { noun: 'multiplying unit',
    inherits:'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Multiply
        entify(e.unit, e)
      }
    }
  },

  { noun: 'envelope',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Shape
        entify(e.unit, e)
      }
    }
  },

  { noun: 'noise generator',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Noise
        entify(e.unit, e)
      }
    }
  },

  // Inlet types:
  'frequency',
]
