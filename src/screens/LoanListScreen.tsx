import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loan} from '../types';
import {fetchLoans} from '../services/loanApi';
import {LoanCard} from '../components/LoanCard';
import {LoanDetailModal} from '../components/LoanDetailModal';
import {Colors} from '../constants/colors';

export function LoanListScreen() {
  const insets = useSafeAreaInsets();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const loadLoans = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const data = await fetchLoans();
      setLoans(data);
    } catch (err) {
      setError('Unable to load loans. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadLoans();
  }, [loadLoans]);

  const sortedLoans = [...loans].sort((a, b) => {
    return sortAscending
      ? a.interestRate - b.interestRate
      : b.interestRate - a.interestRate;
  });

  const toggleSort = () => {
    setSortAscending(prev => !prev);
  };

  const handleLoanPress = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  const handleCloseModal = () => {
    setSelectedLoan(null);
  };

  if (loading) {
    return (
      <View style={[styles.centered, {paddingTop: insets.top}]}>
        <LottieView
          source={require('../assets/loading/loading.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.loadingText}>Finding best loans for you...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, {paddingTop: insets.top}]}>
        <Text style={styles.errorText}>Something went wrong. Please try again.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadLoans()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, 
    {paddingTop: insets.top, paddingBottom: insets.bottom}]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Education Loans</Text>
        <TouchableOpacity style={styles.sortButton} onPress={toggleSort}>
          <Text style={styles.sortButtonText}>
            Rate: {sortAscending ? 'Low to High' : 'High to Low'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedLoans}
        keyExtractor={item => item.id}
        renderItem={({item}) => <LoanCard loan={item} onPress={handleLoanPress} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadLoans(true)}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No loans available</Text>
          </View>
        }
      />

      <LoanDetailModal
        loan={selectedLoan}
        visible={selectedLoan !== null}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  sortButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sortButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  lottie: {
    width: 300,
    height: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
