import React, { Component } from 'react'
import CartProduct from '../CartProduct/CartProduct'
import './Cart.css'

class Cart extends Component {
  state = {
    active: false
  }

  activeBag() {
    this.setState(state => ({ active: !state.active }))
  }

  render() {
    const prodLength = this.props.cart.products.length
    const removeProduct = this.props.removeProduct

    return (
      <div className={'Cart ' + (this.state.active ? 'is-active' : '')}>
        <a href="javascript:void(0)" onClick={this.activeBag.bind(this)} className="Cart-button">
          {!<span><i className="fas fa-gift"></i></span>}
          <span>{prodLength}</span>
          Your Gift Box
          <span><i className="fas fa-angle-down"></i></span>
        </a>

        <div className="Cart-bag">
          {!this.props.cart.products.length && (
            <span>Your Gift Box is empty :'(</span>
          )}
          {this.props.cart.products.map(
            (product, index) => 
              (<CartProduct 
                key={index} 
                product={product} 
                removeProduct={removeProduct} 
              />)
            )
          }
          {!!this.props.cart.products.length && (
            <div>
              <p className="Cart-total">Total: <span>R$ {this.props.cart.total}</span></p>
              <a href="/checkout" className="Cart-cta">Concluir Pedido</a>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Cart
