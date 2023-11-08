import { GetStaticPaths, GetStaticProps } from "next";
import { User } from "@/interfaces/interfaces";

import { getPosts } from "@/lib/getPosts";
import { getUser } from "@/lib/getUser";
import PostDetail from "@/components/posts/PostDetail";

interface PostDetail {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostPageProps {
  post: PostDetail;
  user: User;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  // if posts is null ??
  if (!posts) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = posts.map((post) => {
    return {
      params: { slug: post.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // fetch post data for single post
  const postId = context.params!.slug;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await res.json();

  // fetch author data for single post
  const user = await getUser(post.userId);

  // if user is undefined ??
  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      user,
    },
  };
};

const PostPage: React.FC<PostPageProps> = (props) => {
  return (
    <PostDetail
      user={props.user}
      title={props.post.title}
      content={props.post.body}
      postId={props.post.id}
    />
  );
};

export default PostPage;
