## Hangman Game
This repo uses [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit.git) as start up.

## Requirements

* node `^6.6.0`
* npm `^3.10.3`
* mongodb `^3.4.3`

## Getting Started

## Application Structure

The application structure is grouped primarily by file type rather than feature.

```
├── server                                # Express application that provides webpack middleware
│   ├── api                               # JSON Server api (deprecated)
│   ├── controllers                       # Server controllers
│   │   ├── controller.js                 # Routes entry point
│   │   ├── createTrainController.js      # /api/createTrain
│   │   ├── guessWordController.js        # /api/game/guessWord
│   │   ├── nextWordController.js         # /api/game/nextWord
│   │   ├── startGameController.js        # /api/game/startGame
│   │   └── tellMeController.js           # /api/tellMe
│   ├── models                            # MongoDB Dcoument Schema
│   │   ├── Player.js                     # Document for every game player
│   │   ├── Train.js                      # Document for train collection
│   ├── resources                         # Train Collection
│   └── server.js                         # Server application entry point
└── src                                   # Application source code
    ├── index.html                        # Main HTML page container for app
    ├── app.js                            # Application bootstrap and rendering
    ├── routes.js                         # Game route definition and async inject
    ├── store.js                          # Create and instrument redux store
    ├── components                        # Presentational Components
    │   ├── CoreLayout                    # CoreLayout which receives children for each route
    │   ├── FieldEditor                   # Field editor component which switch between input and div
    │   ├── GameWrapper                   # Game content layout
    │   ├── Header                        # Game header layout
    │   ├── WingButton                    # Start button component
    │   └── WordChip                      # Word chip component for every single word
    ├── containers                        # Container Components
    │   ├── DevTools.js                   # Dev tools for observing the states of store
    │   ├── GameContainer.js              # Connect GameWrapper component to the store
    │   ├── HeaderContainer.js            # Connect Header component to the store
    │   └── WordChipContainer.js          # Connect WordChip component to the store
    ├── actions                           # Actions definitions
    │   ├── actionTypes.js                # All actions defined in the app
    │   ├── autoPlayAction.js             # Main action for the game
    │   ├── gameAction.js                 # Base actions called by main action
    │   ├── globalAction.js               # User configuration related actions
    │   └── routeAction.js                # Action for routes
    ├── reducers                          # Reducers definitions
    │   ├── gameReducer.js                # Main game reducers
    │   ├── globalReducer.js              # Reducer for user info
    │   ├── routeReducer.js               # Reducer for routes
    │   └── reducer.js                    # Combine reducers
    ├── utils                             # Common utility funtions
    │   ├── asyncInjectors.js             # Inject an asynchronously loaded reducer
    │   └── request.js                    # Async fetch request for getting the Q&A
    └── styles                            # Application-wide styles (generally settings)
```
## Algorithm
