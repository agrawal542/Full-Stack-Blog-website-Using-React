import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="h-full w-fit md:w-full flex justify-center items-center border border-res">
      <div className="w-full flex flex-col justify-center items-center">
          <Header />
        <main className="w-full h-full flex justify-center items-center bg-blue-50 py-4">
          <Outlet />
        </main>
          <Footer />
      </div>
    </div>
      
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#0a2351" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}/>
    </div>
  );
}

export default App;
