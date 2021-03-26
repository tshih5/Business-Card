import React, {useState, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserService from "../services/user.service";

export default function Profile(){
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.access.substring(0, 20)} ...{" "}
        {currentUser.access.substr(currentUser.access.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.user_id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      
    </div>
  );
};
