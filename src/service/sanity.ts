import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: false, //동적 데이터니까 캐시 안함
  apiVersion: "2024-07-24", // 현재 날짜
  token: process.env.SANITY_STUDIO_SECRET_TOKEN,
  fetch: {
    cache: "no-store",
  },
});

// * sanity 이미지 최적화 해서 가져오는 법
// https://www.sanity.io/docs/image-url

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}

export const assetsURL = `https://${process.env.SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-03-25/assets/images/${process.env.SANITY_STUDIO_DATASET}`;
