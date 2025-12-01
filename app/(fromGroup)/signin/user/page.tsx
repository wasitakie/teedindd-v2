"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Signin() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setMessage("Loading...");
    setError("");

    try {
      const res = await fetch("/api/users/signin/", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        setMessage("Signin successful!");
        router.push("/users");
        console.log("session", result);
      } else {
        setError(result.message || "Signin failed");
        setMessage("");
      }
    } catch (err) {
      console.error("Error during signin:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="mx-auto container flex items-center justify-center h-screen">
        <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="">
            <button
              onClick={() => {
                signIn("google");
              }}
              className="flex items-center justify-center w-full py-4 mb-1.5 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 border border-gray-400 focus:ring-4 focus:ring-grey-300"
            >
              <Image
                className="h-5 mr-2"
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                width={20}
                height={10}
                alt=""
              />
              Sign in with Google
            </button>
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div className="flex items-center mx-5">
              <span className="border border-gray-300 w-full"></span>
              <span className="mx-2 text-lg text-gray-400">or</span>
              <span className="border border-gray-300 w-full"></span>
            </div>

            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input validator"
                name="email"
                placeholder="Email"
                required
              />
              <p className="validator-hint hidden">Required</p>
            </fieldset>

            <label className="fieldset">
              <span className="label">Password</span>
              <input
                type="password"
                className="input validator"
                name="password"
                placeholder="Password"
                required
              />
              <span className="validator-hint hidden">Required</span>
            </label>

            <button className="btn btn-neutral mt-4" type="submit">
              Login
            </button>
            <button className="btn btn-ghost mt-1" type="reset">
              Reset
            </button>
          </form>
        </div>
      </div>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
