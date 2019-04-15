const {Dictionary} = require('english-io')

const d = new Dictionary
module.exports = d

d.addNouns(...require('./nouns'))
d.addPredicates(...Object.values(require('./predicates')))
