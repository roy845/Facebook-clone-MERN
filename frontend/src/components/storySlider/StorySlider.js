import VideosCarousel from "../Carousel/Carousel";
import ImagesCarousel from "../ImagesCarousel/ImagesCarousel";
import SongsCarousel from "../SongsCarousel/SongsCarousel";
import StoryTabs from "../StoryTabs/StoryTabs";

const StorySlider = ({ story, setOpen }) => {
  const images = story.files.filter((file) => file.type === "image");
  const songs = story.files.filter((file) => file.type === "song");
  const videos = story.files.filter((file) => file.type === "movie");

  return (
    <StoryTabs
      imagesLength={images.length}
      songsLength={songs.length}
      videosLength={videos.length}
      imagesCarousel={
        <ImagesCarousel
          images={images}
          storyId={story._id}
          storyAuthor={story.author}
        />
      }
      songsCarousel={
        <SongsCarousel
          songs={songs}
          storyId={story._id}
          storyAuthor={story.author}
        />
      }
      videosCarousel={
        <VideosCarousel
          videos={videos}
          storyId={story._id}
          storyAuthor={story.author}
        />
      }
    />
  );
};

export default StorySlider;
