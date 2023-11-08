import React from "react";
import { Audio, Hourglass } from "react-loader-spinner";

const Spinner = ({ text, hourGlass }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!hourGlass ? (
        <Audio
          height={80}
          width={80}
          radius={9}
          color="blue"
          ariaLabel="loading"
        />
      ) : (
        <Hourglass
          visible={true}
          height="50vh"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      )}

      <p>Loading {text} Please Wait...</p>
    </div>
  );
};

export default Spinner;
