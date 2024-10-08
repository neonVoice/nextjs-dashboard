import { Revenue } from "./definitions";

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (dateStr: string, locale: string = "en-US") => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

// Additional utility functions

// Capitalizes the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Converts a number to its ordinal representation (e.g., 1st, 2nd, 3rd)
export const toOrdinal = (num: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = num % 100;
  return `${num}${suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]}`;
};

// Checks if a given object is empty
export const isEmptyObject = (obj: Record<string, any>) => {
  return Object.keys(obj).length === 0;
};

// Randomly shuffles an array
export const shuffleArray = <T>(array: T[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

// Generates a random hex color
export const generateRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

// Formats a number with commas as thousands separators
export const formatNumberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Debounce function: delays the execution of a function
export const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

// Finds the most frequent element in an array
export const mostFrequent = <T>(arr: T[]) => {
  const frequencyMap = new Map<T, number>();
  arr.forEach((item) => {
    frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1);
  });
  return Array.from(frequencyMap.entries()).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
};

// Calculates the factorial of a number (recursive approach)
export const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};
