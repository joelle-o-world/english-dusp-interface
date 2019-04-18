console.clear()


const {
  WanderingDescriber,
  DescriptionContext,
  sentencify
} = require('english-io')
const {dusp} = require('dusp')

const d = require('../src/dictionary')

let entities = d.quickDeclare(
  'an oscillator',
  'a summing unit',
  'the summing unit is routed to the outlet of the oscillator',
  'another oscillator is connected to the summing unit'
)


let ctx = new DescriptionContext
let describer = new WanderingDescriber(...entities)
let next
while((next = describer.next()))
  console.log(sentencify(next.str(undefined, ctx, 1)))

for(let e of entities) {
  if(e.unit) {
    console.log(dusp(e.unit))
  }
}
