import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CollectionListContainer from "./collection-list/collectionList.container";
import CollectionContainer from "./collection/collection.container";

import "./style/app.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className="appContainer">
        <Switch>
          <Route
            path="/collection/:collectionId"
            component={CollectionContainer}
          />
          <Route path="/" component={CollectionListContainer} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
