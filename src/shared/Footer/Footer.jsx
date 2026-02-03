import GradientIcon from "@/components/GradientIcon/GradientIcon";
import {
  faFacebook,
  faLinkedin,
  faYoutube,
  faInstagram,
  faTwitter,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const Footer = ({ data, socialLinksData }) => {
  const socialLinksArray = socialLinksData?.data;

  const iconMap = [faFacebook, faYoutube, faInstagram, faLinkedin, faTwitter];

  return (
    <footer className="bg-secondary text-primary-foreground">
      {/* Container */}
      <div className="max-w-full lg:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto md:px-8 lg:px-12 p-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
          {/* Head Office */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Head Office</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <GradientIcon id="location">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </GradientIcon>
                <span className="text-secondary-foreground/80">
                  {data.address}
                </span>
              </li>
              <li className="flex items-center text-secondary-foreground/80">
                <GradientIcon id="phone">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.958l-1.27 1.27a11.042 11.042 0 005.292 5.292l1.27-1.27a2 2 0 011.958-.45l2.064.516A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C7.163 21 3 16.837 3 11V5z"
                  />
                </GradientIcon>
                {data.primary_phone}
              </li>
              <li className="flex items-center text-secondary-foreground/80">
                <GradientIcon id="email">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </GradientIcon>
                {data.primary_email}
              </li>
            </ul>
          </div>

          {/* About Company */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">
              Our Services
            </h3>
            <p className="text-secondary-foreground/70 mb-3">
              Your one-stop solution for all digital needs - from stunning
              visuals to cutting-edge technology solutions that amplify your
              online presence.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinksArray?.map((link, idx) => (
                <Link
                  key={idx}
                  to={`${link.url}`}
                  className="text-primary hover:text-primary/70 transition-transform hover:scale-110"
                >
                  <FontAwesomeIcon icon={iconMap[idx]} size="lg" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Projects", path: "/projects" },
                { name: "Testimonial", path: "/testimonial" },
                { name: "Contact", path: "/contact" },
                { name: "Blogs", path: "/blogs" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-primary group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Work Hours</h3>
            <p className="text-secondary-foreground/70 mb-3">
              We're available 24/7 to serve you. Let's discuss your project over
              a virtual coffee!
            </p>
            <div className="bg-white/5 p-4 rounded-lg border border-primary/20">
              <p className="text-primary font-medium text-sm">
                Need immediate assistance?
              </p>
              <a
                href="tel:+8801521498303"
                className="text-secondary-foreground hover:text-primary text-lg font-semibold transition-colors"
              >
                {data.primary_phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-secondary-foreground/50">
              © {new Date().getFullYear()} InnovationLabs360. All rights
              reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map(
              (text) => (
                <Link
                  key={text}
                  // to={`/${text.toLowerCase().replace(" ", "-")}`}
                  to='/contact'
                  className="text-secondary-foreground/50 hover:text-primary transition-colors"
                >
                  {text}
                </Link>
              ),
            )}
          </div>

          <div className="mt-4 md:mt-0 text-secondary-foreground/40">
            <p>
              Developed with ❤️ by{" "}
              <Link
                to="http://admin.ilabs360.com/"
                className="text-primary hover:underline font-medium"
                target="_blank"
              >
                Our Web Team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
