export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: unknown; // Lucide icon component type
  color: string;
  onTap: () => void;
}

export interface ServiceCardProps {
  item: ServiceItem;
}

export interface ResponsiveConfig {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  columns: number;
}