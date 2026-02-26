import { describe, expect, test } from '@jest/globals';
import { createClient, authenticate } from "../src/database.ts";
import express, { type Express, type Request, type Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

const testToken = process.env.SUPABASE_TEST_AUTH_TOKEN!;

// middleware
const app = express();
// 

describe("User Authentication", () => {
    test("No user cookie", async () => {
        const req: Request = getMockReq();
        const { res, next, mockClear } = getMockRes();
        const client = createClient(req, res);

        expect(await authenticate(client)).toBeNull();
    });

    test("Valid user cookie", async () => {
        const req: Request = getMockReq();
        req.headers.cookie = "sb-vjdjhqzqqiuzajazdkli-auth-token=" + testToken;
        const { res, next, mockClear } = getMockRes();
        const client = createClient(req, res);

        expect(await authenticate(client)).toBeTruthy();
    });
});
