import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "A conexão falhou";
        });

        //check user existence
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("Nenhum usuario encontrado nesse email.");
        }

        //compare
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        //incorrect password

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Usuario ou senha nao conferem.");
        }

        return result;
      },
    }),
  ],
  secret: "QOCcIWVcOYgBZFASM6ZyhnDLk6acSzDRCOHD1XA4EtA=",
});
