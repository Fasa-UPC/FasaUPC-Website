const sidebarOpenBtn = document.getElementById('sidebar-open-btn');
const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  sidebar.classList.remove('hide');
  sidebar.classList.add('show');
}
function closeSidebar() {
  sidebar.classList.remove('show');
  sidebar.classList.add('hide');
}

sidebarOpenBtn.addEventListener('click', openSidebar);
sidebarCloseBtn.addEventListener('click', closeSidebar);
window.addEventListener('click', (ev) => {
  if (!sidebar.contains(ev.target) && !sidebarOpenBtn.contains(ev.target)) {
    closeSidebar();
  }
});
