import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Link from "next/link";
import { Input, Label, Button, Error } from "../../components/Form";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authCheckState } from "../../store/auth";
import { useRouter } from "next/router";
export default function Login() {
  const [errors, setErrors] = useState([]);
  const setAuth = useSetRecoilState(authCheckState);
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("login", form);
      setAuth(form);
      router.replace("/dashboard");
    } catch (r) {
      setErrors(r.response.data.errors);
    }
  };
  return (
    <Layout middleware="guest" title="Login">
      <div className="mx-auto max-w-screen-sm px-4">
        <Card
          header={
            <>
              <h1 className="text-gray-800 text-xl font-semibold">Login</h1>
              <p className="text-sm text-gray-500">
                Silahkan masukan email dan password untuk melanjutkan
              </p>
            </>
          }
        >
          <form onSubmit={submitHandler}>
            <div className="mb-5">
              <Label htmlFor="email">Email</Label>
              <Input
                value={form.email}
                onChange={(e) =>
                  setForm((form) => ({ ...form, email: e.target.value }))
                }
                type="email"
                name="email"
                id="email"
              />
              {errors && errors.email && <Error message={errors.email} />}
            </div>
            <div className="mb-5">
              <Label htmlFor="password">password</Label>
              <Input
                value={form.password}
                onChange={(e) =>
                  setForm((form) => ({ ...form, password: e.target.value }))
                }
                type="password"
                name="password"
                id="password"
              />
              {errors && errors.password && <Error message={errors.password} />}
            </div>
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  value={form.remember}
                  onChange={(e) =>
                    setForm((form) => ({ ...form, remember: e.target.value }))
                  }
                  type="checkbox"
                  name="remeber"
                  id="remember"
                  className="form-checkbox shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 rounded"
                />
                <label htmlFor="remember" className="ml-2">
                  Remember
                </label>
              </div>
              {/* <Link href="/forgot-password">
                <a className="text-blue-500 hover:underline">Forgot Password</a>
              </Link> */}
            </div>
            <Button>Login</Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
