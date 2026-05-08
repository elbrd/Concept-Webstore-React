import styles from "./FormInput.module.css";

const FormInput = ({ id, label, type = "text", placeholder, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={styles.input}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
