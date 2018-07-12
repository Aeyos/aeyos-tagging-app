import { MaterialColorsArr } from "../../utils/Colors";

const randomColor = () => {
  return MaterialColorsArr[
    Math.round(Math.random() * MaterialColorsArr.length - 1)
  ];
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

export const updateTags = tags => ({
  type: "UPDATE_TAGS",
  payload: { tags }
});
