import React from 'react'
import { useUserData } from "../../contexts/userContexts";

const Home = () => {
  const {userData} = useUserData();
  console.log(userData)
  return (
    <>
      <h1>Home</h1>
      <p>Username: {userData.userName}</p>
      <p>Email: {userData.email}</p>
      <p>Password: {userData.password}</p>
      <p>Confirm Password: {userData.cPassword}</p>
    </>
  );
}

export default Home