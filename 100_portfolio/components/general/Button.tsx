import { motion} from "framer-motion"
import { BsArrowRightShort } from 'react-icons/bs'

type ButtonProps = {
    text: string,
    white?: boolean,
    icon?: JSX.Element,
    link?: string
}

const buttonBorderVariants = {
    hover: {
        width: '100%',
        transition: {
            delay: 0
        }
    },
}

export default function Button({ text, white, icon, link }: ButtonProps) {

    return (
        <motion.a initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: 0.2}} type="submit" href={link && link}  target={!link?.includes('#') ? '_blank' : '_self'} whileHover={'hover'} className="cursor-pointer">
            <div className="w-full flex gap-4 justify-between items-center uppercase font-semibold px-5 py-1 text-sm md:text-base">
                {icon ? icon : <BsArrowRightShort className="h-5 w-5"/>}
                <span>{text}</span>
            </div>

            <motion.div initial={{width: '50%'}} variants={buttonBorderVariants} className={'h-0.5 ' + (white ? 'bg-white' : 'bg-black')}></motion.div>
        </motion.a>
    )
}