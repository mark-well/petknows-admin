import { useState } from "react";
import { useAuth } from "../providers/useAuth";
import { useNavigate } from "react-router";

function LoginPage() {
  const { signIn } = useAuth();
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
      <div className="p-4">
        {error && <p className="text-base text-red-500">{error}</p>}
        <form onSubmit={(e) => handleSubmit(e)} className="flex gap-4">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-xs"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-xs"
          />
          <input type="submit" value="Login" className="px-4 py-2 bg-amber-600" />
        </form>
      </div>
    </>
  );
}

export default LoginPage;
