import React, { useState, useEffect, memo } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    minWidth: "200px",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgb(25, 25, 25)",
    border: "1px solid #3e3e3e",
    borderRadius: "5px",
    padding: "5px",
    margin: "1rem"
  },
  text: {
    display: "flex",
    justifyContent: "center",
    minWidth: "80px",
    marginRight: "1rem"
  },
  point: {
    display: "flex",
    minWidth: "30px",
    justifyContent: "center"
  },
  btn: {
    minWidth: "40px"
  }
}));
const ProfileItem = ({ disabled, strName, initNum, onChange }) => {
  const classes = useStyles();
  const [point, setPoint] = useState(0);
  useEffect(() => {
    setPoint(initNum);
  }, [initNum]);

  const handleClick = (props) => {
    const minus = props === "-";
    setPoint(minus ? point - 1 : point + 1);
    onChange(
      minus ? { type: -1, total: point - 1 } : { type: +1, total: point + 1 }
    );
  };
  const details = {
    str: "力量",
    agi: "敏捷",
    int: "智力",
    luk: "幸運"
  };
  return (
    <>
      <div className={classes.container}>
        <p className={classes.text}>
          {strName.toUpperCase() + " (" + details[strName] + ") "}
        </p>
        <Button
          className={classes.btn}
          onClick={(e) => {
            handleClick(e.target.textContent);
            setPoint(point - 1);
          }}
          variant="contained"
          disabled={point === 0}
        >
          -
        </Button>
        <span className={classes.point}>{point}</span>
        <Button
          className={classes.btn}
          onClick={(e) => {
            handleClick(e.target.textContent);
            setPoint(point + 1);
          }}
          variant="contained"
          disabled={disabled}
        >
          +
        </Button>
      </div>
    </>
  );
};
export default memo(ProfileItem);
