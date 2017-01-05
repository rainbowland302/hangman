import React from 'react'
import { IndexLink, Link } from 'react-router'

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import './Header.scss'

const style = {
  headerTitle: {
    color: 'white',
    marginLeft: 16,
  },
  headerTitleIcon: {
    color: '#4AACDC',
    height: '100%',
    width: 40,
    marginLeft: 30,
  },
  pageHeader: {
    backgroundColor: '#007CB1',
  },
};

export const Header = () => (
  <div>
    <Toolbar style={style.pageHeader}>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle style={style.headerTitle} text="TEST" />
      </ToolbarGroup>
    </Toolbar>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
  </div>
)

export default Header
