# Innomachina UI

A standalone interactive visual components system built with React, TypeScript, and modern UI libraries. This is a fully functional demo app with no backend dependencies.

## Features

- **WorldCanvas** - Zoomable, pan-able Pixi.js canvas with clickable regions
- **RegionSurface** - Chapter-like area with sidebar navigation
- **Workspace** - Focused editing environment with save functionality
- **Board** - Kanban-style drag-and-drop interface
- **VaultGrid** - Virtualized card grid with PDF export
- **SocialHub** - Social feed with ambient audio
- **GraphBuilder** - Interactive node/edge graph editor
- **DiceWidget** - Random dice roller with sound effects

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Architecture

### Components

All interactive components are located in `src/components/`:

- `WorldCanvas.tsx` - Pixi.js-based zoomable world map
- `RegionSurface.tsx` - Region detail view with item list
- `Workspace.tsx` - Main editing workspace
- `Board.tsx` - Drag-and-drop kanban board
- `VaultGrid.tsx` - Virtualized grid with PDF export
- `SocialHub.tsx` - Social feed interface
- `GraphBuilder.tsx` - React Flow graph editor
- `DiceWidget.tsx` - Floating dice widget

### Demo Data

The `src/demoData.ts` file contains sample data for the standalone app:

- `demoRegions` - 6 sample world regions with different colors and positions
- `regionItems` - Sample items for each region
- `getRegionItems(id)` - Helper to fetch items for a specific region
- `getRegionName(id)` - Helper to get the display name of a region

All data is stored in-memory. Modify this file to customize your demo content.

### Type Definitions

Common UI types are defined in `src/ui-types.ts`:

- `UID` - Unique identifier
- `ListItem` - Generic list item
- `GridItem` - Grid card item
- `RegionSpec` - World region specification

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Pixi.js** - 2D rendering (WorldCanvas)
- **React Flow** - Node graph editing
- **dnd-kit** - Drag and drop
- **TanStack Virtual** - Virtualization
- **Howler.js** - Audio playback
- **html2pdf.js** - PDF export
- **react-hot-toast** - Notifications

## Sound Assets (Optional)

Place sound files in `public/sounds/` to enable audio features:
- `ambient.mp3` - Background ambient loop for SocialHub
- `dice.mp3` - Dice roll sound effect for DiceWidget

The app will work without these files, but audio features will be silent.

## Features Overview

### WorldCanvas
- Zoomable canvas using Pixi.js and pixi-viewport
- Drag, pinch, and mouse wheel navigation
- 6 colored region bubbles with hover effects
- Click any region to view its contents

### RegionSurface
- Two-column layout showing region details
- Left sidebar lists all items in the region
- Click any item to open it in the Workspace
- Back button returns to World view

### Workspace
- Focused editing environment for individual items
- Save button with toast notification
- Right panel for future extensions
- Back button returns to Region view

### Board
- Kanban-style three-column layout
- Drag and drop cards between columns (dnd-kit)
- Double-click cards to open in Workspace
- Demo data includes sample cards

### VaultGrid
- Virtualized grid rendering 90 sample items
- Efficient scrolling with TanStack Virtual
- PDF export button on each card
- Three-column responsive layout

### SocialHub
- Social feed interface with post cards
- Reaction buttons (like, comment, star)
- Ambient audio loop (optional)
- Sample posts included

### GraphBuilder
- Interactive node/edge graph editor
- Drag nodes to reposition
- Connect nodes by dragging edges
- MiniMap and zoom controls
- Built with React Flow

### DiceWidget
- Floating widget in bottom-right corner
- Three dice types with random outputs
- Sound effects on roll (optional)
- Toast notifications with results

## Customization

To customize the demo data:

1. Edit `src/demoData.ts` to modify regions and items
2. Update region colors, positions, and metadata
3. Add or remove items from any region
4. All changes are reflected immediately in the app

## License

MIT
