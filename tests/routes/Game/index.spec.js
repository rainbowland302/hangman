import GameRoute from 'routes/Game'

describe('(Route) Game', () => {
  let _route

  beforeEach(() => {
    _route = GameRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `game`', () => {
    expect(_route.path).to.equal('game')
  })
})
