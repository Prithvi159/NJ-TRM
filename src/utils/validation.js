export const validateField = (rules, value) => {
  for (const rule of rules) {
    switch (rule.type) {
      case "required":
        if (!value) {
          return rule.message;
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          return rule.message;
        }
        break;
      case "minLength":
        if (value.length < rule.value) {
          return rule.message;
        }
        break;
      case "maxLength":
        if (value && value.length > parseInt(rule.length)) {
          return rule.message;
        }
        break;
      case "empty":
        if (!value || value.trim() === "") {
          return rule.message;
        }
        break;
      default:
        break;
    }
  }

  return null;
};
