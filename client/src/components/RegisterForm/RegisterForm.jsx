import FormInput from "../FormInput/FormInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./RegisterForm.module.css";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

const RegisterForm = () => {
  const users = useUserStore((state) => state.users);
  const registerUser = useUserStore((state) => state.registerUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    const findUser = users.find((user) => {
      return user.email === email;
    });

    if (!firstName) newErrors.firstName = "First name required";
    if (!lastName) newErrors.lastName = "Last name required";
    if (!email) newErrors.email = "Email required";
    if (findUser) newErrors.emailTaken = "Email is already in use";
    if (email && !email.includes("@")) newErrors.emailFormat = "Invalid email";
    if (!password) newErrors.password = "Password required";
    if (password && password.length < 6)
      newErrors.passwordLength = "Password is to short";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const user = { firstName, lastName, email, password };
    registerUser(user);
    console.log("VALID USER:", user);
  };

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <FormInput
          id="firstName"
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />

        <FormInput
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>

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

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />

      {errors.firstName && <ErrorMessage message={errors.firstName} />}
      {errors.lastName && <ErrorMessage message={errors.lastName} />}
      {errors.email && <ErrorMessage message={errors.email} />}
      {errors.emailTaken && <ErrorMessage message={errors.emailTaken} />}
      {errors.emailFormat && <ErrorMessage message={errors.emailFormat} />}
      {errors.password && <ErrorMessage message={errors.password} />}
      {errors.passwordLength && (
        <ErrorMessage message={errors.passwordLength} />
      )}
      {errors.confirmPassword && (
        <ErrorMessage message={errors.confirmPassword} />
      )}

      <button type="submit" className={styles.submitButton}>
        Register
      </button>

      <footer className={styles.formFooter}>
        <p className={styles.footerText}>
          Already have an account?{" "}
          <span className={styles.footerLink}>Login here</span>
        </p>
      </footer>
    </form>
  );
};

export default RegisterForm;
