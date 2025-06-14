import { useState } from "react";

const FormInput = ({ id, label, errorMessage, onChange, ...inputProps }) => {
  const [focused, setFocused] = useState(false);

  const handleFocused = () => {
    setFocused(true);
  };

  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocused}
        focused={focused.toString()}
        onFocus={() => inputProps.name === "repeatPassword" && setFocused(true)}
      />
      <span className="error-message">{errorMessage}</span>
    </div>
  );
};

export default FormInput;