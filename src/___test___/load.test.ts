import supertest from 'supertest';
import createServer from '../utils/createServer';

const app = createServer();

describe('load', () => {
  describe('get load route', () => {
    describe('get all loads', () => {
      it('should return a 200', async () => {
        const { status, body } = await supertest(app).get(`/loads`);

        expect(status).toBe(200);

        expect(body.status).toBe('success');

        expect(body.data).toEqual(expect.arrayContaining([expect.any(Object)]));
      });
    });

    describe('given loaded truck id does not exist', () => {
      it('should return a 404', async () => {
        const truckId = 'test-123';
        await supertest(app).get(`/loads/${truckId}`).expect(404);
      });
    });

    describe('given loaded truck id does exist', () => {
      it('should return a 200 status and the load details', async () => {
        const truckId = 6;
        const { status, body } = await supertest(app).get(`/loads/${truckId}`);

        expect(status).toBe(200);

        expect(body.status).toBe('success');

        expect(body.data).toEqual(expect.arrayContaining([expect.any(Object)]));
      });
    });

    describe('Load given truck id with parcel', () => {
      it('should return a 201 status and a succcess message', async () => {
        const truckId = 7;
        const parcelId = 2;
        const { status: statusCode, body } = await supertest(app)
          .post('/loads')
          .send({ truck_id: truckId, parcel_id: parcelId });

        expect(statusCode).toBe(201);

        expect(body.status).toEqual('success');
      });
    });

    describe('Load given truckId/parcelId which does not exist', () => {
      it('should return a 400 status and an error message', async () => {
        const { status: statusCode, body } = await supertest(app)
          .post('/loads')
          .send();

        expect(statusCode).toBe(400);

        expect(body.status).toEqual('error');
      });
    });

    describe('Unload the truck that does not exist', () => {
      it('should return a 404 status and a error message', async () => {
        const truckId = 'test-123';
        const parcelId = 'test-1234';
        const { status: statusCode, body } = await supertest(app)
          .put(`/loads`)
          .send({ truck_id: truckId, parcel_id: parcelId });

        expect(statusCode).toBe(404);

        expect(body.status).toEqual('error');
      });
    });
  });
});
