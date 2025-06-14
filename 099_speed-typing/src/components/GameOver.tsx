import GameData from "./GameData";

function GameOver({stats} : {stats: {inputChars: number, inputWords: number, goodChars: number}}) {

    const calcAccuracy = () => {
        if(stats.inputWords === 0) return 100;
        return (stats.goodChars / stats.inputChars * 100).toFixed(0);
    }

    const accuracy = calcAccuracy();

    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] bg-stone-700/50">
            <div className="bg-stone-100 dark:bg-stone-500 w-96 p-4 flex flex-col rounded-xl shadow-xl items-center justify-center gap-4">
                <p className="text-stone-700 font-bold tracking-widest text-xl font-mono">GAME OVER</p>
                <hr className="border-stone-400 border rounded-full w-full" />
                <div className="flex justify-center items-center gap-8 w-full">
                    <GameData value={stats.inputWords} name={'words/min'}></GameData>
                    <GameData value={stats.inputChars} name={'chars/min'}></GameData>
                    <GameData value={accuracy} name={'% accuracy'}></GameData>
                </div>
                <hr className="border-stone-400 border rounded-full w-full" />
                <div className="flex justify-center items-center w-full">
                    <button onClick={() => window.location.reload()} className="flex justify-center items-center gap-4 bg-green-500 text-stone-100 rounded-xl py-2 px-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <p className="tracking-widest text-sm font-mono uppercase">Play again</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameOver;