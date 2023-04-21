import Classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = (props) => {
  const nameref = useRef();
  const addressref = useRef();
  const postalref = useRef();
  const cityref = useRef();
  const [currentstate, setstate] = useState({
    name: true,
    street: true,
    city: true,
    postalcode: true,
  });

  const isemty = (value) => value.trim() !== "";
  const isfivechar = (value) => value.trim().length === 5;
  const SubmitHandler = (event) => {
    event.preventDefault();
    const enteredname = nameref.current.value;
    const entredaddress = addressref.current.value;
    const enteredpoastal = postalref.current.value;
    const entredcity = cityref.current.value;

    const nameisvalid = isemty(enteredname);
    const addressisvalid = isemty(entredaddress);
    const postalisvalid = isfivechar(enteredpoastal);
    const cityisvalid = isemty(entredcity);
    console.log(
      `${nameisvalid} ${addressisvalid} ${postalisvalid} ${cityisvalid}`
    );
    const isFormvalid =
      nameisvalid && addressisvalid && postalisvalid && cityisvalid;

    setstate({
      name: nameisvalid,
      street: addressisvalid,
      city: cityisvalid,
      postalcode: postalisvalid,
    });
    if (!isFormvalid) {
      return;
    }
    console.log("me");
    props.onConfirm({
      name: enteredname,
      address: entredaddress,
      postal: enteredpoastal,
      city: entredcity,
    });
  };

  return (
    <form className={Classes.form} onSubmit={SubmitHandler}>
      <div
        className={`${Classes.control} ${
          !currentstate.name ? Classes.invalid : ""
        }`}
      >
        {!currentstate.name && <p>Name is invalid</p>}
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameref} />
      </div>
      <div
        className={`${Classes.control} ${
          !currentstate.street ? Classes.invalid : ""
        }`}
      >
        {!currentstate.street && <p>Address is invalid</p>}
        <label htmlFor="Address">Address</label>
        <input type="text" id="Address" ref={addressref} />
      </div>
      <div
        className={`${Classes.control} ${
          !currentstate.postalcode ? Classes.invalid : ""
        }`}
      >
        {!currentstate.postalcode && <p>postal is invalid</p>}
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalref} />
      </div>

      <div
        className={`${Classes.control} ${
          !currentstate.city ? Classes.invalid : ""
        }`}
      >
        {!currentstate.city && <p>city is invalid</p>}
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityref} />
      </div>
      <div className={Classes.actions}>
        <button className={Classes.submit}>Confirm</button>
        <button onClick={props.close}>Cancel</button>
      </div>
    </form>
  );
};

export default Checkout;
