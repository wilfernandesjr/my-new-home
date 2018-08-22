import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Product from '../../components/Product/Product'
import './App.css'

class App extends Component {
  state = {
    products: [
      {
        sku: 1,
        name: 'A vassoura mais TOP',
        price: 25.00,
        stock: 1,
        image: '//www.paodeacucar.com/img/uploads/1/319/504319.jpg?type=product'
      },
      {
        sku: 2,
        name: 'Talheres maravilhososssss',
        price: 35.00,
        stock: 1,
        image: '//d2figssdufzycg.cloudfront.net/Custom/Content/Products/43/43/4343142_conjunto-de-talheres-para-churrasco-12-pcs-bbq6085-euro-home_M1.jpg'
      }
    ],
    cart: {
      products: [],
      total: 0
    }
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

        <div className="row">
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

        <div className="row">
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
