import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <main className={styles.registerPage}>
      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          <header className={styles.formHeader}>
            <h1 className={styles.pageTitle}>Register</h1>
            <p className={styles.subtitle}>Create your account</p>
          </header>

          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
