import request from 'supertest';
import { app, sequelize } from '../app';

let userId: number;
let sessionId: number;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    const res = await request(app)
        .post('/api/users')
        .send({
            name: 'João',
            email: 'joao@example.com',
        });
    userId = res.body.id;
});

afterAll(async () => {
    await sequelize.close();
});

describe('Work Session Routes', () => {
    it('should start a work session', async () => {
        const res = await request(app)
            .post('/api/work-sessions/start')
            .send({
                userId,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        sessionId = res.body.id;
    });

    it('should end a work session', async () => {
        const res = await request(app)
            .post('/api/work-sessions/end')
            .send({
                sessionId,
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.endTime).not.toBeNull();
    });

    it('should get work sessions for a user', async () => {
        const res = await request(app).get(`/api/work-sessions/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
