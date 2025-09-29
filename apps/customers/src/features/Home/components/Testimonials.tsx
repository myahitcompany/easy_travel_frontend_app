import { Button, Rating } from "@mui/material";

export function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto mb-24 lg:px-0 px-6">
      <div className="flex flex-row md:justify-between gap-10 md:gap-0 items-center mb-20 ">
        <div className="space-y-4">
          <p className="context text-3xl">Avis</p>
          <p className=" text-sm leading-md font-chakra">
            Qu’est-ce Que Les Voyageurs Disent De Nous ?
          </p>
        </div>
        <Button
          className="bg-primary-orange-100 rounded-[10px] normal-case h-12 font-chakra text-nowrap"
          variant="contained"
        >
          Voir tout
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16">
        <div className="flex justify-center">
          <div>
            <div className="lg:w-[374px] lg:h-[299px] w-[274px] h-[399px] bg-secondary-bleu-20 ml-10 shadow-2xl rounded-[10px]" />

            <div className="lg:w-[374px] lg:h-[299px] w-[274px] h-[399px] bg-white lg:-mt-80 -mt-96 shadow-2xl rounded-[10px] p-6">
              <p className="text-2xl font-chakra leading-lg font-bold mb-4">
                “A real sense of community, nurtured”
              </p>
              <p className="text-sm leading-sm font-chakra text-secondary-bleu-60 mb-6">
                Really appreciate the help and support from the staff during
                these tough times. Shoutout to Katie for helping me always, even
                when I was out of the country. And always available when needed.
              </p>
              <Rating name="read-only" value={4} readOnly />

              <div>
                <p className=" text-sm leading-sm font-chakra text-secondary-bleu-60 font-bold">
                  Olga
                </p>
                <p className=" text-sm leading-sm font-chakra text-secondary-bleu-60 mb-8">
                  Weave Studios – Kai Tak
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div>
            <div className="lg:w-[374px] lg:h-[299px] w-[274px] h-[399px] bg-secondary-bleu-20 ml-10 shadow-2xl rounded-[10px]" />

            <div className="lg:w-[374px] lg:h-[299px] w-[274px] h-[399px] bg-white lg:-mt-80 -mt-96 shadow-2xl rounded-[10px] p-6">
              <p className="text-2xl font-chakra leading-lg font-bold mb-4">
                “A real sense of community, nurtured”
              </p>
              <p className="text-sm leading-sm font-chakra text-secondary-bleu-60 mb-6">
                Really appreciate the help and support from the staff during
                these tough times. Shoutout to Katie for helping me always, even
                when I was out of the country. And always available when needed.
              </p>
              <Rating name="read-only" value={4} readOnly />

              <div>
                <p className=" text-sm leading-sm font-chakra text-secondary-bleu-60 font-bold">
                  Olga
                </p>
                <p className=" text-sm leading-sm font-chakra text-secondary-bleu-60 mb-8">
                  Weave Studios – Kai Tak
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
