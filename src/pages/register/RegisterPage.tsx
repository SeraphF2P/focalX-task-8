import { Label } from "@/ui/Label";
import { ProfileImageUpload } from "@/ui/ProfileImageUpload";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginFormType,
  loginUser,
  SignUpFormType,
  signUpUser,
} from "../../store/slices/authSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { Btn } from "../../ui/Btn";
import { Input } from "../../ui/Input";
import { Logo } from "../../ui/Logo";

export const RegisterPage = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const token = useReduxSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  return (
    <main className=" h-screen flex  justify-center items-center w-full bg-gradient-to-tr  from-primary to-primary-accent">
      <section className=" rounded-[20px] flex flex-col justify-center gap-7   items-center p-[30.5px] w-full mx-2 max-w-[476px] bg-white md:min-h-[550px]  ">
        <Logo />
        <h1 className=" font-semibold uppercase text-[22px] ">
          {hasAccount ? "sign in" : "sign up"}
        </h1>
        <p className="  text-center text-[14px] text-gray">
          Enter your credentials to access your account
        </p>
        {hasAccount ? <LoginSection /> : <SignUpSection />}
        <div className=" leading-[17px] text-[14px] flex gap-1 text-gray">
          {hasAccount ? (
            <>
              <p>Don’t have an account? </p>
              <button
                onClick={() => setHasAccount(false)}
                className="  font-medium text-primary"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              <p>Do you have an account? </p>
              <button
                onClick={() => setHasAccount(true)}
                className="  font-medium text-primary"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
};
const LoginSection = () => {
  const dispatch = useReduxDispatch();
  const { loading } = useReduxSelector((state) => state.auth);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(
      formData.entries()
    ) as LoginFormType;

    await dispatch(loginUser(formDataObject));
  };
  return (
    <form onSubmit={handleSubmit} className=" flex flex-col w-full gap-7 ">
      <Input
        label={<Label>email</Label>}
        name="email"
        type="email"
        placeholder="Enter your email"
      />
      <Input
        label={<Label>password</Label>}
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <Btn className="w-full" disabled={loading}>
        sign in
      </Btn>
    </form>
  );
};
const SignUpSection = () => {
  const dispatch = useReduxDispatch();
  const { loading } = useReduxSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(
      formData.entries()
    ) as SignUpFormType;

    await dispatch(signUpUser(formDataObject));
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col w-full gap-2  md:max-h-[710px]"
    >
      <div className="flex gap-4">
        <Input
          label={<Label>first name</Label>}
          name="first_name"
          type="text"
          placeholder="first name"
        />
        <Input name="last_name" type="text" placeholder="last name" />
      </div>
      <Input
        label={<Label>email</Label>}
        name="email"
        type="email"
        placeholder="Enter your email"
      />
      <div className="flex gap-4">
        <Input
          label={<Label>password</Label>}
          name="password"
          placeholder="Enter your password"
          type="password"
        />
        <Input
          name="password_confirmation"
          placeholder="Re-enter your password"
          type="password"
        />
      </div>
      <ProfileImageUpload
        label={<Label>profile image</Label>}
        name="profile_image"
      />
      <Btn className="w-full" disabled={loading}>
        Sign Up
      </Btn>
    </form>
  );
};
