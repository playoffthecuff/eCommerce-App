import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { cartStore } from '../../store/cart-store';

import placeholder from '../../assets/images/load_failed.webp';
import userStore from '../../store/user-store';

const Cart = observer(() => {
  // const handleRemove = (productId) => {
  //   cartStore.removeFromCart(productId);
  // };

  useEffect(() => {
    const currentUser = userStore.user?.id;
    const tempCartId = localStorage.getItem('temp_cart_id');

    if (currentUser || tempCartId) {
      cartStore.loadItems();
    }
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      <div>
        {cartStore.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartStore.items.map((item) => (
              <li key={item.productId} style={styles.cartItem}>
                <div>
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                  {item.discountedPrice ? (
                    <>
                      <span style={{ marginRight: '10px' }}>Price: ${item.price}</span>
                      <span>Discounted Price: ${item.discountedPrice}</span>
                    </>
                  ) : (
                    <span>Price: ${item.price}</span>
                  )}
                  <p>Size: {item.size}</p>
                  <p>Item#: {item.vendorCode}</p>
                  <div>
                    <img src={item.thumbs ? `data:image/jpeg;base64,${item.thumbs}` : placeholder} alt={item.title} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>Total Items: {cartStore.totalItems}</div>
      <div>Total Price: {cartStore.totalPrice}</div>
    </div>
  );
});

const styles = {
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #e8e8e8',
    marginBottom: '10px',
  },
};

export default Cart;
