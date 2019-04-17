console.clear()

const fs = require('fs')
const d = require('../src/dictionary')
const dusp = require('dusp')
const entify = require('../src/entify')
const {WanderingDescriber, search, DescriptionContext, sentencify} = require('english-io')



let unit = dusp.unDusp("(0.1 * [Mixer O46@-1 O47@1 O48@-1 O49@1 O50@ O51@1 O52@-1 O53@1 O54@-1\nO25 O26 O24\n] * (Sq25 -> [Filter F:(50 + (A100 then D100)*10000)])\n)\n* (1 for 12 then\n((D1 ! 1)for 12)then 1\n)")

let e1 = entify(unit)

let all = [...search.explore([e1])]
//console.log(all.map(e => e.str(ctx, 2)))

let wanderer = new WanderingDescriber(e1)
wanderer.maxLookBack = 100


console.clear()
const ctx = new DescriptionContext


let declarations = []
let sentences = []
for(let e of all) {
  for(let fact of e.facts)
    if(!sentences.includes(fact))
      sentences.push(
        fact
      )
}

fs.writeFileSync('output.txt', sentences.map(
  s => sentencify(s.str(undefined, ctx))
).join(' '))
