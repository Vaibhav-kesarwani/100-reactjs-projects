import Link from "next/link";
import  Github from "lucide-react";
import  Linkedin from "lucide-react";
import  Twitter from "lucide-react";
import  Mail from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border mt-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold">
              100 ReactJS Projects
            </h2>

            <p className="mt-4 text-sm md:text-base text-foreground/70 leading-relaxed">
              A collection of 100+ React JS projects designed to help
              developers improve their frontend skills through practical
              implementation and modern UI development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-foreground/70">
              <Link
                href="/"
                className="hover:text-primary transition-all duration-300"
              >
                Home
              </Link>

              <Link
                href="/projects"
                className="hover:text-primary transition-all duration-300"
              >
                Projects
              </Link>

              <Link
                href="/contributors"
                className="hover:text-primary transition-all duration-300"
              >
                Contributors
              </Link>

              <Link
                href="/about"
                className="hover:text-primary transition-all duration-300"
              >
                About
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Connect With Us
            </h3>

            <div className="flex items-center gap-4 mb-5">
              <a
                href="https://github.com"
                target="_blank"
                className="p-3 rounded-xl border border-border hover:bg-primary hover:text-white transition-all duration-300"
              >
                Github 
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                className="p-3 rounded-xl border border-border hover:bg-primary hover:text-white transition-all duration-300"
              >
                Linkedin 
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                className="p-3 rounded-xl border border-border hover:bg-primary hover:text-white transition-all duration-300"
              >
                Twitter 
              </a>

              <a
                href="mailto:support@example.com"
                className="p-3 rounded-xl border border-border hover:bg-primary hover:text-white transition-all duration-300"
              >
                Mail
              </a>
            </div>

            <p className="text-sm text-foreground/70">
              Email: support@example.com
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>
            © 2026 100 ReactJS Projects. All rights reserved.
          </p>

          <p>
            Built with React JS • Next.js • Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;