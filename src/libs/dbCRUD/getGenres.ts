import connectToMongoDB from "../db/connectToMongoDB";
import Genre from "@/models/Genre";

import { partialGenre } from "../mongooseSelect";
import formatMongooseDoc from "../db/formatMongooseDoc";

export default async function getGenres(nameInLowercase = true) {
  try {
    await connectToMongoDB();
    const genresDoc = await Genre.find({})
      .sort({ updatedAt: -1 })
      .select(partialGenre);
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
