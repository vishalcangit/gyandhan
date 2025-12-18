import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Loan} from '../types';
import {Colors, Strings, Spacing} from '../constants';
import {formatCurrency} from '../utils';
import {Card, Badge} from './ui';

interface LoanCardProps {
  loan: Loan;
  onPress: (loan: Loan) => void;
}

const LoanCard: React.FC<LoanCardProps> = ({loan, onPress}) => {
  const isSecured = loan.loanType === 'secured';

  return (
    <Card onPress={() => onPress(loan)} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.bankName} numberOfLines={1}>
          {loan.bankName}
        </Text>
        <Badge
          label={isSecured ? Strings.loanCard.secured : Strings.loanCard.unsecured}
          variant={isSecured ? 'success' : 'primary'}
        />
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{Strings.loanCard.loanAmount}</Text>
          <Text style={styles.detailValue}>{formatCurrency(loan.loanAmount)}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{Strings.loanCard.interestRate}</Text>
          <Text style={styles.interestRate}>
            {loan.interestRate}% {Strings.loanCard.perAnnum}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  interestRate: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
});

export default memo(LoanCard);
