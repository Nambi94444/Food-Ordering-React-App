import react from "react";
import Classes from "./Input.module.css";

const Input = react.forwardRef((props, ref) => {
  // console.log({ ...props.Input });
  return (
    <div className={Classes.input}>
      <label htmlFor={props.Input.id}>{props.lable}</label>
      <input ref={ref} {...props.Input} />
    </div>
  );
});

export default Input;
