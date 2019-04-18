module.exports = {
  Osc: unit => {
    if(unit.waveform == 'sin')
      return 'sine wave'
    if(unit.waveform == 'saw')
      return 'sawtooth wave'
    if(unit.waveform == 'triangle')
      return 'triangle wave'
    if(unit.waveform == 'square')
      return 'square wave'
  },
  Sum: 'summing unit',
  Multiply: 'multiplying unit',
  Shape: unit => {
    if(unit.shape == 'attack')
      return 'attack envelope'
    else if(unit.shape == 'decay')
      return 'decay envelope'
  },
  Noise: 'noise generator',
  Filter: unit => {
    if(unit.kind == "LP")
      return 'low pass filter'
    if(unit.kind == "HP")
      return 'high pass filter'
  },
  Pan: 'panner',
}
