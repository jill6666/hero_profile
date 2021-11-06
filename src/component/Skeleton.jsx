import React from "react";

const Skeleton = ({ style, length }) => {
  const arr = Array.from({ length: length })
  return arr.map((i, index) => {
    return (
      <div className={style} key={index}></div>
    )
  })
}
export default Skeleton;