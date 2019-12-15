import axios from "axios";

import { discatalogApiUrl } from "../config/index.json";

export const fetchCollection = async (collectionId: string) =>
  await axios.get(`${discatalogApiUrl}/discatalog/collection/${collectionId}`);

export const deleteDiscFromCollection = async (
  collectionId: string,
  discId: string
) =>
  await axios.delete(
    `${discatalogApiUrl}/discatalog/collection/${collectionId}/${discId}`
  );
