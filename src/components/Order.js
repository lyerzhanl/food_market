import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';
import img from './../img/cabbage.webp';

export class Order extends Component {
  render() {
    return (
      <div className="item">
        <img src={img} alt="img" />
        <h2>{this.props.item.productName}</h2>
        <p>{this.props.item.price} tg</p>
        <FaTrash
          className="delete-icon"
          onClick={() => {
              this.props.onDelete(this.props.item.productId)
          }}
        />
      </div>
    );
  }
}
export default Order;
