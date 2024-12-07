export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  errorClass,
  inputErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  errorClass,
  inputErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  errorClass,
  inputErrorClass
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      errorClass,
      inputErrorClass
    );
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
};

const setEventListeners = (
  formElement,
  inputElement,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
  inputErrorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputElement));
  const submitButton = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        errorClass,
        inputErrorClass
      );
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const clearValidation = (formElement, validationConfig) => {
  const inputs = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  // Сброс состояния всех полей ввода
  inputs.forEach((input) => {
    hideInputError(
      formElement,
      input,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
    input.setCustomValidity("");
    input.removeEventListener("input", checkInputValidity);
  });

  // Обновление состояния кнопки отправки
  toggleButtonState(inputs, submitButton, validationConfig.inactiveButtonClass);
};

const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
  const isValid = !hasInvalidInput(inputList);
  submitButton.disabled = !isValid;
  submitButton.classList.toggle(inactiveButtonClass, !isValid);
};
