const {Dictionary} = require('english-io')
const D = new Dictionary
const predicates = require('./predicates')

D.addNouns(
  'unit',
  'patch',
  'input',
  {noun:'inlet', alias:'input'},
  'output',
  {noun:'outlet', alias:'output'},
  {
    noun:'white noise generator',
    inherits:'unit',
    extend: e => {
      if(!e.unit)
        e.unit = new dusp.components.Noise()
    }
  },
  {noun:'oscillator', inherits:'unit'},
  {noun:'sum', inherits:'unit'},
  'frequency'
)

D.addPredicates(...Object.values(predicates))

module.exports = D
