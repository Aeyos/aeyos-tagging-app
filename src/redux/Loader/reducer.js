const initialState = {
  isLoading: false,
  loadedData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_FILE.REQUEST":
      return {
        ...state,
        isLoading: true,
        loadedData: null
      };
    case "CREATE_FILE.SUCCESS":
      return {
        ...state,
        isLoading: false,
        loadedData: action.payload.data
      };
    case "CREATE_FILE.FAIL":
      return {
        ...state,
        isLoading: false,
        loadedData: null
      };
    case "LOAD_FILE.REQUEST":
      return {
        ...state,
        isLoading: true,
        loadedData: null
      };
    case "LOAD_FILE.SUCCESS":
      return {
        ...state,
        isLoading: false,
        loadedData: action.payload.json
      };
    case "LOAD_FILE.FAIL":
      return {
        ...state,
        isLoading: false,
        loadedData: null
      };
    default:
      return state;
  }
};
