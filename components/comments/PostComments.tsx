import Link from "next/link";
import useSWR from "swr";
import classes from "./PostComments.module.scss";

const PostComments = (props: any) => {
  const fetcher = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await res.json();

    const filteredData = data.filter(
      (item: any) => item.postId === Number(props.postId)
    );

    return filteredData;
  };
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/comments",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className={classes.comments__wrapper}>
      {data.map((comment: any) => (
        <ul key={comment.id} className={classes.singleComment__wrapper}>
          <li className={classes.singleComment}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
            <Link href={`mailto:${comment.email}`}>Contact author </Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default PostComments;
