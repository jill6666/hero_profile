import React, { useState, useEffect, memo } from "react";
import { apiGetProfile, apiModifyProfile } from "../api";
import { makeStyles } from "@material-ui/core";
import { disabledSend, successed, noChanges } from "./const";
import ProfileItem from "./ProfileItem";
import { Snackbar, Button } from '@material-ui/core';
import Skeleton from "../component/Skeleton";

const useStyle = makeStyles((theme) => ({
  content: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    border: '1px solid #a5a5a5',
    borderRadius: '5px',
    marginTop: '1rem'
  },
  loading: {
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
  snackbar: {
    color: '#ff0000',
    border: '1px solid #ff0000',
    padding: '5px',
    borderRadius: '5px',
    textAlign: 'center',
  }
}));
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
  const [message, setMessage] = useState('');
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
  const handleSubmit = () => {
    if (point !== 0) {
      setMessage(disabledSend)
      setOpen(true)
    } else if (hasChanged()) {
      modifyProfile()

    } else {
      setMessage(noChanges)
      setOpen(true)
    }
  };
  useEffect(() => {
    setPoint(0);
    getProfile(heroId);
  }, [heroId]);
  useEffect(() => {
    if (point <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [point]);
  return (
    <div className={classes.content}>
      <div>
        <p style={{ padding: "5px", margin: "1rem" }}>調整能力值</p>
        {isLoading
          ? <Skeleton style={classes.loading} length={4} />
          : keyName.map((obj) => {
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
        <span style={{ margin: '1rem 0' }}>剩餘點數: {point} 點</span>
        <Button
          onClick={handleSubmit}
          variant="contained"
        >
          儲存
        </Button>
      </div>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        <p className={classes.snackbar}>{message}</p>
      </Snackbar>
    </div>
  );
};

export default memo(HeroPage);
