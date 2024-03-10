import React from "react";
import { ReactComponent as List } from "../icons/list.svg";

const ListIconComponent: React.FC = () => {
  return (
    <div>
      <List /> {/* Use the imported icon component */}
    </div>
  );
};

export default ListIconComponent;
