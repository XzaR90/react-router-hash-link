import React from 'react';
import LinkState from './LinkState';

const state = LinkState;

export function checkIfCanScroll(
  e: React.MouseEvent<HTMLAnchorElement | HTMLOrSVGElement, MouseEvent>,
  props?: Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target'>,
) {
  return (
    state.hashFragment !== '' &&
    // ignore non-vanilla click events, same as react-router
    // below logic adapted from react-router: https://github.com/ReactTraining/react-router/blob/fc91700e08df8147bd2bb1be19a299cbb14dbcaa/packages/react-router-dom/modules/Link.js#L43-L48
    !e.defaultPrevented && // onClick prevented default
    e.button === 0 && // ignore everything but left clicks
    (!props?.target || props?.target === '_self') && // let browser handle "target=_blank" etc
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
  );
}
