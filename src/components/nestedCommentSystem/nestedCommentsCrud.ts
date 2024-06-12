type MessageBody = {
  contentId: string;
  chapterId: string;
  userId: string;
  parentId: string;
  message: string;
};

const makeComment = async (apiEndpoint: string, body: MessageBody) => {
  try {
    const commentResponse = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
  } finally {
  }
};
