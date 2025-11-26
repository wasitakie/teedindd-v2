import React from "react";
import Image from "next/image";

export default function Banner() {
  return (
    <>
      <div className="block relative h-[500px] bg-bottom w-full overflow-hidden">
        <Image
          src="/images/banner1.jpg"
          alt="banner"
          fill={true}
          className=" object-cover w-full h-full"
          quality={100}
        />
      </div>
    </>
  );
}
