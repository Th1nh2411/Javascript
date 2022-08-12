const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class Validator {

  constructor(options) {
    this.options = options;
  }

  main() {
    // Lấy form element cần validate
    const formElement = $(this.options.form);
    const _this = this;

    if (!formElement) {
      console.log('have not form element');
      return;
    }

    this.options.rules.forEach(rule => {
      const inputElement = formElement.querySelector(rule.selector);
      const parentElement = inputElement.parentElement;
      const errorElement = parentElement.querySelector(this.options.errorSelector);

      if (!inputElement) {
        console.log('have not input element');
        return;
      }
      
      // Xử lý sự kiện blur
      inputElement.onblur = () => {
        _this.validate(inputElement, parentElement, errorElement, rule);
      }
      
      // Xử lý khi user nhập
      inputElement.oninput = () => {
        errorElement.innerText = '',
        parentElement.classList.remove('invalid');
      }
    })
  }

  validate(inputElement, parentElement, errorElement, rule) {
    let errorMessage = rule.test(inputElement.value);

    if(!errorMessage) {
      errorElement.innerText = '',
      parentElement.classList.remove('invalid');
    }
    else {
      errorElement.innerText = errorMessage,
      parentElement.classList.add('invalid');
    }
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

}