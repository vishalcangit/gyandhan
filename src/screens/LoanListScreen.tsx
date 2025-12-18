import React, {useState, useCallback, memo} from 'react';
import {View, Text, FlatList, StyleSheet, RefreshControl} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loan} from '../types';
import {useLoans} from '../hooks';
import LoanCard from '../components/LoanCard';
import LoanDetailModal from '../components/LoanDetailModal';
import {Button} from '../components/ui';
import {Colors, Strings, Spacing} from '../constants';

const LOADING_ANIMATION = require('../assets/loading/loading.json');

const LoanListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {loans, loading, refreshing, error, sortOrder, refresh, toggleSortOrder, fetch} =
    useLoans();
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const handleLoanPress = useCallback((loan: Loan) => {
    setSelectedLoan(loan);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedLoan(null);
  }, []);

  const renderItem = useCallback(
    ({item}: {item: Loan}) => <LoanCard loan={item} onPress={handleLoanPress} />,
    [handleLoanPress],
  );

  const keyExtractor = useCallback((item: Loan) => item.id, []);

  const sortButtonLabel =
    sortOrder === 'asc' ? Strings.loanList.sortLowToHigh : Strings.loanList.sortHighToLow;

  if (loading) {
    return (
      <View style={[styles.centered, {paddingTop: insets.top}]}>
        <LottieView source={LOADING_ANIMATION} autoPlay loop style={styles.lottie} />
        <Text style={styles.loadingText}>{Strings.loanList.loading}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, {paddingTop: insets.top}]}>
        <Text style={styles.errorText}>{Strings.loanList.error}</Text>
        <Button title={Strings.loanList.retry} onPress={fetch} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
      <View style={styles.header}>
        <Text style={styles.title}>{Strings.loanList.title}</Text>
        <Button title={sortButtonLabel} onPress={toggleSortOrder} size="sm" />
      </View>

      <FlatList
        data={loans}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{Strings.loanList.empty}</Text>
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
};

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
    padding: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  lottie: {
    width: 300,
    height: 100,
  },
  loadingText: {
    marginTop: Spacing.lg,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  emptyState: {
    padding: Spacing.xxxl + 8,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default memo(LoanListScreen);
