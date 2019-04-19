const d = require('./dictionary')

function declareCircuit(...strings) {
  let entities = d.quickDeclare(...strings)

  // search for rendering outlet
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
  return renderingOutlet
}
module.exports = declareCircuit
