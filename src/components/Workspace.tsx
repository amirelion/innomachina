export default function Workspace({
  itemId,
  onSave,
  onBack
}:{
  itemId: string;
  onSave: (payload:{ itemId:string; data:any })=>void;
  onBack: ()=>void;
}) {
  return (
    <div className="h-full grid grid-cols-5">
      <section className="col-span-3 p-6 overflow-auto">
        <header className="flex items-center gap-3 mb-3">
          <button className="rounded bg-neutral-800 px-3 py-1.5" onClick={onBack}>← Back</button>
          <h2 className="text-xl font-semibold">Workspace</h2>
          <div className="text-sm text-neutral-400">Item: {itemId}</div>
        </header>
        <div className="rounded-xl bg-neutral-900/60 p-4 h-[70vh]">
          {/* Inject your editor/widgets later */}
        </div>
        <div className="mt-3">
          <button
            className="rounded bg-emerald-600 hover:bg-emerald-500 px-3 py-2"
            onClick={()=>onSave({ itemId, data: {} })}
          >
            Save
          </button>
        </div>
      </section>

      <aside className="col-span-2 border-l border-neutral-800 flex flex-col">
        {/* Right rail for auxiliary panels */}
        <div className="p-4 grow overflow-auto">Right Panel</div>
      </aside>
    </div>
  );
}
