import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Final from "./components/Final";
import Quiz from "./components/Quiz";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Quiz}/>
        <Route exact path="/final" component={Final}/>
      </Switch>
    </BrowserRouter>
  );
}
