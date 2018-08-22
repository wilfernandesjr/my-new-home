import React from 'react'
import './CartProduct.css'


function CartProduct(props) {
  return (
    <div className="CartProduct">
      <p>{props.product.name}</p>
      <span>
        1 x R$ {props.product.price}
        <a href="javascript:void(0)" onClick={() => props.removeProduct(props.product)} className="CartProduct-remove">
          <i className="fas fa-trash-alt"></i>
        </a>
      </span>
    </div>
  )
}

export default CartProduct
