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
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">usuário</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-5 px-10 py-1 rounded-sm bg-blue-500"
          onClick={handleSignOut}
        >
          Sair
        </button>
      </div>

      <div className="flex justify-center">
        <Link legacyBehavior href={"/profile"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-gray-700">
            Vá para seu perfil
          </a>
        </Link>
      </div>
    </main>
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
