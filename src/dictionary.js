const {Dictionary} = require('english-io')

const D = new Dictionary
module.exports = D

const predicates = require('./predicates')
const entify = require('./entify')


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
      if(!e.unit) {
        e.unit = new dusp.components.Noise()
        entify(e.unit, e)
      }
    }
  },
  {noun:'oscillator', inherits:'unit'},
  {noun:'sum', inherits:'unit'},
  'frequency'
)

D.addPredicates(...Object.values(predicates))
