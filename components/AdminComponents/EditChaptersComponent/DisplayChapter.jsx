import { Close } from "@mui/icons-material";

const DisplayChapter = ({
  setChapterImages,
  imageUrls,
  setImageUrls,
  loading,
}) => {
  const removeImage = (index) => {
    if (loading) return;
    setChapterImages((prevState) => prevState.filter((_, i) => index !== i));

    setImageUrls((prevState) => prevState.filter((_, i) => index !== i));
  };

  return (
    <div
      className={`my-5 grid place-items-center ${
        imageUrls.length == 0 ? "hidden" : ""
      }`}
    >
      {imageUrls.map((image, index) => (
        <div key={index} className="relative">
          <Close
            className="absolute right-1 top-1 cursor-pointer text-white"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
            }}
            onClick={() => removeImage(index)}
          />
          <img
            src={image}
            alt={index}
            loading="eager"
            className="h-auto max-w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayChapter;
