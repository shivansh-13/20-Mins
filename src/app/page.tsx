"use client"
import React, { useState } from 'react';
import LeftPane from './leftpane';


export default function Home() {
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(false);

  const toggleLeftPane = () => {
    setIsLeftPaneOpen(!isLeftPaneOpen);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="bg-blue-500 text-white p-2 rounded-full absolute top-2 left-2"
        onClick={toggleLeftPane}
      >
        Toggle Left Pane
      </button>
      {isLeftPaneOpen && <LeftPane />}
    </main>
  );
}
