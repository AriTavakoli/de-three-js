import React from 'react';
import classNames from 'classnames';


/*

Webflow Button Variants:

--------------------------------------------------------------
 <Button size="comfortable" variant='solid' theme='danger' />
--------------------------------------------------------------
 <Button variant="ghost" theme="default" size="comfortable">
 --------------------------------------------------------------
 <Button variant="ghost" theme="default" size="comfortable" isDisabled={!gltfContent || !fileName} >
 --------------------------------------------------------------

*/


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isDisabled?: boolean;
    size?: "compact" | "comfortable";
    variant?: "solid" | "ghost" | "outline";
    theme?: "primary" | "danger" | "default"
    ariaLabel?: string;
    children?: React.ReactNode;
    description?: string;
}

export const Button: React.FC<ButtonProps> = ({
    isDisabled,
    size,
    variant,
    theme,
    description,
    ariaLabel,
    ...props
}) => {

    if (variant === 'outline') {
        theme = 'default';
    }

    const buttonClass = classNames(
        'button',
        size,
        variant,
        theme,
        {
            'is-disabled': isDisabled,
        }
    );

    return (
        <button
            aria-description= {description}
            className={buttonClass}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            // tabIndex={isDisabled ? -1 : 0}
            aria-label={ariaLabel}
            {...props}
        >
            {props.children}
        </button>
    );
};
