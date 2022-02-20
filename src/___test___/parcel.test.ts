import supertest from 'supertest';
import createServer from '../utils/createServer';

const app = createServer();

describe('parcel', () => {
  describe('get parcel route', () => {
    describe('get all parcels', () => {
      it('should return a 200', async () => {
        const { status, body } = await supertest(app).get(`/parcels`);

        expect(status).toBe(200);

        expect(body.status).toBe('success');

        expect(body.data).toEqual(expect.arrayContaining([expect.any(Object)]));
      });
    });

    describe('given parcel does not exist', () => {
      it('should return a 404', async () => {
        const parcelId = 'test-123';
        await supertest(app).get(`/parcels/${parcelId}`).expect(404);
      });
    });

    describe('given parcel does exist', () => {
      it('should return a 200 status and the parcel', async () => {
        const parcelId = 2;
        const { status, body } = await supertest(app).get(
          `/parcels/${parcelId}`
        );

        expect(status).toBe(200);

        expect(body.status).toBe('success');

        expect(body.data).toEqual(expect.arrayContaining([expect.any(Object)]));
      });
    });

    describe('Add a new parcel with a name and weight parameter', () => {
      it('should return a 201 status and a succcess message', async () => {
        const { status: statusCode, body } = await supertest(app)
          .post('/parcels')
          .send({ name: 'testParcel', weight: 15.5 });

        expect(statusCode).toBe(201);

        expect(body.status).toEqual('success');
      });
    });

    describe('Add a new parcel without name and weight parameter', () => {
      it('should return a 400 status and an error message', async () => {
        const { status: statusCode, body } = await supertest(app)
          .post('/parcels')
          .send();

        expect(statusCode).toBe(400);

        expect(body.status).toEqual('error');
      });
    });

    describe('Update the parcel that does not exist', () => {
      it('should return a 404 status and a error message', async () => {
        const parcelId = 'test-123';
        const { status: statusCode, body } = await supertest(app)
          .put(`/trucks/${parcelId}`)
          .send({ name: 'testParcel2', weight: 25.5 });

        expect(statusCode).toBe(404);

        expect(body.status).toEqual('error');
      });
    });

    describe('Update the parcel with a name and weight parameter', () => {
      it('should return a 200 status and a succcess message', async () => {
        const parcelId = 1;
        const { status: statusCode, body } = await supertest(app)
          .put(`/parcels/${parcelId}`)
          .send({ name: 'updatedParcel', weight: 99 });

        expect(statusCode).toBe(200);

        expect(body.status).toEqual('success');
      });
    });

    describe('Delete a parcel by ID', () => {
      it('should return a 200 status and a succcess message', async () => {
        const { body: selectBody } = await supertest(app).get(
          '/parcels/lastid'
        );

        const parcelId = selectBody.data[0].id;

        const { status: statusCode, body } = await supertest(app).delete(
          `/parcels/${parcelId}`
        );

        expect(statusCode).toBe(200);

        expect(body.status).toEqual('success');
      });
    });

    describe('Delete the parcel that does not exist', () => {
      it('should return a 404 status and a error message', async () => {
        const parcelId = 'test-123';
        const { status: statusCode, body } = await supertest(app).delete(
          `/parcels/${parcelId}`
        );

        expect(statusCode).toBe(404);

        expect(body.status).toEqual('error');
      });
    });
  });
});
