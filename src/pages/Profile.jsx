// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserInfoActions } from "../redux/actions/userAction";

const Profile = () => {
  // const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.data);
  // console.log(userInfo);

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");

  // useEffect(() => {
  //   if (userInfo === undefined) {
  //     dispatch(getUserInfoActions());
  //   } else {
  //     setName(userInfo.fullname);
  //     setEmail(userInfo.email);
  //   }
  // }, [dispatch]);

  return (
    <div style={{ margin: "100px" }}>
      <h1>Profile</h1>
      <h1>Name </h1>
      <h1>Email</h1>
    </div>
  );
};

export default Profile;
