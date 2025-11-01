import { Howl } from "howler";
import { useEffect } from "react";

export default function SocialHub() {
  useEffect(()=>{
    // Optional ambient loop (add /sounds/ambient.mp3)
    const amb = new Howl({ src:["/sounds/ambient.mp3"], volume:0.15, loop:true });
    amb.play(); return ()=>amb.unload();
  },[]);
  const posts = [{id:"1", user:"User A", text:"Note…"}, {id:"2", user:"User B", text:"Comment…"}];
  return (
    <div className="h-full p-6">
      <div className="max-w-3xl mx-auto space-y-3">
        {posts.map(p=>(
          <div key={p.id} className="rounded-xl bg-neutral-900/60 p-4">
            <div className="text-sm text-neutral-400">{p.user}</div>
            <div>{p.text}</div>
            <div className="mt-2 flex gap-2 text-sm">
              <button>👍</button><button>💬</button><button>⭐</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
