const sidebarOpenBtn = document.getElementById('sidebar-open-btn');
const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
const sidebar = document.getElementById('sidebar');
const sidebarItems = Array.from(
  document.getElementsByClassName('sidebar-item'),
);

sidebarItems.forEach((item) => {
  const linkPathname = new URL(item.href).pathname;

  if (window.location.pathname === linkPathname) {
    item.classList.add('active');
  }
});

function openSidebar() {
  sidebar.classList.remove('hide');
  sidebar.classList.add('show');
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar.classList.remove('show');
  sidebar.classList.add('hide');
  document.body.style.height = null;
  document.body.style.overflow = null;
}

sidebarOpenBtn.addEventListener('click', openSidebar);
sidebarCloseBtn.addEventListener('click', closeSidebar);
window.addEventListener('click', (ev) => {
  if (!sidebar.contains(ev.target) && !sidebarOpenBtn.contains(ev.target)) {
    closeSidebar();
  }
});
