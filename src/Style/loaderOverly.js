export const formContentContainer = {
  position: "relative",
};

export const loaderOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10, // Ensure loader is on top
};
