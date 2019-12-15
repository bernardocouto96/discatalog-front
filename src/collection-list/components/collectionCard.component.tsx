import React from "react";
import styled from "styled-components";
import { Collection } from "../../types/collection.types";

type CollectionCardProps = {
  collection: Collection;
};

const CollectionCardComponent: React.FC<CollectionCardProps> = ({
  collection
}) => {
  return (
    <CollectionCard>
      <CollectionCardName>{collection.collectionName}</CollectionCardName>
    </CollectionCard>
  );
};

const CollectionCard = styled.div``;
const CollectionCardName = styled.span``;

export default CollectionCardComponent;
