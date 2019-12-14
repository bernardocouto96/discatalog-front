import axios from "axios";

import { discatalogApiUrl } from "../config/index.json";

export const fetchCollectionList = async () =>
  await axios.get(`${discatalogApiUrl}/discatalog/collection`);
