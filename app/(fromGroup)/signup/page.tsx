"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/myPosts",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setMessage("Loading...");
    setError("");

    try {
      const res = await fetch("/api/users/", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        setMessage("Signin successful!");
        router.push("/myPosts");
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
        <div className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4">
          <div className="">
            {/* <button className="flex items-center justify-center w-full py-3 mb-1.5 space-x-3 text-sm text-center bg-[#00c300] text-white transition-colors duration-200 transform border rounded-2xl hover:bg-green-500 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                className="w-8 h-8"
              >
                <path
                  fill="#00c300"
                  d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z"
                ></path>
                <path
                  fill="#fff"
                  d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z"
                ></path>
              </svg>
              <span className="text-sm text-white dark:text-gray-200">
                สมัครสมาชิก with LINE
              </span>
            </button> */}
            <button
              className="flex items-center justify-center w-full py-4 mb-1.5 space-x-3 text-sm text-center bg-blue-700 text-white transition-colors duration-200 transform border rounded-2xl hover:bg-blue-400 cursor-pointer"
              onClick={() => {
                signIn("facebook");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
              <span className="text-sm text-white dark:text-gray-200">
                สมัครสมาชิก with Facebook
              </span>
            </button>
            <button
              onClick={handleSignIn}
              className="flex items-center justify-center w-full py-4 mb-1.5 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 border bg-white border-gray-400 focus:ring-4 focus:ring-grey-300 hover:bg-gray-300 cursor-pointer"
            >
              <Image
                className="h-5 mr-2"
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                width={20}
                height={10}
                alt=""
              />
              สมัครสมาชิก with Google
            </button>
          </div>
          <div className="flex items-center mx-5">
            <span className="border border-gray-300 w-full"></span>
            <span className="mx-2 text-lg text-gray-400">or</span>
            <span className="border border-gray-300 w-full"></span>
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div className="text-xl font-semibold">ลงทะเบียนด้วยอีเมล์</div>
            <fieldset className="fieldset">
              <label className="label">
                ชื่อ{" "}
                <span className="text-red-500 font-semibold mx-0.5">*</span>
              </label>
              <input
                type="text"
                className="input w-full validator"
                name="name"
                placeholder="ชื่อ"
                required
              />
              <p className="validator-hint hidden">Required</p>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">
                อีเมล์{" "}
                <span className="text-red-500 font-semibold mx-0.5">*</span>
              </label>
              <input
                type="email"
                className="input w-full validator"
                name="email"
                placeholder="Email"
                required
              />
              <p className="validator-hint hidden">Required</p>
            </fieldset>

            <label className="fieldset">
              <span className="label">
                รหัสผ่าน{" "}
                <span className="text-red-500 font-semibold mx-0.5">*</span>
              </span>
              <div className=" ">
                <div className="relative flex mt-2">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className="input w-full validator"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <div className="absolute right-4 mt-2 flex gap-10 text-black">
                    {showPassword ? (
                      <>
                        <BsEyeFill
                          className="w-5 h-5 "
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <BsEyeSlashFill
                          className="w-5 h-5 "
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <span className="validator-hint hidden">Required</span>
            </label>
            <label className="fieldset">
              <span className="label">
                ยืนยันรหัสผ่าน{" "}
                <span className="text-red-500 font-semibold mx-0.5">*</span>
              </span>
              <div className=" ">
                <div className="relative flex mt-2">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className="input w-full validator"
                    name="confirmPassword"
                    placeholder="Password"
                    required
                  />
                  <div className="absolute right-4 mt-2 flex gap-10 text-black">
                    {showPassword ? (
                      <>
                        <BsEyeFill
                          className="w-5 h-5 "
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <BsEyeSlashFill
                          className="w-5 h-5 "
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <span className="validator-hint hidden">Required</span>
            </label>

            <button className="btn btn-neutral mt-4 w-full" type="submit">
              ลงทะเบียน
            </button>
          </form>
        </div>
      </div>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
