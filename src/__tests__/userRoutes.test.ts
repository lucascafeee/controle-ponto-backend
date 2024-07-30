import request from 'supertest';
import { app, sequelize } from '../app';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('User Routes', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'João',
                email: 'joao@example.com',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });
});
