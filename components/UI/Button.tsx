import classes from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
