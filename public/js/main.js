async function fetchProjects() {
  try {
    const response = await fetch('/api/projects');
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

function setActiveNavLink() {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage || 
        (currentPage === '/' && link.getAttribute('href') === '/')) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
});
