const {Circuit, dusp} = require('dusp')
const {Declarer} = require('english-io')
const d = require('./dictionary')

const modifiers = require('./modifiers')

class EnglishDuspInterface {
  constructor() {
    this.circuit = new Circuit
    this.declarer = new Declarer(d)
  }

  declare(...strs) {
    for(let str of strs)
      this.declareSingle(str)
  }

  declareSingle(str) {
    // handle modifiers
    let result = modifiers.parse(str)
    if(result) {
      if(result.modifier.exec)
        result.modifier.exec(result.args, result.remainder, this)
      return
    }

    // declare it
    this.declarer.declareSingle(str)

    // add new units to the Circuit
    for(let i=this.declarer.entities.length-1; i>=0; i--) {
      let e = this.declarer.entities[i]
      if(e.is_a('unit'))
        if(e.unit.circuit) {
          if(e.unit.circuit != this.circuit)
            throw 'something has gone very badly wrong'
          else
            break
        } else {
          this.circuit.add(e.unit)
        }
    }
  }

  findRenderingOutlet() {
    this.declarer.autoExpandDomain()
    let entities = this.declarer.entities

    let renderingOutlet = entities.find(e => e.isRenderingOutlet)

    if(renderingOutlet) {
      renderingOutlet = renderingOutlet.outlet
    } else {
      let outlets = entities.filter(e => e.is_a('outlet')).reverse()

      let winner = null
      let winningScore = -1
      for(let {outlet} of outlets) {
        if(outlet.connections.length)
          continue
        let score = outlet.unit.recursiveInputUnits.length

        if(score > winningScore) {
          winner = outlet
          winningScore = score
        }
      }

      renderingOutlet = winner
    }

    if(!renderingOutlet) {
      console.warn(
        'could not find rendering outlet',
        entities
          //.filter(e => e.is_a('outlet'))
          //.map(e=>dusp(e.outlet))
          .map(e => e.str())
      )
    }

    return renderingOutlet
  }

  static quick(...strs) {
    let io = new EnglishDuspInterface()
    io.declare(...strs)
    return io.findRenderingOutlet()
  }
}
module.exports = EnglishDuspInterface
