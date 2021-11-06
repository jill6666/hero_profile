import React, { useState, useEffect, memo } from "react";
import { apiGetProfile, apiModifyProfile } from "../api";
import { makeStyles } from "@material-ui/core";
import { disabledSend, successed, noChanges } from "./const";
import ProfileItem from "./ProfileItem";
import { Slide, Snackbar, Button } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  content: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap"
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
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [message, setMessage] = useState('')
  const hasChanged = () => {
    return keyName
      .map((i) => profileData[i] === modifyData[i])
      .includes(false)
  }
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
      .catch((err) => {
        setMessage(err)
        setOpen(true)
      });
  };
  const modifyProfile = async () => {
    return await apiModifyProfile(heroId, modifyData)
      .then((res) => res.data)
      .then(() => {
        setMessage(successed)
        getProfile(heroId)
      })
      .then(() => setOpen(true))
      .catch((err) => {
        setMessage(err)
        setOpen(true)
      });
  };
  function transitionUp(props) {
    return <Slide {...props} direction="up" />;
  }
  const handleSubmit = () => {
    if (point !== 0) {
      setMessage(disabledSend)
      setTransition(() => transitionUp)
      setOpen(true)
    } else if (hasChanged()) {
      modifyProfile()

    } else {
      setMessage(noChanges)
      setOpen(true)
    }
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
        <Button
          className={classes.submitBtn}
          onClick={handleSubmit}
          variant="contained"
        >
          儲存
        </Button>
      </div>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={transition}
        message={message}
        key={transition ? transition.name : ''}
      />
    </div>
  );
};

export default memo(HeroPage);
