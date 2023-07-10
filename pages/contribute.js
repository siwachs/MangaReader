import ErrorComponent from "@/components/ErrorComponent";

const Contribute = () => {
  return (
    <ErrorComponent
      statusCode={404}
      message="This Page is currently not available."
    />
  );
};

export default Contribute;
