import { Search } from "@/components";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="mb-20">
      <div
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%),url('/assets/images/hero-pattern.svg')`,
        }}
        className="lg:h-[599px] lg:max-w-[1380px] h-[399px] max-w-full mx-auto bg-center lg:bg-contain bg-no-repeat md:mt-[66px] md:rounded-3xl"
      >
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
              className="md:hidden text-white focus:outline-none"
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
              isOpen ? "block bg-white" : "hidden"
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
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Button
                sx={{ borderColor: "transparent" }}
                className="rounded-[10px] h-10 normal-case md:text-white font-chakra"
                variant="outlined"
                onClick={()=>navigate('/auth/login')}
              >
                Se connecter
              </Button>
              <Button
                onClick={()=>navigate('/auth/register')}
                className="bg-primary-orange-100 rounded-[10px] h-10 normal-case font-chakra"
                variant="contained"
              >
                S'inscrire
              </Button>
            </div>
          </div>
        </nav>

        <div className="flex flex-col justify-center items-center md:mt-14 mt-5">
          <p className="text-white lg:text-4xl text-2xl context font-bold">
            VOYAGER EN TOUTE
          </p>
          <p className="text-primary-orange-100 lg:text-[96px] text-[64px] font-bold context">
            SIMPLICITE
          </p>
          <p className="lg:text-xl text-sm leading-md context text-white md:w-1/3 text-center md:px-0 px-6">
            Réserver un voyage depuis le confort de votre position sans avoir à
            vous déplacer
          </p>
        </div>
      </div>
      <div className="lg:max-w-7xl md:max-w-3xl max-w-xs mx-auto bg-white px-6 pt-8 -mt-20 shadow-md rounded-[10px]">
        <Search />
      </div>
    </div>
  );
}
