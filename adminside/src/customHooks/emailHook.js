import { useState } from 'react';

function useEmailValidation(initialValue) {
  const [email, setEmail] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);

  function validateEmail(value) {
    // Email validation regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailRegex.test(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  function handleChange(event) {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  }

  return { email, isValid, handleChange };
}

export default useEmailValidation;
