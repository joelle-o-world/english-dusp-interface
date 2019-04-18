const {Predicate, Sentence} = require('english-io')
const {quick} = require('dusp')
const S = Sentence.S
const entify = require('../../entify')

const Modulate = new Predicate({
  forms:[
    {verb:'modulate', params:['subject', 'object']},
    {verb:'be modulated by', params:['object', 'subject']}
  ],

  begin({outlet}, {inlet}) {
    if(inlet.type == 'frequency')
      inlet.set(
        quick.multiply(
          quick.semitoneToRatio(
            quick.multiply(outlet, 12)
          ),
          inlet.get()
        )
      )
    else
      inlet.set(quick.sum(inlet.get(), outlet))
  },

  problem(outlet, inlet) {
    if(!inlet.is_a('inlet') || !outlet.is_a('outlet'))
      return true
  },

  replace(a, b) {
    // allow for sloppy usage
    if(a.is_a('outlet') && b.is_a('inlet'))
      return false // things are already as they should be, no replacement.

    if(a.is_a('unit'))
      a = entify(a.unit.defaultOutlet)
    if(b.is_a('unit'))
      b = entify(b.unit.firstFreeInlet || b.unit.defaultInlet)

    return S(Modulate, a, b)
  }
})

module.exports.Modulate = Modulate
