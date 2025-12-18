import {Strings} from '../constants/strings';

/**
 * Formats a number as Indian currency (INR)
 * @param amount - The amount to format
 * @returns Formatted currency string with ₹ symbol
 */
export const formatCurrency = (amount: number): string => {
  return Strings.common.currency + amount.toLocaleString('en-IN');
};

/**
 * Formats interest rate with percentage and suffix
 * @param rate - The interest rate value
 * @param suffix - Optional suffix (default: 'p.a.')
 * @returns Formatted interest rate string
 */
export const formatInterestRate = (
  rate: number,
  suffix: string = Strings.loanCard.perAnnum,
): string => {
  return `${rate}% ${suffix}`;
};

/**
 * Formats tenure in months
 * @param months - Number of months
 * @returns Formatted tenure string
 */
export const formatTenure = (months: number): string => {
  if (months >= 12) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    return `${years}y ${remainingMonths}m`;
  }
  return `${months} months`;
};

