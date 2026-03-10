import { jest, describe, expect, test } from '@jest/globals';
import express, { type Express, type Request, type Response } from 'express';
import request from "supertest";
import { getMockReq, getMockRes } from '@jest-mock/express';

jest.unstable_mockModule('../src/database.ts', () => ({
    authenticate: () => {},
    createClient: () => ({
            from: (table) => ({
                insert: ({ id, username }) => ({})
            }),
            auth: {
                verifyOtp: ({ type, token_hash }) => {
                    if (token_hash == "bad") return Promise.resolve({ 
                        data: null, 
                        error: "bad hash" 
                    });
                    return Promise.resolve({
                        data: {
                            user: {
                                user_metadata: {
                                    sub: null,
                                    display_name: null
                                }
                            }
                        },
                        error: null
                    });
                }
            }
    })
}));
const { default: app } = await import("../src/app.ts");

describe("User Email Verification", () => {
    test("no params", async () => {
        const res = await request(app).get('/auth/confirm');
        expect(res.statusCode).toBe(500);
    });

    test("only token hash", async () => {
        const res = await request(app)
            .get('/auth/confirm')
            .query("token_hash=test");
        expect(res.statusCode).toBe(500);
    });

    test("only token type", async () => {
        const res = await request(app)
            .get('/auth/confirm')
            .query("type=test");
        expect(res.statusCode).toBe(500);
    });

    test("bad auth data", async () => {
        const res = await request(app)
            .get('/auth/confirm')
            .query('token_hash=bad')
            .query('type=test');
        expect(res.statusCode).toBe(303);
        expect(res.headers.location).toContain('/auth/error');

        const errorRes = await request(app)
            .get('/auth/error');
        expect(errorRes.statusCode).toBe(401);
    });

    test("success auth", async () => {
        const res = await request(app)
            .get('/auth/confirm')
            .query('token_hash=test')
            .query('type=test')
        expect(res.statusCode).toBe(303);
        expect(res.headers.location).not.toContain('/auth/error');
    });
});
