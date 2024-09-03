export const partialUser =
  "-likedChapters -subscriptions -votedComments -password -emailVerified";

export const partialUserWithVotedComments =
  "-likedChapters -subscriptions -password -emailVerified";

export const partialContentForUpdate =
  "tags thumbnail poster title status genres author synonyms description imagesAndWallpapers";
export const partialContentForContentPage =
  "thumbnail poster title status genres rating author synonyms chapters chaptersCount chaptersUpdatedOn description imagesAndWallpapers news";

export const partialGenre = "name";
export const partialGenreWithDescription = "name description";

export const partialContentForGenrePageList =
  "poster title genres noOfViews noOfSubscribers chaptersCount";

export const partialContentForContentList = "poster title";
export const partialContentForBanner = "thumbnail title";
export const partialContentForGenres = "poster title noOfSubscribers";
export const partialContentForHottestList =
  "poster title noOfSubscribers genres noOfViews description";

export const partialChapters = "title createdAt";
export const partialChaptersWithDescription = "title description";
export const partialChaptersWithImages = "title images";
