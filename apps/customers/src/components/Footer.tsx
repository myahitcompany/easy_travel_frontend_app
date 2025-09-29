import { Box, Button } from "@mui/material";
import { Facebook, Instagram, Youtube } from "iconsax-react";
import { TextField } from "@mui/material";

export function Footer() {
  return (
    <footer className="w-full">
      <Box className="bg-secondary-bleu-100 w-full md:pt-20 pt-8">
        <Box className="">
          <Box className="lg:max-w-7xl md:max-w-2xl max-w-xs items-center mx-auto md:-mt-60 bg-primary-orange-100 rounded-2xl flex justify-between flex-row p-4">
            <div>
              <p className="text-white text-left md:text-4xl text-lg context mb-4 md:w-80">
                S’ouscrivez à notre Newsletter
              </p>

              <p className=" text-white text-sm leading-md font-chakra mb-3">
                Reçevez des nouvelles de notre actualités quotidiennes
              </p>
              <div className="md:flex md:space-x-3 items-center space-y-3 md:space-y-0">
                <TextField
                  placeholder="Votre adress email"
                  type="text"
                  className="w-full"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      borderColor: "white",
                      height: "48px",
                      fontFamily: "Chakra Petch",
                      color: "white", // Couleur du texte saisi
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "white", // Couleur du texte saisi
                    },
                    "& .MuiInputLabel-root": {
                      color: "white", // Couleur du label (si utilisé)
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white", // Couleur de la bordure
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "white", // Couleur de la bordure au survol
                      },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "white", // Couleur de la bordure en focus
                      },
                    "& .MuiOutlinedInput-input::placeholder": {
                      color: "white", // Couleur du placeholder
                      opacity: 1, // Assure que la couleur est bien appliquée
                    },
                  }}
                />

                <Button
                  className=" bg-secondary-bleu-100 rounded-[10px] h-12 normal-case md:w-auto w-full"
                  variant="contained"
                >
                  S’inscrire
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/assets/images/mailbox.png"
                height={305}
                width={400}
                alt="mailbox"
              />
            </div>
          </Box>
        </Box>

        <footer className="px-5 md:px-0 lg:max-w-7xl md:max-w-2xl mx-auto grid md:grid-cols-4 grid-cols-1 lg:gap-56 gap-7 mt-16 pb-16">
          <div>
            <img
              src="/assets/images/logo.svg"
              className="mb-6"
              width={188}
              height={48}
              alt="logo"
            />
            <div className="flex space-x-2 items-center">
              <Facebook className="w-5 h-5 text-white" />
              <Youtube className="w-5 h-5 text-white" />
              <Instagram className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="text-sm font-bold font-chakra leading-md text-white">
              Nos destinantions
            </p>
            <p className="text-xs font-chakra leading-md text-white">Cotonou</p>
            <p className="text-xs font-chakra leading-md text-white">
              Porto Novo
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <p className="text-sm font-bold font-chakra leading-md text-white">
              About Us
            </p>
            <p className="text-xs font-chakra leading-md text-white">
              Our Story
            </p>
            <p className="text-xs font-chakra leading-md text-white">
              Work with us
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <p className="text-sm font-bold font-chakra leading-md text-white">
              Nous Contacter
            </p>
            <p className="text-xs font-chakra leading-md text-white">
              info@easy-travel.com
            </p>
            <p className="text-xs font-chakra leading-md text-white">
              +2290161000000
            </p>
            <p className="text-xs font-chakra leading-md text-white">
              St Michel, Cotonou, Bénin
            </p>
          </div>
        </footer>
      </Box>
    </footer>
  );
}
