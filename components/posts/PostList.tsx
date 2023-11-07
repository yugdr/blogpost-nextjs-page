import { useAtom } from "jotai";
import {
  sliceStartAtom,
  sliceEndAtom,
  currentPageAtom,
} from "../../storage/atoms";

import classes from "./PostList.module.scss";
import PostItem from "./PostItem";
import Button from "../UI/Button";

const PostList = ({ posts }: any) => {
  // using the global state from Jotai for setting slice values
  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom);
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  // the number that is added to the states specifies how many posts are displayed per page
  const nextPage = () => {
    setCurrentSliceStart(currentSliceStart + 20);
    setCurrentSliceEnd(currentSliceEnd + 20);
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentSliceStart(currentSliceStart - 20);
    setCurrentSliceEnd(currentSliceEnd - 20);
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className={classes.posts__wrapper}>
        {posts.slice(currentSliceStart, currentSliceEnd).map((post: any) => {
          return <PostItem key={post.id} post={post} />;
        })}
      </div>
      {/* button loads 20 more posts on load posts and disappears if no more posts can be loaded */}
      <div className={classes.button__wrapper}>
        {currentSliceStart >= 20 && (
          <Button onClick={previousPage} text="previous" />
        )}

        {currentSliceEnd < posts.length && (
          <Button onClick={nextPage} text="next" />
        )}
      </div>
      <div className={classes.pagination__wrapper}>
        <span>Page {currentPage}</span>
      </div>
    </>
  );
};

export default PostList;
