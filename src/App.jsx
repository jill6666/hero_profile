import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import HeroPage from "./HeroPage";
import Hero from "./Hero";
import HeroList from "./component/HeroList";
import { apiGetHeroes } from "./api";

function App() {
  const [dataList, setDataList] = useState([]);
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
    <div style={{ maxWidth: '1080px' }}>
      <Router>
        <HeroList data={dataList} />
        <Switch>
          <Route path="/heroes" component={Hero} exact strict />
          <Route
            path="/heroes/:heroId"
            component={(props) => {
              return <HeroPage {...props}></HeroPage>;
            }}
            exatrict
          />
          <Redirect to="/heroes" />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
