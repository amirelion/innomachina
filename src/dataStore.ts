import type { RegionSpec, ListItem } from "./ui-types";

/**
 * Data Store - localStorage-based persistence
 */

const STORAGE_KEY = "innomachina-data";

interface AppData {
  regions: RegionSpec[];
  items: Record<string, ListItem[]>;
}

// Default data
const defaultData: AppData = {
  regions: [
    { id: "region-1", x: 400, y: 300, radius: 80, color: 0x3b82f6, meta: { name: "North Sector" } },
    { id: "region-2", x: 800, y: 500, radius: 100, color: 0x8b5cf6, meta: { name: "East Sector" } },
    { id: "region-3", x: 1200, y: 400, radius: 90, color: 0xec4899, meta: { name: "South Sector" } },
    { id: "region-4", x: 600, y: 800, radius: 70, color: 0x10b981, meta: { name: "West Sector" } },
    { id: "region-5", x: 1000, y: 1000, radius: 85, color: 0xf59e0b, meta: { name: "Central Hub" } },
    { id: "region-6", x: 1400, y: 800, radius: 75, color: 0x06b6d4, meta: { name: "Edge Zone" } },
  ],
  items: {
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
  },
};

// Load data from localStorage or use defaults
function loadData(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load data from localStorage:", error);
  }
  return defaultData;
}

// Save data to localStorage
function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save data to localStorage:", error);
  }
}

// Initialize data store
let appData = loadData();

// Export functions for data access
export function getRegions(): RegionSpec[] {
  return appData.regions;
}

export function getRegionItems(regionId: string): ListItem[] {
  return appData.items[regionId] || [];
}

export function getRegionName(regionId: string): string {
  const region = appData.regions.find((r) => r.id === regionId);
  return region?.meta?.name || regionId;
}

export function addRegion(region: RegionSpec): void {
  appData.regions.push(region);
  appData.items[region.id] = [];
  saveData(appData);
}

export function updateRegion(id: string, updates: Partial<RegionSpec>): void {
  const index = appData.regions.findIndex((r) => r.id === id);
  if (index !== -1) {
    appData.regions[index] = { ...appData.regions[index], ...updates };
    saveData(appData);
  }
}

export function deleteRegion(id: string): void {
  appData.regions = appData.regions.filter((r) => r.id !== id);
  delete appData.items[id];
  saveData(appData);
}

export function addItem(regionId: string, item: ListItem): void {
  if (!appData.items[regionId]) {
    appData.items[regionId] = [];
  }
  appData.items[regionId].push(item);
  saveData(appData);
}

export function updateItem(regionId: string, itemId: string, updates: Partial<ListItem>): void {
  const items = appData.items[regionId];
  if (items) {
    const index = items.findIndex((i) => i.id === itemId);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      saveData(appData);
    }
  }
}

export function deleteItem(regionId: string, itemId: string): void {
  const items = appData.items[regionId];
  if (items) {
    appData.items[regionId] = items.filter((i) => i.id !== itemId);
    saveData(appData);
  }
}

// Export/Import functionality
export function exportData(): string {
  return JSON.stringify(appData, null, 2);
}

export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    // Basic validation
    if (data.regions && Array.isArray(data.regions) && data.items && typeof data.items === "object") {
      appData = data;
      saveData(appData);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to import data:", error);
    return false;
  }
}

export function resetData(): void {
  appData = defaultData;
  saveData(appData);
}

// Get all data (for backup/debugging)
export function getAllData(): AppData {
  return { ...appData, items: { ...appData.items } };
}
