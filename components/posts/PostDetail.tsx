import PostComments from "@/components/comments/PostComments";
import CommentsForm from "@/components/comments/CommentsForm";
import Link from "next/link";
import classes from "./PostDetail.module.scss";
import { TbMessageCircle2, TbMessageCirclePlus } from "react-icons/tb";

import { useState } from "react";

export default function PostDetail(props: any) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [submitFormVisible, setSubmitFormVisible] = useState(false);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const toggleSubmitForm = () => {
    setSubmitFormVisible(!submitFormVisible);
  };

  return (
    <div className={classes.detailPage__wrapper}>
      <Link href="/">Go back</Link>
      <div className={classes.postDetail__wrapper}>
        <h3 className={classes.headline__md}>{props.title}</h3>
        <div className={classes.userInfo__wrapper}>
          <div className={classes.user__profile}>
            {props.user.name
              .split(" ")
              .map((name: any) => name[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className={classes.user__info}>
            <p className={classes.username}>{props.user.username}</p>
            <p className={classes.city}>{props.user.address.city}</p>
            <p className={classes.email}>{props.user.email}</p>
          </div>
        </div>
        <div className={classes.post__body}>{props.content}</div>
      </div>
      <div className={classes.comment__icon}>
        <TbMessageCircle2
          size={35}
          color="rgba(30, 41, 59, 0.5)"
          onClick={toggleComments}
          styles={{ marginRight: "1rem" }}
        />
      </div>
      {commentsVisible ? <PostComments postId={props.postId} /> : null}
      <div className={classes.comment__icon}>
        <TbMessageCirclePlus
          size={35}
          color="rgba(30, 41, 59, 0.5)"
          onClick={toggleSubmitForm}
        />
      </div>
      {submitFormVisible ? <CommentsForm postId={props.postId} /> : null}
    </div>
  );
}
