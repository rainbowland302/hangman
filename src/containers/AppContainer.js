import React, { Component, PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import DevTools from './DevTools' //TODO: May separate in PROD

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div>
          <MuiThemeProvider>
            <div style={{ height: '100%' }}>
              <Router history={browserHistory} children={routes} />
            </div>
          </MuiThemeProvider>

        </div>
      </Provider>
    )
  }
}

export default AppContainer
