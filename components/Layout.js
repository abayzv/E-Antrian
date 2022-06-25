import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import useVerifyEmail from "../hooks/useVerifyEmail";
import { authUserState } from "../store/auth";
import Navbar from "./Navbar";
export default function Layout({ title, children, middleware }) {
  const router = useRouter();
  const authUser = useRecoilValueLoadable(authUserState);
  const { resendEmailVerification, loading } = useVerifyEmail();
  useEffect(() => {
    if (
      middleware === "guest" &&
      authUser.state === "hasValue" &&
      authUser.contents
    ) {
      router.replace("/dashboard");
    }

    if (middleware === "auth" && authUser.contents == null) {
      router.replace("/login");
    }
  }, [authUser.contents]);
  return (
    <div>
      <Head>
        <title>{title || "Toska"}</title>
      </Head>
      {authUser.contents &&
        authUser.state === "hasValue" &&
        !authUser.contents.has_verified && (
          <button
            onClick={resendEmailVerification}
            className="focus:outline-none px-4 py-4 text-white bg-rose-500 hover:bg-rose-600 transition-colors duration-200 w-full"
          >
            {loading
              ? "Loading . . ."
              : "You need to verify your email address before continue."}
          </button>
        )}
      <Navbar />
      <div className="pt-5 min-h-screen md:pt-10">{children}</div>
      <footer className="mt-5 p-3 bg-white text-center">
        Copyright @Mahesadev 2022
      </footer>
    </div>
  );
}
