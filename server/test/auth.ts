import { jest, describe, expect, test } from '@jest/globals';
import { createClient, authenticate } from "../src/database.ts";
import express, { type Express, type Request, type Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

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
        const client =  {
            auth: {
                getClaims: jest.fn().mockResolvedValue({
                    data: {
                        claims: {
                            aud: "authenticated",
                            user_metadata: {
                                sub: null,
                                email: null,
                                email_verified: null
                            },
                        },
                        header: null,
                        signature: null
                    },
                    error: null
                })
            }
        }

        expect(await authenticate(client)).toBeTruthy();
    });

    test("Invalid user cookie", async () => {
        const client =  {
            auth: {
                getClaims: jest.fn().mockResolvedValue({
                    data: {
                        claims: {
                            aud: "fail",
                            user_metadata: {
                                sub: null,
                                email: null,
                                email_verified: null
                            },
                        },
                        header: null,
                        signature: null
                    },
                    error: null
                })
            }
        }

        expect(await authenticate(client)).toBeNull();
    });
});
