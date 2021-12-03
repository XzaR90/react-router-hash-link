import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { HashLinkPage } from './components/HashLinkPage';

export const App: React.VFC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page" element={<HashLinkPage />} />
    </Routes>
  );
};
