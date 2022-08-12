const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class Validator {

  constructor(options) {
    this.options = options;
    this.selectorRules = {};
  }

  main() {
    // Lấy form element cần validate
    const formElement = $(this.options.form);

    if (!formElement) {
      console.log('have not form element');
      return;
    }

    // Lặp lần lượt qua các rule
    this.options.rules.forEach(rule => {
      const inputElement = formElement.querySelector(rule.selector);
      
      // Lưu lại các rule cho các input
      this.selectorRules[rule.selector].push(rule.test);

      if (!inputElement) {
        console.log('have not input element');
        return;
      }
      
      // Xử lý sự kiện blur
      inputElement.onblur = () => {
        this.validate(inputElement, rule);
      }

      // Xử lý khi user nhập
      inputElement.oninput = () => {
        this.deleteErrorMessage(inputElement);
      }
      
    })
  }

  validate(inputElement, rule) {
    let errorMessage = rule.test(inputElement.value);

    if(!errorMessage) {
     this.deleteErrorMessage(inputElement);
    }
    else {
      this.createErrorMessage(inputElement, errorMessage);
    }
  }

  getParentElement(inputElement) {
    return inputElement.parentElement;
  }
  getErrorElement(inputElement) {
    return this.getParentElement(inputElement).querySelector(this.options.errorSelector);
  }

  deleteErrorMessage(inputElement) {

    this.getErrorElement(inputElement).innerText = '',
    this.getParentElement(inputElement).classList.remove('invalid');

  }
  createErrorMessage(inputElement, errorMessage) {

    this.getErrorElement(inputElement).innerText = errorMessage,
    this.getParentElement(inputElement).classList.add('invalid');

  }

  static isRequired(selector, message) {

    return {
      selector,
      test(value) {
        return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
      }
    }

  }

  static isEmail(selector, message) {

    return {
      selector,
      test(value) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined : message || 'Trường này là Email';
      }
    }

  }

  static minLength (selector, min, message) {

    return {
      selector,
      test(value) {
        return value.length >= min ? undefined : message || `Vui lòng nhập trường này tối thiểu ${min} kí tự`
      }
    }

  }

  static isConfirmed(selector, getConfirmValue, message) {

    return {
      selector,
      test(value) {
        return value === getConfirmValue() ? undefined : message || "Mật khẩu không trùng khớp";
      }
    }
  }

}