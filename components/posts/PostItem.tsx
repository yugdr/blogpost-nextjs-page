import Link from "next/link";
import classes from "./PostItem.module.scss";

import { PostItemProps } from "@/interfaces/interfaces";

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div key={post.id} className={classes.post__wrapper}>
      <Link href={`/posts/${post.id}`}>
        <h4>{post.title}</h4>
      </Link>
      <div className="post__body">
        {post.body.length > 80 ? `${post.body.substring(0, 80)}...` : post.body}
      </div>
    </div>
  );
};

export default PostItem;
