import PostList from "@/components/posts/PostList";
import { GetStaticProps } from "next";
import { getPosts } from "@/lib/getPosts";
import { Post } from "@/interfaces/interfaces";

interface HomePageProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const data = await getPosts();

  if (!data) {
    // what to do if data is null?
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: data,
    },
  };
};

const HomePage: React.FC<HomePageProps> = (props) => {
  return <PostList posts={props.posts} />;
};

export default HomePage;
