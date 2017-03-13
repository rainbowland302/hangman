import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Power from 'material-ui/svg-icons/action/power-settings-new'

import './WingButton.scss'

const WingButton = () => (
  <div className="start-wrapper">
    {getWings()}
    <FloatingActionButton className="start-button"><Power /></FloatingActionButton>
  </div>
)

const getWings = () => {
  let wings = []
  for (let i = 0; i < 2 ; i++) {
    wings.push(<div key={i} className="wing">{getFeathers()}</div>)
  }
  return wings
}

const getFeathers = () => {
  let feathers = []
  for (let i = 0; i< 10; i++) {
    feathers.push(<div key={i} className="feather"></div>)
  }
  return feathers
}

export default WingButton
