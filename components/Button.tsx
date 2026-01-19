import Link from "next/link";

export function Signin() {
  return (
    <Link href={"/signin"}>
      <button className="btn btn-[#000000] btn-soft btn-sm">เข้าสู่ระบบ</button>
    </Link>
  );
}

export function Signup() {
  return (
    <Link href={"/signup"}>
      <button className="btn btn-primary btn-sm">สมัครสมาชิก</button>
    </Link>
  );
}
