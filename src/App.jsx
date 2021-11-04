import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import HeroPage from "./HeroPage";
import Hero from "./Hero";
import HeroList from "./HeroList";
import { apiGetHeroes } from "../api";

function App() {
  const [dataList, setDataList] = useState([]);
  const [value, setValue] = useState(0);
  const getData = async () => {
    return await apiGetHeroes()
      .then((res) => res.data)
      .then((res) => setDataList(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Router>
      <HeroList data={dataList} val={value} />
      <Switch>
        <Route path="/heroes" component={Hero} exact strict />
        <Route
          path="/heroes/:heroId"
          component={(props) => {
            setValue(props.match.params.heroId);
            return <HeroPage {...props}></HeroPage>;
          }}
          exatrict
        />
        <Redirect to="/heroes" />
      </Switch>
    </Router>
  );
}
export default App;
