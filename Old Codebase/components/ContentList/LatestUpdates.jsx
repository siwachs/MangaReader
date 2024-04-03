import ListWrapper from "../Wrappers/ListWrapper";
import ContentWrapper from "../Wrappers/ContentWrapper";
import ContentHeader from "./Utils/ContentHeader";
import DisplayContent from "./Utils/DisplayContent";

const LatestUpdates = ({ headingTitle, path, latestUpdates }) => {
  return (
    <ListWrapper>
      <ContentHeader headingTitle={headingTitle} path={path} />

      <ContentWrapper>
        {latestUpdates.map((item) => (
          <DisplayContent
            key={item._id}
            contentId={item._id}
            image={item.displayImagePoster.image}
            type={item.displayImagePoster.type}
            title={item.title}
          />
        ))}
      </ContentWrapper>
    </ListWrapper>
  );
};

const UpdatedToday = [
  {
    img: "/UpdatedToday/0.webp",
    type: "poster",
  },
  {
    img: "/UpdatedToday/1.webp",
    type: "poster",
  },
  {
    img: "/UpdatedToday/2.webp",
    type: "poster",
  },
  {
    img: "/UpdatedToday/3.webp",
    type: "poster",
  },
  {
    img: "/UpdatedToday/4.webp",
    type: "poster",
  },
  {
    img: "/UpdatedToday/5.webp",
    type: "poster",
  },
  // {
  //   img: "/Images/0.webp",
  //   type: "backdrop",
  // },
  // {
  //   img: "/Images/1.webp",
  //   type: "backdrop",
  // },
  // {
  //   img: "/Images/2.webp",
  //   type: "backdrop",
  // },
  // {
  //   img: "/Images/3.webp",
  //   type: "backdrop",
  // },
  // {
  //   img: "/Images/4.webp",
  //   type: "backdrop",
  // },
];

export default LatestUpdates;
