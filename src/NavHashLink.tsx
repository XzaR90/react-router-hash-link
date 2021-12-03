import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { getLinkHash } from './getLinkHash';
import { hashLinkScroll } from './hashLinkScroll';
import { IHashLinkBaseProps } from './IHashLinkProps';
import LinkState from './LinkState';
import { reset } from './reset';

const state = LinkState;
type INavHashLinkProps = IHashLinkBaseProps & NavLinkProps;

const NavHashLink: React.FC<INavHashLinkProps> = React.forwardRef<
  HTMLAnchorElement,
  INavHashLinkProps
>((props, ref) => {
  const { scroll, smooth, timeout, elementId, children, onClick, ...rest } =
    props;
  const linkHash = getLinkHash(props);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    reset();
    state.hashFragment = elementId ? `#${elementId}` : linkHash;
    if (onClick) {
      onClick(e);
    }

    if (
      state.hashFragment !== '' &&
      // ignore non-vanilla click events, same as react-router
      // below logic adapted from react-router: https://github.com/ReactTraining/react-router/blob/fc91700e08df8147bd2bb1be19a299cbb14dbcaa/packages/react-router-dom/modules/Link.js#L43-L48
      !e.defaultPrevented && // onClick prevented default
      e.button === 0 && // ignore everything but left clicks
      (!props.target || props.target === '_self') && // let browser handle "target=_blank" etc
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) // ignore clicks with modifier keys
    ) {
      const defaultScrollFn = (el: HTMLElement) =>
        smooth
          ? el.scrollIntoView({ behavior: 'smooth' })
          : el.scrollIntoView();

      state.scrollFunction = scroll || defaultScrollFn;
      hashLinkScroll(timeout);
    }
  };

  return (
    <NavLink ref={ref} onClick={handleClick} {...rest}>
      {children}
    </NavLink>
  );
});

export default NavHashLink;
