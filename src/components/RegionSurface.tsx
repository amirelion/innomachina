export default function RegionSurface({
  regionId,
  items,
  onItemOpen,
  onBack
}:{
  regionId: string;
  items: { id:string; label:string; meta?:any }[];
  onItemOpen: (id:string)=>void;
  onBack: ()=>void;
}) {
  return (
    <div className="h-full grid grid-cols-5 bg-gradient-to-br from-neutral-900/40 via-neutral-900/30 to-neutral-900/40">
      <aside className="col-span-2 p-6 backdrop-blur-sm">
        <button className="rounded bg-neutral-800 px-3 py-1.5" onClick={onBack}>← Back</button>
        <h2 className="text-xl font-semibold mt-3">Region</h2>
        <div className="text-neutral-300 text-sm">{regionId}</div>
        <h3 className="mt-6 mb-2 font-semibold">Items</h3>
        <ul className="space-y-2">
          {items.map(i=>(
            <li key={i.id}>
              <button className="w-full text-left rounded-lg bg-neutral-900/60 hover:bg-neutral-800 p-3"
                onClick={()=>onItemOpen(i.id)}
              >
                {i.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="col-span-3 p-6 border-l border-neutral-800">
        {/* Reserved space for injected panels */}
        <div className="rounded-xl bg-neutral-900/50 h-full"></div>
      </section>
    </div>
  );
}
