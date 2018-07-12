// CORE
import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";

// COMPONENTS
import Content from "./components/Content";
import SideMenu from "./containers/SideMenu";
import routes from "./routes";

// CONSTANTS
import defaultTheme from "./themes/default";

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
        <BrowserRouter>
          <ThemeProvider theme={defaultTheme}>
            <div>
              <SideMenu />
              <Content>{routes.map(route => <Route {...route} />)}</Content>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
