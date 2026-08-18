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
      <div className="flex min-h-dvh w-full flex-col text-base">
        <div className="bg-secondary absolute -z-10 h-48 w-full"></div>

        <main className="flex w-full flex-1 items-center justify-center">
          <div className="flex min-h-116 w-116 flex-col items-center justify-center gap-y-8 rounded-sm border border-gray-300 bg-white px-16 shadow-md">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-y-12"
            >
              <div className="logo flex w-full flex-col items-center gap-y-4">
                <img
                  src="/logo.png"
                  width="64"
                  height="64"
                  alt="petknows logo"
                />
                <div>
                  <div className="flex items-center justify-center gap-x-2">
                    <h1 className="text-secondary text-2xl uppercase">
                      Petknows
                    </h1>
                    <h2 className="text-gray-600 uppercase">Admin</h2>
                  </div>
                  {generalError && (
                    <p className="text-center text-sm text-red-600">
                      {generalError}
                    </p>
                  )}
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
                  className={`${formErrors.password ? "border-2 border-red-300" : "border-gray-300"} border-b-2 outline-none`}
                />
              </div>
              <input
                className="bg-accent cursor-pointer rounded-sm py-1 text-white uppercase shadow-md transition-colors duration-100 hover:bg-[hsl(0_88%_40%)] disabled:bg-gray-300"
                type="submit"
                value="Login"
                disabled={loading}
              />
            </form>
            <Link to="/forgot-password">
              <p className="text-accent cursor-pointer hover:underline">
                Forgot password?
              </p>
            </Link>
          </div>
        </main>

        <footer className="flex flex-col items-center gap-y-4 px-8 pb-8">
          <p className="text-text max-w-191 text-center uppercase">
            © PETKNOWS 2026
          </p>
          <p className="text-text max-w-191 text-center">
            Petknows is a pet registration and identification system developed
            by Merto, Avila, and Fernandez, students of Laguna State Polytechnic
            University &#45; Siniloan Campus.
          </p>
        </footer>
      </div>
    </>
  );
}

export default LoginPage;
