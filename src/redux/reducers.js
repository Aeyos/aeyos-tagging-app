import { combineReducers } from "redux";
import loader from "./Loader/reducer";
import user from "./User/reducer";
import tags from "./Tags/reducer";

export default combineReducers({
  loader,
  user,
  tags
});
