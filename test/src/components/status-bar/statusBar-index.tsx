import React, { useCallback, useState, useEffect, useRef } from 'react';
// import RippleButton from '../Buttons/RippleButton/rippleButton-index';
// import Icon from '../IconWrapper/Icon';
// import Browser from "webextension-polyfill";
// import MessageFactory from '@src/Utils/MessageFactory';
// import useStatusBarActions from './hooks/useStatusBarActions';
// import SettingOps from '@Context/Global/classes/SettingsOps';
// import useOnClickOutside from '../hooks/useOnClickOutside';
// import StorageOps from '../../Utils/LocalStorage/StorageOps';
import useStatusBarActions from './hooks/useStatusBarActions';
// import { useGlobalContext } from '@Context/Global/GlobalProvider';
import StatusBarModal from './components/Modal/StatusBarModal';
import Icon from '../icon/icon';
import { Button } from '../buttons/button';
import './StatusBar.css';
interface StatusBarProps {
  options: {
    activation: 'click' | 'hover';
    deactivation: 'click' | 'timeout';
  }
}



const StatusBar: React.FC<StatusBarProps> = ({ options, setActiveModal, setShowModal, showModal, showStatusBar }) => {
  const [visible, setVisible] = useState(false);

  // const { activateLiveColorPicker, resizePopupWindow, openOptionsPage } = useStatusBarActions();


  // const {
  //   theme,
  //   setTheme
  // } = useGlobalContext();

  const barRef = useRef(null)

  let timer: ReturnType<typeof setTimeout>;

  const iconSize = 14;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const bottomBoundary = windowHeight * 0.95;
    const rightBoundary = windowWidth * 0.95;

    if (e.clientY >= bottomBoundary && e.clientX >= rightBoundary) {
      setVisible(true);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 500);
    }
  }, []);

  async function handlePrintLocalStorage() {
    let allItems = await StorageOps.getAllStorageItems();
    console.log('%cStorageOps.printAllStorageItems()', 'color: orange; font-size: 24px', allItems);
  }


  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);




  return (
    <div className={`status-bar ${visible ? 'visible' : 'hidden'}`} style={{ zIndex: '100000000000000001' }}>
      <div style={{ zIndex: '100000' }} className={"statusBar__container"} ref={barRef}>
        <Button onClick={() => { }}  >
          <Icon id="expand" size={iconSize} color="grey"></Icon>
        </Button>
        <Button onClick={() => { }}  >
          <Icon id="expandHorizontal" size={iconSize} color="grey"></Icon>
        </Button>
        <Button onClick={() => { setActiveModal('timer'); setShowModal(!showModal) }}  >
          <Icon id="clock" size={iconSize} color="grey"></Icon>
        </Button>
        <Button onClick={() => { setActiveModal('calculator'); setShowModal(!showModal) }}  >
          <Icon id="calculator" size={iconSize} color="grey"></Icon>
        </Button>
        <Button   >
          <Icon id="themeToggle" size={iconSize} color="grey" ></Icon>
        </Button>
        <Button onClick={() => { }}  >
          <Icon id="settings" size={iconSize} color="grey" ></Icon>
        </Button>

      </div>
    </div >
  );
};


export default StatusBar;
