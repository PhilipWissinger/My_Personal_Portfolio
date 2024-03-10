import React from "react";
import { ReactComponent as Comment } from "../icons/chat-left.svg";

const CommentIconComponent: React.FC = () => {
  return (
    <div>
      <Comment /> {/* Use the imported icon component */}
    </div>
  );
};

export default CommentIconComponent;
