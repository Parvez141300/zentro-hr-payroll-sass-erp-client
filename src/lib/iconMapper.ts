
import * as Icons from "lucide-react";

export const getIconComponent = (iconName: string) => {
    const iconComponent = Icons[iconName as keyof typeof Icons];

    if(!iconComponent) {
        return Icons.HelpCircle
    }
    else {
        return iconComponent as Icons.LucideIcon;
    }
}