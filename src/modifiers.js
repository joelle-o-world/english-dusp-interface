const SentenceModifier = require('./SentenceModifier')
const SentenceModifierSet = require('./SentenceModifierSet')

module.exports = new SentenceModifierSet(

  new SentenceModifier(
    'after #_ ?s(?:econds?)?',
    function(args, str, io) {
      io.circuit.schedule(args[0], () => {
        io.declare(str)
      })
    }
  ),

  new SentenceModifier(
    'every #_ ?s(?:econds?)?',
    (args, str, io) => {
      io.circuit.schedule(0, () =>{
        io.declare(str)
        return args[0]
      })
    }
  ),
)
