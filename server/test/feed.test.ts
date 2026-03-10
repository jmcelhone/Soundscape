import { jest } from "@jest/globals";
import request from "supertest";

let mockUserData: {
  uid: string;
  email: string;
  email_verified: boolean;
} | null = {
  uid: "fake-user-id",
  email: "test@test.com",
  email_verified: true,
};

let mockPostsRows: Array<{
  postid: number;
  userid: string;
  time: string;
  location: string;
  comment: {
    songTitle?: string;
    artistName?: string;
    text?: string;
  } | null;
}> = [];
let mockPostsError: any = null;

let mockUsernameRows: Array<{
  userid: string;
  username?: string;
}> = [];
let mockUsernamesError: any = null;

await jest.unstable_mockModule("../src/database.ts", () => {
  return {
    createClient: jest.fn(() => {
      return {
        from: jest.fn((tableName: string) => {
          if (tableName === "posts") {
            return {
              select: jest.fn(() => ({
                order: jest.fn(() => ({
                  limit: jest.fn(async () => ({
                    data: mockPostsRows,
                    error: mockPostsError,
                  })),
                })),
              })),
            };
          }

          if (tableName === "usernames") {
            return {
              select: jest.fn(() => ({
                in: jest.fn(async () => ({
                  data: mockUsernameRows,
                  error: mockUsernamesError,
                })),
              })),
            };
          }

          throw new Error(`Unexpected table: ${tableName}`);
        }),
      };
    }),

    authenticate: jest.fn(async () => mockUserData),
  };
});

const { default: app } = await import("../src/app.ts");

describe("GET /feed", () => {
  beforeEach(() => {
    mockUserData = {
      uid: "fake-user-id",
      email: "test@test.com",
      email_verified: true,
    };

    mockPostsRows = [];
    mockPostsError = null;

    mockUsernameRows = [];
    mockUsernamesError = null;
  });

  test("401 when user is not authenticated", async () => {
    mockUserData = null;

    const res = await request(app).get("/feed");

    expect(res.status).toBe(401);
    expect(res.text).toMatch(/authorization failed/i);
  });

  test("200 returns empty feed object when there are no posts", async () => {
    mockPostsRows = [];
    mockUsernameRows = [];

    const res = await request(app).get("/feed");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      posts: [],
      users: [],
    });
  });

  test("200 returns feed posts and users", async () => {
    mockPostsRows = [
      {
        postid: 1,
        userid: "fake-user-id",
        time: new Date().toISOString(),
        location: "(44.565,-123.276)",
        comment: {
          songTitle: "My Song",
          artistName: "My Artist",
          text: "hello world",
        },
      },
      {
        postid: 2,
        userid: "friend-1",
        time: new Date().toISOString(),
        location: "(44.567,-123.280)",
        comment: {
          songTitle: "Friend Song",
          artistName: "Friend Artist",
          text: "friend comment",
        },
      },
    ];

    mockUsernameRows = [
      { userid: "fake-user-id", username: "me" },
      { userid: "friend-1", username: "friend" },
    ];

    const res = await request(app).get("/feed");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("posts");
    expect(res.body).toHaveProperty("users");
    expect(Array.isArray(res.body.posts)).toBe(true);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.posts).toHaveLength(2);
    expect(res.body.users).toHaveLength(2);
    expect(res.body.posts[0]).toHaveProperty("postid");
    expect(res.body.posts[0]).toHaveProperty("location");
    expect(res.body.posts[0]).toHaveProperty("comment");
  });

  test("500 when posts query fails", async () => {
    mockPostsError = { message: "posts query failed" };

    const res = await request(app).get("/feed");

    expect(res.status).toBe(500);
    expect(res.text).toMatch(/posts query failed|server error/i);
  });

  test("500 when usernames query fails", async () => {
    mockPostsRows = [
      {
        postid: 1,
        userid: "fake-user-id",
        time: new Date().toISOString(),
        location: "(44.565,-123.276)",
        comment: {
          songTitle: "My Song",
          artistName: "My Artist",
          text: "hello world",
        },
      },
    ];

    mockUsernamesError = { message: "usernames query failed" };

    const res = await request(app).get("/feed");

    expect(res.status).toBe(500);
    expect(res.text).toMatch(/users query failed|server error/i);
  });
});