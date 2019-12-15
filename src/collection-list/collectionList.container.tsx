import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as R from "ramda";

import CollectionList from "./collectionList.component";
import {
  fetchCollectionList,
  createCollection
} from "./collectionList.requests";
import { Collection } from "../types/collection.types";
import { emptyCollection } from "../types/collection.creators";

const CollectionListContainer: React.FC = () => {
  const [collections, setCollections] = useState<[Collection]>([
    emptyCollection
  ]);
  const [isLoading, setLoading] = useState(true);
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(
    false
  );

  const [redirectParams, setRedirectParams] = useState({
    shouldRedirect: false,
    collectionId: ""
  });

  useEffect(() => {
    loadCollections(setCollections, setLoading);
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (redirectParams.shouldRedirect) {
    return redirectHandler(collections, redirectParams.collectionId);
  }

  return (
    <CollectionList
      collections={collections}
      showCreateCollectionModal={showCreateCollectionModal}
      onCollectionSelect={onCollectionSelect(setRedirectParams)}
      onAddCollectionClick={() => setShowCreateCollectionModal(true)}
      onCollectionCreate={onCollectionCreate(setCollections, setLoading)}
    />
  );
};

const loadCollections = async (
  setCollections: React.Dispatch<React.SetStateAction<[Collection]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const { data } = await fetchCollectionList();
  setCollections(data);
  setLoading(false);
};

const onCollectionSelect = (
  setRedirectParams: React.Dispatch<
    React.SetStateAction<{
      shouldRedirect: boolean;
      collectionId: string;
    }>
  >
) => (selectedCollectionId: string) => {
  setRedirectParams({
    shouldRedirect: true,
    collectionId: selectedCollectionId
  });
};

const onCollectionCreate = (
  setCollections: React.Dispatch<React.SetStateAction<[Collection]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => async (collectionName: string) => {
  await createCollection(collectionName);
  loadCollections(setCollections, setLoading);
};

const redirectHandler = (
  collections: [Collection],
  selectedCollectionId: string
) => {
  const selectedCollection = collections.filter(
    collection => collection.collectionId === selectedCollectionId
  );

  return (
    <Redirect
      to={{
        pathname: `/collection/${selectedCollectionId}`,
        state: { collection: R.head(selectedCollection) }
      }}
    />
  );
};

export default CollectionListContainer;
