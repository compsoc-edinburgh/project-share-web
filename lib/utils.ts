import { ClassValue, clsx } from "clsx";

export const cn = (...args: ClassValue[]) => {
  return clsx(args);
};
