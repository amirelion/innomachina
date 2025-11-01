# Data Management Guide

This guide explains how to add, manage, and persist data in Innomachina UI.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Data Structure](#data-structure)
3. [Methods for Adding Data](#methods-for-adding-data)
4. [API Reference](#api-reference)
5. [Advanced Usage](#advanced-usage)

---

## Quick Start

### Option 1: Edit Demo Data Directly (Simplest)

Edit `src/demoData.ts` to add your regions and items:

```typescript
export const demoRegions: RegionSpec[] = [
  {
    id: "my-region",
    x: 400,
    y: 300,
    radius: 80,
    color: 0x3b82f6,  // Hex color (blue)
    meta: { name: "My Region Name" }
  },
  // Add more regions...
];

export const regionItems: Record<string, ListItem[]> = {
  "my-region": [
    { id: "item-1", label: "My First Item", meta: { type: "project" } },
    { id: "item-2", label: "Another Item", meta: { type: "task" } },
    // Add more items...
  ],
};
```

### Option 2: Use localStorage Persistence (Recommended)

We've added a full data store with browser persistence. Update `src/App.tsx` to use it:

```typescript
// Change this import:
import { demoRegions, getRegionItems } from "./demoData";

// To this:
import { getRegions, getRegionItems } from "./dataStore";

// And update:
regions={demoRegions}
// To:
regions={getRegions()}
```

Now all changes persist in the browser!

### Option 3: Use React Hooks (Most Flexible)

```typescript
import { useRegions, useRegionItems } from "./hooks/useData";

function MyComponent() {
  const { regions, addRegion, updateRegion, deleteRegion } = useRegions();
  const { items, addItem, updateItem, deleteItem } = useRegionItems(regionId);

  // Use these functions to manage data with automatic persistence
}
```

---

## Data Structure

### Region Schema

```typescript
interface RegionSpec {
  id: string;           // Unique identifier
  x: number;            // X position on canvas (0-2000)
  y: number;            // Y position on canvas (0-2000)
  radius: number;       // Bubble radius (50-120 recommended)
  color: number;        // Hex color as number (0xFF0000 for red)
  meta?: {              // Optional metadata
    name?: string;      // Display name
    [key: string]: any; // Any custom properties
  };
}
```

### Item Schema

```typescript
interface ListItem {
  id: string;           // Unique identifier
  label: string;        // Display label
  meta?: {              // Optional metadata
    type?: string;      // e.g., "project", "task", "note"
    [key: string]: any; // Any custom properties
  };
}
```

### Full Data Schema

```typescript
interface AppData {
  regions: RegionSpec[];
  items: Record<string, ListItem[]>;  // regionId -> items[]
}
```

---

## Methods for Adding Data

### Method 1: Direct File Edit

**Best for:** Initial setup, static data

Edit `src/demoData.ts`:

```typescript
export const demoRegions: RegionSpec[] = [
  {
    id: "engineering",
    x: 500,
    y: 400,
    radius: 100,
    color: 0x3b82f6,
    meta: {
      name: "Engineering Team",
      department: "tech",
      teamSize: 12
    }
  }
];

export const regionItems: Record<string, ListItem[]> = {
  "engineering": [
    {
      id: "eng-1",
      label: "Backend API Redesign",
      meta: {
        type: "project",
        priority: "high",
        assignee: "Alice"
      }
    }
  ]
};
```

### Method 2: localStorage API

**Best for:** Programmatic data management, user-generated content

```typescript
import * as dataStore from "./dataStore";

// Add a new region
dataStore.addRegion({
  id: "sales-team",
  x: 800,
  y: 600,
  radius: 85,
  color: 0x10b981,
  meta: { name: "Sales Team" }
});

// Add items to a region
dataStore.addItem("sales-team", {
  id: "sales-1",
  label: "Q1 Sales Report",
  meta: { type: "document" }
});

// Update existing data
dataStore.updateRegion("sales-team", {
  meta: { name: "Sales & Marketing" }
});

dataStore.updateItem("sales-team", "sales-1", {
  label: "Q1 Sales Report (Updated)"
});

// Delete data
dataStore.deleteItem("sales-team", "sales-1");
dataStore.deleteRegion("sales-team");
```

### Method 3: React Hooks (UI Integration)

**Best for:** Building interactive UIs, real-time updates

```typescript
import { useRegions, useRegionItems } from "./hooks/useData";

function RegionManager() {
  const { regions, addRegion, updateRegion, deleteRegion } = useRegions();

  const handleAddRegion = () => {
    addRegion({
      id: `region-${Date.now()}`,
      x: Math.random() * 2000,
      y: Math.random() * 2000,
      radius: 80,
      color: Math.random() * 0xFFFFFF,
      meta: { name: "New Region" }
    });
  };

  return (
    <div>
      <button onClick={handleAddRegion}>Add Region</button>
      {regions.map(r => (
        <div key={r.id}>
          {r.meta?.name}
          <button onClick={() => deleteRegion(r.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Method 4: Import/Export JSON

**Best for:** Backups, sharing, migration

```typescript
import { useDataManagement } from "./hooks/useData";

function BackupManager() {
  const { exportData, importData, downloadBackup, uploadBackup } = useDataManagement();

  // Download backup file
  const handleBackup = () => {
    downloadBackup(); // Downloads JSON file
  };

  // Import from file
  const handleRestore = (file: File) => {
    uploadBackup(file).then(success => {
      if (success) alert("Data restored!");
    });
  };

  // Or manually with JSON string
  const jsonData = exportData();
  console.log(jsonData); // Copy this

  // Later, restore it:
  importData(jsonData);
}
```

### Method 5: Programmatic Bulk Import

**Best for:** Migrating from another system

```typescript
import { importData } from "./dataStore";

const myData = {
  regions: [
    { id: "r1", x: 400, y: 300, radius: 80, color: 0x3b82f6, meta: { name: "Region 1" } },
    { id: "r2", x: 800, y: 500, radius: 90, color: 0x8b5cf6, meta: { name: "Region 2" } },
  ],
  items: {
    "r1": [
      { id: "item-1", label: "Task A", meta: { type: "task" } },
      { id: "item-2", label: "Task B", meta: { type: "task" } },
    ],
    "r2": [
      { id: "item-3", label: "Project X", meta: { type: "project" } },
    ]
  }
};

importData(JSON.stringify(myData));
window.location.reload(); // Refresh to see changes
```

---

## API Reference

### dataStore Module

```typescript
// Read operations
getRegions(): RegionSpec[]
getRegionItems(regionId: string): ListItem[]
getRegionName(regionId: string): string
getAllData(): AppData

// Write operations
addRegion(region: RegionSpec): void
updateRegion(id: string, updates: Partial<RegionSpec>): void
deleteRegion(id: string): void

addItem(regionId: string, item: ListItem): void
updateItem(regionId: string, itemId: string, updates: Partial<ListItem>): void
deleteItem(regionId: string, itemId: string): void

// Import/Export
exportData(): string
importData(jsonString: string): boolean
resetData(): void
```

### React Hooks

```typescript
// useRegions()
const { regions, addRegion, updateRegion, deleteRegion, refresh } = useRegions();

// useRegionItems(regionId)
const { items, addItem, updateItem, deleteItem, refresh } = useRegionItems(regionId);

// useDataManagement()
const { exportData, importData, resetData, downloadBackup, uploadBackup } = useDataManagement();
```

---

## Advanced Usage

### Example: CSV Import

```typescript
function importFromCSV(csvString: string) {
  const lines = csvString.split('\n');
  const headers = lines[0].split(',');

  lines.slice(1).forEach((line, index) => {
    const values = line.split(',');
    const region = {
      id: `imported-${index}`,
      x: parseInt(values[0]),
      y: parseInt(values[1]),
      radius: parseInt(values[2]),
      color: parseInt(values[3], 16),
      meta: { name: values[4] }
    };
    dataStore.addRegion(region);
  });
}
```

### Example: API Integration

```typescript
async function syncWithBackend() {
  // Fetch from API
  const response = await fetch('https://api.example.com/regions');
  const data = await response.json();

  // Import into app
  importData(JSON.stringify(data));
  window.location.reload();
}

async function saveToBackend() {
  const data = exportData();

  await fetch('https://api.example.com/regions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
}
```

### Example: Real-time Collaboration

```typescript
// Using Socket.io or similar
socket.on('region-added', (region: RegionSpec) => {
  dataStore.addRegion(region);
  // Trigger re-render
  window.dispatchEvent(new Event('storage'));
});

function handleLocalChange(region: RegionSpec) {
  dataStore.addRegion(region);
  socket.emit('region-added', region);
}
```

---

## Color Reference

Common colors for regions (as hex numbers):

```typescript
const colors = {
  blue: 0x3b82f6,
  purple: 0x8b5cf6,
  pink: 0xec4899,
  green: 0x10b981,
  amber: 0xf59e0b,
  cyan: 0x06b6d4,
  red: 0xef4444,
  orange: 0xf97316,
  emerald: 0x059669,
  indigo: 0x6366f1,
};
```

---

## Tips

1. **IDs must be unique** - Use `Date.now()`, UUIDs, or sequential numbers
2. **Canvas coordinates** - Range from 0-2000 for both x and y
3. **Radius range** - Keep between 50-120 for best visual appearance
4. **localStorage limits** - Browser storage is typically 5-10MB
5. **Backup regularly** - Use the export function to save your data
6. **Test imports** - Always test JSON imports with small datasets first

---

## Need Help?

- Check the browser console for errors
- Verify JSON structure with a validator
- Use the Data Manager UI component for visual management
- Export and inspect current data structure as a template
