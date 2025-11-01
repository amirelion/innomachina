import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import html2pdf from "html2pdf.js";

type RowCard = { id:string; title:string; tags?:string[] };

export default function VaultGrid({ onOpen }:{ onOpen:(id:string)=>void }) {
  const data: RowCard[] = useMemo(()=>Array.from({length:90}).map((_,i)=>({ id:`I-${i}`, title:`Item ${i}` })),[]);
  const rows = useMemo(()=>chunk(data,3),[data]);
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 160
  });

  return (
    <div className="h-full p-6">
      <div ref={parentRef} className="h-full overflow-auto border border-neutral-800 rounded-xl">
        <div style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}>
          {rowVirtualizer.getVirtualItems().map(vi=>{
            const row = rows[vi.index] || [];
            return (
              <div key={vi.key} className="absolute left-0 right-0 px-4" style={{ transform:`translateY(${vi.start}px)` }}>
                <div className="grid grid-cols-3 gap-4 py-3">
                  {row.map(card => <VaultCard key={card.id} {...card} onOpen={()=>onOpen(card.id)} />)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VaultCard({id,title,onOpen}:{id:string;title:string;onOpen:()=>void}) {
  const ref = useRef<HTMLDivElement>(null);
  const exportPdf = () => { if(ref.current) html2pdf().from(ref.current).save(`${title}.pdf`); };
  return (
    <div ref={ref} className="rounded-xl bg-neutral-900/60 p-4">
      <h4 className="font-semibold">{title}</h4>
      <div className="mt-3 flex gap-2">
        <button className="text-xs rounded bg-neutral-800 px-2 py-1" onClick={onOpen}>Open</button>
        <button className="text-xs rounded bg-neutral-800 px-2 py-1" onClick={exportPdf}>Export PDF</button>
      </div>
    </div>
  );
}

function chunk<T>(arr:T[], n:number){ const out:T[][]=[]; for(let i=0;i<arr.length;i+=n) out.push(arr.slice(i,i+n)); return out; }
