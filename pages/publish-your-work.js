import ErrorComponent from "@/components/ErrorComponent";

const PublishYourWork = () => {
  return (
    <ErrorComponent
      statusCode={404}
      message="This Page is currently not available."
    />
  );
};

export default PublishYourWork;
