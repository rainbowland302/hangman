import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Tabs, Tab } from 'material-ui/Tabs'

import './Header.scss'
import WingButton from '../WingButton/WingButton'

const style = {
  headerTitle: {
    color: 'white',
    marginLeft: 16,
  },
  pageHeader: {
    backgroundColor: 'bisque',
  },
}

const Header = () => (
  <div>
    <div className="header-wrapper">
      <WingButton className="start-button"></WingButton>
    </div>
    <Tabs>
      <Tab label="Game" containerElement={<IndexLink to='/' activeClassName='route--active' />} />
      <Tab label="Result" containerElement={<Link to='/result' activeClassName='route--active' />} />
    </Tabs>
  </div>
)

export default Header
