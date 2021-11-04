import React, { memo } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

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
  }
}));
const HeroList = ({ data, val }) => {
  const classes = useStyle();
  return (
    <>
      <Link to="/heroes">Home</Link>
      <div className={classes.cardWrap}>
        {data.map((obj) => {
          const { id, name, image } = obj;
          const selected = val === id;
          return (
            <Link
              key={id}
              to={`/heroes/${id}`}
              className={!selected ? classes.cardItem : classes.selectedItem}
            >
              <img src={image} alt={name} className={classes.image} />
              <p className={classes.name}>{name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default memo(HeroList);
