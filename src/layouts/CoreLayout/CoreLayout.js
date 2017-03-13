import React from 'react'
import Header from '../../components/Header/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

const CoreLayout = ({ children }) => (
  <div className='text-center'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
