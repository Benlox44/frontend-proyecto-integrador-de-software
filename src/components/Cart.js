import React from 'react';

const Cart = ({ cart, removeFromCart }) => (
  <div>
    <h2 className="title">Carrito de Compras</h2>
    {cart.map(item => (
      <div key={item.id} className="courseCard">
        <h3>{item.title}</h3>
        <p className="price">Precio: ${item.price}</p>
        <button onClick={() => removeFromCart(item.id)} className="removeButton">Eliminar</button>
      </div>
    ))}
    <p className="total">
      Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
    </p>
  </div>
);

export default Cart;
