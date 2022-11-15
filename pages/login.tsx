import React from "react";
import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";

const Login = () => {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-black-800 text-4xl font-bold py-4">Bem vindo</h1>
          <p className="w-3/4 mx-auto text-black-400">Faça seu login</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="input-group">
            <input type="email" name="email" placeholder="E-mail" />
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="Senha" />
          </div>

          <div className="input-button">
            <button type="submit">Login</button>
          </div>
          <div className="input-button">
            <button type="submit">Login com Google</button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          Não tem uma conta?{" "}
          <Link legacyBehavior href={"/register"}>
            <a className="text-blue-700">Cadastre-se</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
