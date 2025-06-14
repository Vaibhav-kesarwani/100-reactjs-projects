function GameData({ value, name}: {value: any, name: string}) {

    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <div className="bg-stone-200 w-16 dark:bg-stone-600 rounded-xl flex justify-center items-center h-16 font-bold text-stone-700 dark:text-stone-100 text-2xl aspect-square">
                {value}
            </div>
            <span className="text-sm font-semibold tracking-wider text-stone-500 dark:text-stone-400">{name}</span>
        </div>
    )

}

export default GameData;