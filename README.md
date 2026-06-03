# Computational Pathology Lab Website

Static website for the **Computational Pathology Lab**, hosted with GitHub Pages.

Live site:

```text
https://computationalpathologylab.github.io/
```

Repository:

```text
https://github.com/ComputationalPathologyLab/ComputationalPathologyLab.github.io
```

## Overview

This website presents the Computational Pathology Lab as a professional biomedical and computational research group. The content highlights vessel spatial analysis, digital pathology, imaging mass cytometry, open-source workflows, publications, lab members, and contact information.

The site is intentionally lightweight:

- no build step
- no database
- no backend server
- no JavaScript framework
- GitHub Pages compatible

Content that changes often, such as members, projects, publications, and repositories, lives in small JSON files under `assets/data/`.

## Research Identity

Current public-facing theme:

> Reproducible computational pathology for vascular biology, tumor microenvironment analysis, imaging mass cytometry, and translational cancer research.

The website content is shaped around the lab’s current ecosystem:

- VeSpA: Vessel Spatial Analysis
- vessel segmentation and morphometric quantification
- spatial vessel metrics and drug-distribution modeling
- Imaging Mass Cytometry analysis workflows
- QuPath annotation and vessel-segmentation tooling
- Nextflow and HPC-ready reproducible workflows
- open-source computational pathology infrastructure

## The Site As A Growing System

Think of the website like a small research garden:

- HTML pages are the paths and clearings.
- CSS is the landscape design: spacing, typography, colors, and visual rhythm.
- JSON files are the living beds where content grows.
- Images are the visual specimens: people, projects, and research outputs.
- GitHub Pages is the sunlight: it serves the site publicly after each push.

Most updates should happen in the JSON files. Edit the page markup only when the structure of the site needs to change.

## File Structure

```text
/
├── index.html
├── about.html
├── team-leader.html
├── members.html
├── projects.html
├── publications.html
├── software.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── members/
│   │   ├── projects/
│   │   └── logo/
│   └── data/
│       ├── members.json
│       ├── projects.json
│       ├── publications.json
│       └── repositories.json
├── README.md
└── .gitignore
```

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Main landing page, research areas, selected projects, people preview, software preview |
| About | `about.html` | Mission, vision, research philosophy, collaboration |
| Team Leader | `team-leader.html` | Dedicated profile for Professor Salvatore Lorenzo Renne |
| Members | `members.html` | Full lab member list generated from JSON |
| Projects | `projects.html` | Project cards generated from JSON |
| Publications | `publications.html` | Publication list generated from JSON |
| Software | `software.html` | Public repositories generated from JSON |
| Contact | `contact.html` | Contact information and static form placeholder |

## Edit Members

Edit:

```text
assets/data/members.json
```

Each member entry uses this shape:

```json
{
  "category": "Postdoctoral Researchers",
  "name": "Rashid Hussain",
  "designation": "Postdoctoral Associate",
  "email": "rashid.bioinfo@gmail.com",
  "photo": "assets/images/members/rashid-hussain.png",
  "bio": "Short biography.",
  "interests": ["Bioinformatics", "Oncology", "Reproducible workflows"],
  "links": {
    "ORCID": "https://orcid.org/0000-0002-6586-7241",
    "GitHub": "https://github.com/rashid-bioinfo",
    "Website": "https://rashid-bioinfo.github.io/"
  }
}
```

Supported categories can be changed freely, but current categories are:

- `Principal Investigator / Team Leader`
- `Postdoctoral Researchers`
- `PhD Students`
- `MSc Students`
- `Research Assistants`
- `Collaborators`
- `Alumni`

The homepage “People behind the work” section shows the first three records in `members.json`, so order matters.

## Edit Projects

Edit:

```text
assets/data/projects.json
```

Each project entry uses this shape:

```json
{
  "title": "VeSpA: Vessel Spatial Analysis",
  "description": "Robust, reproducible, and scalable vessel-feature extraction from histological images.",
  "area": "Digital pathology",
  "status": "ongoing",
  "members": ["Professor Salvatore Lorenzo Renne", "Rashid Hussain"],
  "image": "assets/images/projects/vespa-vessel-spatial-analysis.png",
  "featured": true,
  "links": {
    "GitHub": "https://github.com/ComputationalPathologyLab/VeSpA",
    "Project site": "https://spatialvesselanalysis.github.io/"
  }
}
```

Use `featured: true` to show a project on the homepage project preview.

Suggested project statuses:

- `ongoing`
- `completed`
- `planned`

## Edit Publications

Edit:

```text
assets/data/publications.json
```

Publications are generated dynamically on `publications.html`. They are currently sorted by year, with the most recent years shown first.

Each publication entry uses this shape:

```json
{
  "type": "Journal articles",
  "title": "Publication title",
  "authors": "Author list",
  "venue": "Journal or conference information",
  "year": "2026",
  "link": "https://scholar.google.com/...",
  "project": "Professor Salvatore Lorenzo Renne publication",
  "citedBy": "241"
}
```

Suggested publication types:

- `Journal articles`
- `Preprints`
- `Conference abstracts/posters`
- `Software papers`
- `Manuscripts in preparation`

If exact month/day publication dates become available later, add a `date` field and update `assets/js/main.js` to sort by that date instead of year alone.

## Edit Software Repositories

Edit:

```text
assets/data/repositories.json
```

Each repository card uses:

```json
{
  "name": "VeSpA",
  "description": "Open-source pipeline for vessel segmentation and spatial vessel metrics.",
  "language": "Python",
  "topic": "Vessel analysis",
  "status": "ongoing",
  "featured": true,
  "url": "https://github.com/ComputationalPathologyLab/VeSpA"
}
```

Use `featured: true` to show a repository on the homepage software preview.

Repository cards are manually maintained for GitHub Pages simplicity. A future improvement could use GitHub Actions to fetch repository metadata automatically.

## Add Or Replace Images

Member images:

```text
assets/images/members/
```

Project images:

```text
assets/images/projects/
```

Logo and favicon:

```text
assets/images/logo/
```

After adding an image, update the relevant JSON field:

```json
"photo": "assets/images/members/new-member.jpg"
```

or:

```json
"image": "assets/images/projects/new-project-image.png"
```

Recommended image guidelines:

- member photos: square or portrait, at least `400 x 400 px`
- project images: landscape, ideally `4:3`
- keep file sizes reasonable for web use
- use descriptive lowercase filenames with hyphens

## Edit Design

Main stylesheet:

```text
assets/css/style.css
```

The design uses:

- dark blue/navy foundation
- teal biomedical accent
- white and light grey backgrounds
- card-based project/member/publication layouts
- responsive CSS grid

If you change typography or spacing, test at desktop and mobile widths. The page hero titles are configured to stay on one line on desktop and wrap naturally on smaller screens.

## Edit JavaScript

Main script:

```text
assets/js/main.js
```

This file handles:

- mobile navigation toggle
- active navigation highlighting
- loading JSON data
- rendering members
- rendering projects
- rendering publications
- rendering software repository cards

The site still has basic fallback content in the HTML, but the full cards require JavaScript because they are generated from JSON.

## Test Locally

From the repository root:

```bash
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173/
```

Use a local server rather than opening `index.html` directly. Browsers often block JSON loading from `file://` pages.

## Validate JSON

Run these commands after editing data files:

```bash
python3 -m json.tool assets/data/members.json
python3 -m json.tool assets/data/projects.json
python3 -m json.tool assets/data/publications.json
python3 -m json.tool assets/data/repositories.json
```

If a command fails, check for:

- missing commas between objects
- trailing commas after the last field
- single quotes instead of double quotes
- unescaped quotation marks inside text

## Deploy To GitHub Pages

This repository is set up as an organization site:

```text
ComputationalPathologyLab.github.io
```

For this repository name, GitHub Pages publishes directly to:

```text
https://computationalpathologylab.github.io/
```

Deployment workflow:

```bash
git status
git add .
git commit -m "Describe the update"
git push
```

GitHub Pages will rebuild automatically after the push.

## GitHub Pages Settings

Expected settings:

- Repository: `ComputationalPathologyLab/ComputationalPathologyLab.github.io`
- Source: deploy from branch
- Branch: `main`
- Folder: `/ (root)`
- HTTPS: enabled

## Custom Domain

To use a custom domain later:

1. Add a file named `CNAME` in the repository root.
2. Put only the domain name inside it:

   ```text
   pathologylab.example.org
   ```

3. Configure DNS with the domain provider according to GitHub Pages documentation.
4. Enable **Enforce HTTPS** in GitHub Pages settings after DNS verification.

## Recommended Update Workflow

For small content updates:

1. Edit the relevant JSON file.
2. Validate JSON.
3. Run the local server.
4. Check the affected page in the browser.
5. Commit and push.

For design updates:

1. Edit `assets/css/style.css`.
2. Check homepage, projects, members, publications, and contact pages.
3. Test at a narrow/mobile width.
4. Commit and push.

For publication updates:

1. Update `assets/data/publications.json`.
2. Keep the newest years first.
3. Validate JSON.
4. Check `publications.html`.
5. Commit and push.

## Troubleshooting

### Cards Do Not Load

Likely cause: JSON is invalid or the site was opened with `file://`.

Fix:

```bash
python3 -m json.tool assets/data/members.json
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

### Images Do Not Appear

Check that the path in the JSON file exactly matches the image path. Paths are case-sensitive on GitHub Pages.

Example:

```json
"image": "assets/images/projects/vespa-vessel-spatial-analysis.png"
```

### CSS Changes Do Not Show

The HTML files currently load:

```html
assets/css/style.css?v=2
```

If the browser caches old styles, increase the version number, for example:

```html
assets/css/style.css?v=3
```

### GitHub Pages Does Not Update Immediately

GitHub Pages may take a short time to rebuild. Check the repository’s **Actions** or **Pages** settings if updates do not appear after a few minutes.

## Accessibility And Quality Notes

The site aims to keep:

- semantic HTML sections
- readable contrast
- accessible navigation labels
- descriptive image alt text
- responsive layouts
- clear link text

Before major public updates, check:

- spelling of names and affiliations
- verified emails and ORCID links
- publication titles and years
- image usage permissions
- institutional branding requirements

## Future Growth

Possible next branches of the site:

- automatic GitHub repository syncing with GitHub Actions
- publication import from ORCID, Crossref, Zotero, or Google Scholar exports
- project pages for VeSpA and IMC workflows
- downloadable lab logo package
- privacy and cookie policy if analytics are added
- working contact form through Formspree, Google Forms, or institutional infrastructure
- custom domain managed by the university or research institute

## License And Reuse

No explicit license is currently declared for this website repository. Add a `LICENSE` file if the lab wants to define reuse terms for the website code, images, and written content.
