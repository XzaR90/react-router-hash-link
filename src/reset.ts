import LinkState from './LinkState';

const state = LinkState;

export function reset() {
  state.hashFragment = '';
  if (state.observer !== null) state.observer.disconnect();
  if (state.asyncTimerId !== null) {
    window.clearTimeout(state.asyncTimerId);
    state.asyncTimerId = null;
  }
}
