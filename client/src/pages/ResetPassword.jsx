import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/Login.css";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";
import axios from "axios";
function ResetPassword() {
  const [form, setForm] = useState({
    newPassword: "",
    reNewPassword: "",
  });
  const { id, token } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.newPassword !== form.reNewPassword) {
      alert("Passwords do not match");
    } else {
      axios
        .post(`http://localhost:3000/api/resetPassword/${id}/${token}`, form)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message + " Please login again");
            navigate("/login");
          } else {
            alert(res.data.message);
          }
        });
    }
  };

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <div className="page-title">
          <h1>Enter the world of secure Voting</h1>
        </div>
        <div className="login-container">
          <div className="logo-container">
            <img src={Logo} alt="Logo" style={{ width: 70 }} />
          </div>
          <h1 className="form-title">Please create a new password</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <TextField
                id="newPassword"
                label="New Password"
                name="newPassword"
                variant="outlined"
                type="password"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <TextField
                id="reNewPassword"
                label="Re-enter new Password"
                name="reNewPassword"
                variant="outlined"
                type="password"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <Button
                variant="contained"
                type="submit"
                className="submit-button"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
