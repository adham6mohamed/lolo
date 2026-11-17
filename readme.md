# MOVE & PLAY – Lolo's Magical Forest Adventure
Static, camera-free educational movement game (Egyptian Arabic, RTL, ages 5–9). No build step.

## Run
Open `index.html` directly, or serve the folder (recommended for audio): `python3 -m http.server 8080` → http://localhost:8080
Audio autoplay needs one tap/click first; the Start button always works.

## Structure
- `index.html` – screens (welcome, map, play, break, done, final) and settings modal
- `css/style.css` – theme, responsive rules, reduced-motion support
- `js/config.js` – **level definitions** (steps, text, voice files, sfx, rewards)
- `js/progress.js` – stars, unlocking, settings (localStorage)
- `js/audio.js` – single audio manager (music ducking, voice queue, mute, graceful fallback)
- `js/game.js` – UI flow, level engine, Lolo SVG, celebration + certificate screens, parent/teacher panel
- `js/certificate.js` – A4-landscape certificate artwork (canvas) + PNG / PDF export (no libraries)
- `assets/audio/` – supplied WAV music/SFX; `assets/audio/voice/` – Arabic MP3 voice lines

## Audio
All 49 Arabic voice files live in `assets/audio/voice/` (19 original lines + 30 added lines). Missing files are logged to the console and the on-screen text is shown instead.
Mix defaults: music 15%, SFX 40%, voice 100%; music ducks while Lolo speaks and eases back. Voices are queued, so two never overlap.
Event → voice map: edit `voice`, `intro`, `done`, `success`, `replay` per level in `js/config.js`; map/pause/celebration events are in `js/game.js`.

## Certificate
Unlocked only when all six levels are complete (🏅 button on the map, or automatically after Level 6). The child types a name; PDF (A4 landscape, 3508×2480), PNG and print all use the same artwork.

## Customize
- **Levels:** edit `LEVELS` in `js/config.js`. Movement steps need an adult confirmation; `type:'color'` steps are auto-checked.
- **Character:** replace the `LOLO` SVG string at the top of `js/game.js`.
- **Camera later:** call the same `next()` path from a MediaPipe Pose module instead of the confirm button. No video is recorded or stored.

## Adults
🔊 button → "للكبار فقط" (answer 7): durations, rounds, unlock levels, completed list, reset progress.

## Deploy
Upload the folder to any static host. Cairo/Fredoka load from Google Fonts when online and fall back to system fonts offline.
