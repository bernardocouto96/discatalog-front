import React from "react";
import styled from "styled-components";

import { Collection } from "../types/collection.types";
import AddCollectionModal from "./components/addCollectionModal.component";
import CollectionCard from "./components/collectionCard.component";

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
    <EmptyCollectionList>
      <EmptyCollectionListText>no collection was found</EmptyCollectionListText>
    </EmptyCollectionList>
  ) : (
    <CollectionList id="collections">
      {collections.map(collection => (
        <CollectionListItem
          key={collection.collectionId}
          onClick={() => onCollectionSelect(collection.collectionId)}
        >
          <CollectionCard collection={collection} />
        </CollectionListItem>
      ))}
      <AddCollectionItem>
        <AddCollectionButton id="addCollection" onClick={onAddCollectionClick}>
          Criar nova coleção
        </AddCollectionButton>
      </AddCollectionItem>
      {showCreateCollectionModal && (
        <AddCollectionModal onCollectionCreate={onCollectionCreate} />
      )}
    </CollectionList>
  );
};

const EmptyCollectionList = styled.div``;
const EmptyCollectionListText = styled.p``;

const CollectionList = styled.ul``;
const CollectionListItem = styled.li``;

const AddCollectionItem = styled.li``;
const AddCollectionButton = styled.button``;

export default CollectionListComponent;
