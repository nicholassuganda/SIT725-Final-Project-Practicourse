import request from 'supertest';
import { expect } from 'chai';
import { app } from '../index.js'; 

describe('Registration Page Tests', function () {
    
    // Test registration with missing username
    it('should return 400 for missing username', async function () {
        const userData = {
            password: 'validPassword',
            firstname: 'John',
            lastname: 'Doe',
            dob: '1990-01-01',
            gender: 'male',
            email: 'newuser@example.com',
            role: 'student'
        };

        const res = await request(app)
            .post('/user/register')
            .send(userData);

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Username is required');
    });

    // Test registration with missing password
    it('should return 400 for missing password', async function () {
        const userData = {
            username: 'newUser',
            firstname: 'John',
            lastname: 'Doe',
            dob: '1990-01-01',
            gender: 'male',
            email: 'newuser@example.com',
            role: 'student'
        };

        const res = await request(app)
            .post('/user/register')
            .send(userData);

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Password is required');
    });

});
