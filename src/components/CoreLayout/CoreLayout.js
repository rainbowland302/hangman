import React from 'react'
import Header from '../Header/Header'
import '../../styles/core.scss'

const CoreLayout = ({ children }) => (
  <div className='text-center'>
    <Header />
    <div>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
