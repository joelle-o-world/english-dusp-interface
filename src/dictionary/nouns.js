const {
  Osc,
  Sum,
  Multiply,
  Shape,
  Noise,
  Filter,
  Pan
} = require('dusp').components
const entify = require('../entify')

module.exports = [
  'unit',

  'inlet',

  'outlet',


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

  { noun: 'low pass filter',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Filter
        e.unit.kind = 'LP'
        entify(e.unit, e)
      }
    }
  },

  { noun: 'high pass filter',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Filter
        e.unit.kind = 'HP'
        entify(e.unit, e)
      }
    }
  },

  { noun: 'panner',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Pan
        e.unit.kind = 'HP'
        entify(e.unit, e)
      }
    }
  },

  // Inlet types:
  'frequency',
]
