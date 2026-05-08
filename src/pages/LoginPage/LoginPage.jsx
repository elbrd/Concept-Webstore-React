import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <main className={styles.loginPage}>
      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          <header className={styles.formHeader}>
            <h1 className={styles.pageTitle}>Login</h1>
            <p className={styles.subtitle}>Access your account</p>
          </header>

          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
