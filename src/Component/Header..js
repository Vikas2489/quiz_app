import React from 'react';

export default function Header() {
  return (
    <>
      <header className="bg-[#21396A] w-full  items-center  flex justify-center py-4 border-[1.5px] border-solid border-[#21396A]">
        <h1 className="text-5xl z-50 underline text-white">Quiz</h1>
      </header>
      <div className="-mt-20">
        <svg
          className="curve"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="225"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 1440 160"
        >
          <g transform="">
            <linearGradient
              id="lg-0.1998142374782037"
              x1="0"
              x2="1"
              y1="0"
              y2="0"
            >
              <stop stopColor="#21396a" offset="0"></stop>
              <stop stopColor="#21396a" offset="1"></stop>
            </linearGradient>
            <path
              fill="#21396A"
              opacity="1"
              d="M 0 0 L 0 193.632 Q 144 156.559 288 139.43 T 576 159.317 T 864 126.02 T 1152 86.5947 T 1440 106.912 L 1440 0 Z"
            ></path>
          </g>
        </svg>
      </div>
    </>
  );
}
