import { IHashLinkBaseProps } from './IHashLinkProps';

export function getLinkHash(props: IHashLinkBaseProps) {
  if (typeof props.to === 'string' && props.to.includes('#')) {
    return `#${props.to.split('#').slice(1).join('#')}`;
  }

  if (typeof props.to === 'object' && typeof props.to.hash === 'string') {
    return props.to.hash;
  }

  return '';
}
