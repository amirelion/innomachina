import { Stage, Container, Graphics } from "@pixi/react";
import { useEffect, useRef, useMemo } from "react";
import { Application } from "pixi.js";
import { Viewport } from "pixi-viewport";

export type WorldRegion = { id:string; x:number; y:number; radius:number; color:number; meta?:any };

export default function WorldCanvas({
  regions,
  onRegionClick,
  onReady
}:{
  regions: WorldRegion[];
  onRegionClick: (id:string)=>void;
  onReady?: (app:Application)=>void;
}) {
  const appRef = useRef<Application|null>(null);
  const vpRef = useRef<Viewport|null>(null);

  const size = useMemo(()=>({ w: window.innerWidth, h: window.innerHeight - 64 }),[]);
  useEffect(()=>{
    const onResize = () => {
      if (!appRef.current || !vpRef.current) return;
      const { width, height } = appRef.current.renderer;
      vpRef.current.resize(width, height, 2000, 2000);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  },[]);

  const onMount = (app: Application) => {
    appRef.current = app;
    const vp = new Viewport({
      screenWidth: app.renderer.width,
      screenHeight: app.renderer.height,
      worldWidth: 2000,
      worldHeight: 2000,
      events: app.renderer.events
    });
    vp.drag().pinch().wheel().decelerate();
    app.stage.addChild(vp);
    vpRef.current = vp;
    onReady?.(app);
  };

  return (
    <Stage width={size.w} height={size.h} options={{ backgroundAlpha: 0 }} onMount={onMount}>
      <Container>
        {regions.map(r => (
          <Bubble key={r.id} {...r} onClick={()=>onRegionClick(r.id)} />
        ))}
      </Container>
    </Stage>
  );
}

function Bubble({
  id, x, y, radius, color, onClick
}:{ id:string; x:number; y:number; radius:number; color:number; onClick:()=>void }) {
  const ref = useRef<any>(null);
  useEffect(() => {
    const g = ref.current;
    if (!g) return;
    g.eventMode = "static";
    g.cursor = "pointer";
    g.on("pointertap", onClick);
  }, [onClick]);
  return (
    <Graphics
      ref={ref}
      draw={g => {
        g.clear();
        g.beginFill(color, 0.75).drawCircle(x, y, radius).endFill();
        g.lineStyle(3, 0xffffff, 0.15).drawCircle(x, y, radius + 8);
      }}
    />
  );
}
