import React, { Component } from 'react';
import potato from './../img/potato.png';

class Item extends Component {
    render() {
        const { item, onAdd } = this.props;

        return (
            <div className="item">
                <img src={potato} alt={item.productName} />
                <h2>{item.productName}</h2>
                <b>{item.price + " "}</b>
                <div
                    className="add-to-cart"
                    onClick={() => {
                        onAdd(item);
                        console.log(item);
                    }}
                >
                    +
                </div>
            </div>
        );
    }
}

export default Item;


//require('./img/' + item.img)