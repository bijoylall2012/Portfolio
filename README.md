# Bijoy Bhaskar Lall — Engineering Portfolio

A single-page mechanical engineering portfolio built with React, Vite,
JavaScript, and plain CSS. It uses a restrained dark editorial style inspired by
the supplied reference screenshots.

The hero includes an interactive cantilever beam demonstration. It uses a
linear Euler–Bernoulli beam-element model and Three.js for the viewport; it is
an idealized mechanics example, not project data or a detailed solid FEA model.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, usually <http://localhost:5173/>. Stop the
server with `Ctrl+C`. Run `npm run build` to create a production build, or
`npm run preview` to view that build locally.

Run `npm run validate:beam` to compare several beam control cases against the
closed-form reference equations.

## Project structure

- `index.html` — page title and metadata.
- `src/main.jsx` — React entry point and global stylesheet import.
- `src/App.jsx` — page composition and theme state.
- `src/components/` — reusable navigation, hero, about, project, timeline,
  research, skills, contact, illustrative diagrams, and the beam simulation.
- `src/lib/beamSolver.js` — beam element assembly, solve, field recovery, and
  comparison with the closed-form cantilever solution.
- `src/data/portfolio.js` — education, experience, contact, research interests,
  skills, certifications, and patent disclosure status.
- `src/data/projects.js` — verified academic project summaries and visual types.
- `src/styles.css` — dark/light design tokens, layout, responsive rules, and
  component styling.
- `DEVELOPMENT_PLAN.md` — implementation status and remaining review items.

## Content notes

Résumé chronology, education, tools, and contact links were checked against the
available résumé. Project descriptions were checked against the supplied BITS
reports. The IGCAR internship is listed under experience, separately from BITS
academic projects. Technical drawings are illustrative placeholders rather
than project CAD, simulation output, or experimental images. Patent details are
held back pending public-disclosure review. Certification issuers were not
present in the résumé source. The supplied résumé is not linked because it
contains patent-related information that has not been cleared for public
disclosure. No formal publication record was established by the inspected
files, so the page does not claim publications.

## Beam model

The hero model has a fixed 40 × 25 mm rectangular section and a fixed
210 GPa elastic modulus. Its two controls vary beam length (20–50 cm, converted
to millimetres for the solver) and downward free-end force (100–2,000 N). The
force range is fixed across all lengths. The solver assembles and solves a
16-element, two-node Euler–Bernoulli beam stiffness system. It recovers the
vertical deflection and curvature; the displayed nominal von Mises stress is
the magnitude of the uniaxial bending stress (`σVM = |Eκz|`, with `z` measured
from the neutral axis). The displayed shape is amplified by 8× for visibility,
while the deflection output remains the unamplified model value. The blue →
cyan → green → yellow → orange → red contour uses a fixed 0–240 MPa scale, set by
the maximum stress within the selected input limits. Values above 240 MPa use
the red endpoint while the reported stress remains the calculated value.

The model assumes a uniform prismatic beam, small displacement, linear elastic
material behavior, and an ideal clamp and point load. It does not resolve local
stress concentrations at the support or force application, shear deformation,
plasticity, contact, or 3D solid behavior. Its tip displacement and root
surface stress are checked against the closed-form cantilever equations in
`src/lib/beamSolver.js`.

For the selected force range, the 50 cm beam at 2,000 N has a calculated
7.619 mm tip deflection (1.52% of its length) and 240 MPa nominal peak stress.
The default 30 cm, 1,500 N setup has 1.234 mm actual deflection and 108 MPa
peak stress; only the displayed shape is amplified. A 10–20 cm deflection at
50 cm would require 26.25–52.5 kN in the linear formula, producing 3.15–6.3
GPa nominal stress and deflection equal to 20–40% of the span. Those values
violate the small-deflection assumptions and cannot be presented as accurate
linear-elastic results. A geometrically nonlinear formulation, with material
strength data and likely plastic behavior, is needed to explore that regime;
the shorter spans would require still higher forces for the same absolute
deflection. Thus one fixed force range cannot produce 10–20 cm responses
across this length range while staying within the current model's validity.
At the 20 cm minimum, the span-to-depth ratio is 8, so shear deformation can
still matter more than it does for longer cases; a Timoshenko model would be
more appropriate when shear effects need to be resolved. No yield or failure
limit is claimed because none is specified for the material.

The force range was recalculated over both length extremes. At 20 cm, 100 N
produces 0.024381 mm and 4.8 MPa, while 2,000 N produces 0.487619 mm and
96 MPa. At 50 cm, the same loads produce 0.380952 mm / 12 MPa and 7.619 mm /
240 MPa. The 100–2,000 N range is retained based on those responses: its upper
end remains a small-deflection result at the longest span, and raising it to
reach 10–20 cm would invalidate the linear model. The material strength is
unspecified, so the stress values are reported without an allowable-stress
claim. The slider shows length in centimetres and converts to millimetres
before solving.
