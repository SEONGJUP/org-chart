import { type ClassValue, clsx } from "clsx";
import { cloneDeep } from "es-toolkit";
import { twMerge } from "tailwind-merge";

export const cleanObject = (
  obj: any,
  options?: { removeEmpty?: boolean; removeNull?: boolean }
) => {
  const { removeEmpty = false, removeNull = false } = options || {};
  const clonedObj = cloneDeep(obj);

  Object.keys(clonedObj).forEach((key) => {
    if (clonedObj[key] === undefined) {
      delete clonedObj[key];
    }

    if (removeEmpty && clonedObj[key] === "") {
      delete clonedObj[key];
    }

    if (removeNull && clonedObj[key] === null) {
      delete clonedObj[key];
    }
  });

  return clonedObj;
};

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const parseSearchString = (search: string) => {
  const queryString = search.startsWith("?") ? search.slice(1) : search;

  if (!queryString) return {};

  return queryString.split("&").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    if (key) {
      acc[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }
    return acc;
  }, {} as Record<string, string>);
};
