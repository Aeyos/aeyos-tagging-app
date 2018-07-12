// CORE
import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

// COMPONENTS
import Loader from "./containers/Loader";
import Viewer from "./containers/Viewer";
import Tagger from "./containers/Tagger";
import TagEditor from "./containers/TagEditor";

// STYLES
import "./styles.css";

// MIDDLEWARE
import rootReducer from "./redux/reducers";
import sagas from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <React.Fragment>
          <Loader />
          <Viewer />
          <Tagger />
          <TagEditor />
        </React.Fragment>
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
