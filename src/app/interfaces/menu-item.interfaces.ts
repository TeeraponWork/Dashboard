export interface MenuItem{
    label: string;
    icon?: string;
    route?: string;
    submenu?: MenuItem[];
    isHeader?: boolean;
}