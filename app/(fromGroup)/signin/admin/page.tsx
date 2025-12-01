"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SigninAdmin() {
  const router = useRouter();
  const headSubmitAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/", {
        method: "POST",
        body: formdata,
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Signin successful", data);
        router.push("/dashboard");
      } else {
        console.log("Signin failed", data.message || "Signin failed");
      }
    } catch (err) {
      console.error("Error during signin:", err);
    }
  };
  return (
    <div>
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        onSubmit={headSubmitAdmin}
      >
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input validator"
            placeholder="Email"
            name="email"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>

        <label className="fieldset">
          <span className="label">Password</span>
          <input
            type="password"
            className="input validator"
            placeholder="Password"
            name="password"
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
  );
}
