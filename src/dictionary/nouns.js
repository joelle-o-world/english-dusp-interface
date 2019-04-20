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

  {
    noun:'inlet',
    extend(e) {
      e.addNoun('input')
    }
  },

  {
    noun:'outlet',
    extend(e) {
      e.addNoun('output')
    }
  },


  // Units:
  /*{ noun:'oscillator',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Osc()
        entify(e.unit, e)
      }
    },
  },*/

  { noun: 'sine wave',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Osc(undefined, 'sin')
        entify(e.unit, e)
      }
    }
  },
  { noun: 'sawtooth wave',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Osc(undefined, 'saw')
        entify(e.unit, e)
      }
    }
  },

  { noun: 'triangle wave',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Osc(undefined, 'triangle')
        entify(e.unit, e)
      }
    }
  },

  { noun: 'square wave',
    inherits: 'unit',
    extend(e) {
      if(!e.unit) {
        e.unit = new Osc(undefined, 'square')
        entify(e.unit, e)
      }
    }
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

  { noun: 'envelope', inherits:'unit'},

  { noun: 'attack envelope',
    inherits: 'envelope',
    extend(e) {
      if(!e.unit) {
        e.unit = new Shape('attack')
        entify(e.unit, e)
        e.unit.trigger()
      }
    }
  },

  { noun: 'decay envelope',
    inherits: 'envelope',
    extend(e) {
      if(!e.unit) {
        e.unit = new Shape('decay')
        entify(e.unit, e)
        e.unit.trigger()
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
  'duration',
  'minimum',
  'maximum',
]
