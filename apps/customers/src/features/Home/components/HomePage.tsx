import { CallToAction } from "./CallToAction";
import { FAQPage } from "./FAQ";
import { Partners } from "./Partners";
import { Testimonials } from "./Testimonials";
import { TravelList } from "./TravelList";

export function HomePage() {
  return (
    <div>
      <Partners />
      <FAQPage />
      <TravelList />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
