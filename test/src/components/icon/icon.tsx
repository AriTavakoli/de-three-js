//@ts-nocheck
import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import sprite from '../../../public/icons/Sprite.svg';

interface IconProps {
  id: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  padding?: string;
  title?: string;
  transitionId?: string;
  transitionDuration?: number;
}

const usePreload = (url) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = url;

    const handleLoad = () => setLoaded(true);
    const handleError = () => console.error(`Failed to load image at ${url}`);

    image.addEventListener('load', handleLoad);
    image.addEventListener('error', handleError);

    if (image.complete) {
      setLoaded(true);
    }

    return () => {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    };
  }, [url]);

  return loaded;
};



const Icon: FunctionComponent<IconProps> = React.memo(({ onClick, id, padding, transitionId, transitionDuration, ...props }) => {
  const [currentId, setCurrentId] = useState(id);
  const url = sprite + `#${currentId}`;
  // const loaded = usePreload(url);
  const loaded = usePreload(url);

  const [currentColor, setCurrentColor] = useState(props.color);


  const iconStyle = {
    padding: padding || undefined,
    zIndex: 1000,
  };

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    if (transitionId) {
      setCurrentId(transitionId);
      setTimeout(() => setCurrentId(id), transitionDuration || 2000);
    }

  }, [onClick, id, transitionId, transitionDuration]);

  return loaded ? (
    <svg
      {...props}
      style={iconStyle}
      width={props.size}
      height={props.size}
      onClick={handleClick}
      aria-hidden={!props.title}
    >
      <use xlinkHref={url} />
    </svg>
  ) : <div style ={{width: '12px'}}></div>;

}
);



export default React.memo(Icon);
