import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Tabs, Tab } from 'material-ui/Tabs'

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'

import './Header.scss'

const style = {
  headerTitle: {
    color: 'white',
    marginLeft: 16,
  },
  pageHeader: {
    backgroundColor: 'bisque',
  },
}

export const Header = () => (
  <div>
    <Toolbar style={style.pageHeader}>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle style={style.headerTitle} text="TEST" />
      </ToolbarGroup>
    </Toolbar>
    <Tabs>
      <Tab label="Game" containerElement={<IndexLink to='/' activeClassName='route--active' />} />
      <Tab label="Result" containerElement={<Link to='/result' activeClassName='route--active' />} />
    </Tabs>
  </div>
)

export default Header
