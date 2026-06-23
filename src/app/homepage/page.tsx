import Home from "../_components/section/Home";
import Company from "../_components/section/Company";
import Service from "../_components/section/Service";
import Contact from "../_components/section/Contact";

export default function HomepagePage() {
  return (
    <div className="w-screen overflow-x-hidden">
      <Home />
      <Company />
      <Service />
      <Contact />
    </div>
  );
}
