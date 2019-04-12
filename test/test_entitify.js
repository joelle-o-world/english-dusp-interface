const {DescriptionContext, WanderingDescriber} = require('english-io')
const dictionary = require('../src/dictionary')
const entify = require('../src/entify')
const dusp = require('dusp')


let myUnit = new dusp.components.Noise()
myUnit.F = new dusp.components.Osc()

let e1 = entify(myUnit.F)

let ctx = new DescriptionContext

let describer = new WanderingDescriber(e1)
for(let i=0; i<10; i++) {
  let fact = describer.next()
  if(fact)
    console.log(fact.str())
}
