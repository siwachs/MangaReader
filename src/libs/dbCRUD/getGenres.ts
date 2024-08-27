import connectToMongoDB from "../db/connectToMongoDB";
import Genre from "@/models/Genre";

import { Genre as GenreType, GenresResponse } from "@/types";
import { partialGenre, partialGenreWithDescription } from "../mongooseSelect";
import formatMongooseDoc from "../db/formatMongooseDoc";

export default async function getGenres({
  nameInLowercase = false,
  withDescription = false,
} = {}): Promise<GenresResponse> {
  try {
    await connectToMongoDB();
    const genresDoc = await Genre.find({})
      .sort({ updatedAt: -1 })
      .select(withDescription ? partialGenreWithDescription : partialGenre);

    const formatedGenresDoc =
      genresDoc?.map((genre) => {
        const formatedGenre = formatMongooseDoc(genre.toObject());
        if (nameInLowercase)
          formatedGenre.name = (formatedGenre.name! as string).toLowerCase();
        return formatedGenre;
      }) ?? [];

    return {
      error: false,
      genres: formatedGenresDoc as GenreType[],
    };
  } catch (error: any) {
    return {
      error: true,
      errorMessage: error.message,
    };
  }
}

export async function getDescriptionByName(name: string): Promise<string> {
  try {
    await connectToMongoDB();

    const genreDescriptionDoc = await Genre.findOne({
      name: new RegExp(`^${name}`, "i"),
    }).select("description");

    return genreDescriptionDoc?.description ?? "Description not available.";
  } catch (error: any) {
    return "Error retrieving genre description.";
  }
}
