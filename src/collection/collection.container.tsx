import React from "react";
import { Collection } from "../types/collection.types";
import CollectionComponent from "./collection.compoment";

type CollectionContainerProps = {
  location: {
    state: {
      collection: Collection;
    };
  };
};

const CollectionContainer: React.FC<CollectionContainerProps> = ({
  location
}) => {
  return <CollectionComponent collection={location.state.collection} />;
};

export default CollectionContainer;
