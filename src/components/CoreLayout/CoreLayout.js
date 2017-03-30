import React from 'react'
import HeaderContainer from '../../containers/HeaderContainer'
import '../../styles/core.scss'

const CoreLayout = ({ children }) => (
  <div className='text-center'>
    <HeaderContainer />
    <div>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
