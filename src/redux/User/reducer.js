const initialState = {
  username: null,
  password: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_FILE.REQUEST":
      return {
        ...state,
        username: action.payload.user,
        password: action.payload.pass
      };
    case "LOAD_FILE.REQUEST":
      return {
        ...state,
        username: action.payload.user,
        password: action.payload.pass
      };
    default:
      return state;
  }
};
