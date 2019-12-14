import React, { useState, useEffect } from "react";
import CollectionList from "./collectionList.compoment";
import { fetchCollectionList } from "./collectionList.requests";
import { Collection } from "../types/collection.types";

const CollectionListContainer: React.FC = () => {
  const [collections, setCollections] = useState<[Collection] | []>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections(setCollections, setLoading);
  }, []);

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <CollectionList collections={collections} />
  );
};

const loadCollections = async (
  setCollections: React.Dispatch<React.SetStateAction<[Collection] | []>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { data } = await fetchCollectionList();
  setCollections(data);
  setLoading(false);
};

export default CollectionListContainer;
