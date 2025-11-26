import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function signin() {
  return (
    <>
      <div className="mx-auto container flex items-center justify-center h-screen">
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="">
            <Link
              href={"/"}
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
            </Link>
          </div>
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
    </>
  );
}
