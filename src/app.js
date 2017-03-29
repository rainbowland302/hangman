import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { useScroll } from 'react-router-scroll';

import DevTools from './containers/DevTools'; //TODO: May separate in PROD
import createStore from './store';
import CoreLayout from './components/CoreLayout/CoreLayout';
import createRoutes from './routes';
// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);
injectTapEventPlugin();

const MOUNT_NODE = document.getElementById('root');
// ========================================================
// Render Setup
// ========================================================
const rootRoute = {
  component: CoreLayout,
  childRoutes: createRoutes(store)
};

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <MuiThemeProvider>
            <Router history={browserHistory}
                    routes={rootRoute}
                    render={
                      applyRouterMiddleware(useScroll())
                    }
            />
        </MuiThemeProvider>
        <DevTools />
      </div>
    </Provider>,
    MOUNT_NODE
  )
}

// ========================================================
// This code is excluded from production bundle
// ========================================================
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
