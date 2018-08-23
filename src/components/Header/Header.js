import React from 'react'
import { Link, Route } from 'react-router-dom'
import Cart from '../Cart/Cart'

import './Header.css'


function Header(props) {
  return (
    <div className="Header">
      <div className="row">
        <Link to='/'><h1>New Home <span>{'{'}</span>Tea<span>{'}'}</span></h1></Link>
        <Route exact path="/" render={() => (
          <Cart removeProduct={props.removeProduct} cart={props.cart} />
        )} />
      </div>
    </div>
  )
}

export default Header
