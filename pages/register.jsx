import React, { useState } from "react";
import Head from "next/head";

import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiOutlineFingerPrint, HiUser } from "react-icons/hi";

const Register = () => {
  const [show, setShow] = useState({ password: false, confirmPassword: false });
  return (
    <Layout>
      <Head>
        <title>Cadastro</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-black-800 text-4xl font-bold py-4">Bem vindo</h1>
          <p className="w-3/4 mx-auto text-black-400">Faça seu cadastro</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className={styles.input_group}>
            <input
              type="text"
              name="username"
              placeholder="Usuário"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4">
              <HiUser size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Senha"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiOutlineFingerPrint size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.confirmPassword ? "text" : "password"}`}
              name="password"
              placeholder="Confirme sua senha"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() =>
                setShow({ ...show, confirmPassword: !show.confirmPassword })
              }
            >
              <HiOutlineFingerPrint size={25} />
            </span>
          </div>

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          Já possui uma conta?
          <Link legacyBehavior href={"/login"}>
            <a className="text-blue-700"> Faça o login</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Register;
