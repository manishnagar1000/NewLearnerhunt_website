
export const KeyPressForNumeric = (event) => {
    const keyCode = event.which || event.keyCode;

    if (event.shiftKey) return event.preventDefault();
    const isValidKey =
        (keyCode > 47 && keyCode < 58) ||
        (keyCode > 95 && keyCode < 107) ||
        keyCode === 8 ||
        keyCode === 13 ||
        keyCode === 20;

    if (!isValidKey) {
        event.preventDefault();
        return false;
    }
};

export const KeyPressForAlphabets = (event) => {
    const keyCode = event.which || event.keyCode;

    if (event.shiftKey) return event.preventDefault();
    const isValidKey =
        (keyCode >= 65 && keyCode <= 90) ||
        keyCode === 8 ||
        keyCode === 39 ||
        keyCode === 13 ||
        keyCode === 37 ||
        keyCode === 32 ||
        keyCode === 20 ||
        keyCode === 9 ||
        keyCode === 16;

    if (!isValidKey) {
        event.preventDefault();
        return false;
    }
};
export const validateEmail = (email) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return isValidEmail;
};


export const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

