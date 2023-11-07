import classes from "./Button.module.scss";

const Button = (props: any) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
