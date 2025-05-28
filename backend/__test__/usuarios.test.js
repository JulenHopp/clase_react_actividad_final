const request = require('supertest');
const { app, server } = require('../server');

describe('POST /api/usuarios/login', () => {
  test('devuelve un token si las credenciales son válidas', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'julen@gmail.com',
        password: '1234',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('devuelve 404 o 401 si las credenciales son inválidas', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'noexiste@test.com',
        password: 'incorrecta',
      });

    expect([401, 404]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('error');
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
});