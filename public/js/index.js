document.addEventListener('DOMContentLoaded', async () => {
  const projects = await fetchProjects();
  const featuredContainer = document.getElementById('featured-projects');
  
  if (featuredContainer) {
    const featuredProjects = projects.slice(0, 3);
    
    featuredProjects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-tags">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      `;
      featuredContainer.appendChild(projectCard);
    });
  }
});
