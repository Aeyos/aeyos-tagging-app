import LocalStorage from "../../utils/LocalStorage";

const initialState = LocalStorage.load("tags") || {
  modifiedTime: new Date().getTime(),
  tagList: []
};

export default (state = initialState, action) => {
  const { tagList } = state;
  switch (action.type) {
    case "ADD_TAG":
      if (!tagList.find(e => e.nid === action.payload.nid)) {
        const newState = {
          modifiedTime: new Date().getTime(),
          tagList: [...tagList, action.payload]
        };
        LocalStorage.save("tags", newState);
        return newState;
      }
      return state;
    case "UPDATE_TAGS":
      const newList = tagList.map(tag => {
        const newTag = action.payload.tags.find(t => t.nid === tag.nid);
        if (newTag) {
          return newTag;
        }
        return tag;
      });

      const newState = {
        modifiedTime: new Date().getTime(),
        tagList: newList
      };
      LocalStorage.save("tags", newState);
      return newState;
    default:
      return state;
  }
};
