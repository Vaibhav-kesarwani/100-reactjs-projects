import { BsDownload } from "react-icons/bs";
import Button from "../general/Button";
import SocialIcons from "../general/SocialIcons";
import { motion } from "framer-motion";

export default function AboutSection() {

    return (
        <div id="about_section" className="w-full relative z-20 min-h-screen text-white bg-gradient-to-t from-purple-400 to-purple-500 px-5 md:px-10 lg:px-40 py-20 flex flex-col justify-center gap-10">
            <motion.h1 initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="text-3xl md:text-5xl font-mono tracking-wide">ABOUT ME</motion.h1>
            
            <p className="text-lg">
                Hi! My name is Olaf and I&apos;m 18-year-old developer from Poland, who has been in contact with programming in various forms since childhood. 
                Currently, I&apos;m focused on Frontend, and I&apos;m excited to continue developing my skills in this area. 
                I worked for few months as a developer in a company creating ERP systems. In my free time, I enjoy working on my personal coding projects and exploring new technologies.
                I&apos;m constantly challenging myself to learn new things and improve my knowledge. 
                I&apos;m alays eager to take on new challenges.
                <br /><br />
                Thanks for stopping by my portfolio website, and I hope you enjoy checking out some of my work!
            </p>

            <SocialIcons />

            <div className="flex justify-between flex-col md:flex-row gap-5 w-52 md:w-full">
                <Button link="#projects_section" text={'check my work'} white />
                <Button icon={<BsDownload className="h-4 w-4" />} text={'download cv'} white />
            </div>
        </div>
    )
}