const Configuration = {
  BACKEND_URL:
    process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/api/",
  SCHPINCER_URL: process.env.REACT_APP_SCHPINCER_URL || "",
};

export default Configuration;
