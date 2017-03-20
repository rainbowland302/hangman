import React from 'react'
import classNames from 'classnames'
// import IconDone from 'material-ui/svg-icons/action/done'
// import IconClose from 'material-ui/svg-icons/navigation/close'
// import { greenA400, redA100 } from 'material-ui/styles/colors'

import { connect } from 'react-redux'

import './WordChip.scss'

function checkWord(str) {
    const reg = /\*/
    return !reg.test(str)
}

function getWord(word, index) {
    const isCorrect = checkWord(word)
    const chipClass = classNames({
      'chip-wrapper': true,
      'correct': isCorrect,
      'incorrect': !isCorrect
    })
    return (
      <div className="col-xs-6 col-md-4 col-lg-3" key={index}>
        <div className={chipClass}>
          {word}
        </div>
      </div>
    )
}

const WordChip = (props) => {
    return getWord(props.word, props.index)
}

WordChip.propTypes = {
    word: React.PropTypes.string,
    index: React.PropTypes.number
}

const TargetView = connect(
    (state, ownProps) => {
        //can not add console.log(state) here
        return { word: state.game[ownProps.targetId], index: ownProps.targetId }
    }
)(WordChip)

export default TargetView
