//@ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@/components/icon/icon-index';
import { useThreeContext } from '../../../../context/ThreeContext';
import { IconButtonWithText } from '../../../buttons/icon-button-text';

const CopyLink = () => {
    const { assetUrl, setAssetUrl } = useThreeContext();

    const handleInputChange = (e) => {
        setAssetUrl(e.target.value);
    };

    return (
        <div className="select-container">
            <svg
                data-icon="TriggerClick"
                aria-hidden="true"
                focusable="false"
                width="21"
                height="30"
                viewBox="0 0 16 21"
                style={{ display: 'block', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}
            >
                <Icon name="link" size={64} color="grey"> </Icon>
            </svg>

            <p className="select-text"> Copy Asset Link & Paste here </p>
            <div className="activate-container">
                <input
                    type="text"
                    value={assetUrl}
                    onChange={handleInputChange}
                />
            </div>
            {/* <IconButtonWithText buttonText="Activate" onClick={() => { setAssetUrl() }} /> */}

        </div>
    );
};

export default CopyLink;
