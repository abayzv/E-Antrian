import React from "react";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import axios from "axios";
import Link from "next/link";
import { useRecoilValueLoadable } from "recoil";
import { authUserState } from "../../store/auth";
export default function User({ user }) {
  const authUser = JSON.parse(localStorage.getItem("user"));
  return (
    <Layout title={user.name}>
      <Container>
        <div className="max-w-sm">
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <img
                className="w-12 h-12 rounded-full"
                src={user.picture}
                alt={user.username}
              />
            </div>
            <div>
              <h1 className="text-xl mb-2">
                <span className="font-semibold">{user.name}</span>{" "}
                <span className="text-gray-500">(@{user.username})</span>
              </h1>
              <p className="text-gray-600">Joined At {user.joined}</p>

              {authUser.contents &&
                authUser.state === "hasValue" &&
                authUser.contents.id === user.id && (
                  <div className="mt-5">
                    <Link href="/settings/profile">
                      <a className="inline-flex items-center justify-center px-4 h-10 text-center text-white bg-rose-500 hover:bg-rose-600 focus:ring focus:ring-rose-200 transition duration-200 rounded-lg">
                        Settings
                      </a>
                    </Link>
                  </div>
                )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `http://localhost:8000/api/profile/${params.username}`
  );
  return {
    props: {
      user: data.data,
    },
  };
}
