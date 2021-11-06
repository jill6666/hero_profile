import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Skeleton from "./Skeleton";

const useStyle = makeStyles((theme) => ({
  body: {
    padding: "16px",
    color: "#fff"
  },
  cardWrap: {
    flexWrap: "wrap",
    display: "inline-flex",
    width: "100%",
    justifyContent: "space-around",
    border: "1px solid rgb(10, 10, 10)",
    padding: "1rem",
    boxSizing: "border-box",
    boxShadow: "0 3px 26px rgba(255, 255, 255, .3)",
    borderRadius: "10px",
    backgroundColor: "rgb(25, 25, 25)"
  },
  cardItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #3e3e3e",
    borderRadius: "10px",
    textDecoration: "none",
    margin: "5px",
    color: "#fff",
    "&:hover": {
      boxShadow: "0 0 16px rgba(255, 255, 255, .8)",
      transform: "scale(1.01)"
    }
  },
  selectedItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid red",
    borderRadius: "10px",
    textDecoration: "none",
    margin: "5px",
    color: "red",
    transform: "scale(1.05)"
  },
  image: {
    borderRadius: "10px 10px 0px 0px",
    minWidth: "80px",
    maxWidth: "250px"
  },
  name: {
    lineHeight: "40px",
    fontWeight: "700"
  },
  skeleton: {
    background: "#3e3e3e",
    borderRadius: "5px",
    margin: "5px",
    display: "block",
    minWidth: "200px",
    height: "240px"
  },
}));
const HeroList = ({ data, val }) => {
  const classes = useStyle();
  const [isLoading, setIsloading] = useState(true);
  const [selected, setSelected] = useState('');
  useEffect(() => {
    if (data.length) setIsloading(false)
  }, [data])
  return (
    <div className={classes.cardWrap}>
      {isLoading
        ? <Skeleton style={classes.skeleton} length={4} />
        : data.map((obj) => {
          const { id, name, image } = obj;
          return (
            <Link
              onClick={() => setSelected(id)}
              key={id}
              to={`/heroes/${id}`}
              className={selected === id ? classes.selectedItem : classes.cardItem}
            >
              <img src={image} alt={name} className={classes.image} />
              <p className={classes.name}>{name}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default HeroList;
