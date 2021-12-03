import { getElAndScroll } from './getElAndScroll';
import LinkState from './LinkState';
import { reset } from './reset';

const state = LinkState;

export function hashLinkScroll(timeout?: number) {
  // Push onto callback queue so it runs after the DOM is updated
  window.setTimeout(() => {
    if (getElAndScroll() === false) {
      if (state.observer === null) {
        state.observer = new MutationObserver(getElAndScroll);
      }

      state.observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      // if the element doesn't show up in specified timeout or 10 seconds, stop checking
      state.asyncTimerId = window.setTimeout(() => {
        reset();
      }, timeout ?? 10000);
    }
  }, 0);
}
