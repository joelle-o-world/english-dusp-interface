const {Predicate, Sentence} = require('english-io')
const S = Sentence.S

const {BeRoutedTo, BeSetTo} = require('./core.js')
const {BeDisconnectedFrom, BeMultipliedBy} = require('./more')

const ME = 'the human'

class ImperativePredicate extends Predicate {
  constructor(options) {
    if(options.verb && !options.constants) {
      options.constants = {subject:ME}
    }
    if(options.forms)
      for(let form of options.forms)
        if(!form.constants)
          form.constants = {subject:ME}
        else if(!form.constants.subject)
          form.consants.subject = ME

    if(!options.until)
      options.until = (callback => callback())

    super(options)
  }
}

module.exports.RouteTo = new ImperativePredicate({
  forms: [
    {verb:'route', params:['object', 'to']},
    {verb:'connect', params:['object', 'to']},
    {verb:'plug', params:['object', 'into']},
  ],

  afterwards(outlet, inlet) {
    return S(BeRoutedTo, outlet, inlet).start()
  },
})

module.exports.SetTo = new ImperativePredicate({
  forms:[
    {verb:'set', params:['object', '@to']},
  ],

  afterwards(inlet, value) {
    return S(BeSetTo, inlet, value)
  }
})

module.exports.DisconnectFrom = new ImperativePredicate({
  forms:[
    {verb:'disconnect', params:['object', 'from']},
  ],

  afterwards(a, b) {
    return S(BeDisconnectedFrom, a, b)
  }
})

module.exports.MultiplyBy = new ImperativePredicate({
  forms:[
    {verb:'multiply', params:['object', 'by']}
  ],

  afterwards(a, b) {
    return S(BeMultipliedBy, a, b)
  }
})
