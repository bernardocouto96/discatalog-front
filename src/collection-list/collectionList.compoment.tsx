import React from "react";

import { Collection } from "../types/collection.types";

type CollectionListComponentProps = {
  collections: [Collection] | [];
  onCollectionSelect: (collectionId: string) => void;
};

const CollectionListComponent: React.FC<CollectionListComponentProps> = ({
  collections,
  onCollectionSelect
}) => {
  return !collections.length ? (
    <div>no collection was found</div>
  ) : (
    <ul id="collections">
      {collections.map(collection => (
        <li
          key={collection.collectionId}
          onClick={() => onCollectionSelect(collection.collectionId)}
        >
          {collection.collectionName}
        </li>
      ))}
    </ul>
  );
};

export default CollectionListComponent;
