import React from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfCanScroll } from './checkIfCanScroll';
import { getLinkHash } from './getLinkHash';
import { IHashLinkBaseProps } from './IHashLinkProps';
import LinkState from './LinkState';
import { reset } from './reset';
import { scrollIntoView } from './scrollIntoView';

const state = LinkState;

// Define our Props type to allow the specifying of a Tag for HTML attributes
// Also define children as React does with React.ReactNode
type IHashLinkProps = {} & IHashLinkBaseProps;

const GenericHashLink: React.FC<IHashLinkProps> = (props: IHashLinkProps) => {
  const navigate = useNavigate();
  const { scroll, smooth, timeout, elementId, onClick, children, to, ...rest } =
    props;
  const linkHash = getLinkHash({ ...props, children });

  const handleClick = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    reset();
    state.hashFragment = elementId ? `#${elementId}` : linkHash;
    if (onClick) {
      onClick(e);
    }

    const canScroll = checkIfCanScroll(e);
    if (canScroll) {
      navigate(to);
      scrollIntoView(smooth, scroll, timeout);
    }
  };

  var inputReactObject = React.Children.only(children) as React.ReactElement;
  var clonedChild = React.cloneElement(inputReactObject, {
    onClick: (e: any) => {
      inputReactObject.props.onClick && inputReactObject.props.onClick(e);
      handleClick(e);
    },
  });

  return <>{clonedChild}</>;
};

export default GenericHashLink;
