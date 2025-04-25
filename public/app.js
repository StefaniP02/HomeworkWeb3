// Зареждаме библиотеките:
const express = require('express');          
const session = require('express-session');  
const bodyParser = require('body-parser');   

const app = express();  // Създаваме приложение Express

// 1) Настройка на body-parser:
//    Позволява ни да четем form data (от <form method="POST">)
//    в req.body като JavaScript обект.
app.use(bodyParser.urlencoded({ extended: true }));

// 2) Настройка на сесиите:
//    - secret: използва се за подписване на cookie-то, за да предотврати фалшифициране.
//    - resave: false → не записва сесията, ако не е променена.
//    - saveUninitialized: false → не създава нова сесия за потребители, които не са логнати.
//    - cookie.maxAge: живот на сесията в милисекунди.
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 } // 30 минути
}));

// 3) Статични файлове (CSS, JS), ако имаш:
app.use(express.static('public'));

// Списък на потребителите в паметта:
const users = [
    { id: 1, username: 'alice', password: 'password123' },
    { id: 2, username: 'bob',   password: 'qwerty' }
  ];
  
  // Обърни внимание:
  // - В реален проект паролите се хешират (bcrypt и т.н.). 
  // - Тук съхраняваме паролите в чист текст само за учебни цели.
  