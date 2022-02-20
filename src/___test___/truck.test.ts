import supertest from "supertest";
import createServer from "../utils/createServer";

const app = createServer();

describe("truck", () => {
  describe("get truck route", () => {
    describe("get all trucks", () => {
      it("should return a 200", async () => {
        const { status, body } = await supertest(app).get(`/trucks`);

        expect(status).toBe(200);

        expect(body.status).toBe("success");

        expect(body.data).toEqual(expect.arrayContaining([expect.any(Object)]));
      });
    });

    describe("given truck does not exist", () => {
      it("should return a 404", async () => {
        const truckId = "test-123";
        await supertest(app).get(`/trucks/${truckId}`).expect(404);
      });
    });
    describe("given truck does exist", () => {
      it("should return a 200 status and the truck", async () => {
        const truckId = 6;
        await supertest(app).get(`/trucks/${truckId}`).expect(200);
      });
    });
    describe("Add a new truck with a name parameter", () => {
      it("should return a 201 status and a succcess message", async () => {
        const { status: statusCode, body } = await supertest(app)
          .post("/trucks")
          .send({ name: "testTruck" });

        expect(statusCode).toBe(201);

        expect(body.status).toEqual("success");
      });
    });
    describe("Add a new truck without name parameter", () => {
      it("should return a 400 status and an error message", async () => {
        const { status: statusCode, body } = await supertest(app)
          .post("/trucks")
          .send();

        expect(statusCode).toBe(400);

        expect(body.status).toEqual("error");
      });
    });
    describe("Update the truck that does not exist", () => {
      it("should return a 404 status and a error message", async () => {
        const truckId = "test-123";
        const { status: statusCode, body } = await supertest(app)
          .put(`/trucks/${truckId}`)
          .send({ name: "testTruck" });

        expect(statusCode).toBe(404);

        expect(body.status).toEqual("error");
      });
    });
    // describe("Update the truck with a name parameter", () => {
    //   it("should return a 200 status and a succcess message", async () => {
    //     const truckId = 6;
    //     const { status: statusCode, body } = await supertest(app)
    //       .put(`/trucks/${truckId}`)
    //       .send({ name: "newTruck" });

    //     expect(statusCode).toBe(200);

    //     expect(body.status).toEqual("success");
    //   });
    // });
    describe("Delete a truck by ID", () => {
      it("should return a 200 status and a succcess message", async () => {
        const { body: selectBody } = await supertest(app).get(`/trucks/lastid`);

        const truckId = selectBody.data[0].id;

        const { status: statusCode, body } = await supertest(app).delete(
          `/trucks/${truckId}`
        );

        expect(statusCode).toBe(200);

        expect(body.status).toEqual("success");
      });
    });
    describe("Delete the truck that does not exist", () => {
      it("should return a 404 status and a error message", async () => {
        const truckId = "test-123";
        const { status: statusCode, body } = await supertest(app).delete(
          `/trucks/${truckId}`
        );

        expect(statusCode).toBe(404);

        expect(body.status).toEqual("error");
      });
    });
  });
});
