import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import User from "../../../models/User";
import Role from "../../../models/Role";

export default NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "username", type: "text", placeholder: "Enter your username" },
				password: { label: "password", type: "password", placeholder: "Enter your password" },
			},
			async authorize(credentials) {
				const user = await User.findOne({ where: { username: credentials.username } });
				if (!user) {
					throw new Error("No user found with the given username");
				}
				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) throw new Error("Incorrect password");
				const role = await Role.findByPk(user.role_id);
				return {
					id: user.user_id,
					username: user.username,
					email: user.email,
					role: role.name,
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.username = user.username;
				token.email = user.email;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.username = token.username;
			session.user.role = token.role;
			return session;
		},
	},
});
