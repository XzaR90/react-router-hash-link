export function isInteractiveElement(element: HTMLElement) {
  const formTags = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  const linkTags = ['A', 'AREA'];
  return (
    (formTags.includes(element.tagName) && !element.hasAttribute('disabled')) ||
    (linkTags.includes(element.tagName) && element.hasAttribute('href'))
  );
}
