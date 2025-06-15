/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: number;
			email: string;
			username: string;
			role: string;
		};
	}
	interface User {
		id: number;
	}
}
