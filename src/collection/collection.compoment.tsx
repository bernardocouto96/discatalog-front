import React from "react";

import { Collection } from "../types/collection.types";

type CollectionComponentProps = {
  collection: Collection;
  hasError: boolean;
  onDiscDelete: (discId: string) => void;
};

const CollectionComponent: React.FC<CollectionComponentProps> = ({
  collection,
  hasError,
  onDiscDelete
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
        <li key={disc.discId}>
          {disc.name}
          <button
            id={`delete-${disc.discId}`}
            onClick={() => onDiscDelete(disc.discId)}
          >
            excluir disco
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CollectionComponent;
