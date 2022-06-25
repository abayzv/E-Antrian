import axios from "axios";
import Link from "next/link";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { authCheckState, authUserState } from "../store/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";

export default function Navbar() {
  const router = useRouter();
  const setAuthCheck = useSetRecoilState(authCheckState);
  const authUser = useRecoilValueLoadable(authUserState);
  const logoutHandler = async () => {
    await axios.post("/logout");
    setAuthCheck(false);
    router.replace("/login");
  };

  useEffect(() => {}, [authUser.contents]);
  return (
    <nav className="border-b py-3 bg-white">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center">
              <img src="/assets/images/logo.png" className="w-full h-7"></img>
              {/* <span className="font-bold ml-2 text-xl">Mahesadev</span> */}
            </a>
          </Link>
          <div className="flex items-center">
            <Link href="/dashboard">
              <a className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition duration-200">
                Dashboard
              </a>
            </Link>
            <Link href="/customer">
              <a className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition duration-200">
                Customer
              </a>
            </Link>
            <Link href="/service">
              <a className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition duration-200">
                Service
              </a>
            </Link>
            <Link href="/vehicle">
              <a className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition duration-200">
                Vehicle
              </a>
            </Link>
            <Link href="/mechanic">
              <a className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition duration-200">
                Mechanic
              </a>
            </Link>
          </div>
          {authUser.contents && authUser.state === "hasValue" ? (
            <div className="flex items-center">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="focus:outline-none flex items-center px-4 py-2 rounded-lg font-medium transition duration-200">
                      <div className="flex-shrink-0 mr-3">
                        <img
                          className="rounded-full w-6 h-6"
                          src={authUser.contents.picture}
                          alt={authUser.contents.name}
                        />
                      </div>
                      <span>{authUser.contents.name}</span>
                    </Popover.Button>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Popover.Panel
                        static
                        className="py-1 absolute w-56 right-0 bg-white rounded-lg border shadow-sm overflow-hidden mt-1"
                      >
                        <Link href={`/${authUser.contents.username}`}>
                          <a className="block px-4 py-2 hover:bg-rose-500 hover:text-white transition-colors duration-200">
                            View Profile
                          </a>
                        </Link>
                        <Link href="/settings/profile">
                          <a className="block px-4 py-2 hover:bg-rose-500 hover:text-white transition-colors duration-200">
                            Update Profile
                          </a>
                        </Link>
                        <Link href="/settings/password">
                          <a className="block px-4 py-2 hover:bg-rose-500 hover:text-white transition-colors duration-200">
                            Update Password
                          </a>
                        </Link>
                        <button
                          onClick={logoutHandler}
                          className="focus:outline-none block px-4 py-2 hover:bg-rose-500 hover:text-white transition-colors duration-200 w-full text-left"
                        >
                          Logout
                        </button>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          ) : (
            <div className="flex items-center">
              <Link href="/login">
                <a className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition duration-200">
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition duration-200">
                  Register
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}