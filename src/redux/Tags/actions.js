const randomColor = () => {
  const colors = [
    "rgb(244, 67, 54)",
    "rgb(233, 30, 99)",
    "rgb(156, 39, 176)",
    "rgb(103, 58, 183)",
    "rgb(63, 81, 181)",
    "rgb(33, 150, 243)",
    "rgb(3, 169, 244)",
    "rgb(0, 188, 212)",
    "rgb(0, 150, 136)",
    "rgb(76, 175, 80)",
    "rgb(139, 195, 74)",
    "rgb(205, 220, 57)",
    "rgb(255, 235, 59)",
    "rgb(255, 193, 7)",
    "rgb(255, 152, 0)",
    "rgb(255, 87, 34)",
    "rgb(121, 85, 72)",
    "rgb(158, 158, 158)",
    "rgb(96, 125, 139)"
  ];
  return colors[Math.round(Math.random() * colors.length - 1)];
};

export const addTag = (name, nid, color) => ({
  type: "ADD_TAG",
  payload: {
    name,
    nid: nid || name.toLowerCase().replace(/[^A-z0-9]+/g, "-"),
    relationships: {},
    color: color || `hsl(${Math.floor(Math.random() * 360)}, 75%, 60%)`
  }
});

export const updateRelationships = tags => ({
  type: "UPDATE_RELATIONSHIPS",
  payload: { tags }
});
