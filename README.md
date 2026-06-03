# Computational Pathology Lab Website

Static GitHub Pages website for the Computational Pathology Lab.

Tagline:

> AI-driven computational pathology, spatial biology, and digital pathology for translational cancer research.

## Structure

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
│   ├── css/style.css
│   ├── js/main.js
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

## Edit Lab Members

Edit:

```text
assets/data/members.json
```

Each member has:

- `category`
- `name`
- `designation`
- `email`
- `photo`
- `bio`
- `interests`
- `links`

Use the existing objects as templates. JSON must use double quotes and cannot have trailing commas. The `_comment` field is included as an editable note because standard JSON does not support comments.

## Edit Projects

Edit:

```text
assets/data/projects.json
```

Each project has:

- `title`
- `description`
- `area`
- `status`
- `members`
- `image`
- `featured`
- `links`

Set `featured` to `true` to show a project on the homepage preview.

## Edit Publications

Edit:

```text
assets/data/publications.json
```

Suggested publication types:

- `Journal articles`
- `Preprints`
- `Conference abstracts/posters`
- `Software papers`
- `Manuscripts in preparation`

## Edit Software Repositories

Edit:

```text
assets/data/repositories.json
```

Repository cards are maintained manually for GitHub Pages compatibility. A later build step could fetch public repositories from the GitHub API.

## Add Images

Member profile images:

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

After adding an image, update the relevant JSON field, for example:

```json
"photo": "assets/images/members/jane-doe.jpg"
```

or:

```json
"image": "assets/images/projects/vespa-overview.jpg"
```

## Test Locally

From the repository root:

```bash
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173/
```

Use a local server rather than opening `index.html` directly, because browsers may block JSON loading from local `file://` pages.

## Deploy With GitHub Pages

1. Push this repository to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the branch, usually `main`.
6. Select the folder `/ (root)`.
7. Save.

The site will be available at:

```text
https://<github-username-or-org>.github.io/<repository-name>/
```

For an organization site repository named `ComputationalPathologyLab.github.io`, it will be available at:

```text
https://ComputationalPathologyLab.github.io/
```

## Custom Domain

To use a custom domain later:

1. Add a `CNAME` file in the repository root containing the domain, for example:

   ```text
   pathologylab.example.org
   ```

2. Configure DNS with your domain provider according to GitHub Pages documentation.
3. Enable **Enforce HTTPS** in GitHub Pages settings once DNS is verified.

## Future Improvements

- Add verified team leader and member profiles.
- Replace placeholder images with real lab, microscopy, or project visuals.
- Add automatic repository fetching through a GitHub API build step.
- Import publications from ORCID, Crossref, Zotero, or another maintained source.
- Connect the contact form to Formspree, Google Forms, Netlify Forms, or an institutional backend.
- Add analytics only if allowed by the institution and privacy policy.
