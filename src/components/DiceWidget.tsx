import toast from "react-hot-toast";
import { Howl } from "howler";
import { useEffect, useRef } from "react";

type DiceType = "A"|"B"|"C";

export default function DiceWidget({ onRoll }:{ onRoll:(type:DiceType,value:string)=>void }) {
  const sfx = useRef<Howl|null>(null);
  useEffect(()=>{ sfx.current = new Howl({ src:["/sounds/dice.mp3"], volume:0.5 }); },[]);
  const roll = (t:DiceType) => {
    sfx.current?.play();
    const value = Math.random().toString(36).slice(2,8);
    onRoll(t, value);
    toast(`Rolled ${t}: ${value}`);
  };
  return (
    <div className="absolute bottom-4 right-4">
      <div className="rounded-2xl bg-neutral-900/80 backdrop-blur px-3 py-2 shadow-lg">
        <div className="text-xs text-neutral-300 mb-1">Dice</div>
        <div className="flex gap-2">
          <button className="rounded bg-neutral-800 px-2 py-1 text-xs" onClick={()=>roll("A")}>🎲 A</button>
          <button className="rounded bg-neutral-800 px-2 py-1 text-xs" onClick={()=>roll("B")}>🧩 B</button>
          <button className="rounded bg-neutral-800 px-2 py-1 text-xs" onClick={()=>roll("C")}>🤪 C</button>
        </div>
      </div>
    </div>
  );
}
