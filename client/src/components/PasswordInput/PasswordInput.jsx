import styles from "./PasswordInput.module.css";

const PasswordInput = ({ id, label, placeholder, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type="password"
        placeholder={placeholder}
        className={styles.input}
        onChange={onChange}
      />
    </div>
  );
};

export default PasswordInput;
