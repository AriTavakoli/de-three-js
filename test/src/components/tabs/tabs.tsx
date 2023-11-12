import React, { KeyboardEvent, useEffect, useRef } from 'react';
import './tabs.css';
import { Button } from '../buttons/button';
import { useThreeContext } from '../../context/ThreeContext';
import { Icon } from '../icon/icon-index';

interface TabsProps {
  children: React.ReactElement[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const { setActiveTab, activeTab } = useThreeContext();
  const tabsRef = useRef<HTMLDivElement[]>([]);

  const focusTab = (index: number) => {
    tabsRef.current[index].focus();
  };

  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.add('no-focus-ring');
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('no-focus-ring');
      }
    };
  
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    let nextIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = index + 1;
        break;
      case 'ArrowLeft':
        nextIndex = index - 1;
        break;
      case 'ArrowDown':
        nextIndex = index + 1;
        break;
      case 'ArrowUp':
        nextIndex = index - 1;
        break;
      case 'Enter':
      case 'Space':
        setActiveTab(index);
        return;
    }

    // Adjust the index to be within the bounds of the tab list.
    const adjustedIndex = (nextIndex + children.length) % children.length;
    focusTab(adjustedIndex);
  };

  const activateTab = (index: number) => {
    setActiveTab(index);
    // Focus the content of the activated tab
    const panelId = `tabpanel-${index}`;
    const panel = document.getElementById(panelId);
    if (panel) {
      panel.focus();
    }
  };


  return (
    <div className="tabs">
      <div className="tab-list-container" role="tablist">
        <div className="tab-list">
          {React.Children.map(children, (child, index) => (
            <div
              ref={el => tabsRef.current[index] = el}
              tabIndex={index === activeTab ? 0 : -1}
              role="tab"
              aria-selected={index === activeTab ? 'true' : 'false'}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
              className={`tab-list-item ${index === activeTab ? 'active' : ''}`}
              onClick={() => activateTab(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              {...children[activeTab].props}
            >
              {child.props.label}
            </div>
          ))}
        </div>
       
      </div>
      <div
        className="tab-content"
        id={`tabpanel-${activeTab}`}
        tabIndex={-1}
        {...children[activeTab].props}
      >
        {React.Children.toArray(children)[activeTab].props.children}
      </div>
    </div>
  );
};


interface TabContentProps {
  label: string;
  children: React.ReactNode;
}
const TabContent: React.FC<TabContentProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
 

export { Tabs, TabContent }