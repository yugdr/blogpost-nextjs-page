import { Post } from "@/interfaces/interfaces";

export const getPosts = async (): Promise<Post[] | null> => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    // const res = await fetch(
    //   "https://a25da34c-3fe7-40b5-a61e-2f6a2799ce61.mock.pstmn.io/friendlyCaptcha-test"
    // ); // test response 404
    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const data: Post[] = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    return null;
  }
};
