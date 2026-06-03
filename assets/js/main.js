const DATA_BASE = "assets/data/";

const pageName = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === pageName || (pageName === "" && href === "index.html")) {
    link.classList.add("active");
  }
});

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

async function loadJson(file) {
  const response = await fetch(DATA_BASE + file);
  if (!response.ok) {
    throw new Error(`Could not load ${file}`);
  }
  return response.json();
}

function statusClass(status = "") {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function linksMarkup(links = {}) {
  const entries = Object.entries(links).filter(([, value]) => value);
  if (!entries.length) return "";
  return `<div class="link-row">${entries
    .map(([label, url]) => `<a href="${url}">${label}</a>`)
    .join("")}</div>`;
}

function hideFallback(container) {
  const fallback = container.querySelector(".fallback");
  if (fallback) fallback.hidden = true;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function humanFileSize(bytes = 0) {
  if (!bytes) return "Size not listed";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function resourceKind(name = "") {
  const extension = name.split(".").pop().toLowerCase();
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension)) return "Image";
  if (["sh", "py", "R", "r", "ipynb"].includes(extension)) return "Script";
  if (["md", "txt", "pdf", "docx", "pptx", "xlsx", "csv", "tsv"].includes(extension)) return extension.toUpperCase();
  return "File";
}

function isPreviewableImage(name = "") {
  return ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(name.split(".").pop().toLowerCase());
}

async function renderResourceDirectories() {
  const containers = document.querySelectorAll("[data-render='directory']");
  if (!containers.length) return;

  await Promise.all(
    [...containers].map(async (container) => {
      const directory = container.dataset.directory;
      const emptyText = container.dataset.empty || "No files have been added yet.";
      if (!directory) return;

      try {
        const response = await fetch(
          `https://api.github.com/repos/ComputationalPathologyLab/ComputationalPathologyLab.github.io/contents/${directory}`
        );
        if (!response.ok) {
          throw new Error(`Could not load ${directory}`);
        }
        const entries = await response.json();
        const files = entries
          .filter((entry) => entry.type === "file" && !entry.name.startsWith("."))
          .sort((a, b) => a.name.localeCompare(b.name));

        if (!files.length) {
          container.innerHTML = `<article class="card"><h3>${escapeHtml(emptyText)}</h3><p>This folder is ready for future public files.</p></article>`;
          return;
        }

        container.innerHTML = files
          .map((file) => {
            const name = escapeHtml(file.name);
            const preview = isPreviewableImage(file.name)
              ? `<a class="resource-preview" href="${file.html_url}"><img src="${file.download_url}" alt="${name}"></a>`
              : "";
            return `
              <article class="resource-card">
                ${preview}
                <p class="eyebrow">${resourceKind(file.name)} · ${humanFileSize(file.size)}</p>
                <h3>${name}</h3>
                <p class="small"><code>${escapeHtml(directory)}/${name}</code></p>
                <div class="link-row">
                  <a href="${file.html_url}">View on GitHub</a>
                  <a href="${file.download_url}">Download</a>
                </div>
              </article>
            `;
          })
          .join("");
      } catch (error) {
        console.warn(error);
        container.innerHTML = `<article class="card"><h3>Could not load ${escapeHtml(directory)}</h3><p>Open the GitHub repository to view this folder directly.</p></article>`;
      }
    })
  );
}

async function renderMembers() {
  const container = document.querySelector("[data-render='members']");
  if (!container) return;

  try {
    const members = await loadJson("members.json");
    if (container.dataset.limit === "preview") {
      container.innerHTML = members
        .slice(0, 3)
        .map(
          (member) => `
            <article class="data-card">
              <img class="avatar" src="${member.photo}" alt="Profile placeholder for ${member.name}">
              <p class="eyebrow">${member.designation}</p>
              <h3>${member.name}</h3>
              <p>${member.bio}</p>
              <div class="tag-row">${member.interests.slice(0, 3).map((item) => `<span class="tag">${item}</span>`).join("")}</div>
              ${linksMarkup(member.links)}
            </article>
          `
        )
        .join("");
      return;
    }
    const categories = [...new Set(members.map((member) => member.category))];
    container.innerHTML = categories
      .map((category) => {
        const cards = members
          .filter((member) => member.category === category)
          .map(
            (member) => `
              <article class="data-card">
                <img class="avatar" src="${member.photo}" alt="Profile placeholder for ${member.name}">
                <p class="eyebrow">${member.designation}</p>
                <h3>${member.name}</h3>
                <p><a class="text-link" href="mailto:${member.email}">${member.email}</a></p>
                <p>${member.bio}</p>
                <div class="tag-row">${member.interests.map((item) => `<span class="tag">${item}</span>`).join("")}</div>
                ${linksMarkup(member.links)}
              </article>
            `
          )
          .join("");
        return `<section><span class="category-label">${category}</span><div class="grid three">${cards}</div></section>`;
      })
      .join("");
  } catch (error) {
    console.warn(error);
  }
}

async function renderProjects() {
  const container = document.querySelector("[data-render='projects']");
  if (!container) return;

  try {
    const projects = await loadJson("projects.json");
    const featuredOnly = container.dataset.limit === "featured";
    const selected = featuredOnly ? projects.filter((project) => project.featured).slice(0, 3) : projects;
    container.innerHTML = selected
      .map(
        (project) => `
          <article class="data-card">
            <img src="${project.image}" alt="${project.title} project placeholder">
            <div class="meta-row">
              <span class="status ${statusClass(project.status)}">${project.status}</span>
              <span class="tag">${project.area}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="small"><strong>Team:</strong> ${project.members.join(", ")}</p>
            ${linksMarkup(project.links)}
          </article>
        `
      )
      .join("");
  } catch (error) {
    console.warn(error);
  }
}

async function renderPublications() {
  const container = document.querySelector("[data-render='publications']");
  if (!container) return;

  try {
    const publications = await loadJson("publications.json");
    const sorted = [...publications].sort((a, b) => {
      const yearA = Number.parseInt(a.year, 10);
      const yearB = Number.parseInt(b.year, 10);
      return (Number.isNaN(yearB) ? -1 : yearB) - (Number.isNaN(yearA) ? -1 : yearA);
    });
    const groups = [...new Set(sorted.map((publication) => publication.year || "Year not listed"))];
    container.innerHTML = groups
      .map((group) => {
        const items = sorted
          .filter((publication) => (publication.year || "Year not listed") === group)
          .map(
            (publication) => `
              <article class="publication-item">
                <p class="eyebrow">${publication.type} · ${publication.year}</p>
                <h3>${publication.title}</h3>
                <p>${publication.authors}</p>
                <p>${publication.venue}</p>
                <p class="small"><strong>Project:</strong> ${publication.project}</p>
                ${publication.citedBy ? `<p class="small"><strong>Cited by:</strong> ${publication.citedBy}</p>` : ""}
                ${publication.link ? `<a class="text-link" href="${publication.link}">Scholar record</a>` : ""}
              </article>
            `
          )
          .join("");
        return `<section><span class="category-label">${group}</span>${items}</section>`;
      })
      .join("");
  } catch (error) {
    console.warn(error);
  }
}

async function renderRepositories() {
  const container = document.querySelector("[data-render='repositories']");
  if (!container) return;

  try {
    const repositories = await loadJson("repositories.json");
    const featuredOnly = container.dataset.limit === "featured";
    const selected = featuredOnly ? repositories.filter((repo) => repo.featured).slice(0, 4) : repositories;
    container.innerHTML = selected
      .map(
        (repo) => `
          <article class="data-card">
            <p class="eyebrow">${repo.language}</p>
            <h3>${repo.name}</h3>
            <p>${repo.description}</p>
            <div class="meta-row">
              <span class="status ${statusClass(repo.status)}">${repo.status}</span>
              <span class="tag">${repo.topic}</span>
            </div>
            <div class="link-row"><a href="${repo.url}">Repository</a></div>
          </article>
        `
      )
      .join("");
  } catch (error) {
    console.warn(error);
  }
}

renderMembers();
renderProjects();
renderPublications();
renderRepositories();
renderResourceDirectories();
