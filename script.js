const repositoryList = document.querySelector("#repository-list");
const repositoryStatus = document.querySelector("#repository-status");
const repositoryCount = document.querySelector("#repository-count");

function formatStars(stars) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(stars);
}

function renderRepositories(repositories) {
  repositoryList.innerHTML = repositories.map((repository) => `
    <li class="repository">
      <a href="${repository.url}" target="_blank" rel="noopener noreferrer">
        ${repository.name}
      </a>
      <p class="repository-description">${repository.description}</p>
      <p class="repository-meta">
        <span>Language: ${repository.language}</span>
        <span aria-label="${repository.stars} stars">★ ${formatStars(repository.stars)}</span>
      </p>
    </li>
  `).join("");
  repositoryCount.textContent = `${repositories.length} repositories`;
  repositoryStatus.textContent = "";
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Unable to load repositories (${response.status})`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be an array");
    }

    renderRepositories(repositories);
  } catch (error) {
    repositoryStatus.textContent = "收藏的项目加载失败，请稍后再试。";
    console.error(error);
  }
}

loadRepositories();
