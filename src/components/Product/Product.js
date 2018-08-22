import React from 'react'

import './Product.css'


function Product(props) {
  const product = props.product
  const cart = props.cart.products

  let isAddedToCart = false
  cart.map(prod => { if(prod.sku == product.sku) { isAddedToCart = true }  })

  return (
    <div className="ProductWrapper">
      <div className="Product">
        <div className="Product-image" style={{
          backgroundImage: `url(${product.image})`
        }}>
          <span className="Product-price">R$ {product.price}</span>
          <a 
            href="javascript:void(0)" 
            onClick={
              () => { 
                if(!isAddedToCart) return props.onAddToCart(product)
                return props.removeProduct(product)
              }
            } 
            className={'Product-cta ' + (isAddedToCart ? 'is-disabled' : '')}
          >
            <i className={`fas ` + (isAddedToCart ? 'fa-check' : 'fa-gift')}></i>
          </a>
        </div>
        <div className="Product-content">
          <h2 className="Product-title">{product.name}</h2>
          <p className="Product-count">Ainda restam <span>{product.stock}</span> produto(s)</p>
        </div>
      </div>
    </div>
  )
}

export default Product
