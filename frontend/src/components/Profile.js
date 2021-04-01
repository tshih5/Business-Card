import React, {useState, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import {Button} from 'react-bootstrap';
import EditForm from './EditForm';

export default function Profile(){
  const [content, setContent] = useState("");
  
  const {user: currentUser } = useSelector((state) => state.auth);
  
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        //console.log(response.data[0]);
        setContent(response.data[0]);
      },
      (error) => {
        console.log(error);
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
          <strong>{content && content.first_name? content.first_name: ""}'s</strong> Profile
        </h3>
        <img className="profile-picture" height="300" src={content && content.profile_picture? content.profile_picture: ""}></img>
      </header>
      <p>
        <strong>{content && content.last_name? content.last_name: ""}, {content && content.first_name? content.first_name: ""}</strong>
      </p>
      <p>Company: {content && content.employer? content.employer: ""}</p>
      
      <p>Job Title: {content && content.job_title? content.job_title: ""}</p>
      <p>City: {content && content.location? content.location : ""}</p>
      <p>Email: {content && content.email? content.email : ""}</p>
      <p>Mobile: {content && content.phone_number? content.phone_number: ""}</p>
      <p>Birthdate: {content && content.birth_date? content.birth_date: ""}</p>
      <p>Age: {content && content.age? content.age: ""}</p>
      <div>
        <EditForm content={content}/>
      </div>
    </div>
  );
};
