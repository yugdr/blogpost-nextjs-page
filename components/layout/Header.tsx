import classes from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={classes.header__wrapper}>
      <h2 className={classes.headline__lg}>Nextjs Blog</h2>
    </div>
  );
};

export default Header;
