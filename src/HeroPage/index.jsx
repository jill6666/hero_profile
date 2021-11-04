import React, { useState, useEffect, memo } from "react";
import { apiGetProfile, apiModifyProfile } from "../../api";
import { makeStyles } from "@material-ui/core";
import { errMsgSend, successed } from "./const";
import ProfileItem from "./ProfileItem";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles((theme) => ({
  content: {
    display: "flex",
    border: "1px solid red",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  msg: {
    display: "block",
    height: "40px"
  },
  loading: {
    justifyContent: "space-between",
    alignItems: "center",
    background: "#3e3e3e",
    borderRadius: "5px",
    padding: "5px",
    margin: "1rem",
    display: "block",
    minWidth: "200px",
    height: "38px"
  },
  rightContent: {
    display: "flex",
    width: "100%",
    maxWidth: "150px",
    flexDirection: "column",
    margin: "1rem"
  },
  submitBtn: {}
}));
const Loading = () => {
  const classes = useStyle();
  return <div className={classes.loading}></div>;
};
const HeroPage = (props) => {
  const classes = useStyle();
  const heroId = props.match.params.heroId;
  const [profileData, setProfileData] = useState([]);
  const [modifyData, setModifyData] = useState({});
  const [keyName, setKeyName] = useState([]);
  const [point, setPoint] = useState(0);
  const [disable, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const getProfile = async (heroId) => {
    return await apiGetProfile(heroId)
      .then((res) => res.data)
      .then((res) => {
        const list = Object.keys(res);
        setKeyName(list);
        setProfileData(res);
        setModifyData({
          str: res["str"],
          int: res["int"],
          agi: res["agi"],
          luk: res["luk"]
        });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const modifyProfile = async () => {
    return await apiModifyProfile(heroId, modifyData)
      .then((res) => res.data)
      .then(() => textHelper(successed))
      .catch((err) => console.log(err));
  };
  const textHelper = (text) => {
    setMsg(text);
    setTimeout(() => {
      setMsg("");
    }, 2500);
  };
  const handleSubmit = () => {
    if (point !== 0) {
      textHelper(errMsgSend);
      return;
    }
    modifyProfile();
  };
  useEffect(() => {
    getProfile(heroId);
  }, [heroId]);
  useEffect(() => {
    if (point <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [point]);
  // TODO: rm when the end
  console.log("modifyData", modifyData);
  const skeleton = Array.from({ length: 4 });
  return (
    <div className={classes.content}>
      <div>
        {isLoading &&
          skeleton.map((i, index) => {
            return (
              <div key={index}>
                <Loading />
              </div>
            );
          })}
        {!isLoading &&
          keyName.map((obj) => {
            return (
              <ProfileItem
                key={obj}
                disabled={disable}
                strName={obj}
                initNum={profileData[obj]}
                onChange={(i) => {
                  setPoint(point - i.type);
                  setModifyData({ ...modifyData, [obj]: i.total });
                }}
              />
            );
          })}
      </div>
      <div className={classes.rightContent}>
        <span>剩餘點數: {point} 點</span>
        <p className={classes.msg}>{msg}</p>
        <Button
          className={classes.submitBtn}
          onClick={handleSubmit}
          variant="contained"
          disabled={point !== 0}
        >
          儲存
        </Button>
      </div>
    </div>
  );
};

export default memo(HeroPage);
