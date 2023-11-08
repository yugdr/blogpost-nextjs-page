import classes from "./ErrorModal.module.scss";

const ErrorModal: React.FC = () => {
  return (
    <div className={classes.errorModal}>
      Oh. Something went wrong! Please check your Internet connection and try
      again!
    </div>
  );
};

export default ErrorModal;
