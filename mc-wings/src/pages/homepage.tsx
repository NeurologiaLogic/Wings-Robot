import { Link } from "react-router-dom";
import background_homepage from "../assets/homepage/background_homepage.png"
import logo_homepage from "../assets/homepage/logo_homepage.png"
import click_gif from "../assets/homepage/click.gif"

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen">
      <img src={background_homepage} alt="fail to render background" className="inset-0 w-full h-full " />
      <div className="bg-[#bc1c2c] z-10">
        <img src={logo_homepage} alt="fail to render logo" className="h-36 mx-auto -mt-16" />
        <Link to="/select-flavour-page" className="flex flex-col items-center py-8">
          <div className="mt-4 flex items-center gap-5">
              <h1 className="font-bold text-4xl">
                Touch To Order
              </h1>
              <img src={click_gif} alt="Click GIF" className="mt-2 h-32" />
          </div>
        </Link>
      </div>
    </div>
  );
}
