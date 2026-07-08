import FormInput from "../FormInput/FormInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.loginUser);

  // Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Errors
  const [errors, setErrors] = useState(false);
  const [dbError, setDbError] = useState(false);

  // Logged in confirmation
  const [success, setSuccess] = useState(false);

  // Validation of form input and submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    setSuccess(false);
    setDbError(false);
    const newErrors = {};

    if (!email) newErrors.email = "Email required";
    if (email && !email.includes("@")) newErrors.emailFormat = "Invalid email";
    if (!password) newErrors.password = "Password required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Submit to backend
    const user = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:8083/api/auth/login",
        {
          email: user.email,
          password: user.password,
        },
      );
      // Save token in sessionStorage
      loginUser(response.data.token);

      setDbError("");
      setErrors("");
      setSuccess(response.data.message);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setDbError(error.response.data.message);
    }
  };
  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      {dbError && <ErrorMessage message={dbError} />}
      {errors.email && <ErrorMessage message={errors.email} />}
      {errors.emailFormat && <ErrorMessage message={errors.emailFormat} />}
      {errors.password && <ErrorMessage message={errors.password} />}

      {success && <p>{success}</p>}

      <button type="submit" className={styles.submitButton}>
        Login
      </button>

      <footer className={styles.formFooter}>
        <p className={styles.footerText}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className={styles.footerLink}
          >
            Register here
          </span>
        </p>
      </footer>
    </form>
  );
};

export default LoginForm;
