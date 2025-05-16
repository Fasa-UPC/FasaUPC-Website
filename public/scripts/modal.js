const modals = Array.from(document.getElementsByClassName('modal'));

window.addEventListener('click', (ev) => {
  modals.forEach((modal) => {
    const content = Array.from(modal.children).find((c) =>
      c.classList.contains('content'),
    );
    if (!content.contains(ev.target) && modal.classList.contains('show')) {
      modal.classList.remove('show');
    }
  });
});
