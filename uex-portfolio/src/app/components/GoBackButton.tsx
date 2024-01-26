// components/GoBackButton.js

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <div
      className="fixed top-[20px] left-[20px] cursor-pointer"
      onClick={() => router.back()}
    >
      <FaArrowLeft className="w-[30px] h-[30px] fill-white" />
    </div>
  );
};

export default GoBackButton;
