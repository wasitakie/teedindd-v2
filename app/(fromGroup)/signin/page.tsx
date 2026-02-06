import { Suspense } from "react";
import SigninFrom from "./SigninForm";

export default function Page() {
  return (
    <>
      <Suspense
        fallback={<span className="loading loading-dots loading-xl"></span>}
      >
        <SigninFrom />
      </Suspense>
    </>
  );
}
