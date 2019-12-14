import React from "react";
import * as R from "ramda";

import { Collection } from "../types/collection.types";

type CollectionListComponentProps = {
  collections: [Collection] | [];
};

const CollectionListComponent: React.FC<CollectionListComponentProps> = ({
  collections
}) => {
  return !collections.length ? (
    <div>no collection was found</div>
  ) : (
    <ul id="collections">
      {collections.map(collection => (
        <li>{R.propOr("", "collectionName", collection)}</li>
      ))}
    </ul>
  );
};

export default CollectionListComponent;
