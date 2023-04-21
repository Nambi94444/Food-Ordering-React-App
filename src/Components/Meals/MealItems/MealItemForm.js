import { useRef, useState } from "react";
import Input from "../../UI/Input";
import Classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [defaultstate, newstate] = useState(false);
  const inputvalue = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const amount = inputvalue.current.value;
    const amoutnumber = +amount;

    if (
      amount.trim().length === 0 ||
      amoutnumber < 0 ||
      amoutnumber > 5 ||
      isNaN(amoutnumber)
    ) {
      newstate(true);
      return;
    }
    // console.log(amoutnumber);
    props.additemstomeal(amoutnumber);
  };

  return (
    <form onSubmit={submitHandler} className={Classes.form}>
      <Input
        ref={inputvalue}
        lable="Amount"
        Input={{
          id: "amount_" + props.id, // this changed!
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      {defaultstate && <p>Please enter the valid input</p>}
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
