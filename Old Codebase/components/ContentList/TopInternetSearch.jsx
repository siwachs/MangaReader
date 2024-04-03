import ListWrapper from "../Wrappers/ListWrapper";
import ContentWrapper from "../Wrappers/ContentWrapper";
import ContentHeader from "./Utils/ContentHeader";
import DisplayContent from "./Utils/DisplayContent";

const TopInternetSearch = ({ headingTitle, path, topInternetSearch }) => {
  return (
    <ListWrapper>
      <ContentHeader headingTitle={headingTitle} path={path} />

      <ContentWrapper>
        {topInternetSearch.map((item) => (
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

export default TopInternetSearch;
