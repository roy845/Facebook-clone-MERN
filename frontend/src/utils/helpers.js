export const getFileTypeFromExtension = (fileExtension) => {
  switch (fileExtension.toLowerCase()) {
    case "png":
    case "jpeg":
    case "jpg":
      return "image";
    case "mkv":
    case "mp4":
    case "avi":
    case "mov":
    case "webm":
    case "flv":
    case "wmv":
    case "3gp":
      return "movie";
    case "pdf":
      return "pdf";
    case "doc":
    case "docx":
      return "word";
    case "xls":
    case "xlsx":
      return "excel";
    case "ppt":
    case "pptx":
      return "powerpoint";
    case "txt":
      return "text";
    case "zip":
    case "rar":
      return "archive";
    default:
      return "song";
  }
};

export const filterNamesWithAtSymbol = (sentence) => {
  const regex = /@(\w+)/g;
  const matches = sentence.match(regex);

  if (matches) {
    const filteredNames = matches.map((match) => match.slice(1)); // Remove "@" symbol
    return filteredNames;
  } else {
    return [];
  }
};

export const formatPrice = (price, currency) => {
  const currencySymbols = {
    USD: "$",
    Shekel: "₪",
    Euro: "€",
    // Add more currencies and symbols as needed
  };

  if (currencySymbols[currency]) {
    const symbol = currencySymbols[currency];
    return `${symbol}${price}`;
  }

  // If the currency is not recognized, return the price as is
  return price;
};

export const checkIfEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

const BASE_URL = "http://localhost:8800/api/";

export const downloadMedia = async (e, filename, setLoading) => {
  e.preventDefault();
  setLoading(true);

  const downloadUrl = `${BASE_URL}files/${filename}`;

  fetch(downloadUrl)
    .then((response) => {
      if (response.status === 200) {
        // Successful download, so set loading to false
        setLoading(false);
      } else {
        // Handle any errors, e.g., file not found
        setLoading(false);
        console.error("Error downloading the file.");
      }
    })
    .catch((error) => {
      // Handle network errors
      setLoading(false);
      console.error("Network error:", error);
    });
};

export const formatBytes = (bytes) => {
  if (bytes < 1024) {
    return bytes + " Bytes";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
};
