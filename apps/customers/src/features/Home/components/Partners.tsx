import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export function Partners() {
  const images = [
    "/assets/images/logo-Youniti.png",
    "/assets/images/logo-Youniti.png",
    "/assets/images/logo-Youniti.png",
    "/assets/images/logo-Youniti.png",
    "/assets/images/logo-Youniti.png",
    "/assets/images/logo-Youniti.png",
  ];

  return (
    <div className="w-full bg-secondary-bleu-100 mb-16">
      <div>
        <Box
          sx={{
            width: "100%",
            height: "190px",
            overflow: "hidden",
            padding: "20px",
            placeContent: "center",
          }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={5}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Box
                  component="img"
                  src={src}
                  sx={{
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </div>
    </div>
  );
}
