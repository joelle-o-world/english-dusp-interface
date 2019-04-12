const D = require('./dictionary')

const unitConstructorNouns = {}


function entify(thing, entity) {
  if(thing.englishIO_entity)
    return thing.englishIO_entity

  // otherwise
  if(!entity) {
    entity = D.createEntity()
    thing.englishIO_entity = entity
  }

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

  let unitEntity = entify(inlet.unit)
  D.S('BeAnInputOf', inletEntity, unitEntity).start()

  if(inlet.outlet) {
    let outletEntity = entify(inlet.outlet)
    D.S('BeRoutedTo', outletEntity, inletEntity).start()
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

  D.S('BeAnOutputOf', e, unitEntity).start()

  // TODO: routing

  return e
}
