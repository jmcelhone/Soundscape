import { jest } from "@jest/globals";
import request from "supertest";

// ESM-safe mocking of the database module
await jest.unstable_mockModule("../database.ts", () => {
  return {
    createClient: jest.fn(() => {
      return {
        from: jest.fn(() => ({
          insert: jest.fn(() => ({
            select: jest.fn(() => ({
              single: jest.fn(async () => ({
                data: {
                  postid: 123,
                  userid: "fake-user-id",
                  location: "(44.565,-123.276)",
                  comment: {
                    songTitle: "Test Song",
                    artistName: "Test Artist",
                    text: "hello",
                  },
                  time: new Date().toISOString(),
                },
                error: null,
              })),
            })),
          })),
        })),
      };
    }),

    // Default mock authentication success
    authenticate: jest.fn(async () => ({
      uid: "fake-user-id",
      email: "test@test.com",
      email_verified: true,
    })),
  };
});

const { default: app } = await import("../app.ts");
const database = await import("../database.ts");

describe("POST /posts", () => {

  test("201 creates a post when payload is valid", async () => {
    const res = await request(app)
      .post("/posts")
      .send({
        songTitle: "Test Song",
        artistName: "Test Artist",
        latitude: 44.565,
        longitude: -123.276,
        comment: "hello",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("postid");
  });

  test("400 when songTitle is missing", async () => {
    const res = await request(app)
      .post("/posts")
      .send({
        artistName: "Test Artist",
        latitude: 44.565,
        longitude: -123.276,
        comment: "hello",
      });

    expect(res.status).toBe(400);
    expect(res.text).toMatch(/songTitle is required/i);
  });

  test("400 when latitude/longitude are not numbers", async () => {
    const res = await request(app)
      .post("/posts")
      .send({
        songTitle: "Test Song",
        latitude: "nope",
        longitude: -123.276,
        comment: "hello",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("401 when user is not authenticated", async () => {
    (database.authenticate as jest.Mock).mockResolvedValueOnce(null);

    const res = await request(app)
      .post("/posts")
      .send({
        songTitle: "Test Song",
        artistName: "Test Artist",
        latitude: 44.565,
        longitude: -123.276,
        comment: "hello",
      });

    expect(res.status).toBe(401);
  });

});