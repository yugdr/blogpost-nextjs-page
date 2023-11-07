import PostList from "@/components/posts/PostList";
import { getPosts } from "@/lib/getPosts";

export async function getStaticProps() {
  const data = await getPosts();
  return {
    props: {
      posts: data,
    },
  };
}

export default function HomePage(props: any) {
  return <PostList posts={props.posts} />;
}
