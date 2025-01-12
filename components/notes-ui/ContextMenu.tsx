'use client';

import React, { useEffect, useRef, useState } from 'react';

function ContextMenu() {
  const [selectedText, setSelectedText] = useState('');
  const ContextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = (event: MouseEvent) => {
      const notesContainer = document.querySelector('.NotesContainer');
      if (!notesContainer) return;

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && selection.toString().trim()) {
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;

        if (notesContainer.contains(commonAncestor)) {
          if (ContextMenuRef.current) {
            ContextMenuRef.current.style.position = 'fixed';
            ContextMenuRef.current.style.top = `${event.pageY}px`;
            ContextMenuRef.current.style.left = `${event.pageX}px`;
            ContextMenuRef.current.style.display = 'block';
          }
          setSelectedText(selection.toString());
        } else {
          setSelectedText('');
          if (ContextMenuRef.current) {
            ContextMenuRef.current.style.display = 'none';
          }
        }
      } else {
        setSelectedText('');
        if (ContextMenuRef.current) {
          ContextMenuRef.current.style.display = 'none';
        }
      }
    };

    const handleScroll = () => {
      if (ContextMenuRef.current) {
        ContextMenuRef.current.style.display = 'none';
      }
    };

    document.addEventListener('mouseup', handleSelection);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={ContextMenuRef}
      className="border border-input bg-background rounded-md shadow-lg p-1 z-10"
      style={{ display: 'none' }}
    >
      <div className='flex flex-row gap-4'>
        <div className='hover:bg-neutral-700 p-2'>Action 1</div>
        <div className='hover:bg-neutral-700 p-2'>Action 2</div>
        <div className='hover:bg-neutral-700 p-2'>Action 3</div>
        <div className='hover:bg-neutral-700 p-2'>Action 4</div>
      </div>
    </div>
  );
}

export default ContextMenu;