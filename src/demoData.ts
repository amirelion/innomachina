import type { RegionSpec, ListItem } from "./ui-types";

/**
 * Demo data for standalone app
 */

// World regions for the zoomable canvas
export const demoRegions: RegionSpec[] = [
  { id: "region-1", x: 400, y: 300, radius: 80, color: 0x3b82f6, meta: { name: "North Sector" } },
  { id: "region-2", x: 800, y: 500, radius: 100, color: 0x8b5cf6, meta: { name: "East Sector" } },
  { id: "region-3", x: 1200, y: 400, radius: 90, color: 0xec4899, meta: { name: "South Sector" } },
  { id: "region-4", x: 600, y: 800, radius: 70, color: 0x10b981, meta: { name: "West Sector" } },
  { id: "region-5", x: 1000, y: 1000, radius: 85, color: 0xf59e0b, meta: { name: "Central Hub" } },
  { id: "region-6", x: 1400, y: 800, radius: 75, color: 0x06b6d4, meta: { name: "Edge Zone" } },
];

// Items per region
export const regionItems: Record<string, ListItem[]> = {
  "region-1": [
    { id: "item-1-1", label: "Project Alpha", meta: { type: "project" } },
    { id: "item-1-2", label: "Task List A", meta: { type: "task" } },
    { id: "item-1-3", label: "Research Notes", meta: { type: "notes" } },
    { id: "item-1-4", label: "Design Mockups", meta: { type: "design" } },
  ],
  "region-2": [
    { id: "item-2-1", label: "Project Beta", meta: { type: "project" } },
    { id: "item-2-2", label: "Meeting Minutes", meta: { type: "notes" } },
    { id: "item-2-3", label: "Code Review", meta: { type: "task" } },
  ],
  "region-3": [
    { id: "item-3-1", label: "Project Gamma", meta: { type: "project" } },
    { id: "item-3-2", label: "Sprint Planning", meta: { type: "task" } },
    { id: "item-3-3", label: "Documentation", meta: { type: "notes" } },
    { id: "item-3-4", label: "API Specs", meta: { type: "design" } },
    { id: "item-3-5", label: "Testing Plan", meta: { type: "task" } },
  ],
  "region-4": [
    { id: "item-4-1", label: "Project Delta", meta: { type: "project" } },
    { id: "item-4-2", label: "Brainstorm Session", meta: { type: "notes" } },
  ],
  "region-5": [
    { id: "item-5-1", label: "Project Epsilon", meta: { type: "project" } },
    { id: "item-5-2", label: "Roadmap Q1", meta: { type: "task" } },
    { id: "item-5-3", label: "Architecture Diagram", meta: { type: "design" } },
    { id: "item-5-4", label: "Requirements Doc", meta: { type: "notes" } },
  ],
  "region-6": [
    { id: "item-6-1", label: "Project Zeta", meta: { type: "project" } },
    { id: "item-6-2", label: "User Stories", meta: { type: "task" } },
    { id: "item-6-3", label: "Wireframes", meta: { type: "design" } },
  ],
};

// Get items for a specific region
export function getRegionItems(regionId: string): ListItem[] {
  return regionItems[regionId] || [];
}

// Get region name
export function getRegionName(regionId: string): string {
  const region = demoRegions.find(r => r.id === regionId);
  return region?.meta?.name || regionId;
}
