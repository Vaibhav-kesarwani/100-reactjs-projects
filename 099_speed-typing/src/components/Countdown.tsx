import { useEffect, useState } from "react";

function Countdown({ status, setStatus }: {status: string, setStatus: Function}) {
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if(status === 'running') {
            const interval = setInterval(() => {
                if(countdown === 0) {
                    setStatus('over');
                } else {
                    setCountdown(countdown - 1);
                }
            }, 1000);
            return () =>  clearInterval(interval);
        }
    }, [status, countdown])

    return (
        <div className="w-24 h-24 aspect-square bg-stone-200 dark:bg-stone-600 p-2 rounded-full flex flex-col items-center justify-center border border-green-500">
            <p className="font-bold text-stone-700 dark:text-stone-100 text-3xl">{countdown}</p>
            <span className="text-sm md:text-xs font-semibold tracking-wider text-stone-500 dark:text-stone-400">SECONDS</span>
        </div>
    )
}

export default Countdown;