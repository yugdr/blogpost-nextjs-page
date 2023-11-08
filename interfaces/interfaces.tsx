// Comments
export interface Comment {
  id: number;
  postId: number;
  name: string;
  body: string;
  email: string;
}

export interface PostCommentsProps {
  postId: number;
}

// User
export interface User {
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
}

// Post
export interface PostDetailProps {
  postId: number;
  title: string;
  content: string;
  user: User;
}

export interface Post {
  // userId?: number;
  id: number;
  title: string;
  body: string;
}

export interface PostItemProps {
  post: Post;
}

export interface PostListProps {
  posts: Post[];
}
