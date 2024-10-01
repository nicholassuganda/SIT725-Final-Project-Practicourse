import request from 'supertest';
import { expect } from 'chai';
import { app } from '../index.js';  // Ensure the correct path to your app file

describe('Login Page Tests', function () {
    
  // Test if the login page is served successfully
  it('should return 200 OK for the login page', async function () {
    const res = await request(app).get('/login');
    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.include('html');
  });

  // Test login with missing username
  it('should return 400 for missing username', async function () {
    const loginData = { password: 'validPassword' }; // Username is missing
    const res = await request(app)
      .post('/user/login')
      .send(loginData);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Username is required');
  });

  // Test login with missing password
  it('should return 400 for missing password', async function () {
    const loginData = { username: 'validUser' }; // Password is missing
    const res = await request(app)
      .post('/user/login')
      .send(loginData);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Password is required');
  });
});
