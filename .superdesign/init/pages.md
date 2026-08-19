# Pages

## `/` Home
Entry: `app/page.tsx`

Dependencies:
- `components/Navigation.tsx`
- `components/workspace/Workspace.tsx`
  - `components/workspace/ProjectIndex.tsx`
  - `components/workspace/ContextCursor.tsx`
  - `components/workspace/H2OScene.tsx`
    - `components/three/H2OViewer.tsx`
      - `components/three/H2OModel.tsx`
      - `components/three/h2oVariants.ts`
  - `components/workspace/TerrambuScene.tsx`
  - `components/workspace/ProductScene.tsx`
  - `components/workspace/DigitalSystemScene.tsx`
  - `components/workspace/workspaceData.ts`
- `components/Capabilities.tsx`
- `components/Contact.tsx`
- `styles/globals.css`
- `styles/workspace.module.css`

## `/experiments/cinematic-home`
New target. Planned dependencies:
- server `page.tsx` with route metadata
- one client experience shell for scroll progress and HTML overlays
- one R3F canvas/world component
- route-scoped CSS module
