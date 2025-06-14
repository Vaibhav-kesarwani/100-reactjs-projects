import Game from "./components/Game";
import NavBar from "./components/NavBar";

function App() {
	return (
		<div className="w-screen h-screen bg-stone-100 dark:bg-stone-700 flex flex-col">
			<NavBar></NavBar>
			<Game></Game>
		</div>
	);
}

export default App;