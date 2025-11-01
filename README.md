# Innomachina UI

Interactive visual components system built with React, TypeScript, and modern UI libraries.

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

### Integration Layer

The `src/actions.ts` file contains stubs for Base44 integration:

- `loadWorld()` - Load world regions
- `loadRegion(id)` - Load region items
- `openItem(id)` - Open specific item
- `saveItem(payload)` - Save item data
- `listGrid(query)` - List grid items

These stubs should be wired to your actual backend/Base44 implementation.

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

## Sound Assets

Place sound files in `public/sounds/`:
- `ambient.mp3` - Background ambient loop
- `dice.mp3` - Dice roll sound effect

## License

MIT
