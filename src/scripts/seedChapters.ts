import connectToMongoDB from "../libs/db/connectToMongoDB";
import Content from "../models/Content";
import Chapter from "../models/Chapter";

import chapters from "../data/chapters";

const seedChapters = async (id: string) => {
  try {
    console.log("Seeding chapters...");
    await connectToMongoDB();

    const transformedChapters = chapters.map((chapter) => ({
      contentId: id,
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
    transformedChapters.reverse();

    const newChapter = [
      {
        contentId: id,
        title: "One Punch",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F0.png?alt=media&token=f75fa973-5e4e-4936-910d-d1d77fa6dbe6",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F1.png?alt=media&token=114b8738-3b05-4e74-b7ed-ffa7f39f456d",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F10.png?alt=media&token=5ac7a0dc-9a94-43b7-be54-f8c7199fd040",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F11.png?alt=media&token=83186b96-1842-4b23-b975-227b9f738469",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F12.png?alt=media&token=f18163eb-bd02-4e3f-bc10-07851005ae3a",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F13.png?alt=media&token=989d28dd-afc7-43b7-b6ca-16a339bfc344",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F14.png?alt=media&token=43c0a7d0-5a84-4e19-b96d-7c502493360c",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F15.png?alt=media&token=27d1923c-7081-4023-8f32-ff1129515e20",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F16.png?alt=media&token=d28c9209-00e3-4b46-aec3-b0e8b3e731e0",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F17.png?alt=media&token=f9097dc7-fcbb-43c0-b053-25f637ae2bcc",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F18.png?alt=media&token=869cde78-6a7f-48f7-897b-5bf87bbad4bf",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F19.png?alt=media&token=2e52f662-147e-4654-9ecf-50c4d34a517b",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F2.png?alt=media&token=4fc05bc7-178b-4945-bd5c-d0a6f386d8b3",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F20.png?alt=media&token=06ec394e-cd9f-4a43-a82a-2017649d4a8a",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F21.png?alt=media&token=2e8993a9-40bf-4504-8e9a-12bd44602422",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F3.png?alt=media&token=fc8bdd2e-bdb2-4b80-ba5d-32a8095337e3",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F4.png?alt=media&token=a2ade94b-79ed-43c0-bc8e-7999a5ae866b",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F5.png?alt=media&token=507cf505-470a-4452-9edd-93c76f680ee5",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F6.png?alt=media&token=3b1513a7-ba7e-499f-8091-5713b123d72d",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F7.png?alt=media&token=2b2df719-10ad-42cd-8536-c83b10567936",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F8.png?alt=media&token=dc3fdbf5-5939-4417-b4dc-d4c2db8cdb7c",
          "https://firebasestorage.googleapis.com/v0/b/m-reader-web-app.appspot.com/o/Content%2FMushoku%20Tensei%3A%20Jobless%20Reincarnation%2Fchapters%2FChapter%201%2F9.png?alt=media&token=b87426c6-5419-4367-b7eb-51688fae17fb",
        ],
      },
    ];

    const insertedChapters = await Chapter.insertMany(transformedChapters);
    const ids = insertedChapters.map((chapter) => chapter._id);
    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { $push: { chapters: { $each: ids } } },
      { new: true, upsert: true },
    );
    updatedContent.chaptersCount = updatedContent.chapters.length;
    updatedContent.chaptersUpdatedOn = new Date();
    await updatedContent.save();

    console.log("Chapters seeded and Content updated successfully!");
  } catch (error: any) {
    console.log(error.message);
  }
};

seedChapters("66c054b1cdaa11fc741f8fd6");
