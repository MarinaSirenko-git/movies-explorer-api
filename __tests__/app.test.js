const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const request = supertest(app);

const { DB_CONN } = require('../utils/configs/envConfig');

beforeAll(() => {
  mongoose.connect(DB_CONN,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
});

afterAll(() => mongoose.disconnect());

describe('Тест БД на создание и удаление пользователя', () => {
  beforeEach(() => User.create({ email: 'testuser@mail.ru', password: 'password', name: 'Ivan' }));
  afterEach(() => User.deleteOne({ email: 'testuser@mail.ru' }));

  it('пользователь должен быть', async () => {
    const user = await User.findOne({ email: 'testuser@mail.ru' });
    expect(user).toBeDefined();
    expect(user.email).toBe('testuser@mail.ru');
    expect(user.name).toBe('Ivan');
  });
});

describe('POST /signup', () => {
  afterEach(() => User.deleteOne({ email: 'email@mail.ru' }));

  it('при успехе должен возвращать данные пользователя (_id, email, name) в json-формате и 201 статус', async () => {
    const response = await request.post('/signup').send({
      email: 'email@mail.ru',
      password: 'password',
      name: 'user',
    });
    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toMatch('application/json');
    expect(response.body._id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.name).toBeTruthy();
  });

  it('при переданных некорректных данных должен возвращать 400 статус и сообщение от celebrate', async () => {
    const response = await request.post('/signup').send({
      email: 'email@mailru',
      password: 'password',
      name: 'user',
    });
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch('application/json');
    expect(response.body.message).toBe('celebrate request validation failed');
  });
});
