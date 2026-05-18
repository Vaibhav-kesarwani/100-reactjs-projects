import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    {
      id: 1,
      name: "Github",
      href: "https://github.com",
      icon: <FaGithub className="h-5 w-5" />,
      isExternal: true,
    },
    {
      id: 2,
      name: "Linkedin",
      href: "https://linkedin.com",
      icon: <FaLinkedin className="h-5 w-5" />,
      isExternal: true,
    },
    {
      id: 3,
      name: "Twitter",
      href: "https://twitter.com",
      icon: <FaXTwitter className="h-5 w-5" />, // Perfect up-to-date X logo
      isExternal: true,
    },
    {
      id: 4,
      name: "Mail",
      href: "mailto:support@example.com",
      icon: <FaEnvelope className="h-5 w-5" />,
      isExternal: false,
    },
  ];

  return (
    <footer className="w-full border-t border-border mt-20">
      <div className="w-full py-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              100 ReactJS Projects
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              A collection of 100+ React JS projects designed to help
              developers improve their frontend skills through practical
              implementation and modern UI development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              {["Home", "Projects", "Contributors", "About"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Connect With Us</h3>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.isExternal ? "_blank" : undefined}
                  rel={social.isExternal ? "noreferrer" : undefined}
                  className="inline-flex items-center justify-center rounded-xl border border-border p-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Email: support@example.com
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 100 ReactJS Projects. All rights reserved.</p>
          <p>Built with React JS • Next.js • Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;