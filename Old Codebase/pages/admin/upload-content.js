import { AdminPageUpload } from "@/CONSTANT_DATA";

import Axios from "@/lib/axiosConfig";

import ListWrapper from "@/components/Wrappers/ListWrapper";
import ContentForm from "@/components/AdminComponents/ContentForm";
import ErrorComponent from "@/components/ErrorComponent";

const UploadContent = ({ content, error, statusCode, message }) => {
  return error ? (
    <ErrorComponent statusCode={statusCode} message={message} />
  ) : (
    <main className="min-h-screen bg-[var(--bg-profile)] dark:bg-gray-900 dark:text-gray-900">
      <ListWrapper changeMaxwidth="max-w-[800px]" removeBottomMargin>
        <p className="text-lg text-gray-700 dark:text-white">
          Do not refresh or close this page before completion of progress bar.
        </p>

        <ContentForm content={content} />
      </ListWrapper>
    </main>
  );
};

export async function getServerSideProps(context) {
  const content_id = context.query.content_id || null;

  if (!content_id) {
    return {
      props: {
        ...AdminPageUpload,
      },
    };
  }

  const fetchedData = {
    content: {},
  };

  try {
    const content = await Axios.get(`/api/content`, {
      params: {
        content_id,
        selectedFields:
          "contentType,title,displayImageThumbnail,displayImagePoster,status,authorName,description,populatedTags",
      },
    });
    fetchedData.content = content.data;

    return {
      props: {
        ...AdminPageUpload,
        ...fetchedData,
        title: "Admin | Edit Content",
      },
    };
  } catch (catchedError) {
    const statusCode = catchedError.response?.status;
    const message = catchedError.response?.data?.error || null;

    return {
      props: {
        ...AdminPageUpload,
        title: "Admin | Edit Content Error",
        error: true,
        statusCode,
        message,
      },
    };
  }
}

export default UploadContent;
