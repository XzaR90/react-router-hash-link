import React from 'react';

export interface IHashLinkBaseProps {
  onClick?: (...args: any[]) => void | Promise<void>;
  children: React.ReactNode;
  scroll?: (...args: any[]) => void | Promise<void>;
  smooth?: boolean;
  timeout?: number;
  elementId?: string;
  to: string | Location;
}
