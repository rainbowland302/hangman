import React from 'react'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import IconDone from 'material-ui/svg-icons/action/done'
import IconClose from 'material-ui/svg-icons/navigation/close'
import { greenA400, redA100 } from 'material-ui/styles/colors'

import './WordChip.scss'

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

function checkWord(str) {
  const reg = /\*/
  return !reg.test(str)
}

function getWord(data) {
  let word = data.word
  return (
    <Chip style={styles.chip}>
      {
        checkWord(word) ? <Avatar backgroundColor={greenA400} icon={<IconDone />} /> :
          <Avatar backgroundColor={redA100} icon={<IconClose />} />
      }
      {word}
    </Chip>
  )
}

export const WordChip = (props) => {
  return <div style={styles.wrapper}>{props.words.map(getWord)}</div>
}

WordChip.propTypes = {
  words: React.PropTypes.array.isRequired
}

export default WordChip
