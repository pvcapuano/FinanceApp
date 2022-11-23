import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useSession, getSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Finance App</title>
        <meta name="description" content="Finance App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  );
}

//guest user
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">visitante</h3>

      <div className="flex justify-center">
        <Link legacyBehavior href={"/login"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-gray-700">
            Faça seu login
          </a>
        </Link>
      </div>
    </main>
  );
}

//authorized user
function User({ session, handleSignOut }: any) {
  return (
    <>
      <main className="container text-center  bg-gray-700 py-2 flex justify-between">
        <div className="flex justify-center items-start flex-col content-start px-5">
          <h3 className="text-1xl text-white color-white">
            Olá, {session.user.name}
          </h3>
          <h5 className="text-white text-xs">{session.user.email}</h5>
        </div>

        <div className="flex flex-row px-5 justify-center items-center">
          <Link legacyBehavior href={"/profile"}>
            <a className="flex justify-center items-center mr-2 h-7 p-2 rounded text-gray text-gray bg-white">
              Perfil
            </a>
          </Link>
          <button
            className="flex justify-center items-center rounded h-7 text-gray text-gray bg-white p-2"
            onClick={handleSignOut}
          >
            Sair
          </button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
