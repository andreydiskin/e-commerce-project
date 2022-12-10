import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Loader from "../components/common/Loader/Loader";
import { authContext } from "../context/authContext";

export const SecureRoute = ({ children, role }) => {
  const { isUser, user } = useContext(authContext);
  console.log(user);
  if (!isUser) {
    return <Navigate to="/" />;
  }
  if (!Object.keys(user).length) {
    return <Loader />;
  }


  if(role==="admin"){
    if(!user.isAdmin){
      return <Navigate to="/" />;
    }else{
      return children;
    }
  }else{
    return children;
  }


};

export const Securelink = ({ children, to, role, className = "" }) => {
  const { isUser, user } = useContext(authContext);

  if (!isUser) {
    return <></>;
  }
  if(role==="admin"  && !user.isAdmin){
      return <></>;
    
  }


  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
};
