import { useState } from "react";
import { useAuth } from "../providers/useAuth";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import type { SigninInputs } from "../types";

function LoginPage() {
  const { signIn, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SigninInputs>();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const onSubmit = async (data: SigninInputs) => {
    setGeneralError(null);

    try {
      await signIn(data.email, data.password);
      navigate(params.get("redirectTo") || "/");
    } catch (e) {
      if (e instanceof Error) {
        setGeneralError(e.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="w-full min-h-dvh flex flex-col text-base">
        <div className="w-full bg-secondary absolute h-48 -z-10"></div>

        <main className="flex flex-1 justify-center items-center w-full">
          <div className="bg-white flex flex-col justify-center items-center w-116 min-h-116 border rounded-sm border-gray-300 shadow-md gap-y-8 px-16">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-12 w-full">
              <div className="logo flex flex-col gap-y-4 items-center w-full">
                <img src="/logo.png" width="64" height="64" alt="petknows logo" />
                <div>
                  <div className="flex gap-x-2 justify-center items-center">
                    <h1 className="uppercase text-2xl text-secondary">Petknows</h1>
                    <h2 className="uppercase text-gray-600">Admin</h2>
                  </div>
                  {generalError && <p className="text-sm text-red-600 text-center">{generalError}</p>}
                </div>
              </div>
              <div className="fields flex flex-col gap-y-13">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className={`${formErrors.email ? "border-2 border-red-300" : "border-gray-300"} border-b-2 outline-none`}
                />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className={`${formErrors.password ? "border-2 border-red-300" : "border-gray-300"} border-b-2 outline-none `}
                />
              </div>
              <input
                className="bg-accent hover:bg-[hsl(0_88%_40%)] disabled:bg-gray-300 transition-colors duration-100 text-white uppercase rounded-sm shadow-md py-1 cursor-pointer"
                type="submit"
                value="Login"
                disabled={loading}
              />
            </form>
            <Link to="/forgot-password">
              <p className="text-accent cursor-pointer hover:underline">Forgot password?</p>
            </Link>
          </div>
        </main>

        <footer className="flex pb-8 px-8 gap-y-4 flex-col items-center">
          <p className="max-w-191 text-center text-text uppercase">© PETKNOWS 2026</p>
          <p className="max-w-191 text-center text-text">
            Petknows is a pet registration and identification system developed by Merto, Avila, and Fernandez, students
            of Laguna State Polytechnic University – Siniloan Campus.
          </p>
        </footer>
      </div>
    </>
  );
}

export default LoginPage;
