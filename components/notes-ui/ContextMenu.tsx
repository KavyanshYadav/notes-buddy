"use client"

import React, { useEffect, useState } from 'react'

function ContextMenu() {
    const [leftClickMenu, setLeftClickMenu] = useState({ visible: false, x: 0, y: 0 });


    useEffect(() => {
        // Close menus on outside click or ESC
        const closeMenus = (e) => {
          if (e.key === "Escape" || e.type === "mousedown") {
            setLeftClickMenu({ visible: false, x: 0, y: 0 });
          }
        };
    
        window.addEventListener("mousedown", closeMenus);
        window.addEventListener("keydown", closeMenus);
    
        return () => {
          window.removeEventListener("mousedown", closeMenus);
          window.removeEventListener("keydown", closeMenus);
        };
      }, []);

      const handleLeftClick = (e) => {
        e.preventDefault();
        setLeftClickMenu({ visible: true, x: e.clientX, y: e.clientY });
      };
  return (
    <div>
        {leftClickMenu.visible && (
        <div
          style={{ top: leftClickMenu.y, left: leftClickMenu.x }}
          className="absolute bg-white shadow-lg rounded-md p-2 border border-gray-300 z-50"
        >
          <ul>
            <li className="p-2 hover:bg-gray-200 cursor-pointer">Option 1</li>
            <li className="p-2 hover:bg-gray-200 cursor-pointer">Option 2</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ContextMenu