import React, { Component } from 'react'
import CartProduct from '../CartProduct/CartProduct'
import './Checkout.css'


class Checkout extends Component {
  state = {
    firstName: '',
    lastName: '',
    document: '',
    email: '',
    phone: ''
  }

  updateField(field, value) {
    const newState = {}
    newState[field] = value.trim()
    this.setState(newState)
  }

  goToPayment() {
    const body = {
      value: this.props.cart.total,
      buyer: this.state
    }
    
    const protocol = window.location.protocol
    const host = window.location.hostname
    const url = `https://api.chadecasanova.wilfernandes.com.br/payments`

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(this.paymentResponse.bind(this))
  }

  paymentResponse(res) {
    if (res.referenceId)
      return this.props.goToSuccess()
  }

  render() {
    return (
      <div className="CheckoutWrapper">
        <div className="Checkout">
          <h3 className="Checkout-title">
            Gift Shipping Address
          </h3>
          <div className="Checkout-group">
            <label className="Checkout-itemHalf">
              <span>CEP</span>
              <input type="text" disabled value="01220-020"/>
            </label>
            <label className="Checkout-itemHalf">
              <span>Cidade / Estado</span>
              <input type="text" disabled value="São Paulo / SP"/>
            </label>
            <label>
              <span>Endereço</span>
              <input type="text" disabled value="Rua Araújo, 79, AP 60, Bairro República"/>
            </label>
          </div>
          <h3 className="Checkout-title">
            Customer Details
          </h3>
          <div className="Checkout-group">
            <label className="Checkout-itemHalf">
              <span>First Name</span>
              <input value={this.state.firstName} onChange={ e => this.updateField('firstName', e.target.value) } type="text" placeholder="E.g. John" />
            </label>
            <label className="Checkout-itemHalf">
              <span>Last Name</span>
              <input value={this.state.lastName} onChange={ e => this.updateField('lastName', e.target.value) } type="text" placeholder="E.g. Doe" />
            </label>
            <label>
              <span>E-mail</span>
              <input value={this.state.email} onChange={ e => this.updateField('email', e.target.value) } type="text" placeholder="E.g. john.doe@gmail.com" />
            </label>
            <div>
              <label className="Checkout-itemHalf">
                <span>CPF</span>
                <input value={this.state.document} onChange={ e => this.updateField('document', e.target.value) } type="text" placeholder="E.g. 123.456.789-01" />
              </label>
              <label className="Checkout-itemHalf">
                <span>Phone Number</span>
                <input value={this.state.phone} onChange={ e => this.updateField('phone', e.target.value) } type="text" placeholder="E.g. 11 9 9511 8191" />
              </label>
            </div>
          </div>
        </div>
        <div className="Checkout-sidebar">
          <h3 className="Checkout-title">
            Gift Resume
          </h3>
          <div className="Checkout-group">
            {!this.props.cart.products.length && (
              <span>Your Gift Box is empty :'(</span>
            )}
            {this.props.cart.products.map(
              (product, index) => 
                (<CartProduct 
                  key={index} 
                  product={product} 
                  removeProduct={this.props.removeProduct} 
                />)
              )
            }

            {!!this.props.cart.products.length && (
              <div>
                <p className="Cart-total">Shipping: R$ 0.00</p>
                <p className="Cart-total">Total: <strong>R$ {this.props.cart.total}</strong></p>
                <button onClick={this.goToPayment.bind(this)} className="Cart-cta">Send to PicPay</button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

}

export default Checkout
