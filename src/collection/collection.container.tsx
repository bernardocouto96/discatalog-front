import React, { useState, useEffect } from "react";
import * as R from "ramda";

import { Collection, Disc } from "../types/collection.types";
import CollectionComponent from "./collection.component";
import { emptyCollection, emptyDisc } from "../types/collection.creators";
import {
  fetchCollection,
  deleteDiscFromCollection,
  editDiscFromCollection,
  createDiscForCollection
} from "./collection.requests";

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

type CollectionFlags = {
  isLoading: boolean;
  hasError: boolean;
  showEditModal: boolean;
  showCreateModal: boolean;
};

const CollectionContainer: React.FC<CollectionContainerProps> = ({
  location,
  match
}) => {
  const [collection, setCollection] = useState<Collection>(emptyCollection);
  const [discToBeEdited, setDiscToBeEdited] = useState<Disc>(emptyDisc);
  const [collectionFlags, setCollectionFlags] = useState<CollectionFlags>({
    isLoading: true,
    hasError: false,
    showEditModal: false,
    showCreateModal: false
  });

  useEffect(() => {
    handleComponentLoad(
      location,
      match.params.collectionId,
      setCollection,
      updateCollectionFlags(collectionFlags, setCollectionFlags)
    );
  }, [location]);

  if (collectionFlags.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <CollectionComponent
      collection={collection}
      hasError={collectionFlags.hasError}
      showEditModal={collectionFlags.showEditModal}
      showCreateModal={collectionFlags.showCreateModal}
      discToBeEdited={discToBeEdited}
      onDiscDelete={onDiscDelete(
        collection,
        setCollection,
        updateCollectionFlags(collectionFlags, setCollectionFlags)
      )}
      onEditButtonClick={onEditButtonClick(
        setDiscToBeEdited,
        updateCollectionFlags(collectionFlags, setCollectionFlags)
      )}
      onCreateButtonClick={() =>
        updateCollectionFlags(
          collectionFlags,
          setCollectionFlags
        )({ showCreateModal: true })
      }
      onDiscEdit={onDiscEdit(
        collection,
        setCollection,
        updateCollectionFlags(collectionFlags, setCollectionFlags)
      )}
      onDiscCreate={onDiscCreate(
        collection,
        setCollection,
        updateCollectionFlags(collectionFlags, setCollectionFlags)
      )}
    />
  );
};

const updateCollectionFlags = (
  collectionFlags: CollectionFlags,
  setCollectionFlags: React.Dispatch<React.SetStateAction<CollectionFlags>>
) => (updatedFlag: { [key: string]: boolean }) => {
  setCollectionFlags({ ...collectionFlags, ...updatedFlag });
};

const handleComponentLoad = (
  location: Location,
  collectionId: string,
  setCollection: React.Dispatch<React.SetStateAction<Collection>>,
  setCollectionFlags: (updatedFlag: { [key: string]: boolean }) => void
) => {
  if (R.isNil(R.path(["state", "collection"], location))) {
    loadCollection(collectionId, setCollection, setCollectionFlags);
  } else {
    setCollection(location.state.collection);
    setCollectionFlags({ isLoading: false });
  }
};

const loadCollection = async (
  collectionId: string,
  setCollection: React.Dispatch<React.SetStateAction<Collection>>,
  setCollectionFlags: (updatedFlag: { [key: string]: boolean }) => void
) => {
  setCollectionFlags({ isLoading: true });

  try {
    const { data } = await fetchCollection(collectionId);
    setCollection(data);
    setCollectionFlags({ isLoading: false });
  } catch (error) {
    console.error(error);
    setCollectionFlags({
      hasError: true,
      isLoading: false
    });
  }
};

const onDiscDelete = (
  { collectionId }: Collection,
  setCollection: React.Dispatch<React.SetStateAction<Collection>>,
  setCollectionFlags: (updatedFlag: { [key: string]: boolean }) => void
) => async (discId: string) => {
  await deleteDiscFromCollection(collectionId, discId);
  loadCollection(collectionId, setCollection, setCollectionFlags);
};

const onEditButtonClick = (
  setDiscToBeEdited: React.Dispatch<React.SetStateAction<Disc>>,
  setCollectionFlags: (updatedFlag: { [key: string]: boolean }) => void
) => (disc: Disc) => {
  setDiscToBeEdited(disc);
  setCollectionFlags({ showEditModal: true });
};

const onDiscEdit = (
  { collectionId }: Collection,
  setCollection: React.Dispatch<React.SetStateAction<Collection>>,
  setCollectionFlags: (updatedFlag: { [key: string]: boolean }) => void
) => async (disc: Disc) => {
  await editDiscFromCollection(collectionId, disc);
  setCollectionFlags({ showEditModal: false });
  loadCollection(collectionId, setCollection, setCollectionFlags);
};

const onDiscCreate = (
  { collectionId }: Collection,
  setCollection: React.Dispatch<React.SetStateAction<Collection>>,
  setCollectionFlags: (updatedFlag: { [key: string]: boolean }) => void
) => async (disc: Disc) => {
  await createDiscForCollection(collectionId, disc);
  setCollectionFlags({ showCreateModal: false });
  loadCollection(collectionId, setCollection, setCollectionFlags);
};

export default CollectionContainer;
