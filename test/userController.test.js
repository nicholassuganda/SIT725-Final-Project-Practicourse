import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { expect } from 'chai';
import { app } from '../index.js';  // Make sure this points to your Express app

let mongoServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Controller Tests', () => {
    describe('POST /user/register', () => {
        it('should register a user successfully', async () => {
            const userData = {
                username: 'testUser',
                password: 'testPassword',
                firstname: 'Test',
                lastname: 'User',
                dob: '2000-01-01',
                gender: 'male',
                email: 'test@example.com',
                role: 'student'
            };

            const res = await request(app)
                .post('/user/register')
                .send(userData);
            
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('User registered successfully!');
        });

        it('should return 400 for missing username', async () => {
            const userData = {
                password: 'testPassword',
                firstname: 'Test',
                lastname: 'User',
                dob: '2000-01-01',
                gender: 'male',
                email: 'test@example.com',
                role: 'student'
            };

            const res = await request(app)
                .post('/user/register')
                .send(userData);
            
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Username is required');
        });

        it('should return 400 for missing password', async () => {
            const userData = {
                username: 'testUser',
                firstname: 'Test',
                lastname: 'User',
                dob: '2000-01-01',
                gender: 'male',
                email: 'test@example.com',
                role: 'student'
            };

            const res = await request(app)
                .post('/user/register')
                .send(userData);
            
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Password is required');
        });
    });

    describe('POST /user/login', () => {
        it('should login successfully with valid credentials', async () => {
            const userData = {
                username: 'testUser',
                password: 'testPassword'
            };

            const res = await request(app)
                .post('/user/login')
                .send(userData);
            
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Login successful!');
        });

        it('should return 401 for incorrect password', async () => {
            const userData = {
                username: 'testUser',
                password: 'wrongPassword'
            };

            const res = await request(app)
                .post('/user/login')
                .send(userData);
            
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Invalid password');
        });

        it('should return 404 for non-existent username', async () => {
            const userData = {
                username: 'nonExistentUser',
                password: 'testPassword'
            };

            const res = await request(app)
                .post('/user/login')
                .send(userData);
            
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('User not found');
        });
    });

    describe('POST /user/searchUsername', () => {
        it('should return user details for a valid username', async () => {
            const userData = {
                username: 'testUser'
            };

            const res = await request(app)
                .post('/user/searchUsername')
                .send(userData);
            
            expect(res.status).to.equal(200);
            expect(res.body.username).to.equal('testUser');
        });

        it('should return 404 for non-existent username', async () => {
            const userData = {
                username: 'nonExistentUser'
            };

            const res = await request(app)
                .post('/user/searchUsername')
                .send(userData);
            
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('User not found');
        });
    });
});
