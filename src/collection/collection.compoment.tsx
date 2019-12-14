import React from "react";

import { Collection } from "../types/collection.types";

type CollectionComponentProps = {
  collection: Collection;
};

const CollectionComponent: React.FC<CollectionComponentProps> = ({
  collection
}) => {
  return (
    <ul id="discs">
      {collection.discs.map(disc => (
        <li>{disc.name}</li>
      ))}
    </ul>
  );
};

export default CollectionComponent;
