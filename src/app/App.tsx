import { ControlPanel } from "@/entities/control-panel";
import { Keyboard } from "@/entities/keyboard";

function App() {
  return (
    <div className="w-full h-screen flex flex-col max-w-[1280px] mx-auto px-4 py-2 gap-4">
      <ControlPanel />
      <Keyboard />
    </div>
  );
}

export default App;
