import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login(props) {
  const myStyle = {
    color: props.mode === 'dark' ? 'white' : '#042743',
    backgroundColor: props.mode === 'dark' ? 'rgb(36 74 104)' : 'white'
  };

  const inputStyle = {
    backgroundColor: props.mode === 'dark' ? '#6c757d' : 'white',
    color: props.mode === 'dark' ? 'white' : '#042743'
  };

  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      window.alert("Login successfully"); 
      navigate('/'); 
    }
  }, [formErrors, isSubmit, navigate]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const predefinedEmail = "saininikhil7781@gmail.com";
    const predefinedPassword = "12345678";

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    } else if (values.email !== predefinedEmail) {
      errors.email = "Email does not match predefined email!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password !== predefinedPassword) {
      errors.password = "Password does not match predefined password!";
    }
    return errors;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="alert alert-success" role="alert">Signed in successfully</div>
          ) : null}

          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm" style={myStyle}>
            <h1 className="text-center mb-4" style={myStyle}>Login Form</h1>
            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={myStyle}>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
                style={inputStyle}
              />
              {formErrors.username && <p className="text-danger">{formErrors.username}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={myStyle}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                style={inputStyle}
              />
              {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={myStyle}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                style={inputStyle}
              />
              {formErrors.password && <p className="text-danger">{formErrors.password}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-100" style={inputStyle}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
