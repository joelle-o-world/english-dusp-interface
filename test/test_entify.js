const d = require('../src/dictionary')
const dusp = require('dusp')
const entify = require('../src/entify')
const {WanderingDescriber, search, DescriptionContext} = require('english-io')

const ctx = new DescriptionContext

let unit = dusp.unDusp("O300 + O200 * D1")

let e1 = entify(unit)

let all = [...search.explore([e1])]
console.log(all.map(e => e.str(ctx, 2)))

let wanderer = new WanderingDescriber(e1)
wanderer.maxLookBack = 100


let fact
while(fact = wanderer.next())
  console.log(fact.str())
