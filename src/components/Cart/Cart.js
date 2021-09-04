import React,{ useContext,useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from './Checkout'
import style from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmittinig, setIsSubmittinig] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1})
  };

  const submitOrderHandler=async(userdata)=>{
    setIsSubmittinig(true);
      await fetch('https://food-order-app-3e983-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body:JSON.stringify({
        user:userdata,
        orderedItem:cartCtx.items,
      })
    })
    setDidSubmit(true);
    setIsSubmittinig(false);
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null,item.id)}
          onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );
  const orderBtnHandler=()=>{ 
    setIsCheckout(true);

  }

  const modalActions=<div className={style.actions}>
  <button className={style["button--alt"]} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={style.button} onClick={orderBtnHandler}>Order</button>}
</div>

const cartModalContent=  <React.Fragment>
{cartItems}
<div className={style.total}>
  <span>TotalAmount</span>
  <span>{totalAmount}</span>
</div>
{isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
{!isCheckout && modalActions}
</React.Fragment>

const  isSubmittingModalContent=<p>Sending order Data...</p>
const didSubmitModalContent=<React.Fragment>
<p>Succesfully sent the order!</p>
<div className={style.actions}>
  <button className={style["button"]} onClick={props.onClose}>
    Close
  </button>
</div>
</React.Fragment>

  return (
    <Modal onClose={props.onClose}>
    {!isSubmittinig && !didSubmit && cartModalContent}  
    {isSubmittinig && isSubmittingModalContent}  
    {!isSubmittinig &&  didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
