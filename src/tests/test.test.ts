import supertest from 'supertest';
import { initApp } from '../app.test';
test('Route status must send a 200 OK response with Ok body', async () => {
    await supertest(await initApp())
        .get('/api/v1/tests')
        .set('Accept', 'application/json')
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.test)).toStrictEqual(true);
        });
});
