import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Profile = () => {
  return (
    <div className="container mx-auto text-center">
      <h3 className="text-4xl font-bold">Profile page</h3>

      <Link href={"/"}>Home Page</Link>
    </div>
  );
};

export default Profile;

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

  //authorize user return session
  return {
    props: { session },
  };
}
