import { jest } from "@jest/globals";
import request from "supertest";

// Mock control variables
let mockUserData: {
  uid: string;
  email: string;
  email_verified: boolean;
} | null = {
  uid: "fake-user-id",
  email: "test@test.com",
  email_verified: true,
};

let mockFriendsRows: Array<{ userid1: string; userid2: string }> = [];
let mockFriendError: any = null;

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

// ESM-safe mocking of database.ts
await jest.unstable_mockModule("../src/database.ts", () => {
  return {
    createClient: jest.fn(() => {
      return {
        from: jest.fn((tableName: string) => {
          if (tableName === "friends") {
            return {
              select: jest.fn(() => ({
                or: jest.fn(async () => ({
                  data: mockFriendsRows,
                  error: mockFriendError,
                })),
              })),
            };
          }

          if (tableName === "posts") {
            return {
              select: jest.fn(() => ({
                in: jest.fn(() => ({
                  order: jest.fn(() => ({
                    limit: jest.fn(async () => ({
                      data: mockPostsRows,
                      error: mockPostsError,
                    })),
                  })),
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

    mockFriendsRows = [];
    mockFriendError = null;

    mockPostsRows = [];
    mockPostsError = null;
  });

  test("401 when user is not authenticated", async () => {
    mockUserData = null;

    const res = await request(app).get("/feed");

    expect(res.status).toBe(401);
    expect(res.text).toMatch(/authorization failed/i);
  });

  test("200 returns empty array when there are no posts", async () => {
    mockFriendsRows = [];
    mockPostsRows = [];

    const res = await request(app).get("/feed");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("200 returns feed posts", async () => {
    mockFriendsRows = [
      { userid1: "fake-user-id", userid2: "friend-1" },
    ];

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

    const res = await request(app).get("/feed");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("postid");
    expect(res.body[0]).toHaveProperty("location");
    expect(res.body[0]).toHaveProperty("comment");
  });

  test("500 when friends query fails", async () => {
    mockFriendError = { message: "friends query failed" };

    const res = await request(app).get("/feed");

    expect(res.status).toBe(500);
    expect(res.text).toMatch(/friends query failed/i);
  });

  test("500 when posts query fails", async () => {
    mockFriendsRows = [
      { userid1: "fake-user-id", userid2: "friend-1" },
    ];
    mockPostsError = { message: "posts query failed" };

    const res = await request(app).get("/feed");

    expect(res.status).toBe(500);
    expect(res.text).toMatch(/posts query failed/i);
  });
});