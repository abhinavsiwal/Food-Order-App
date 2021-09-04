  import { useRef,useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const [formInput, setFormInput] = useState({
        name:true,
        street:true,
        city:true,
        postal:true,
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = value=>value.trim()==='';
    const isFiveChars = value=>value.trim.length===5;


  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName=nameInputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredPostal=postalInputRef.current.value;
    const enteredCity=cityInputRef.current.value;

    const enteredNameIsValid= !isEmpty(enteredName);
    const enteredStreetIsValid= !isEmpty(enteredStreet);
    const enteredCityIsValid= !isEmpty(enteredCity);
    const enteredPostalIsValid= !isFiveChars(enteredPostal);
    setFormInput({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        postal:enteredPostalIsValid,
        city:enteredCityIsValid,
    })
    const formIsValid= enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

    if(!formIsValid){
        return;
    }
    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postal:enteredPostal,
        city:enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInput.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInput.name && <p>Please Enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInput.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInput.street && <p>Please Enter a valid Street!</p>}
      </div>
      <div className={`${classes.control} ${formInput.postal ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal'  ref={postalInputRef}/>
        {!formInput.postal && <p>Please Enter a valid Postal Code!</p>}
      </div>
      <div className={`${classes.control} ${formInput.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'  ref={cityInputRef}/>
        {!formInput.city && <p>Please Enter a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;