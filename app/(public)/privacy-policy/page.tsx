import React from "react";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="container mx-auto p-8 ">
        <h1 className="text-2xl font-semibold">นโยบายความเป็นส่วนตัว</h1>
        <div className="my-5">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
              การจัดเก็บข้อมูลส่วนตัว
            </h2>
            <h3 className="text-xl text-gray-700 mb-2">
              การเก็บข้อมูลของสมัครสมาชิก
            </h3>
            <p className="text-gray-700 mb-2">
              เราจะเก็บข้อมูลส่วนตัว และที่อยู่อีเมล
              ของท่านเพื่อใช้ในการอ้างอิงการเข้าสู่ระบบ
              รวมถึงการแจ้งข่าวสารต่างๆ ของเว็บไซต์
            </p>
            <h3 className="text-xl text-gray-700 mb-2">
              คุกกี้และเทคโนโลยีที่คล้ายกัน
            </h3>
            <p className="text-gray-700">
              เราใช้คุ๊กกี้ในการวิเคราะห์ข้อมูล
              และเพื่ออำนวยความสะดวกให้กับสมาชิกในการค้นหาข้อมูล เช่น
              รายการทรัพย์ที่เก็บไว้, ทรัพย์ที่มีความสนใจ, การล๊อกอินอัตโนมัติ
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
              การลบข้อมูลผู้ใช้
            </h2>
            <p className="text-gray-700">
              คุณสามารถร้องขอให้ลบข้อมูลส่วนบุคคลของคุณออกจากแอปพลิเคชันของเราได้ตลอดเวลา
              โดยส่งอีเมลคำขอมาที่{" "}
              <a
                href="mailto:teedinddonline@gmail.com"
                className="text-blue-500 hover:underline"
              >
                teedinddonline@gmail.com
              </a>
              หรือลบบัญชีผ่านหน้า <span className="font-medium">Settings</span>{" "}
              ของคุณ เราจะดำเนินการลบข้อมูลของคุณทั้งหมดภายใน 2-3
              วันหลังจากได้รับคำขอ.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
              การเปิดเผยข้อมูลของคุณ
            </h2>
            <p className="text-gray-700">
              เราจะไม่ขาย แลกเปลี่ยน
              หรือให้เช่าข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม
              เว้นแต่จะได้รับความยินยอมจากคุณ หรือเป็นไปตามที่กฎหมายกำหนด
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
