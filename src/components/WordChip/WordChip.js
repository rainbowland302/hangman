import React from 'react'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import IconDone from 'material-ui/svg-icons/action/done'
import IconClose from 'material-ui/svg-icons/navigation/close'
import { greenA400, redA100 } from 'material-ui/styles/colors'

import { connect } from 'react-redux'

import './WordChip.scss'

const styles = {
    chip: {
        margin: 4
    }
}

function checkWord(str) {
    const reg = /\*/
    return !reg.test(str)
}

function getWord(word, index) {
    return (
      <Chip style={styles.chip} key={index}>
        {
          checkWord(word) ? <Avatar backgroundColor={greenA400} icon={<IconDone />} /> :
            <Avatar backgroundColor={redA100} icon={<IconClose />} />
        }
        {word}
      </Chip>
    )
}

export const WordChip = (props) => {
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
)(WordChip);

export default TargetView
