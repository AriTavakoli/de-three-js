
import { IconCollection } from "./icon-collection";
import type { IconName } from "./icon-collection";

export interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
    onClick?: () => void;
    padding?: string;
    title?: string;
    transitionId?: string;
    transitionDuration?: number;
}

export const Icon: React.FC<IconProps> = ({ name , ...props }) => {
    const IconComponent = IconCollection[name];
    if (!IconComponent) return null;

    return <IconComponent name={name} {...props} />;
};