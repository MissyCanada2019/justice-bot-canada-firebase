// src/app/login/page.tsx
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-900 rounded-2xl border border-white/10">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-zinc-400">Enter your credentials to access your account</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-red-500"
              id="email"
              placeholder="name@example.com"
              type="email"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-red-500"
              id="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <button className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-zinc-900">
            Log In
          </button>
        </form>
        <p className="text-sm text-center text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-red-500 hover:underline" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
