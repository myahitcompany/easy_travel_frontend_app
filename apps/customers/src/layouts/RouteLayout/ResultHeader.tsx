import { Avatar } from "@mui/material";
import { useState } from "react";

export function ResultHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" shadow-lg  pb-8">
      <nav className="w-full md:flex md:justify-between items-center md:px-8 px-6">
        {/* Logo */}
        <div className="flex justify-between">
          <img
            className={`${isOpen ? "hidden" : "block py-6"}`}
            src="/assets/images/logo.svg"
            width={188}
            height={48}
            alt="logo"
          />
          <button
            className="md:hidden text-black focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 22 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.58203H21M1 8.58203H21M1 15.582H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute md:static left-0 w-full md:w-auto md:flex z-10 py-10 p-6 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? "block bg-secondary-bleu-100" : "hidden"
          }`}
        >
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            {isOpen && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <div className="flex flex-row items-center space-x-3 mt-4 md:mt-0">
            <Avatar alt="Remy Sharp" src="/assets/images/avatar-image.png" />
            <p
              className={`text-sm font-chakra text-secondary-bleu-100 ${isOpen && "text-white"}`}
            >
              NINTOMEY Félix
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
}
