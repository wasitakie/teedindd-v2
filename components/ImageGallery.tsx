"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Fancybox } from "@fancyapps/ui";

export default function ImageGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      Fancybox.bind(containerRef.current, "[data-fancybox='gallery']", {
        Hash: false,
      });
    }
    return () => {
      Fancybox.unbind(containerRef.current);
      Fancybox.close();
    };
  }, []);

  // เอาเฉพาะ 4 รูปแรกสำหรับ thumbnail (ไม่รวมรูปแรก)
  const thumbnails = images.slice(1, 5);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto flex flex-col gap-4">
      {/* รูปใหญ่ - รูปแรก */}
      <div className="relative w-full h-[500px] z-0 aspect-video rounded-2xl overflow-hidden shadow-lg border bg-gray-100">
        <a
          data-fancybox="gallery"
          href={`/users${mainImage}`}
          className="cursor-zoom-in block w-full h-full relative"
        >
          <Image
            src={`/users${mainImage}`}
            alt="Main Image"
            fill
            className="object-cover transition-opacity duration-300 "
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </a>
      </div>

      {/* รูป thumbnail - รูปที่เหลือ (สูงสุด 4 รูป) */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {thumbnails.map((src, index) => (
            <a
              data-fancybox="gallery"
              href={`/users${src}`}
              key={index + 1}
              className={`
                relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all
                ${
                  mainImage === src
                    ? "border-orange-500 scale-105 shadow-md"
                    : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                }
              `}
            >
              <Image
                src={`/users${src}`}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </a>
          ))}
        </div>
      )}
      <div className="hidden">
        {images.slice(5).map((src, index: number) => (
          <a key={index} data-fancybox="gallery" href={src}></a>
        ))}
      </div>
    </div>
  );
}
