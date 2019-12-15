import React from "react";

import { Collection } from "../types/collection.types";
import AddCollectionModal from "./components/addCollectionModal.component";

type CollectionListComponentProps = {
  collections: [Collection];
  showCreateCollectionModal: boolean;
  onCollectionSelect: (collectionId: string) => void;
  onAddCollectionClick: () => void;
  onCollectionCreate: (collectionName: string) => void;
};

const CollectionListComponent: React.FC<CollectionListComponentProps> = ({
  collections,
  showCreateCollectionModal,
  onCollectionSelect,
  onAddCollectionClick,
  onCollectionCreate
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
      <li id="addCollection" onClick={onAddCollectionClick}>
        Criar nova coleção
      </li>
      {showCreateCollectionModal && (
        <AddCollectionModal onCollectionCreate={onCollectionCreate} />
      )}
    </ul>
  );
};

export default CollectionListComponent;
