const {Predicate, Sentence} = require('english-io')
const S = Sentence.S
const {Shape} = require('dusp').components
const entify = require('../../entify')

const SlideFromToIn = new Predicate({
  forms:[
    {verb:'slide', params:['subject', '@from', '@to', '@in']},
    {verb:'glide', params:['subject', '@from', '@to', '@in']},
    {verb:'move smoothly', params:['subject', '@from', '@to', '@in']},
    {verb:'slide', params:['subject', '@from', '@to', '@over']},
    {verb:'glide', params:['subject', '@from', '@to', '@over']},
    {verb:'move smoothly', params:['subject', '@from', '@to', '@over']},
  ],

  problem(inlet, startValue, endValue, duration) {
    return !inlet.is_a('inlet')
            || isNaN(parseFloat(startValue))
            || isNaN(parseFloat(endValue))
            || isNaN(parseFloat(duration))
  },

  begin(inlet, from, to, d, sentence) {
    let shape = new Shape(
      'attack',
      d.constructor == Number ? d : parseFloat(d),
      from.constructor == Number ? from : parseFloat(from),
      to.constructor == Number ? to : parseFloat(to),
    )

    shape.on('finish', () => sentence.stop())
    inlet.inlet.connect(shape)
    shape.trigger()
  },

  replace(inlet, from, to, d) {
    if(inlet.is_a('unit'))
      return S(SlideFromToIn, entify(inlet.unit.defaultInlet), from, to, d)
  }
})
module.exports.SlideFromToIn = SlideFromToIn

const SlideFromTo = new Predicate({
  forms:[
    {verb:'slide', params:['subject', '@from', '@to']},
    {verb:'glide', params:['subject', '@from', '@to']},
    {verb:'move smoothly', params:['subject', '@from', '@to']},
  ],

  replace(inlet, from, to) {
    return S(SlideFromToIn, inlet, from, to, Math.random()+'s')
  }
})
module.exports.SlideFromTo = SlideFromTo

const SlideTo = new Predicate({
  forms:[
    {verb:'slide', params:['subject', '@to']},
    {verb:'glide', params:['subject', '@to']},
    {verb:'move smoothly', params:['subject', '@to']},
  ],

  replace(inlet, to) {
    if(inlet.is_a('unit'))
      inlet = entify(inlet.unit.defaultInlet)

    if(inlet.is_a('inlet'))
      return S(SlideFromToIn, inlet, inlet.inlet.constant.toString(), to, Math.random()+'s')
  }
})
module.exports.SlideTo = SlideTo

const SlideToIn = new Predicate({
  forms:[
    {verb:'slide', params:['subject', '@to', '@in']},
    {verb:'glide', params:['subject', '@to', '@in']},
    {verb:'move smoothly', params:['subject', '@to', '@in']},
    {verb:'slide', params:['subject', '@to', '@over']},
    {verb:'glide', params:['subject', '@to', '@over']},
    {verb:'move smoothly', params:['subject', '@to', '@over']},
  ],

  replace(inlet, to, d) {
    if(inlet.is_a('unit'))
      inlet = entify(inlet.unit.defaultInlet)

    if(inlet.is_a('inlet')) {
      console.log('iefnvjkf')
      return S(SlideFromToIn, inlet, inlet.inlet.constant.toString(), to, d)
    }
  }
})
module.exports.SlideToIn = SlideToIn
