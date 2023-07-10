import ListWrapper from "../Wrappers/ListWrapper";
import ContentWrapper from "../Wrappers/ContentWrapper";
import ContentHeader from "./Utils/ContentHeader";
import TrendingMangaRow from "./Utils/TrendingMangaRow";
import DisplayContent from "./Utils/DisplayContent";

const TrendingContent = ({ headingTitle, path, trending }) => {
  return (
    <ListWrapper>
      <ContentHeader headingTitle={headingTitle} path={path} trendringRows />
      <div className="my-2.5 overflow-hidden lg:my-5 lg:flex">
        {trending.slice(0, 2).map((item) => (
          <TrendingMangaRow
            key={item._id}
            content_id={item._id}
            genreArray={item.populatedTags.map((genre) => genre.tagName)}
            image={item.displayImagePoster.image}
            type={item.displayImagePoster.type}
            title={item.title}
            desc={item.description}
            views={item.noOfViews}
            likes={item.noOfLikes}
          />
        ))}
      </div>

      <ContentWrapper>
        {trending.slice(2).map((item) => (
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

export default TrendingContent;
