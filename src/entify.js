const D = require('./dictionary')

const unitConstructorNouns = require('./nounsByDuspConstructor.js')


function entify(thing, entity) {

  if(thing.englishIO_entity) {
    if(entity && thing.englishIO_entity != entity)
      throw 'Oh no, entity conflict!'
    return thing.englishIO_entity
  }

  // otherwise
  if(!entity)
    entity = D.createEntity()

  thing.englishIO_entity = entity

  console.log('entifying', thing.label)
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

function entifyInlet(inlet, e) {
  // throw an error if argument is not an inlet
  if(!inlet || !inlet.isInlet)
    throw 'entifyInlet expects a dusp inlet'

  e.inlet = inlet
  e.be_a('input')

  if(inlet.type == 'frequency')
    e.be_a('frequency')

  let unitEntity = entify(inlet.unit)
  if(!unitEntity)
    throw 'Inlet has no unit.'

  D.S('BeAnInputOf', e, unitEntity).start()

  if(inlet.outlet) {
    let outletEntity = entify(inlet.outlet)
    D.S('BeRoutedTo', outletEntity, e).start()
  }

  return e
}

function entifyOutlet(outlet, e) {
  // throw an error if argumetn is not an outlet
  if(!outlet || !outlet.isOutlet)
    throw 'entifyOutlet expects a dusp.Outlet'

  e.outlet = outlet
  e.be_a('output')

  let unitEntity = entify(outlet.unit)
  if(!unitEntity)
    throw 'Outlet has no unit.'

  D.S('BeAnOutputOf', e, unitEntity).start()


  // TODO: routing
  for(let inlet of outlet.connections) {
    let inletEntity = entify(inlet)
    D.S('BeRoutedTo', e, inletEntity)
  }

  return e
}
