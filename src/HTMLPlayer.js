const EnglishDuspInterface = require('./EnglishDuspInterface')
const {renderAudioBuffer, dusp} = require('dusp')
const getSentences = require('./getSentences')

class HTMLPlayer {
  constructor(str='', duration=5) {
    this.inputElement
    this.makeHTML()

    this.inputElement.value = str
    this.durationInput.value = duration

    this.ctx = new AudioContext()
  }

  makeHTML() {
    let div = document.createElement('div')
    div.className = 'engdusp'
    this.div = div

    let input = document.createElement('textarea')
    this.inputElement = input
    input.className = 'engdusp_input'
    input.addEventListener('keydown', e => {
      if(e.metaKey && e.keyCode == 13){
        if(this.nowPlayingSource)
          this.stop()
        else
          this.render()
      }
    })
    div.appendChild(input)

    let playBTN = document.createElement('button')
    playBTN.innerText = 'play'
    playBTN.onclick = () => this.render()
    playBTN.className = 'engdusp_play'
    div.appendChild(playBTN)

    let duration = document.createElement('input')
    duration.setAttribute('type', 'number')
    duration.value = 30
    this.durationInput = duration
    duration.className = 'engdusp_duration'
    div.appendChild(duration)

    let stopBTN = document.createElement('button')
    stopBTN.innerText = 'stop'
    stopBTN.onclick = () => this.stop()
    stopBTN.className = 'engdusp_stop'
    div.appendChild(stopBTN)

    return div
  }

  async render() {
    // get input
    let input = this.inputElement.value
    let lines = getSentences(input)//input.split('\n').map(l => l.trim())
    console.log('input sentences:', lines)

    let outlet = EnglishDuspInterface.quick(...lines)

    let duration = parseFloat(this.durationInput.value) || 10

    if(!outlet)
      throw 'Problem!'

    let buffer = await renderAudioBuffer(outlet, duration)

    if(this.nowPlayingSource)
      this.stop()

    let source = this.ctx.createBufferSource()
    source.buffer = buffer
    source.connect(this.ctx.destination)
    source.start()

    console.log('playing:', dusp(outlet), '\nfor', duration, 'seconds')
    this.nowPlayingSource = source
  }

  stop() {
    if(this.nowPlayingSource)
      this.nowPlayingSource.stop()
    this.nowPlayingSource = null
  }
}
module.exports = HTMLPlayer
