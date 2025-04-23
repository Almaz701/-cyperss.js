describe('Позитивный кейс авторизации', () => {
    it('Успешный вход с правильными данными', () => {
      cy.visit('https://login.qa.studio/'); // Переход на страницу входа
      cy.get('#mail').type('german@dolnikov.ru'); // Ввод email
      cy.get('#pass').type('iLoveqastudio1'); // Ввод пароля
      cy.get('#loginButton').click(); // Клик на кнопку "Войти"
  
      // Проверки:
      cy.contains('Авторизация прошла успешно').should('exist');
      cy.get('#exitMessageButton > .exitIcon').click(); // Кнопка крестика
    });
  });
  describe('Восстановление пароля', () => {
    it('Отправка формы восстановления', () => {
      cy.visit('https://login.qa.studio/');
      cy.get('#forgotEmailButton').click(); // Клик на ссылку
      cy.get('#mailForgot').type('german@dolnikov.ru')
      cy.get('#restoreEmailButton').click();
    });
  });
  describe('Негативный кейс: неверный пароль', () => {
    it('Ошибка при неверном пароле', () => {
        cy.visit('https://login.qa.studio/');
      cy.get('#mail').type('german@dolnikov.ru')
      cy.get('#pass').type('WrongPassword123');
      cy.get('#loginButton').click();
  
      // Проверки:
      cy.get('#messageHeader')
    });
  });
  describe('Негативный кейс: неверный логин', () => {
    it('Ошибка при неверном email', () => {
        cy.visit('https://login.qa.studio/');
      cy.get('#mail').type('nonexistent@qa.studio');
      cy.get('#pass').type('WrongPassword123');
      cy.get('#loginButton').click();
  
      // Проверки:
      cy.get('#messageHeader')
      cy.get('#exitMessageButton > .exitIcon')
    });
  });
  describe('Валидация email (отсутствие @)', () => {
    it('Ошибка при невалидном email', () => {
        cy.visit('https://login.qa.studio/');
      cy.get('#mail').type('invalid-email.com');
      cy.get('#pass').type('Password123');
      cy.get('#loginButton').click();
  
      // Проверки:
      cy.get('#messageHeader')
      cy.get('#exitMessageButton > .exitIcon')
    });
  });
  describe('Приведение email к lowercase', () => {
    it('Авторизация с email в разном регистре (должен упасть!)', () => {
        cy.visit('https://login.qa.studio/');
      cy.get('#mail').type('GerMan@Dolnikov.ru'); // Email с верхним регистром
      cy.get('#pass').type('Password123');
      cy.get('#loginButton').click();
  
      // Ожидаем успешную авторизацию (но тест упадёт из-за бага!)
      cy.get('#messageHeader');
    });
  });