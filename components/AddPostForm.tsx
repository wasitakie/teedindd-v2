"use client";

import React, { useEffect, useState } from "react";
import { CATEGORIES } from "@/libs/data/menuData";
import { Signin, Signup } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function AddPostForm() {
  const router = useRouter();
  const [isSelectValue, setIsSelectValue] = useState("sell");
  const [displayValue, setDisplayValue] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [zipcode, setZipcode] = useState("");

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedAmphure, setSelectedAmphure] = useState("");
  const [selectedTambon, setSelectedTambon] = useState("");

  const [selectFiles, setSelectFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    category_sell: "",
    category_rent: "",
    areaSize: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectFiles(filesArray);
      setPreviews(filesArray.map((file) => URL.createObjectURL(file)));
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/refs/heads/master/api/latest/province.json"
      );
      const data = await res.json();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchAmphures = async () => {
      if (!selectedProvince) {
        setAmphures([]);
        return;
      }
      const res = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/refs/heads/master/api/latest/district.json"
      );
      const data = await res.json();
      const filtered = data.filter(
        (item: any) => item.province_id === parseInt(selectedProvince)
      );
      setAmphures(filtered);
    };
    fetchAmphures();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchTambons = async () => {
      if (!selectedAmphure) {
        setTambons([]);
        return;
      }
      const res = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/refs/heads/master/api/latest/sub_district.json"
      );
      const data = await res.json();
      const filtered = data.filter(
        (item: any) => item.district_id === parseInt(selectedAmphure)
      );
      setTambons(filtered);
    };
    fetchTambons();
  }, [selectedAmphure]);

  useEffect(() => {
    if (selectedTambon && tambons.length > 0) {
      const target = tambons.find(
        (t: any) => t.id === parseInt(selectedTambon)
      );
      if (target) setZipcode((target as any).zip_code);
    } else {
      setZipcode("");
    }
  }, [selectedTambon, tambons]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectFiles.length > 5) {
      alert("คุณสามารถอัปโหลดรูปภาพได้ไม่เกิน 5 รูป");
      return;
    }
    const formData = new FormData(e.currentTarget);
    formData.delete("images");
    selectFiles.forEach((file) => formData.append("images", file));

    const res = await fetch("/api/users/listings", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const result = await res.json();
      formData.delete("images");
      router.push("/myPosts");

      alert(`ลงประกาศสำเร็จ! เลขประกาศของคุณคือ: ${result.randomInt}`);
    } else {
      alert("เกิดข้อผิดพลาดในการลงประกาศ");
    }
  };

  return (
    <div className="p-4">
      <h4 className="text-xl mb-3">เริ่มลงประกาศฟรี</h4>

      <>
        <form action={""} onSubmit={handleSubmit}>
          <div className="card p-4 bg-base-100 shadow-sm">
            <label className="block text-md font-medium text-gray-700 mb-2">
              ประเภทประกาศ
            </label>
            <div className="flex flex-cols space-x-2.5 items-center">
              <div className="">
                <label className="label">
                  <input
                    type="radio"
                    name="category_type"
                    value={"sell"}
                    checked={isSelectValue === "sell"}
                    onChange={(e) => setIsSelectValue(e.target.value)}
                    className="radio radio-neutral"
                  />
                  ขาย
                </label>
              </div>
              <div className="">
                <label className="label">
                  <input
                    type="radio"
                    name="category_type"
                    value={"rent"}
                    checked={isSelectValue === "rent"}
                    onChange={(e) => setIsSelectValue(e.target.value)}
                    className="radio radio-neutral"
                  />
                  ให้เช่า
                </label>
              </div>
              <div className="">
                <label className="label">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio radio-neutral"
                  />
                  ขายดาวน์
                </label>
              </div>
            </div>
            <div className="flex flex-cols space-x-2.5 items-center">
              {isSelectValue === "sell" ? (
                <div className="">
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    ประเภทอสังหาริมทรัพย์
                  </label>
                  <div className="flex flex-wrap gap-4 my-4 space-x-2.5">
                    {CATEGORIES.map((category) => (
                      <label
                        className="label flex gap-2 items-center"
                        key={category.id}
                      >
                        <input
                          type="radio"
                          name="category_sell"
                          value={category.id}
                          className="radio radio-neutral"
                        />
                        ขาย{category.label}
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="">
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    ประเภทอสังหาริมทรัพย์
                  </label>
                  <div className="flex flex-wrap gap-4 my-4 space-x-2.5">
                    {CATEGORIES.map((category) => (
                      <label
                        className="label flex gap-2 items-center"
                        key={category.id}
                      >
                        <input
                          type="radio"
                          name="category_rent"
                          value={category.id}
                          className="radio radio-neutral"
                        />
                        ให้เช่า{category.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">หัวข้อประกาศ</legend>
              <input
                type="text"
                className="input w-full"
                name="title"
                placeholder="My awesome page"
              />
              <div className="label">Optional</div>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">รายละเอียด</legend>
              <textarea
                className="textarea h-24 w-full"
                placeholder="รายละเอียดเพิ่มเติม"
                name="description"
              ></textarea>
              <div className="label">Optional</div>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">ราคา</legend>
              <input
                type="text"
                className="input w-2/5"
                placeholder={
                  isSelectValue === "sell" ? "ราคาขาย" : "ราคาให้เช่าต่อเดือน"
                }
                name="price"
              />
              <div className="label">
                {isSelectValue === "sell"
                  ? "ราคาขาย"
                  : "ราคาให้เช่าต่อเดือน กรุณาไม่ระบุต่อเดือน"}
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <div className="grid grid-cols-3 gap-4 ">
                <div className="w-full">
                  <legend className="fieldset-legend">จังหวัด</legend>
                  <select
                    value={selectedProvince}
                    name="province"
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      setSelectedAmphure(""); // Reset ลูก
                      setSelectedTambon(""); // Reset หลาน
                    }}
                    className="select w-full"
                  >
                    <option value="">เลือกจังหวัด</option>
                    {provinces.map((p: any) => (
                      <option key={p.id} value={p.id}>
                        {p.name_th}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <legend className="fieldset-legend">อำเภอ</legend>
                  <select
                    value={selectedAmphure}
                    name="district"
                    onChange={(e) => {
                      setSelectedAmphure(e.target.value);
                      setSelectedTambon(""); // Reset ลูก
                    }}
                    disabled={!selectedProvince}
                    className="select w-full"
                  >
                    <option value="">เลือกอำเภอ</option>
                    {amphures.map((a: any) => (
                      <option key={a.id} value={a.id}>
                        {a.name_th}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full ">
                  <legend className="fieldset-legend">ตำบล</legend>
                  <select
                    value={selectedTambon}
                    onChange={(e) => setSelectedTambon(e.target.value)}
                    disabled={!selectedAmphure}
                    name="sub_district"
                    className="select w-full"
                  >
                    <option value="">เลือกตำบล</option>
                    {tambons.map((t: any) => (
                      <option key={t.id} value={t.id}>
                        {t.name_th}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={zipcode}
                  disabled
                  placeholder="รหัสไปรษณีย์"
                  className="input"
                />
              </div>
              <span className="label">Optional</span>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">อัปโหลดรูปภาพที่ดิน</legend>
              <input
                type="file"
                className="file-input"
                name="image"
                accept="image/jpg, image/png"
                multiple
                onChange={handleFileChange}
              />
              <label className="label">
                {" "}
                เลือกแล้ว {selectFiles.length} รูป | Max size 5MB
              </label>
              <div className="grid grid-cols-5 gap-4 mt-5">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="w-full h-24 border rounded-lg overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Preview ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">ขนาดพื้นที่</legend>
              <input
                type="text"
                className="input w-2/5"
                placeholder="เช่น 100 ตร.ม."
                name="areaSize"
              />
              <div className="label">Optional</div>
            </fieldset>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition mt-5"
          >
            ลงประกาศ
          </button>
        </form>
      </>
    </div>
  );
}
