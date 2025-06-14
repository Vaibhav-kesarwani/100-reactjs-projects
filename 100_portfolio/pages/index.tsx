import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import MainSection from "@/components/sections/MainSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
	return (
		<div className="w-full bg-white flex flex-col">
			{/* Navbar */}

			{/* Main section */}
			<MainSection />

			{/* About me section */}
			<AboutSection />

			{/* My projects section */}
			<ProjectsSection />

			{/* Contact section */}
			<ContactSection />

			{/* Other */}
			{/*<div>other sections</div>*/}
		</div>
	)
}
