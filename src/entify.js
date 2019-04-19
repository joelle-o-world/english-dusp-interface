const D = require('./dictionary')

const unitConstructorNouns = require('./nounsByDuspConstructor.js')


function entify(thing, entity) {
  if(thing === null || thing === undefined)
    return null

  if(thing.englishIO_entity) {
    if(entity && thing.englishIO_entity != entity)
      throw 'Oh no, entity conflict!'
    return thing.englishIO_entity
  }

  // otherwise
  if(!entity)
    entity = D.createEntity()

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
    throw 'unexpected argument in entitifyUnit()'

  entity.unit = unit
  entity.be_a('unit')

  // compare constructor name against a table of nouns
  let noun = unitConstructorNouns[unit.constructor.name]
  if(noun && noun.constructor == Function)
    noun = noun(unit)
  if(noun && noun.constructor == String)
    entity.be_a(noun)
  else
    entity.nouns.push(unit.constructor.name + ' unit')

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
  e.be_a('inlet')

  if(inlet.type == 'frequency')
    e.be_a('frequency')
  else if(inlet.type == 'time' && inlet.name == 'duration')
    e.be_a('duration')
  else if(inlet.name == 'min')
    e.be_a('minimum')
  else if(inlet.name == 'max')
    e.be_a('maximum')
  else {
  //  console.log('unhandled inlet name:', inlet.label)
  }

  let unitEntity = entify(inlet.unit)
  if(!unitEntity)
    throw 'Inlet has no unit.'

  D.S('BeAnInletOf', e, unitEntity).start()

  if(inlet.outlet) {
    let outletEntity = entify(inlet.outlet)
    D.S('BeRoutedTo', outletEntity, e).start()
  } else {
    let constant = inlet.constant + (inlet.measuredIn || '')
    D.S('BeSetTo', e, constant).start()
  }

  inlet.on('connect', outlet => {
    D.S('BeRoutedTo', entify(outlet), e).start()
  })
  inlet.on('constant', value => {
    D.S('BeSetTo', e, value[0].toString()).start()
  })

  inlet.on('disconnect', outlet => {
    D.S('BeDisconnectedFrom', entify(inlet), entify(outlet)).start()
  })

  return e
}

function entifyOutlet(outlet, e) {
  // throw an error if argumetn is not an outlet
  if(!outlet || !outlet.isOutlet)
    throw 'entifyOutlet expects a dusp.Outlet'

  e.outlet = outlet
  e.be_a('outlet')

  let unitEntity = entify(outlet.unit)
  if(!unitEntity)
    throw 'Outlet has no unit.'

  D.S('BeAnOutletOf', e, unitEntity).start()


  // routing
  for(let inlet of outlet.connections)
    D.S('BeRoutedTo', e, entify(inlet)).start()


  outlet.on('connect', inlet => {
    D.S('BeRoutedTo', e, entify(inlet)).start()
  })

  outlet.on('disconnect', inlet => {
    D.S('BeDisconnectedFrom', entify(inlet), entify(outlet)).start()
  })

  return e
}
