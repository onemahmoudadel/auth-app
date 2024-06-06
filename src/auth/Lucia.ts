import { Lucia } from "lucia";

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			
			secure: process.env.NODE_ENV === "production"
		},
    
	},
  getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
		};
	}
}); 

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
    DatabaseUserAttributes: User;
	}
}
type User = {
  email: String,
  id: String,
  firstName: String,
  lastName: String,
}
