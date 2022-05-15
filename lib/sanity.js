import sanityClient from "@sanity/client";


export const client = sanityClient({
  projectId: "i6krfo72",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token:
    "skSBKcyBjhXD2Z6Ftzh3ZsPg3jHUEwTKh6KT9QxCdYJ1TvsxNbDtpXfk9z11PZk1lUx2yxtwT8zaVwhAHz2x6goFKZrlwjDjLw6y1YaBwgPIH364qtqdCFWmRKlUmgxhlZxJTMgOXDtcFvJQveYOPNpDiF9tucUZsWRTsDdnFC5mby7EJyWc", // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});
