import Classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { Fragment } from "react";
export const Overlay = (props) => {
  return <div onClick={props.close} className={Classes.backdrop}></div>;
};

const Modal = (props) => {
  return (
    <div className={Classes.modal}>
      <div> {props.children}</div>
    </div>
  );
};
const ov = document.getElementById("overlays");
const Model = (props) => {
  // console.log(ov);
  return (
    <Fragment>
      {ReactDOM.createPortal(<Overlay close={props.close} />, ov)}
      {ReactDOM.createPortal(<Modal>{props.children}</Modal>, ov)}
    </Fragment>
  );
};

export default Model;
