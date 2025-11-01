# Quick Start: Adding Data

There are **3 main ways** to add data to Innomachina UI:

## 1. 🎨 Use the Data Manager UI (Easiest)

Click the **"⚙️ Data"** button in the header to:
- Export your current data as JSON
- Download a backup file
- Import data from a JSON file
- Reset to default demo data

This is the easiest way to manage your data visually.

---

## 2. ✏️ Edit Demo Data File

Edit `src/demoData.ts` directly:

```typescript
export const demoRegions: RegionSpec[] = [
  {
    id: "my-region",
    x: 500,        // Position on canvas (0-2000)
    y: 400,        // Position on canvas (0-2000)
    radius: 80,    // Bubble size (50-120)
    color: 0x3b82f6,  // Blue color (hex number)
    meta: { name: "My Region" }
  }
];

export const regionItems: Record<string, ListItem[]> = {
  "my-region": [
    { id: "item-1", label: "My First Item", meta: { type: "project" } }
  ]
};
```

**Restart the dev server** to see changes.

---

## 3. 💾 Use localStorage API (Programmatic)

The app now auto-saves to browser storage! Use the API:

```typescript
import * as dataStore from "./dataStore";

// Add a region
dataStore.addRegion({
  id: "new-region",
  x: 800,
  y: 600,
  radius: 90,
  color: 0x10b981,
  meta: { name: "New Region" }
});

// Add an item
dataStore.addItem("new-region", {
  id: "item-1",
  label: "My Task",
  meta: { type: "task" }
});

// Update
dataStore.updateRegion("new-region", {
  meta: { name: "Updated Name" }
});

// Delete
dataStore.deleteItem("new-region", "item-1");
dataStore.deleteRegion("new-region");
```

---

## Color Reference

Common colors (use as hex numbers):

```typescript
0x3b82f6  // Blue
0x8b5cf6  // Purple
0xec4899  // Pink
0x10b981  // Green
0xf59e0b  // Amber
0x06b6d4  // Cyan
0xef4444  // Red
0xf97316  // Orange
```

---

## Data Persistence

- **localStorage** - Data automatically persists in your browser
- **Export/Import** - Use the Data Manager to backup/restore
- **Multiple Browsers** - Export from one, import to another

---

## Tips

1. **Unique IDs** - Always use unique IDs for regions and items
2. **Canvas Range** - Keep x/y between 0-2000
3. **Readable Colors** - Use 0x prefix for hex colors (e.g., 0xFF0000 for red)
4. **Backup Often** - Use the Data Manager to download backups

---

## Need More?

See [DATA_GUIDE.md](./DATA_GUIDE.md) for:
- React hooks (`useRegions`, `useRegionItems`)
- CSV/API integration examples
- Advanced data patterns
- Full API reference
