import { ArrowCircleDown, SearchNormal } from "iconsax-react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";

export function FAQPage() {
  const [expanded, setExpanded] = useState<string | false>("booking");

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 grid-cols-1 lg:space-y-0 space-y-6 mb-20 lg:px-0 px-6">
      <div
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%),url('/assets/images/faq.png')`,
        }}
        className="md:w-[604px] md:h-[558px] bg-no-repeat flex justify-center rounded-3xl md:bg-contain bg-center"
      >
        <div className="text-center md:py-96 py-24">
          <p className=" text-4xl context leading-lg text-white mt-2">
            Pourquoi
          </p>
          <p className=" text-xl leading-md text-white font-chakra mb-4">
            Voyager Avec Nous ?
          </p>
          <Button
            className="bg-primary-orange-100 rounded-[10px] normal-case h-12"
            startIcon={<SearchNormal className="w-5 h-5" />}
            variant="contained"
          >
            Trouver un bus
          </Button>
        </div>
      </div>

      <div className="">
        <Accordion
          expanded={expanded === "booking"}
          onChange={handleChange("booking")}
          sx={{ fontFamily: "Chakra Petch" }}
        >
          <AccordionSummary expandIcon={<ArrowCircleDown />}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "Chakra Petch",
                fontSize: "24px",
              }}
            >
              Réservations et Tarifs
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col space-y-4 font-chakra">
            <div>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Chakra Petch",
                  fontSize: "18px",
                }}
                className=""
              >
                1. Comment réserver un billet ?
              </Typography>
              <Typography
                sx={{
                  fontWeight: "medium",
                  fontFamily: "Chakra Petch",
                  fontSize: "16px",
                }}
              >
                Vous pouvez réserver votre billet directement sur notre site web
                ou via notre application mobile. Il suffit de choisir votre
                trajet, votre date de départ et de suivre les instructions pour
                le paiement.
              </Typography>
            </div>

            <div>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Chakra Petch",
                  fontSize: "18px",
                }}
                className=""
              >
                2. Puis-je modifier ou annuler ma réservation
              </Typography>
              <Typography
                sx={{
                  fontWeight: "medium",
                  fontFamily: "Chakra Petch",
                  fontSize: "16px",
                }}
              >
                Oui, vous pouvez modifier ou annuler votre réservation jusqu'à
                24 heures avant le départ. Des frais peuvent s'appliquer selon
                la politique d'annulation.
              </Typography>
            </div>

            <div>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Chakra Petch",
                  fontSize: "18px",
                }}
                className=""
              >
                3. Quels sont les modes de paiement acceptés ?
              </Typography>
              <Typography
                sx={{
                  fontWeight: "medium",
                  fontFamily: "Chakra Petch",
                  fontSize: "16px",
                }}
              >
                Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal
                et certains paiements mobiles comme Apple Pay et Google Pay.
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Deuxième Accordion */}
        <Accordion
          expanded={expanded === "Departure"}
          onChange={handleChange("Departure")}
        >
          <AccordionSummary expandIcon={<ArrowCircleDown />}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "Chakra Petch",
                fontSize: "24px",
              }}
            >
              Départs et Retards
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Chakra Petch",
                  fontSize: "18px",
                }}
                className=""
              >
                1. Que se passe-t-il si mon bus a du retard ?
              </Typography>
              <Typography
                sx={{
                  fontWeight: "medium",
                  fontFamily: "Chakra Petch",
                  fontSize: "16px",
                }}
              >
                En cas de retard, nous vous enverrons une notification par SMS
                ou e-mail avec les informations mises à jour. Nous faisons tout
                notre possible pour minimiser les perturbations.
              </Typography>
            </div>
            <div>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Chakra Petch",
                  fontSize: "18px",
                }}
                className=""
              >
                2. Combien de temps avant le départ dois-je arriver à la gare ?
              </Typography>
              <Typography
                sx={{
                  fontWeight: "medium",
                  fontFamily: "Chakra Petch",
                  fontSize: "16px",
                }}
              >
                Nous recommandons d’arriver au moins 30 minutes avant le départ
                pour l’embarquement.
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Troisième Accordion */}
        <Accordion expanded={expanded === "bus"} onChange={handleChange("bus")}>
          <AccordionSummary expandIcon={<ArrowCircleDown />}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "Chakra Petch",
                fontSize: "24px",
              }}
            >
              Services à Bord
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Chakra Petch",
                  fontSize: "18px",
                }}
                className=""
              >
                1. Y a-t-il du Wi-Fi et des prises électriques dans le bus ?
              </Typography>
              <Typography
                sx={{
                  fontWeight: "medium",
                  fontFamily: "Chakra Petch",
                  fontSize: "16px",
                }}
              >
                Oui, tous nos bus sont équipés du Wi-Fi gratuit et de prises
                électriques ou USB pour recharger vos appareils.
              </Typography>
            </div>
            <div>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Chakra Petch",
                  fontSize: "18px",
                }}
                className=""
              >
                2. Puis-je manger et boire à bord ?
              </Typography>
              <Typography
                sx={{
                  fontWeight: "medium",
                  fontFamily: "Chakra Petch",
                  fontSize: "16px",
                }}
              >
                Oui, vous pouvez consommer des en-cas et boissons non
                alcoolisées pendant le voyage. Merci de respecter la propreté du
                bus.
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
