import React from "react";
import { ReactComponent as PaperClip } from "../icons/paperclip.svg";

const PaperClipComponent: React.FC = () => {
  return (
    <div>
      <PaperClip /> {/* Use the imported icon component */}
    </div>
  );
};

export default PaperClipComponent;
