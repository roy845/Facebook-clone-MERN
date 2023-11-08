import Grid from "@mui/material/Grid";

const DynamicGrid = ({ post }) => {
  return (
    <Grid container justifyContent="center" spacing={2}>
      {post.files?.map((file, index) => (
        <Grid key={file.id} item>
          <div key={index}>
            {file.type === "song" && (
              <div className="postSongContainer">
                <audio className="postSong" controls>
                  <source src={file.url} type="audio/mpeg" />
                </audio>
              </div>
            )}
            {file.type === "movie" && (
              <div className="postMovieContainer">
                <video className="postMovie" controls width="300">
                  <source src={file.url} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default DynamicGrid;
