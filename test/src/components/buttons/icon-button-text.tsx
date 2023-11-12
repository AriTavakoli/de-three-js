import React, { useRef } from 'react';
import { Icon } from '../icon/icon-index';

export interface IconButtonWithTextProps {
  buttonText: string;
  iconId?: string;
  onClick: () => void;
  fileType?: string;
  inputLabel?: string;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: any;
}

export const IconButtonWithText: React.FC<IconButtonWithTextProps> = ({
  buttonText,
  iconId,
  onClick,
  fileType,
  inputLabel,
  onFileChange,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    onClick();
    fileInputRef.current?.click();
  };

  return (
    <button className="button" onClick={handleClick} {...props}>
      <span className="button-text">{buttonText}</span>
      {iconId && <Icon name={iconId} />}
      {fileType && onFileChange && (
        <label aria-label={inputLabel}  htmlFor="fileInput">
          {inputLabel}
          <input
            id="fileInput"
            ref={fileInputRef}
            type="file"
            accept={fileType}
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
        </label>
      )}
    </button>
  );
};
