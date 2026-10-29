# Development Plan

## Stage 1 — Project foundation

- [x] Confirm the project folder is empty.
- [x] Set up a standard React + Vite JavaScript project.
- [x] Add the temporary starter screen and global styling.
- [x] Document local setup and the development stages.
- [x] Install dependencies and confirm the default starter site runs.

## Stage 2 — Portfolio structure

- [x] Set up homepage sections and navigation.
- [x] Build reusable sections, sticky navigation, active-section feedback, and a responsive mobile menu.
- [x] Match the supplied dark reference style with an optional working light-theme toggle.

## Stage 3 — Project content

- [x] Add four BITS academic projects, grounded in their source reports.
- [x] Keep the IGCAR research internship in the experience timeline, separate from academic projects.
- [x] Add sourced education, employment, skills, certifications, and verified contact links.
- [x] Add clearly labeled illustrative visuals; no project render or result is implied.
- [ ] Replace illustrative visuals with approved project-specific assets.
- [ ] Review patent disclosure text before adding any patent details.
- [ ] Confirm certification issuers and add them if desired.

## Stage 4 — Refinement

- [x] Review responsive layouts, navigation, visible focus, and reduced-motion behavior.
- [x] Add page metadata and update project documentation.
- [ ] Review the built page in desktop and mobile browsers.
- [x] Run the production build.
- [ ] Add a formal publications section only if a verified publication record is supplied.

## Stage 5 — Interactive mechanics demonstration

- [x] Replace the hero schematic with an interactive 3D cantilever beam model.
- [x] Add two accessible controls for beam length and free-end force.
- [x] Set length limits to 20–50 cm, display centimetres, and convert to solver millimetres.
- [x] Recalculate and document the fixed 100–2,000 N force range against both length extremes.
- [x] Implement a 16-element Euler–Bernoulli beam solver with deflection and nominal stress recovery.
- [x] Map numerical stress to a fixed 0–240 MPa contour with fixed legend endpoints.
- [x] Keep camera orientation and user-selected zoom through slider changes; adjust framing for beam length and reduce control sensitivity.
- [x] Compare the numerical outputs with closed-form cantilever solutions.
- [x] Check boundary, scaling, direction, fixed-end, and stress-color mapping behavior.
- [x] Document fixed material/section inputs, display deformation scaling, and model limitations.
- [x] Verify the production build and numerical cases after installing the 3D packages.
- [ ] Review the viewport in a browser at desktop and mobile widths.
