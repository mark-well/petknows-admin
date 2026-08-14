import { useState } from "react";
import { useAuth } from "../providers/useAuth";
import { Link, useNavigate } from "react-router";

function LoginPage() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-dvh flex flex-col text-base">
        <div className="w-full bg-secondary absolute h-91 -z-10"></div>

        <main className="flex flex-1 justify-center items-center w-full">
          <div className="bg-white flex flex-col justify-center items-center w-116 min-h-116 border rounded-sm border-gray-300 shadow-md gap-y-8 px-16">
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-12 w-full">
              <div className="logo flex flex-col gap-y-4 items-center w-full">
                <img src="/logo.png" width="64" height="64" alt="petknows logo" />
                <div>
                  <div className="flex gap-x-2 justify-center items-center">
                    <h1 className="uppercase text-2xl text-secondary">Petknows</h1>
                    <h2 className="uppercase text-gray-600">Admin</h2>
                  </div>
                  {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                </div>
              </div>
              <div className="fields flex flex-col gap-y-13">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b-2 outline-none border-gray-300"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-b-2 outline-none border-gray-300"
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
