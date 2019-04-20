const EnglishDuspInterface = require('../src/EnglishDuspInterface')
const {dusp, renderChannelData} = require('dusp')

let outlet = EnglishDuspInterface.quick(
  'a 200Hz triangle wave',
  'every 2 seconds another sine wave modulates the triangle wave'
)

console.log('before rendering:\t', dusp(outlet))

renderChannelData(outlet, 4).then(channelData => {
  console.log('after rendering:\t', dusp(outlet))
})
