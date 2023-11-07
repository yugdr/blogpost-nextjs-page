import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import classes from "./Layout.module.scss";
import localFont from "next/font/local";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});

interface Props {
  children?: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className={`${classes.blog__body} ${poppins.className}`}>
      <Header />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </div>
  );
}
