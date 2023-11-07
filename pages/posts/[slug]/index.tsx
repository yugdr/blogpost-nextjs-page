import { getPosts } from "@/lib/getPosts";
import { getUser } from "@/lib/getUser";
import PostDetail from "@/components/posts/PostDetail";

export async function getStaticPaths() {
  const posts = await getPosts();

  const paths = posts.map((post: any) => {
    return {
      params: { slug: post.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  // fetch post data for single post
  const postId = context.params.slug;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await res.json();

  // fetch author data for single post
  const user = await getUser(post.userId);

  return {
    props: {
      post,
      user,
    },
  };
}

export default function PostPage(props: any) {
  return (
    <PostDetail
      title={props.post.title}
      user={props.user}
      content={props.post.body}
      postId={props.post.id}
    />
  );
}
