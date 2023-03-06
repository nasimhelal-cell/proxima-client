import { useState } from "react";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className="login-form flex flex-col gap-5 py-20 mx-auto max-w-sm">
      <h2 className="text-4xl font-medium text-sky-400 mb-10">Login</h2>
      <div className="form-control flex flex-col gap-3">
        <label
          htmlFor="email"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="hella@react.com"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-xl outline-none focus:border-sky-400 duration-300"
        />
      </div>
      <div className="form-control flex flex-col gap-3">
        <label
          htmlFor="password"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-xl outline-none focus:border-sky-400 duration-300"
        />
      </div>
      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-xl hover:bg-sky-500 duration-300 mt-3"
      >
        login
      </button>
    </form>
  );
};

export default Login;
