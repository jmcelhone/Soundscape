import { jest } from "@jest/globals";
import request from "supertest";

// ESM-safe mocking
await jest.unstable_mockModule("../database.ts", () => {
  return {
    createClient: jest.fn(() => {
      // fake supabase client
      return {
        from: jest.fn(() => ({
          insert: jest.fn(() => ({
            select: jest.fn(() => ({
              single: jest.fn(async () => ({
                data: {
                  postid: 123,
                  userid: "fake-user-id",
                  songtitle: "Test Song",
                  artistname: "Test Artist",
                  latitude: 44.565,
                  longitude: -123.276,
                  comment: "hello",
                },
                error: null,
              })),
            })),
          })),
        })),
      };
    }),

    // pretend auth succeeded
    authenticate: jest.fn(async () => ({
      uid: "fake-user-id",
      email: "test@test.com",
      email_verified: true,
    })),
  };
});

const { default: app } = await import("../app.ts");

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
    expect(res.body.songtitle).toBe("Test Song");
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
});