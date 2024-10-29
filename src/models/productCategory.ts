import { ReactNode } from "react";

export interface ProductCategory {
  id: string;
  badgeText: string;
  title: ReactNode;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  bgColor: string;
}
