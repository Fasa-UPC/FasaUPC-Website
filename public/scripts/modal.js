const modals = Array.from(document.getElementsByClassName('modal'));
const closeModalBtns = Array.from(
  document.querySelectorAll('.modal .close-btn'),
);

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

window.addEventListener('DOMContentLoaded', (ev) => {
  closeModalBtns.forEach((cmb) =>
    cmb.addEventListener('click', (ev) => {
      const modalId = cmb.dataset.for;

      const modal = document.getElementById(modalId);

      modal.classList.remove('show');
    }),
  );
});
