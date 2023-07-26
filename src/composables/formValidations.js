const required = (val) => {
  return !!val || "* Required";
};

const passwordLength = (val) => {
  return (
    (val.length >= 8 && val.length <= 20) ||
    "Password must be at least 8 - 20 characters long"
  );
};

const isValidEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Invalid email";
};

export { required, isValidEmail, passwordLength };
