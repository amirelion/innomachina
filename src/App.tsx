import { useState } from "react";
import toast from "react-hot-toast";
import WorldCanvas from "./components/WorldCanvas";
import RegionSurface from "./components/RegionSurface";
import Workspace from "./components/Workspace";
import Board from "./components/Board";
import VaultGrid from "./components/VaultGrid";
import SocialHub from "./components/SocialHub";
import GraphBuilder from "./components/GraphBuilder";
import DiceWidget from "./components/DiceWidget";
import DataManager from "./components/DataManager";
import { useRegions, useRegionItems } from "./hooks/useData";

type Screen = "world"|"region"|"workspace"|"board"|"vault"|"social"|"graph";

export default function App() {
  const [screen, setScreen] = useState<Screen>("world");
  const [activeRegion, setActiveRegion] = useState<string|undefined>();
  const [activeItem, setActiveItem] = useState<string|undefined>();
  const [showDataManager, setShowDataManager] = useState(false);

  // Use hooks for reactive data management
  const { regions } = useRegions();
  const { items } = useRegionItems(activeRegion);

  const handleSave = (payload: { itemId: string; data: any }) => {
    console.log("Saving item:", payload);
    toast.success(`Saved item: ${payload.itemId}`);
  };

  return (
    <div className="h-full flex flex-col bg-neutral-950 text-neutral-100">
      <header className="flex items-center gap-2 p-3 border-b border-neutral-800">
        <div className="font-semibold tracking-wide">Innomachina UI</div>
        <nav className="ml-auto flex gap-2">
          <Btn onClick={()=>setScreen("world")}>World</Btn>
          <Btn onClick={()=>setScreen("board")}>Board</Btn>
          <Btn onClick={()=>setScreen("vault")}>Vault</Btn>
          <Btn onClick={()=>setScreen("social")}>Social</Btn>
          <Btn onClick={()=>setScreen("graph")}>Graph</Btn>
          <button
            onClick={()=>setShowDataManager(true)}
            className="rounded-lg bg-emerald-700/60 hover:bg-emerald-600/70 px-3 py-1.5"
            title="Manage Data"
          >
            ⚙️ Data
          </button>
        </nav>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {screen==="world" && (
          <WorldCanvas
            regions={regions}
            onRegionClick={(id)=>{ setActiveRegion(id); setScreen("region"); }}
            onReady={()=>{/* optional */}}
          />
        )}
        {screen==="region" && (
          <RegionSurface
            regionId={activeRegion!}
            items={items}
            onItemOpen={(id)=>{ setActiveItem(id); setScreen("workspace"); }}
            onBack={()=>setScreen("world")}
          />
        )}
        {screen==="workspace" && (
          <Workspace
            itemId={activeItem!}
            onSave={handleSave}
            onBack={()=>setScreen("region")}
          />
        )}
        {screen==="board" && <Board onOpen={(id)=>{ setActiveItem(id); setScreen("workspace"); }} />}
        {screen==="vault" && <VaultGrid onOpen={(id)=>{ setActiveItem(id); setScreen("workspace"); }} />}
        {screen==="social" && <SocialHub />}
        {screen==="graph" && <GraphBuilder />}
        <DiceWidget onRoll={(type, value)=>{ console.log(`Dice rolled: ${type} = ${value}`); }} />
        {showDataManager && <DataManager onClose={() => setShowDataManager(false)} />}
      </main>
    </div>
  );
}

function Btn({children,onClick}:{children:React.ReactNode,onClick:()=>void}) {
  return <button className="rounded-lg bg-neutral-800/60 hover:bg-neutral-700/70 px-3 py-1.5" onClick={onClick}>{children}</button>;
}
