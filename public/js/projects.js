document.addEventListener('DOMContentLoaded', async () => {
  const projects = await fetchProjects();
  const projectsGrid = document.getElementById('projects-grid');
  
  if (projectsGrid) {
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card expanded';
      projectCard.innerHTML = `
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-info">
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <div class="tech-tags">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <a href="${project.link}" target="_blank" class="btn btn-secondary">View on GitHub</a>
        </div>
      `;
      projectsGrid.appendChild(projectCard);
    });
  }
});
