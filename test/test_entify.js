const d = require('../src/dictionary')
const dusp = require('dusp')
const entify = require('../src/entify')
const {WanderingDescriber} = require('english-io')


let unit = dusp.quick.multiply(new dusp.components.Osc(), 0.5)

let e1 = entify(unit)

let wanderer = new WanderingDescriber(e1)

let fact
while(fact = wanderer.next())
  console.log(fact.str())
