import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { checkIfCanScroll } from './checkIfCanScroll';
import { getLinkHash } from './getLinkHash';
import { IHashLinkBaseProps } from './IHashLinkProps';
import LinkState from './LinkState';
import { reset } from './reset';
import { scrollIntoView } from './scrollIntoView';

const state = LinkState;
type IHashLinkProps = IHashLinkBaseProps & LinkProps;

const NavHashLink: React.FC<IHashLinkProps> = React.forwardRef<
  HTMLAnchorElement,
  IHashLinkProps
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

    const canScroll = checkIfCanScroll(e, props);
    if (canScroll) {
      scrollIntoView(smooth, scroll, timeout);
    }
  };

  return (
    <Link ref={ref} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
});

export default NavHashLink;
