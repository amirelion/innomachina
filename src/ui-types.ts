export type UID = string;
export type ListItem = { id:UID; label:string; meta?:any };
export type GridItem = { id:UID; title:string; tags?:string[]; previewUrl?:string };
export type RegionSpec = { id:UID; x:number; y:number; radius:number; color:number; meta?:any };
