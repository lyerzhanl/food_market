import React from 'react';
import Item from './Item';

const Items = ({ items, onAdd }) => (
    <div key={'key'}>
        <main>
            {items.map((item) => (
                <Item key={item.id} item={item} onAdd={onAdd} />
            ))}
        </main>
    </div>
);

export default Items;
