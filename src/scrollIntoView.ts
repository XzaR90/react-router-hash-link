import { hashLinkScroll } from './hashLinkScroll';
import LinkState from './LinkState';

const state = LinkState;

export function scrollIntoView(
  smooth: boolean | undefined,
  scroll: ((...args: any[]) => void | Promise<void>) | undefined,
  timeout: number | undefined,
) {
  const defaultScrollFn = (el: HTMLElement) =>
    smooth ? el.scrollIntoView({ behavior: 'smooth' }) : el.scrollIntoView();

  state.scrollFunction = scroll || defaultScrollFn;
  hashLinkScroll(timeout);
}
