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
  'the frequency of the oscillator is set to 200',
  'a summing unit',
  'a noise generator',
  'the outlet of the oscillator is routed to the first inlet of the summing unit',
  'the outlet of the noise generator is routed to the second inlet of the summing unit',
)


let ctx = new DescriptionContext
let describer = new WanderingDescriber(...entities)
let next
while((next = describer.next()))
  console.log(sentencify(next.str(undefined, ctx, 3)))

for(let e of entities) {
  if(e.unit) {
    console.log(dusp(e.unit))

  }
}
