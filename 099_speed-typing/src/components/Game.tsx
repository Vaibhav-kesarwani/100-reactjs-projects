import { useRef, useState } from "react";
import Countdown from "./Countdown";
import GameData from "./GameData";
import randomWords from 'random-words';
import GameWords from "./GameWords";
import GameOver from "./GameOver";

function Game() {
    // State variables
    const [status, setStatus] = useState('waiting');
    const [pendingWords, setPendingWords] = useState(randomWords(10).join(' '));
    const [doneWords, setDoneWords] = useState(Array<{letter: string, correct: boolean}>());
    const [stats, setStats] = useState({inputChars: 0, inputWords: 0, goodChars: 0});

    const calcAccuracy = () => {
        if(stats.inputWords === 0) return 100;
        return (stats.goodChars / stats.inputChars * 100).toFixed(0);
    }

    const accuracy = calcAccuracy();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key === ' ' || (e.key >= 'a' && e.key <= 'z')) {
            if(status === 'waiting') setStatus('running');
            let newStats = {...stats};
        
            if(pendingWords[0] === e.key) {
                if(e.key === ' ') {
                    newStats.inputWords++;
                }
                newStats.inputChars++;
                newStats.goodChars++
                let newVal = pendingWords.substring(1);
                newVal = newVal + ' ' + randomWords(1);
                setPendingWords(newVal);
                setDoneWords([...doneWords, {letter: e.key, correct: true}]);
            } else {
                newStats.inputChars++;
                setDoneWords([...doneWords, {letter: e.key, correct: false}]);
            }
            setStats(newStats);
        }
    }

    return (
        <div className="focus:border-none w-full h-full flex flex-col pt-16 items-center gap-16">
            <div className="flex flex-col gap-2 justify-center items-center">
				<p className="tracking-wider uppercase text-stone-400 font-semibold">Typing speed test</p>
                <h1 className="text-stone-700 dark:text-stone-100 font-bold text-3xl">Test your typing skills</h1>
			</div>
            <div className="w-full flex flex-col-reverse gap-4 md:flex-row md:w-[40rem] justify-between items-center">
                <Countdown setStatus={setStatus} status={status}></Countdown>
                <div className="flex justify-center md:justify-end items-center gap-8 w-full">
                    <GameData value={stats.inputWords} name={'words/min'}></GameData>
                    <GameData value={stats.inputChars} name={'chars/min'}></GameData>
                    <GameData value={accuracy} name={'% accuracy'}></GameData>
                </div>
            </div>
            <div className="w-full md:w-[40rem] px-4">
                <GameWords handleKeyDown={handleKeyDown} doneWords={doneWords} pendingWords={pendingWords}></GameWords>
            </div>

            {status === 'over' && <GameOver stats={stats}></GameOver>}
		</div>
    )
}

export default Game;