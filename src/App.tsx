import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CollectionListContainer from "./collection-list/collectionList.container";
import CollectionContainer from "./collection/collection.container";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/collection" component={CollectionContainer} />
        <Route path="/" component={CollectionListContainer} />
      </Switch>
    </Router>
  );
};

export default App;
