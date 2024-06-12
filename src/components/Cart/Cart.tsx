import { Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import styles from './Cart.module.css';
import OrderSaving from './subComponents/OrderSaving/OrderSaving';
import CartItem from './subComponents/ProductItem/CartItem';
import OrderSummary from './subComponents/OrderSummary/OrderSummary';
import userStore from '../../store/user-store';
import { cartStore } from '../../store/cart-store';

// export function CartPage() {

//   return (
//     <div className={styles['cart-container']}>
//       <Typography.Title level={3}>SHOPPING BAG</Typography.Title>
//       <div className={styles['cart-section']}>
//         <div style={{ marginBottom: 0 }} className={styles['product-container']}>
//           <ProductItem />
//           <ProductItem />
//           <div className={styles['order-saving-under']}>
//             <OrderSaving />
//           </div>
//           <div className={styles['estimated-total-under']}>
//             <p>Estimated Total</p>
//             <p>$30.00</p>
//           </div>
//         </div>
//         <OrderSummary />
//       </div>
//     </div>
//   );
// }

const Cart = observer(() => {
  useEffect(() => {
    const currentUser = userStore.user?.id;
    const tempCartId = localStorage.getItem('temp_cart_id');

    if (currentUser || tempCartId) {
      cartStore.loadItems();
    }
  }, []);

  return (
    <div className={styles['cart-container']}>
      <Typography.Title level={3}>SHOPPING BAG</Typography.Title>
      <div className={styles['cart-section']}>
        <div style={{ marginBottom: 0 }} className={styles['product-container']}>
          <CartItem />
          <CartItem />
          <div className={styles['order-saving-under']}>
            <OrderSaving />
          </div>
          <div className={styles['estimated-total-under']}>
            <p>Estimated Total</p>
            <p>$30.00</p>
          </div>
        </div>
        <OrderSummary />
      </div>
    </div>
  );
  //   // const handleRemove = (productId) => {
  //   //   cartStore.removeFromCart(productId);
  //   // };
  //   useEffect(() => {
  //     const currentUser = userStore.user?.id;
  //     const tempCartId = localStorage.getItem('temp_cart_id');
  //     if (currentUser || tempCartId) {
  //       cartStore.loadItems();
  //     }
  //   }, []);
  //   return (
  //     <div>
  //       <h2>Cart</h2>
  //       <div>
  //         {cartStore.items.length === 0 ? (
  //           <p>Your cart is empty.</p>
  //         ) : (
  //           <ul style={{ listStyle: 'none', padding: 0 }}>
  //             {cartStore.items.map((item) => (
  //               <li key={item.productId} style={styles.cartItem}>
  //                 <div>
  //                   <h3>{item.title}</h3>
  //                   <p>Quantity: {item.quantity}</p>
  //                   {item.discountedPrice ? (
  //                     <>
  //                       <span style={{ marginRight: '10px' }}>Price: ${item.price}</span>
  //                       <span>Discounted Price: ${item.discountedPrice}</span>
  //                     </>
  //                   ) : (
  //                     <span>Price: ${item.price}</span>
  //                   )}
  //                   <p>Size: {item.size}</p>
  //                   <p>Item#: {item.vendorCode}</p>
  //                   <div>
  //                     <img src={item.thumbs ? `data:image/jpeg;base64,${item.thumbs}` : placeholder} alt={item.title} />
  //                   </div>
  //                 </div>
  //               </li>
  //             ))}
  //           </ul>
  //         )}
  //       </div>
  //       <div>Total Items: {cartStore.totalItems}</div>
  //       <div>Total Price: {cartStore.totalPrice}</div>
  //     </div>
  //   );
});

// const styles = {
//   cartItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '10px',
//     borderBottom: '1px solid #e8e8e8',
//     marginBottom: '10px',
//   },
// };

export default Cart;
