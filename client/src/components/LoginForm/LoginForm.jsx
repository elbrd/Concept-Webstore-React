import FormInput from "../FormInput/FormInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

const LoginForm = () => {
  const users = useUserStore((state) => state.users);
  const activeUser = useUserStore((state) => state.activeUser);
  const loginUser = useUserStore((state) => state.loginUser);

  useEffect(() => {
    console.log(activeUser);
  }, [activeUser]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    const findUser = users.find((user) => {
      return user.email === email;
    });

    if (!email) newErrors.email = "Email required";
    if (!findUser) newErrors.emailTaken = "Email is not in use";
    if (email && !email.includes("@")) newErrors.emailFormat = "Invalid email";
    if (!password) newErrors.password = "Password required";
    if (password && findUser && findUser.password !== password)
      newErrors.wrongPassword = "Wrong password";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const user = { email, password };
    loginUser(user);
    setEmail("");
    setPassword("");
    console.log("VALID USER:", user);
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

      {errors.email && <ErrorMessage message={errors.email} />}
      {errors.emailTaken && <ErrorMessage message={errors.emailTaken} />}
      {errors.emailFormat && <ErrorMessage message={errors.emailFormat} />}
      {errors.password && <ErrorMessage message={errors.password} />}
      {errors.wrongPassword && <ErrorMessage message={errors.wrongPassword} />}

      <button type="submit" className={styles.submitButton}>
        Login
      </button>

      <footer className={styles.formFooter}>
        <p className={styles.footerText}>
          Don't have an account?{" "}
          <span className={styles.footerLink}>Register here</span>
        </p>
      </footer>
    </form>
  );
};

export default LoginForm;
