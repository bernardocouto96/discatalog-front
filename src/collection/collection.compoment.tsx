import React from "react";

import { Collection } from "../types/collection.types";

type CollectionComponentProps = {
  collection: Collection;
  hasError: boolean;
};

const CollectionComponent: React.FC<CollectionComponentProps> = ({
  collection,
  hasError
}) => {
  return hasError ? (
    <div id="error">
      <p className="errorMessage">
        Ops! A coleção que tentou acessar não existe
      </p>
    </div>
  ) : (
    <ul id="discs">
      {collection.discs.map(disc => (
        <li key={disc.discId}>{disc.name}</li>
      ))}
    </ul>
  );
};

export default CollectionComponent;
