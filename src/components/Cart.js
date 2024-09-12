import React from 'react';

const Cart = ({ cart, removeFromCart, loadingCart, user }) => {
  if (loadingCart) {
    return <div>Cargando carrito...</div>;
  }

  const handleCheckout = async () => {
    if (!user) {
      alert("Debes iniciar sesión para continuar con la compra.");
      return;
    }

    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

      const response = await fetch("http://localhost:3003/api/webpay/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount,
          courses: cart,
        }),
      });

      const data = await response.json();
      if (data.url && data.token) {
        window.location.href = `${data.url}?token_ws=${data.token}`;
      }
    } catch (error) {
      console.error("Error iniciando transacción:", error);
    }
  };

  return (
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
      <button 
        onClick={handleCheckout} 
        className="checkoutButton"
      >
        Continuar con la compra
      </button>
    </div>
  );
};

export default Cart;
