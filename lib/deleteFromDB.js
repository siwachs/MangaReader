import Content from "@/models/Content";
import Chapter from "@/models/Chapter";
import Comment from "@/models/Comment";

export const deleteFromDB = async (type, content_id, chapter_id) => {
  switch (type) {
    case "single":
      try {
        const chapter = await Chapter.findById(chapter_id);
        if (!chapter)
          throw new Error({
            message: "No chapter found.",
          });

        await Comment.deleteMany({
          _id: { $in: chapter.comments },
        });

        await Chapter.findByIdAndDelete(chapter_id);
        await Content.findByIdAndUpdate(content_id, {
          $pull: { chapters: chapter_id },
        });
      } catch (error) {
        throw error;
      }
      break;
    case "all":
      const content = await Content.findById(content_id);
      if (!content)
        throw new Error({
          message: "No content found.",
        });

      const chapterIds = content.chapters;

      for (const chapterId of chapterIds) {
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
          throw new Error({
            message: "No chapter found.",
          });
        }

        await Comment.deleteMany({ _id: { $in: chapter.comments } });
        await Chapter.findByIdAndDelete(chapterId);
        await Content.findByIdAndUpdate(content_id, {
          $pull: { chapters: chapterId },
        });
      }
      break;
  }
};
