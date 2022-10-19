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
        it('1. GET /api/images?filename=wolf (no width or height) --> Receive the original image', async () => {
            await request(app)
                .get('/api/images?filename=wolf')
                .expect('Content-Type', /image\/*/)
                .expect(200);
        });
        it('2. GET /api/images?filename=wolf&width=300&height=500 -> Receive the processed image', async () => {
            await request(app)
                .get('/api/images?filename=wolf&width=300&height=500')
                .expect('Content-Type', /image\/*/)
                .expect(200);
        });
        it('3. GET /api/images (no filename) --> Receive specific error message', async () => {
            const res = await request(app)
                .get('/api/images')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);
            expect(res.body.message).toEqual(
                'Please provide the image name, width, and height'
            );
        });
        it('4. GET /api/images?filename=notFound (wrong filename) --> Receive specific error message', async () => {
            const res = await request(app)
                .get('/api/images?filename=notFound')
                .expect(400)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);
            expect(res.body.message).toEqual('Image is not found');
        });
        it('5. GET /api/images?filename=wolf&width=ab&height=cd (invalid height or width) -> Receive specific error message', async () => {
            const res = await request(app)
                .get('/api/images?filename=wolf&width=ab&height=cd')
                .expect(400)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);
            expect(res.body.message).toEqual('Invalid width or height value');
        });
    });
});
