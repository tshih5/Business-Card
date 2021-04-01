import {Button, Modal, Form, Row, Col} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import axios from 'axios'

const UPDATE_API = "http://localhost:8000/api/cards/"

function clean(obj){
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
}

export default function EditForm({content}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setFirstName(content && content.first_name? content.first_name: "");
    setLastName(content && content.last_name? content.last_name: "");
    setEmail(content && content.email? content.email : "");
    setEmployer(content && content.employer? content.employer: "");
    setTitle(content && content.job_title? content.job_title: "");
    setLoc(content && content.location? content.location : "");
    setNumber(content && content.phone_number? content.phone_number: "");
    setPicture();
    setAge(content && content.age? content.age: "");
    setBDate(content && content.birth_date? content.birth_date: "");
  }, [content])

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [employer, setEmployer] = useState("");
  const [title, setTitle] = useState("");
  const [loc, setLoc] = useState("");
  const [number, setNumber] = useState("");
  const [picture, setPicture] = useState();
  const [age, setAge] = useState("");
  const [bdate, setBDate] = useState("");

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);
    var formData = new FormData();
    formData.append("user_id", user.user_id);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("age", age);
    formData.append("birth_date", bdate);
    formData.append("job_title", title);
    formData.append("employer", employer);
    formData.append("location", loc);
    formData.append("email", email);
    formData.append("phone_number", number);
    if(picture !== null && picture !== undefined){
      formData.append("profile_picture", picture);
    }

    axios.patch(UPDATE_API + user.user_id + "/", formData,
    {
      headers: {
        Authorization: 'Bearer ' + user.access, //the token is a variable which holds the token
        "Content-Type": "multipart/form-data",
      }
    })
    .then(() => {
      handleClose();
      window.location.reload();
    })
    .catch(error => console.log(error));
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>Edit</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>First name</Form.Label>
                  <Form.Control name="fname" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </Col>
                <Col>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control name="lname" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </Col>
              </Row>
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="numb" type="text" placeholder="Enter Phone Number" value={number} onChange={e => setNumber(e.target.value)}/>
            </Form.Group>
            
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Employer</Form.Label>
                  <Form.Control name= "emp" placeholder="Company" value={employer} onChange={e => setEmployer(e.target.value)}/>
                </Col>
                <Col>
                  <Form.Label>Position</Form.Label>
                  <Form.Control name="pos" placeholder="Position" value={title} onChange={e => setTitle(e.target.value)}/>
                </Col>
              </Row>
              <Form.Label>Location</Form.Label>
              <Form.Control name="loc" placeholder="City" value={loc} onChange={e => setLoc(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthdate</Form.Label>
              <Form.Control name="bd" type="text" placeholder="YYYY-MM-DD" value={bdate} onChange={e => setBDate(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control name="bd" type="text" placeholder="0" value={age} onChange={e => setAge(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <Form.File name="image" label="Profile Picture" onChange={e => setPicture(e.target.files[0])}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button >
        </Modal.Footer>
      </Modal>
    </div>
  );
};
