import { isInteractiveElement } from './isInteractiveElement';
import LinkState from './LinkState';
import { reset } from './reset';

const state = LinkState;

export function getElAndScroll() {
  let element: HTMLElement | null = null;
  if (state.hashFragment === '#') {
    // use document.body instead of document.documentElement because of a bug in smoothscroll-polyfill in safari
    // see https://github.com/iamdustan/smoothscroll/issues/138
    // while smoothscroll-polyfill is not included, it is the recommended way to implement smoothscroll
    // in browsers that don't natively support el.scrollIntoView({ behavior: 'smooth' })
    element = document.body;
  } else {
    // check for element with matching id before assume '#top' is the top of the document
    // see https://html.spec.whatwg.org/multipage/browsing-the-web.html#target-element
    const id = state.hashFragment.replace('#', '');
    element = document.getElementById(id);
    if (element === null && state.hashFragment === '#top') {
      // see above comment for why document.body instead of document.documentElement
      element = document.body;
    }
  }

  if (element !== null) {
    state.scrollFunction && state.scrollFunction(element);

    // update focus to where the page is scrolled to
    // unfortunately this doesn't work in safari (desktop and iOS) when blur() is called
    let originalTabIndex = element.getAttribute('tabindex');
    if (originalTabIndex === null && !isInteractiveElement(element)) {
      element.setAttribute('tabindex', '-1');
    }
    element.focus({ preventScroll: true });
    if (originalTabIndex === null && !isInteractiveElement(element)) {
      // for some reason calling blur() in safari resets the focus region to where it was previously,
      // if blur() is not called it works in safari, but then are stuck with default focus styles
      // on an element that otherwise might never had focus styles applied, so not an option
      element.blur();
      element.removeAttribute('tabindex');
    }

    reset();
    return true;
  }
  return false;
}
