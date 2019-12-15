import axios from "axios";

import { discatalogApiUrl } from "../config/index.json";
import { Disc } from "../types/collection.types.js";

export const fetchCollection = async (collectionId: string) =>
  await axios.get(`${discatalogApiUrl}/discatalog/collection/${collectionId}`);

export const deleteDiscFromCollection = async (
  collectionId: string,
  discId: string
) =>
  await axios.delete(
    `${discatalogApiUrl}/discatalog/collection/${collectionId}/${discId}`
  );

export const editDiscFromCollection = async (
  collectionId: string,
  disc: Disc
) =>
  await axios.put(
    `${discatalogApiUrl}/discatalog/collection/${collectionId}/${disc.discId}`,
    disc
  );
