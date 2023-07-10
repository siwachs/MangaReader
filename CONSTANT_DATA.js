export const UserProfileProps = {
  title: "User Profile",
  applyShadow: true,
  hideMobileLinks: true,
  hideFooter: true,
};

export const UserProfileError = {
  error: true,
  statusCode: 404,
  message: "Invalid User.",
};

export const contentPageError = {
  ...UserProfileError,
  message: "Invalid Content Id.",
};

export const AdminPageProps = {
  ...UserProfileProps,
  title: "Admin",
};

export const AdminPageUpload = {
  ...AdminPageProps,
  title: "Admin | Upload Content",
};

export const uploadChapterPageProps = {
  ...AdminPageProps,
  title: "Upload Chapter",
};

export const titlePageProps = {
  applyShadow: true,
  hideMobileLinks: true,
  contentPage: true,
};

export const chapterPageProps = {
  useContentNavbar: true,
  hideMobileLinks: true,
  hideFooter: true,
};

export const initialInputsForUploadContent = {
  contentType: [],
  displayImageThumbnail: { image: null, type: "thumbnail" },
  displayImagePoster: { image: null, type: "poster" },
  title: "",
  titleError: false,
  status: "ongoing",
  authorName: "",
  authorNameError: false,
  description: "",
  descriptionError: false,
  selectedGenres: [],
  tags: [],
};

export const additionalGenres = [
  {
    tagId: "all",
    tagName: "All",
  },
  {
    tagId: "recently-updated",
    tagName: "recently updated",
  },
  {
    tagId: "recently-added",
    tagName: "recently added",
  },
  {
    tagId: "trending",
    tagName: "trending",
  },
  { tagId: "ongoing", tagName: "ongoing" },
  {
    tagId: "completed",
    tagName: "completed",
  },
  { tagId: "unscheduled", tagName: "unscheduled" },
  {
    tagId: "discontinued",
    tagName: "discontinued",
  },
];
