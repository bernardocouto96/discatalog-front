import axios from "axios";

import { discatalogApiUrl } from "../config/index.json";

export const fetchCollectionList = async () =>
  await axios.get(`${discatalogApiUrl}/discatalog/collection`);

export const createCollection = async (collectionName: string) =>
  await axios.post(`${discatalogApiUrl}/discatalog/collection`, {
    collectionName
  });
