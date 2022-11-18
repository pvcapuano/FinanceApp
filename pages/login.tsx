import React, { useState } from "react";
import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiOutlineFingerPrint } from "react-icons/hi";
import { signIn, signOut } from "next-auth/react";
import { useFormik, FormikProps } from "formik";
import { loginValidate } from "../lib/validate";
import { useRouter } from "next/router";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  //hooks
  const [show, setShow] = useState(false);
  const router = useRouter();
  // formik hook
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit: onSubmit,
  });

  async function onSubmit(values: any) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status?.ok) router.push(status.url);
  }

  //google
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
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

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className={styles.input_text}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-rose-500 text-xs">{formik.errors.email}</span>
          ) : (
            <></>
          )}
          <div className={styles.input_group}>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Senha"
              className={styles.input_text}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiOutlineFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500 text-xs">
              {formik.errors.password}
            </span>
          ) : (
            <></>
          )}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button" onClick={handleGoogleSignin}>
            <button type="button" className={styles.button_custom}>
              Login com Google
              <Image
                alt="google"
                src={"/assets/google.png"}
                width="20"
                height={20}
              ></Image>
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          Não tem uma conta?
          <Link legacyBehavior href={"/register"}>
            <a className="text-blue-700"> Cadastre-se</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
