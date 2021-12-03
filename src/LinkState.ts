export interface ILinkState {
  observer: MutationObserver | null;
  asyncTimerId: number | null;
  hashFragment: string;
  scrollFunction: ((elm: HTMLElement) => void) | null;
}

class LinkState implements ILinkState {
  [index: string]: unknown;
  observer: MutationObserver | null = null;
  asyncTimerId: number | null = null;
  hashFragment = '';
  scrollFunction: ((elm: HTMLElement) => void) | null = null;

  constructor(obj: Partial<ILinkState>) {
    this.mutate(obj);
  }

  mutate(obj: Partial<ILinkState>): void {
    Object.keys(obj).map((key) => {
      const k = key as keyof ILinkState;
      this[key] = obj[k];
    });
  }
}

export default new LinkState({});
