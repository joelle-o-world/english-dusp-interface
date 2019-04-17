module.exports = {
  Osc: 'oscillator',
  Sum: 'summing unit',
  Multiply: 'multiplying unit',
  Shape: 'envelope',
  Noise: 'noise generator',
  Filter: unit => {
    if(unit.kind == "LP")
      return 'low pass filter'
    if(unit.kind == "HP")
      return 'high pass filter'
  },
  Pan: 'panner',
}
