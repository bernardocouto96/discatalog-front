import React, { useState, useEffect } from "react";
import * as R from "ramda";

import { Collection } from "../types/collection.types";
import CollectionComponent from "./collection.compoment";
import { emptyCollection } from "../types/collection.creators";
import { fetchCollection } from "./collection.requests";

type Location = {
  state: {
    collection: Collection;
  };
  pathname: string;
};

type Match = {
  params: { collectionId: string };
};

type CollectionContainerProps = {
  location: Location;
  match: Match;
};

const CollectionContainer: React.FC<CollectionContainerProps> = ({
  location,
  match
}) => {
  const [collection, setCollection] = useState<Collection>(emptyCollection);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    handleComponentLoad(
      location,
      match.params.collectionId,
      setCollection,
      setLoading,
      setHasError
    );
  }, [location]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return <CollectionComponent collection={collection} hasError={hasError} />;
};

const handleComponentLoad = (
  location: Location,
  collectionId: string,
  setCollection: React.Dispatch<React.SetStateAction<Collection>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (R.isNil(R.path(["state", "collection"], location))) {
    loadCollection(collectionId, setCollection, setLoading, setHasError);
  } else {
    setCollection(location.state.collection);
    setLoading(false);
  }
};

const loadCollection = async (
  collectionId: string,
  setCollection: React.Dispatch<React.SetStateAction<Collection>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { data } = await fetchCollection(collectionId);
    setCollection(data);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setHasError(true);
    setLoading(false);
  }
};

export default CollectionContainer;
