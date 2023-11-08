import { useParams } from "react-router";

const UpdatePost = () => {
  const { postId } = useParams();
  return <div>update post {postId}</div>;
};

export default UpdatePost;
