export const dropStyle = {
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
    // backgroundColor: "gray",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "white",
    // backgroundColor: "gray",
  }),
};


export const FilterDropStyle = {
  container: (base) => ({
    ...base,
    width: "230px",
  }),
  control: (base) => ({
    ...base,
    borderColor: "#ced4da",
    // minHeight: "36px",
    // overflowY: "hidden",
  }),

  valueContainer: (base) => ({
    ...base,
    maxHeight: "62px",
    overflowY: "auto",
    overflowX: "auto",
    display: "flex",
    flexWrap: "wrap",
  }),
};
