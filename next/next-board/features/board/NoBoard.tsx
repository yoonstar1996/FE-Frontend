import Image from "next/image";
import React from "react";

function NoBoard() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-7">
      <div className="text-center">
        <p className="text-2xl font-bold">There is no board yet.</p>
        <p className="text-lg font-medium">
          Click the button and start flashing!
        </p>
      </div>
      <button
        onClick={() => {
          console.log("클릭");
        }}
      >
        <Image
          src="/assets/images/button.svg"
          width={74}
          height={74}
          alt="rounded-button"
        />
      </button>
    </div>
  );
}

export { NoBoard };
