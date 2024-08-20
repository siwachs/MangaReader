import connectToMongoDB from "../db/connectToMongoDB";
import Genre from "@/models/Genre";

import formatMongooseDoc from "../db/formatMongooseDoc";

export default async function getGenres() {
  try {
    await connectToMongoDB();
    const genresDoc = await Genre.find({}).sort({ updatedAt: -1 });
    const formatedGenresDoc =
      genresDoc?.map((genre) => formatMongooseDoc(genre.toObject())) ?? [];

    return {
      error: false,
      genres: JSON.parse(JSON.stringify(formatedGenresDoc)),
    };
  } catch (error: any) {
    return {
      error: true,
      errorMessage: error.message,
    };
  }
}
