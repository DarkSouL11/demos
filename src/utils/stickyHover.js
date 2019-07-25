export function addStickyHoverFix() {
  document.addEventListener('touchstart', function addTouchClass(e) {
    document.documentElement.classList.add('can-touch');
    document.removeEventListener('touchstart', addTouchClass, false);
  }, false);
}
