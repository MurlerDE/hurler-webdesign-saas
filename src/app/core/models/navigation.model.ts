export type NavigationType = "anchor" | "route" | "external";

export interface NavigationItem {
  readonly label: string;
  readonly type: NavigationType;
  readonly target: string;
  readonly icon?: string;
  readonly children?: NavigationItem[];
}

export const isAnchor = (item: NavigationItem): boolean => item.type === "anchor";
export const isRoute = (item: NavigationItem): boolean => item.type === "route";