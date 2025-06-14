import Image from "next/image";
import Button from "../general/Button";
import { motion } from "framer-motion";
import { AiOutlineArrowDown } from 'react-icons/ai'
import avatarPic from '@/public/narei_avatar.svg';

export default function MainSection() {

    return (
        <div className="w-full grid lg:grid-cols-2 relative h-screen px-5">

            {/* Left section - name */}
            <div className="w-full h-full flex flex-col justify-center items-center z-30">
                <motion.h1 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="text-5xl">Hi! I&apos;m&nbsp;
                    <span className="text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500 font-mono">OLAF </span>
                </motion.h1>
                <motion.h2 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="text-2xl text-black/50 mb-10">Frontend developer</motion.h2>

                <Button link="#about_section" text="know me better" />
            </div>

            {/* Right section - photo */}
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="hidden lg:flex w-full h-full justify-center items-center">
                <Image src={avatarPic} alt={"avatar"} className="w-3/4 aspect-square max-w-[600px]" />
            </motion.div>

            {/* Jumping arrow */}
            <motion.div initial={{x: '-50%', y: 280}} animate={{y: [280, 270, 280]}} transition={{repeat: Infinity}} className="shadow z-30 p-4 bg-white rounded-full absolute left-1/2 top-1/2 ">
                <AiOutlineArrowDown className="h-7 w-7" />
            </motion.div>

            {/* Wave */}
            <svg width="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" className="z-10 absolute -bottom-1 xl:-bottom-20 left-0 transition duration-300 ease-in-out delay-150">
                <path d="M 0,400 C 0,400 0,200 0,200 C 89.89285714285714,192.96428571428572 179.78571428571428,185.92857142857142 299,205 C 418.2142857142857,224.07142857142858 566.7499999999999,269.25 693,265 C 819.2500000000001,260.75 923.2142857142858,207.07142857142858 1044,188 C 1164.7857142857142,168.92857142857142 1302.392857142857,184.46428571428572 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#a855f7" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path>
            </svg>
        </div>
    )
}