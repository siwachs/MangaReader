import connectToMongoDB from "../db/connectToMongoDB";
import Genre from "@/models/Genre";

import { GenresResponse } from "@/types";
import { partialGenre, partialGenreWithDescription } from "../mongooseSelect";
import formatMongooseDoc from "../db/formatMongooseDoc";

export default async function getGenres({
  nameInLowercase = false,
  withDescription = false,
  forClientComponent = false,
} = {}): Promise<GenresResponse> {
  try {
    await connectToMongoDB();
    const genresDoc = await Genre.find({})
      .sort({ updatedAt: -1 })
      .select(withDescription ? partialGenreWithDescription : partialGenre);

    const formattedGenresDoc =
      genresDoc?.map((genre) => {
        const formattedGenre = formatMongooseDoc(genre.toObject());

        if (nameInLowercase) {
          formattedGenre.name = (formattedGenre.name! as string).toLowerCase();
        }

        return formattedGenre;
      }) ?? [];

    return {
      error: false,
      genres: forClientComponent
        ? JSON.parse(JSON.stringify(formattedGenresDoc))
        : formattedGenresDoc,
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
