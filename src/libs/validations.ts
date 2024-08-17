function isBase64Image(data: string): boolean {
  const base64Regex = /^data:image\/[^;]+;base64,/;
  return base64Regex.test(data);
}

function isValidHttpURL(urlString: string): boolean {
  try {
    const url = new URL(urlString);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

function getValidContentPayload(formData: FormData) {
  const thumbnail = formData.get("thumbnail");
  const poster = formData.get("poster");

  if (!thumbnail || !poster)
    return {
      error: true,
      errorMessage: "Pick a valid Thumbnail and Poster of size upto 4.6MB.",
    };

  const tags = formData.getAll("tags") as string[];

  const title = (formData.get("title") as string).trim();
  if (!title)
    return {
      error: true,
      errorMessage: "Title can't be empty.",
    };

  const status = formData.get("status") as string;
  const genres = formData.getAll("genres") as string[];
  if (!genres.length)
    return {
      error: true,
      errorMessage: "Genres can't be empty.",
    };

  const author = (formData.get("author") as string).trim();
  if (!author)
    return {
      error: true,
      errorMessage: "Author can't be empty.",
    };

  const synonyms = (formData.get("synonyms") as string).trim();
  const synonymsArray = synonyms.split(",");

  const description = (formData.get("description") as string).trim();
  if (!description)
    return {
      error: true,
      errorMessage: "Description can't be empty.",
    };

  const imagesAndWallpapers = formData.getAll("imagesAndWallpapers");

  return {
    tags,
    thumbnail,
    poster,
    title,
    status,
    genres,
    author,
    synonyms: synonymsArray,
    description,
    imagesAndWallpapers,
  };
}

export { isBase64Image, isValidHttpURL, getValidContentPayload };
