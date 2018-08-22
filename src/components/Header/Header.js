import React from 'react'

import Cart from '../Cart/Cart'

import './Header.css'


function Header(props) {
  return (
    <div className="Header">
      <div className="row">
        <h1>New Home <span>{'{'}</span>Tea<span>{'}'}</span></h1>
        <Cart removeProduct={props.removeProduct} cart={props.cart} />
      </div>
    </div>
  )
}

export default Header
