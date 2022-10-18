import app from '../index';
import request from 'supertest';

describe('Testing endpoints', () => {
    describe('Test the root endpoint', () => {
        it('1. GET /api', async () => {
            const res = await request(app)
                .get('/api')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(res.body.data).toEqual('The root working');
        });
    });
    describe('Test the images endpoints', () => {
        it('1. GET /api/images -> Receive the required information message ', async () => {
            const res = await request(app)
                .get('/api/images')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(res.body.message).toEqual(
                'Specify the image name, width, and height'
            );
        });
        it('2. GET /api/images?filename=wolf -> Receive the original image', async () => {
            await request(app)
                .get('/api/images?filename=wolf')
                .expect('Content-Type', /image\/*/)
                .expect(200);
        });
        it('3. GET /api/images?filename=wolf&width=300&height=500 -> Receive the processed image', async () => {
            await request(app)
                .get('/api/images?filename=wolf&width=300&height=500')
                .expect('Content-Type', /image\/*/)
                .expect(200);
        });
        it('4. GET /api/images?filename=notFound -> Receive error message not found', async () => {
            const res = await request(app)
                .get('/api/images?filename=notFound')
                .expect(400)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);
            expect(res.body.message).toEqual('Image not found');
        });
    });
});
