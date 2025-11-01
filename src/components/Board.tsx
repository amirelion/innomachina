import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

type Card = { id:string; label:string; meta?:any };
type Columns = Record<string, Card[]>;

const seed: Columns = {
  "Column A": [{id:"a1", label:"Item A1"}, {id:"a2", label:"Item A2"}],
  "Column B": [{id:"b1", label:"Item B1"}],
  "Column C": [{id:"c1", label:"Item C1"}]
};

export default function Board({ onOpen }:{ onOpen:(id:string)=>void }) {
  const [cols, setCols] = useState<Columns>(seed);
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="h-full p-6 grid grid-cols-3 gap-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter}
        onDragEnd={({active, over})=>{
          if (!over || active.id===over.id) return;
          // Simple same-column reorder for example; wire your own column logic
          const col = "Column A";
          const ids = cols[col].map(x=>x.id);
          const oldIndex = ids.indexOf(String(active.id));
          const newIndex = ids.indexOf(String(over.id));
          if (oldIndex>-1 && newIndex>-1) {
            const reordered = arrayMove(cols[col], oldIndex, newIndex);
            setCols({...cols, [col]: reordered});
          }
        }}>
        {Object.entries(cols).map(([name,cards])=>(
          <div key={name} className="rounded-xl bg-neutral-900/60 p-3">
            <h3 className="font-semibold mb-2">{name}</h3>
            <SortableContext items={cards.map(c=>c.id)} strategy={rectSortingStrategy}>
              <div className="space-y-2">
                {cards.map(c=><CardTile key={c.id} card={c} onOpen={()=>onOpen(c.id)} />)}
              </div>
            </SortableContext>
          </div>
        ))}
      </DndContext>
    </div>
  );
}

function CardTile({card,onOpen}:{card:Card; onOpen:()=>void}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id:card.id});
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="rounded-lg bg-neutral-800 hover:bg-neutral-700 p-3 cursor-grab"
      onDoubleClick={onOpen}
    >
      {card.label}
    </div>
  );
}
