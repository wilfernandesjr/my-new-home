import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Product from '../../components/Product/Product'
import Checkout from '../../components/Checkout/Checkout'
import Success from '../../components/Success/Success'
import './App.css'

class App extends Component {
  state = {
    products: [],
    cart: {
      products: [],
      total: 0
    }
  }

  componentDidMount() {
    fetch('https://api.chadecasanova.wilfernandes.com.br/products')
      .then(products => products.json())
      .then(products => (
        this.setState({ products })
      ))
  }

  addToCart(product) {
    const total = () =>
      this.state.cart.products
        .map(p => p.price)
        .reduce((acc, curr) => acc + curr, 0)

    this.setState(state => ({
      cart: {
        products: state.cart.products.concat([ product ]),
        total: total() + product.price
      }
    }))
  }

  removeProduct = (product) => {
    this.setState(state => ({
      cart: {
        products: state.cart.products.filter(prod => prod.sku !== product.sku),
        total: state.cart.total - product.price
      }
    }))
  }

  render() {
    return (
      <div className="App">
        <Header 
          cart={this.state.cart} 
          removeProduct={this.removeProduct}
        />
        
        <Switch>
          <Route exact path="/" render={() => (
            <div className="container">
              {this.state.products.map((product, index) => (
                <Product
                  key={index}
                  product={product}
                  cart={this.state.cart}
                  onAddToCart={this.addToCart.bind(this)}
                  removeProduct={this.removeProduct.bind(this)}
                />
              ))}
            </div>
          )} />

          <Route path="/checkout" render={({history}) => (
            <div className="row">
              <Checkout 
                cart={this.state.cart} 
                goToSuccess={(() => history.push('/success')).bind(this)} 
                removeProduct={this.removeProduct.bind(this)} 
              />
            </div>
          )} />

          <Route path="/success" render={() => (
            <div className="row">
              <Success />
            </div>
          )} />

          <Route render={() => (
            <div className="page-error">
            </div>
          )} />
        </Switch>

        <div className="row">
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
