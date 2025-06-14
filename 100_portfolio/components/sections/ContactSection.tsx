import Image from "next/image";
import messagePic from '@/public/message.png'
import SocialIcons from "../general/SocialIcons";
import { BsCheck, BsEnvelope, BsExclamationSquareFill, BsSend } from "react-icons/bs";
import FormInput from "../general/FormInput";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import emailjs from '@emailjs/browser';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ContactSection() {
    const form = useRef(null);
    const [statusText, animateStatusText] = useAnimate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState('none');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(process.env.EMAIL_SERVICE_ID && process.env.EMAIL_TEMPLATE_ID && process.env.EMAIL_PUBLIC_KEY) {
            if(formData.email && formData.name && formData.message && form.current) {
                setStatus(() => 'sending')
                emailjs.sendForm(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, form.current, process.env.EMAIL_PUBLIC_KEY)
                .then(() => {
                    setStatus(() => 'sent');
                }, () => {
                    setStatus(() => 'error');
                });
            }
        }
    }

    useEffect(() => {
        if(status === 'sent' || status === 'error') {
            animateStatusText(statusText.current, { y: 0 });

            const timeout = setTimeout(() => {
                animateStatusText(statusText.current, { y: 0 });
                setStatus(() => 'none');
            }, 5000);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [status]);

    return (
        <div className="w-full z-10 bg-white relative py-20 h-screen px-5 md:px-10 lg:px-40 flex flex-col justify-center items-center">

            <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-10 md:w-[50rem] md:h-[40rem] mb-10">
                <div className="w-full flex flex-col gap-2 pr-5">
                    {/* Heading */}
                    <div>
                        <span className="text-3xl tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500 font-mono">CONTACT ME </span>
                    </div>
                    <p className="text-lg text-black/50">
                        Want to ask a question or start working with me? Just fill the form below!
                    </p>

                    {/* Form */}
                    <div className="h-full py-5">
                        <form ref={form} onSubmit={(e) => onSubmit(e)} className="h-full flex flex-col gap-3">
                            <FormInput delay={0.2} name="name" value={formData.name} setValue={(e: any) => setFormData({...formData, name: e.target.value})} text="Your name" />
                            <FormInput delay={0.4} name="email" value={formData.email} setValue={(e: any) => setFormData({...formData, email: e.target.value})} text="Email address" />
                            <FormInput delay={0.6} name="message" value={formData.message} setValue={(e: any) => setFormData({...formData, message: e.target.value})} text="Message" area />
                            <div className="flex justify-end">
                                <motion.button initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: 0.2}} type="submit" whileHover={'hover'} className="cursor-pointer">
                                    <div className="w-full flex gap-4 justify-between items-center uppercase font-semibold px-5 py-1 text-sm md:text-base">
                                        <div>
                                        {
                                            {
                                                'none': <BsSend className="h-4 w-4"/>,
                                                'sending': <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin"></AiOutlineLoading3Quarters>,
                                                'sent': <BsCheck className="h-4 w-4"></BsCheck>,
                                                'error': <BsExclamationSquareFill className="h-4 w-4"></BsExclamationSquareFill>
                                            }[status]
                                        }
                                        </div>
                                        <span>send message</span>
                                    </div>

                                    <motion.div initial={{width: '50%'}} variants={{hover: {width: '100%'}}} className="h-0.5 bg-black"></motion.div>
                                </motion.button>
                            </div>
                            <motion.p ref={statusText} initial={{y: 20}} className="flex gap-2 items-center text-black/50">{
                                {
                                    'sent': <>
                                        <BsCheck className="h-4 w-4"></BsCheck>
                                        Message sent successfully!
                                    </>,
                                    'error': <>
                                        <BsExclamationSquareFill className="h-4 w-4"></BsExclamationSquareFill>
                                        An error occured. Check your data and try submitting again.
                                    </>
                                }[status]
                                }</motion.p>
                        </form>
                    </div>
                </div>
                <div className="hidden md:flex w-full flex-col justify-around items-center gap-2">
                    <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} className="w-full flex justify-center items-center">
                        <Image src={messagePic} alt={"Contact illustration"} className="w-2/3 hidden md:block" />
                    </motion.div>

                    <div className="flex flex-col justify-center gap-3 items-center text-red">
                        <span className="mb-1">You can also find me here:</span>
                        <span className="flex gap-2 items-center text-black/50">
                            <BsEnvelope  />
                            contact@narei.me
                        </span>
                        <SocialIcons black />
                    </div>
                </div>
            </div>
        </div>
    )
}