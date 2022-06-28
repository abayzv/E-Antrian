import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Container from "../../components/Container";
import { Label, Input, Button, Error } from "../../components/Form";
import { useRecoilValueLoadable } from "recoil";
import { authUserState } from "../../store/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toaster from "toasted-notes";
export default function Profile() {
  const authUser = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put("user/profile-information", form);
      toaster.notify(
        `The profile has been updated ${
          form.email !== authUser.contents.email &&
          "and you need to verify your email address."
        }`,
        {
          position: "bottom-right",
        }
      );
      if (form.email !== authUser.contents.email) {
        router.replace("/settings/verify-email");
      }
    } catch (r) {
      setErrors(r.response.data.errors);
    }
  };

  useEffect(() => {
    setForm((form) => ({
      ...form,
      username: authUser.contents.username,
      name: authUser.contents.name,
      email: authUser.contents.email,
    }));
    if (
      authUser.state === "hasValue" &&
      authUser.contents &&
      !authUser.contents.has_verified
    ) {
      router.replace("/settings/verify-email");
    }
  }, [authUser.contents]);
  return (
    <Layout middleware="auth" title="Update Profile Information">
      <Container>
        <Card
          header={
            <>
              <h1 className="font-semibold text-xl">
                Update Profile Information
              </h1>
              <div className="text-sm text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos, sit.
              </div>
            </>
          }
        >
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-6">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((form) => ({ ...form, name: e.target.value }))
                  }
                  type="text"
                  name="name"
                  id="name"
                />
                {errors && errors.name && <Error message={errors.name} />}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-6">
                <Label htmlFor="username">Username</Label>
                <Input
                  value={form.username}
                  onChange={(e) =>
                    setForm((form) => ({ ...form, username: e.target.value }))
                  }
                  type="text"
                  name="username"
                  id="username"
                />
                {errors && errors.username && (
                  <Error message={errors.username} />
                )}
              </div>
              <div className="mb-6">
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
            </div>
            <Button>Update Profile</Button>
          </form>
        </Card>
      </Container>
    </Layout>
  );
}
