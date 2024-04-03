import ContentHeader from "./Utils/ContentHeader";
import ContentWrapper from "../Wrappers/ContentWrapper";
import DisplayContent from "./Utils/DisplayContent";
import MoveToTop from "../../lib/Frontend-utils/MoveToTop";
import ListWrapper from "../Wrappers/ListWrapper";

const Completed = ({ headingTitle, path, completed }) => {
  return (
    <ListWrapper addMargin="mb-5" setPosition="relative">
      <ContentHeader headingTitle={headingTitle} path={path} />

      <ContentWrapper>
        {completed.map((item) => (
          <DisplayContent
            key={item._id}
            contentId={item._id}
            image={item.displayImagePoster.image}
            type={item.displayImagePoster.type}
            title={item.title}
          />
        ))}
      </ContentWrapper>

      <MoveToTop className="-right-[70px] bottom-[50px]" />
    </ListWrapper>
  );
};

export default Completed;
