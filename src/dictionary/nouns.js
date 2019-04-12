const {Osc, Sum} = require('dusp').components
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

  // Inlet types:
  'frequency',
]
