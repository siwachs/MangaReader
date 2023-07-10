import ListWrapper from "../Wrappers/ListWrapper";
import ContentWrapper from "../Wrappers/ContentWrapper";
import ContentHeader from "./Utils/ContentHeader";
import DisplayContent from "./Utils/DisplayContent";

const NewContent = ({ headingTitle, path, recentlyAdded }) => {
  return (
    <ListWrapper>
      <ContentHeader headingTitle={headingTitle} path={path} />

      <ContentWrapper>
        {recentlyAdded.map((item) => (
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

const NewImages = [
  {
    img: "/New/0.webp",
    type: "poster",
  },
  {
    img: "/New/1.webp",
    type: "poster",
  },
  // {
  //   img: "/Images/35.jpg",
  //   type: "backdrop",
  // },
  // {
  //   img: "/Images/23.jpg",
  //   type: "backdrop",
  // },
  {
    img: "/New/2.webp",
    type: "poster",
  },
  {
    img: "/Images/9.jpg",
    type: "poster",
  },
  {
    img: "/New/3.webp",
    type: "poster",
  },
  {
    img: "/New/4.webp",
    type: "poster",
  },
  {
    img: "/New/5.webp",
    type: "poster",
  },
  {
    img: "/New/6.webp",
    type: "poster",
  },
  {
    img: "/New/7.webp",
    type: "poster",
  },
  {
    img: "/New/8.webp",
    type: "poster",
  },
  {
    img: "/New/9.webp",
    type: "poster",
  },
  {
    img: "/New/10.webp",
    type: "poster",
  },
  // {
  //   img: "/New/11.webp",
  //   type: "poster",
  // },
  // {
  //   img: "/Mass/5.webp",
  //   type: "backdrop",
  // },
  // {
  //   img: "/Mass/6.webp",
  //   type: "backdrop",
  // },
  // {
  //   img: "/Images/10.jpg",
  //   type: "poster",
  // },
  // {
  //   img: "/Images/11.jpg",
  //   type: "poster",
  // },
  // {
  //   img: "/Mass/7.webp",
  //   type: "backdrop",
  // },
];

export default NewContent;
