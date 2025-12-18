import {useState, useCallback, useEffect, useMemo} from 'react';
import {Loan} from '../types';
import {fetchLoans} from '../services/loanApi';

type SortOrder = 'asc' | 'desc';

interface UseLoansOptions {
  autoFetch?: boolean;
  sortBy?: keyof Loan;
  sortOrder?: SortOrder;
}

interface UseLoansReturn {
  loans: Loan[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  sortOrder: SortOrder;
  fetch: () => Promise<void>;
  refresh: () => Promise<void>;
  toggleSortOrder: () => void;
  setSortOrder: (order: SortOrder) => void;
}

export const useLoans = (options: UseLoansOptions = {}): UseLoansReturn => {
  const {autoFetch = true, sortBy = 'interestRate', sortOrder: initialSortOrder = 'asc'} = options;

  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const data = await fetchLoans();
      setLoans(data);
    } catch {
      setError('Unable to load loans. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  const sortedLoans = useMemo(() => {
    return [...loans].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [loans, sortBy, sortOrder]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const refresh = useCallback(() => fetchData(true), [fetchData]);

  return {
    loans: sortedLoans,
    loading,
    refreshing,
    error,
    sortOrder,
    fetch: fetchData,
    refresh,
    toggleSortOrder,
    setSortOrder,
  };
};

