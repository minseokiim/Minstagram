import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false, //동적 데이터니까 캐시 안함
  apiVersion: "2024-07-24", // 현재 날짜
  token: process.env.SANITY_SECRET_TOKEN,
});
