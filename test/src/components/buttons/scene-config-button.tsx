import React, { useRef } from 'react';
import { Icon } from '../icon/icon-index';

export interface IconButtonWithTextProps {
  buttonText: string;
  iconId?: string;
  iconSize?: number;
  iconColor?: string;
  onClick: () => void;
  fileType?: string;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SceneConfigButton: React.FC<IconButtonWithTextProps> = ({
  buttonText,
  iconId,
  iconSize,
  iconColor,
  onClick,
  fileType,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    onClick();
    fileInputRef.current?.click();
  };

  return (
    <button tabIndex={0} className="button scene" onClick={handleClick}>
      <span className = "button-text">{buttonText}</span>
      {iconId && <Icon name={iconId} size={iconSize} color={iconColor} />}
      {fileType && onFileChange && (
        <input
          ref={fileInputRef}
          type="file"
          accept={fileType}
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
      )}
    </button>
  );
};
