import ErrorComponent from "@/components/ErrorComponent";

const AudioBooks = () => {
  return (
    <ErrorComponent
      statusCode={404}
      message="This Page is currently not available."
    />
  );
};

export default AudioBooks;
