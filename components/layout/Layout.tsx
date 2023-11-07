import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import classes from "./Layout.module.scss";
import { poppins } from "@/lib/fonts";

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
