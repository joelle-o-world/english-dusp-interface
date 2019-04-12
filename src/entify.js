const D = require('./dictionary')
const {beAnInputOf, beAnOutputOf, beConnectedTo} = require('./predicates')

const unitConstructorNouns = {
  Osc: 'oscillator',
  MultiChannelOsc: 'oscillator',
  Noise: 'white noise generator',
}


function entify(thing) {
  if(thing.englishIO_entity)
    return thing.englishIO_entity

  // otherwise
  let entity = D.createEntity()
  thing.englishIO_entity = entity

  if(thing.isUnit)
    return entifyUnit(thing, entity)
  if(thing.isInlet)
    return entifyInlet(thing, entity)
  if(thing.isOutlet)
    return entifyOutlet(thing, entity)
}
module.exports = entify



function entifyUnit(unit, entity) {
  if(!unit || !unit.isUnit)
    throw 'unexpected input to entitifyUnit()'

  entity.unit = unit
  entity.be_a('unit')

  // TODO: compare constructor name against a table of nouns
  if(unitConstructorNouns[unit.constructor.name])
    entity.be_a(unitConstructorNouns[unit.constructor.name])

  // entify the inlets
  for(let inlet of unit.inletsOrdered)
    entify(inlet)

  for(let outlet of unit.outletsOrdered)
    entify(outlet)

  return entity
}

function entifyInlet(inlet, inletEntity) {
  // throw an error if argument is not an inlet
  if(!inlet || !inlet.isInlet)
    throw 'entifyInlet expects a dusp inlet'

  inletEntity.inlet = inlet
  inletEntity.be_a('input')

  switch(inlet.type) {
    case 'frequency':
      inletEntity.be_a('frequency')
      break;
  }

  let unitEntity = entify(inlet.unit)
  D.S(beAnInputOf, inletEntity, unitEntity).start()
  inletEntity.addClause('of', unitEntity)

  if(!inlet.outlet) {
    let constant = inlet.constant + (inlet.measuredIn || '')
    D.S('be', inletEntity, constant).start()
  } else {
    let outletEntity = entify(inlet.outlet)
    D.S(beConnectedTo, inletEntity, outletEntity).start()
    D.S(beConnectedTo, outletEntity, inletEntity).start()
  }

  return inletEntity
}

function entifyOutlet(outlet, e) {
  // throw an error if argumetn is not an outlet
  if(!outlet || !outlet.isOutlet)
    throw 'entifyOutlet expects a dusp.Outlet'

  e.outlet = outlet
  e.be_a('output')

  let unitEntity = entify(outlet.unit)
  e.addClause('of', unitEntity)

  D.S(beAnOutputOf, e, unitEntity).start()

  return e
}
