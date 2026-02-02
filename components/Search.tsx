import { CATEGORIES, category_types } from "@/libs/data/menuData";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";

export default function Search() {
  const router = useRouter();
  const [province, setProvince] = useState("");
  const [categoryType, setCategoryType] = useState("sell");
  const [category, setCategory] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Searching for:", { province, category, categoryType });
    let targetPath = `/listing/${category}`;

    if (categoryType) {
      targetPath += `/${categoryType}`;
    }
    if (province) {
      targetPath += `/${province}`;
    }
    // นำทางไปยังหน้า Search Slug
    router.push(targetPath);
  };
  return (
    <>
      <div className="max-w-2xl mx-auto bg-white border rounded-2xl shadow border-gray-300 px-4 py-2 text-center gap-4  my-5">
        <h1 className="text-2xl font-extrabold">
          ขายที่ดิน บ้านมือสอง คอนโด ลงประกาศฟรี
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center my-2.5 ">
            <div className="flex rounded-full bg-white px-2 w-full max-w-[600px]">
              <button className="self-center flex p-1 cursor-pointer bg-white">
                {" "}
                <MdFilterList className="w-6 h-6 text-gray-600" />
              </button>

              <input
                type="text"
                className="w-full text-gray-800 flex bg-transparent pl-2  outline-0"
                placeholder="ค้นหาเขตที่ดิน เช่น จังหวัด อำเภอ ตำบล"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between max-w-[600px] mx-auto gap-4 ">
            <select
              defaultValue="ขาย"
              className="select w-full"
              onChange={(e) => {
                setCategoryType(e.target.value);
              }}
            >
              {category_types.map((type, index) => (
                <option value={type.id} key={index}>
                  {type.label}
                </option>
              ))}
            </select>
            <select
              defaultValue="ทุกประเภท"
              className="select w-full"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="ทุกประเภท" disabled={true}>
                ทุกประเภท
              </option>
              {CATEGORIES.map((type, index) => (
                <option value={type.id} key={index}>
                  {type.label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="relative flex items-center px-4 py-2.5 mx-5 w-full  bg-white cursor-pointer rounded-2xl"
            >
              <IoSearch className="w-5 h-5 mx-3" />
              <span className="text-md">ค้นหา</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
