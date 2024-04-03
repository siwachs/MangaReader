import { useState } from "react";
import { useRouter } from "next/router";

import Axios from "@/lib/axiosConfig";
import { capitalizeText } from "@/lib/utils";
import { contentPageError, uploadChapterPageProps } from "@/CONSTANT_DATA";

import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import ListWrapper from "@/components/Wrappers/ListWrapper";
import Wrapper from "@/components/AdminComponents/UploadContentSubComponents/Wrapper";
import ImagePicker from "@/components/AdminComponents/EditChaptersComponent/ImagePicker";
import DisplayChapter from "@/components/AdminComponents/EditChaptersComponent/DisplayChapter";
import LoaderWithLabel from "@/lib/Frontend-utils/LoaderWithLabel";
import ErrorComponent from "@/components/ErrorComponent";

// Image Server...
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import storage from "@/lib/firebase";

const UploadChapter = ({
  content_id,
  contentTitle,
  chaptersCount,
  error,
  statusCode,
  message,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(0);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterTitleError, setChapterTitleError] = useState(false);
  const [radioValue, setRadioValue] = useState("default");
  const [indexValue, setIndexValue] = useState("");

  const [chapterImages, setChapterImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const router = useRouter();

  const handleChapterTitle = (event) => {
    const value = event.target.value;

    if (value.trim() === "") {
      setChapterTitleError(true);
    } else {
      setChapterTitleError(false);
    }

    setChapterTitle(value);
  };

  const reset = () => {
    if (loading) return;
    setChapterImages([]);
    setImageUrls([]);
    setChapterTitle("");
    setChapterTitleError(false);
  };

  const getImageUrls = async (imageUrls) => {
    const imageLinksArray = await Promise.all(
      imageUrls.map(async (image, index) => {
        const imageRef = ref(
          storage,
          `Content/${capitalizeText(contentTitle)}/chapters/${capitalizeText(
            chapterTitle
          )}/${index}`
        );

        try {
          await uploadString(imageRef, image, "data_url");
          const imageUrl = await getDownloadURL(imageRef);
          return imageUrl;
        } catch (error) {
        } finally {
          setUploadedImages((prev) => prev + 1);
        }
      })
    );

    return imageLinksArray;
  };

  const uploadChapterHandler = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    const imageLinksArray = await getImageUrls(imageUrls);

    try {
      await Axios.post(
        `/api/chapter?content_id=${content_id}&position=${radioValue}&index=${
          radioValue === "afterIndex" ? indexValue : undefined
        }`,
        {
          chapterTitle: chapterTitle,
          chapterImages: imageLinksArray,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      reset();
      setUploadedImages(0);
      router.replace(router.asPath);
    }
  };

  const handleIndexChange = (event) => {
    const index = event.target.value;
    const isNumber = /^\d+$/.test(index);
    if (isNumber || index === "") {
      setIndexValue(index === "" ? "" : parseInt(index));
    }
  };

  const validateIndex = () => {
    return (
      indexValue === "" || !(indexValue > 0 && indexValue <= chaptersCount)
    );
  };

  return error ? (
    <ErrorComponent message={message} statusCode={statusCode} />
  ) : (
    <main className="min-h-screen bg-[var(--bg-profile)]">
      <ListWrapper removeBottomMargin changeMaxwidth="max-w-[800px]">
        <Wrapper>
          <ImagePicker
            chapterImages={chapterImages}
            setChapterImages={setChapterImages}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            loading={loading}
          />
        </Wrapper>

        <DisplayChapter
          setChapterImages={setChapterImages}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          loading={loading}
        />

        <form onSubmit={uploadChapterHandler} className="my-5 space-y-4">
          <Wrapper textInput>
            <TextField
              onBlur={() =>
                chapterTitle.trim() === ""
                  ? setChapterTitleError(true)
                  : setChapterTitleError(false)
              }
              fullWidth
              variant="outlined"
              size="small"
              className="max-w-[500px]"
              value={chapterTitle}
              onChange={handleChapterTitle}
              label="Chapter Title"
              helperText={
                chapterTitleError ? "Chapter title can't be empty." : undefined
              }
              error={chapterTitleError}
            />
          </Wrapper>

          <Wrapper>
            <FormControl>
              <FormLabel>Select Chapter Index</FormLabel>
              <RadioGroup
                value={radioValue}
                onChange={(event) => setRadioValue(event.target.value)}
              >
                <FormControlLabel
                  value="default"
                  control={<Radio size="small" />}
                  label="Default (At end)"
                />
                <FormControlLabel
                  value="beginning"
                  control={<Radio size="small" />}
                  label="At Beginning"
                />
                <FormControlLabel
                  value="afterIndex"
                  disabled={chaptersCount === 0}
                  control={<Radio size="small" />}
                  label={
                    chaptersCount === 0
                      ? `Save Chapter After Index (0-0)`
                      : `Save Chapter After Index (1-${chaptersCount})`
                  }
                />
              </RadioGroup>
              {radioValue === "afterIndex" && (
                <TextField
                  label="Enter Index"
                  size="small"
                  value={indexValue}
                  onChange={handleIndexChange}
                  inputProps={{
                    type: "number",
                    min: 1,
                    max: chaptersCount,
                  }}
                />
              )}
            </FormControl>
          </Wrapper>

          {loading ? (
            <Wrapper loader>
              <LoaderWithLabel
                size={60}
                total={imageUrls.length}
                completed={uploadedImages}
              />
            </Wrapper>
          ) : (
            <>
              <Button
                fullWidth
                variant="contained"
                className="mx-auto block max-w-[500px] bg-blue-500"
                onClick={uploadChapterHandler}
                type="submit"
                disabled={radioValue === "afterIndex" && validateIndex()}
              >
                Upload Chapter
              </Button>
            </>
          )}

          {/* loading ||
                  chapterImages.length === 0 ||
                  chapterTitleError ||
                  chapterTitle === "" */}

          <Button
            fullWidth
            onClick={reset}
            type="reset"
            variant="contained"
            className="mx-auto block max-w-[500px] bg-blue-500"
            disabled={loading}
          >
            Reset
          </Button>
        </form>
      </ListWrapper>
    </main>
  );
};

export async function getServerSideProps(context) {
  const content_id = context.query.content_id || null;

  if (!content_id) {
    return {
      props: {
        ...contentPageError,
        ...uploadChapterPageProps,
      },
    };
  }

  const fetchedData = {};

  try {
    const content = await Axios.get(`/api/content`, {
      params: {
        content_id,
        selectedFields: "title,chaptersCount",
      },
    });
    fetchedData.contentTitle = content.data.title;
    fetchedData.chaptersCount = content.data.chaptersCount;

    return {
      props: {
        ...uploadChapterPageProps,
        ...fetchedData,
        content_id,
      },
    };
  } catch (error) {
    const statusCode = catchedError.response?.status;
    const message = catchedError.response?.data?.error || null;

    return {
      props: {
        ...uploadChapterPageProps,
        error: true,
        statusCode,
        message,
      },
    };
  }
}

export default UploadChapter;
