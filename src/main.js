import Handlebars from 'handlebars';
import './styles/main.scss';

const routes = {
  login: async () => {
    const template = await import('./templates/login.hbs?raw');
    const compiled = Handlebars.compile(template.default);
    document.getElementById('app').innerHTML = compiled();
    setupLoginPage();
  },
  
  register: async () => {
    const template = await import('./templates/register.hbs?raw');
    const compiled = Handlebars.compile(template.default);
    document.getElementById('app').innerHTML = compiled();
    setupRegisterPage();
  },
  
  notFound: async () => {
    const template = await import('./templates/404.hbs?raw');
    const compiled = Handlebars.compile(template.default);
    document.getElementById('app').innerHTML = compiled();
    setupNotFoundPage();
  },
  
  serverError: async () => {
    const template = await import('./templates/500.hbs?raw');
    const compiled = Handlebars.compile(template.default);
    document.getElementById('app').innerHTML = compiled();
    setupServerErrorPage();
  }
};

function validateLogin() {
  const login = document.getElementById('login').value.trim();
  const password = document.getElementById('password').value;
  let isValid = true;

  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

  if (!login) {
    showError('login', 'Введите логин');
    isValid = false;
  }

  if (!password) {
    showError('password', 'Введите пароль');
    isValid = false;
  } else if (password.length < 6) {
    showError('password', 'Пароль должен быть не менее 6 символов');
    isValid = false;
  }

  return isValid;
}

function validateRegister() {
  const fields = {
    first_name: document.getElementById('first_name').value.trim(),
    second_name: document.getElementById('second_name').value.trim(),
    login: document.getElementById('login').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value.trim()
  };

  let isValid = true;

  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

  if (!fields.first_name) {
    showError('first_name', 'Введите имя');
    isValid = false;
  }

  if (!fields.second_name) {
    showError('second_name', 'Введите фамилию');
    isValid = false;
  }

  if (!fields.login) {
    showError('login', 'Введите логин');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fields.email) {
    showError('email', 'Введите email');
    isValid = false;
  } else if (!emailRegex.test(fields.email)) {
    showError('email', 'Не корректный email');
    isValid = false;
  }

  if (!fields.password) {
    showError('password', 'Введите пароль');
    isValid = false;
  } else if (fields.password.length < 6) {
    showError('password', 'Пароль должен быть не менее 6 символов');
    isValid = false;
  }


  const phoneRegex = /^\+?[0-9\s\-\(\)]+$/;
  if (!fields.phone) {
    showError('phone', 'Введите номер телефона');
    isValid = false;
  } else if (!phoneRegex.test(fields.phone)) {
    showError('phone', 'Не корректный номер телефона');
    isValid = false;
  }

  return isValid;
}

function submitRegistration() {
  const data = {
    first_name: document.getElementById('first_name').value.trim(),
    second_name: document.getElementById('second_name').value.trim(),
    login: document.getElementById('login').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value.trim()
  };
  
  console.log('Данные регистрации:', data);
  return data;
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  const inputElement = document.getElementById(fieldId);
  
  if (errorElement) errorElement.textContent = message;
  if (inputElement) inputElement.classList.add('error');
}

function setupLoginPage() {
  const form = document.getElementById('loginForm');
  const goToRegister = document.getElementById('goToRegister');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateLogin()) {
      console.log('Вход успешен');
    }
  });

  goToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    routes.register();
  });

  const test404 = document.getElementById('test404');
  const test500 = document.getElementById('test500');
  
  if (test404) {
    test404.addEventListener('click', (e) => {
      e.preventDefault();
      routes.notFound();
    });
  }
  
  if (test500) {
    test500.addEventListener('click', (e) => {
      e.preventDefault();
      routes.serverError();
    });
  }
}

function setupRegisterPage() {
  const form = document.getElementById('registerForm');
  const goToLogin = document.getElementById('goToLogin');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateRegister()) {
      const userData = submitRegistration();
      console.log('Регистрация прошла успешно:', userData);
      routes.login();
    }
  });

  goToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    routes.login();
  });
}

function setupNotFoundPage() {
  const goHome = document.getElementById('goToHome');
  goHome.addEventListener('click', (e) => {
    e.preventDefault();
    routes.login();
  });
}

function setupServerErrorPage() {
  const goHome = document.getElementById('goToHome500');
  goHome.addEventListener('click', (e) => {
    e.preventDefault();
    routes.login();
  });
}

routes.login();