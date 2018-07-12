import Loader from "./containers/Loader";
import TagEditor from "./containers/TagEditor";
import Tagger from "./containers/Tagger";
import Viewer from "./containers/Viewer";
import {
  FaCloud,
  FaCog,
  FaEdit,
  FaHome,
  FaPlusSquare
} from "react-icons/lib/fa";

export default [
  {
    path: "/",
    component: Loader,
    exact: true,
    icon: FaHome
  },
  {
    path: "/loader",
    component: Loader,
    icon: FaCloud
  },
  {
    path: "/viewer",
    component: Viewer,
    icon: FaPlusSquare
  },
  {
    path: "/tagger",
    component: Tagger,
    icon: FaEdit
  },
  {
    path: "/tag-editor",
    component: TagEditor,
    icon: FaCog
  }
];
