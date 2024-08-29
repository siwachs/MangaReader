import connectToMongoDB from "../libs/db/connectToMongoDB";
import Content from "../models/Content";
import Chapter from "../models/Chapter";

import chapters from "../data/chapters";

const seedChapters = async (id: string) => {
  try {
    console.log("Seeding chapters...");
    await connectToMongoDB();

    const transformedChapters = chapters.map((chapter) => ({
      title: chapter.title,
      images: [
        "/chapter/1.jpg",
        "/chapter/3.jpg",
        "/chapter/4.jpg",
        "/chapter/5.jpg",
        "/chapter/6.jpg",
        "/chapter/7.jpg",
        "/chapter/8.jpg",
        "/chapter/9.jpg",
        "/chapter/10.jpg",
        "/chapter/11.jpg",
        "/chapter/12.webp",
      ],
    }));

    const insertedChapters = await Chapter.insertMany(transformedChapters);
    const ids = insertedChapters.map((chapter) => chapter._id);
    await Content.findByIdAndUpdate(id, { chapters: ids });

    console.log("Chapters seeded and Content updated successfully!");
  } catch (error: any) {
    console.log(error.message);
  }
};

seedChapters("66c054b1cdaa11fc741f8fd6");
