# AI Game Studio — Lessons 1–4

A static English prompt builder. No server, dependencies, database or API keys.

## Upload to Render

1. Extract the archive.
2. Upload its contents to the root of a GitHub repository. index.html must be at the repository root.
3. In Render choose New > Static Site and connect the repository.
4. Build Command: echo ready
5. Publish Directory: .
6. Deploy.

Upload files from inside this archive, not the ZIP itself. No Node installation is needed.

## Lessons

- index.html: My Brawler — original hero, Epic, Legendary and hero card.
- lesson-2.html: boss concept, forms, weak spot, transformation, lore and intro page.
- lesson-3.html: combat brief, arena, playable game prompt, playtest, fixes, balance and publication.
- lesson-4.html: release copy, cover, trailer, release page, final QA and pitch.

All menus have a Custom option. Names and creative descriptions remain empty by default.

## Student projects

Data is saved in localStorage in each browser. It is not sent to a server.
Lesson 1 hero data is reused by later lessons on the same site. The latest edits in later lessons remain editable and are not overwritten automatically.
Export project downloads JSON containing all lessons. Import accepts the original Lesson 1 JSON and the new course format. Imports replace the saved project after confirmation.
Local file storage can vary by browser. For reliable cross-lesson storage use the hosted website. To move work from the local first version to Render, export the project and import it on the new site.

## Editing

Lesson 1 menus and prompts: app.js
Lessons 2–4 menus, fields and prompts: course.js
Layout: style.css

## Image handling and Qwen

Image links are never fetched or checked over the network by the builder. Copying does not depend on an image loading. Local URL warnings are informational only. Empty required fields still need completing.
The builder trims outer whitespace, removes invisible copy artifacts and line breaks, extracts image URLs from HTML/BBCode, and preserves URL capitalization and signed query strings.
Use the shared upload instructions to obtain direct links. Keep original image size when hosting. The generated web prompts require original artwork, exact URLs, natural proportions, large image panels, and an explicit error instead of invented replacement art.
Enable Thinking and Web Dev in Qwen when those modes are available.

## Verification

JavaScript syntax and automated regression checks passed: copying is not blocked by unreachable image URLs or viewing-page warnings; no image probes run; URL signatures are preserved; copy success and fallback provide button feedback; 18 course prompts and the shared hero data still work. The resulting Qwen-generated pages and their visual appearance require testing in Qwen.
