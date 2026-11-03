// Main menu for phone and desktop.
// A tap on a touch screen fires the same click event as a mouse click,
// so one click handler covers touch, mouse, and keyboard (Enter/Space).
(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  var menuToggle = nav.querySelector('.menu-toggle');
  var submenuToggles = nav.querySelectorAll('.submenu-toggle');

  function setSubmenu(button, open) {
    button.setAttribute('aria-expanded', String(open));
    button.parentElement.classList.toggle('open', open);
  }

  function closeSubmenus(except) {
    submenuToggles.forEach(function (button) {
      if (button !== except) setSubmenu(button, false);
    });
  }

  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('menu-open', open);
    if (!open) closeSubmenus();
  }

  menuToggle.addEventListener('click', function () {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  submenuToggles.forEach(function (button) {
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') !== 'true';
      closeSubmenus(button);
      setSubmenu(button, open);
    });
  });

  // Tap or click anywhere outside the menu to close it.
  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target)) setMenu(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setMenu(false);
  });
})();
