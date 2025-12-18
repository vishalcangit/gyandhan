import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Loan} from '../types';
import {Colors} from '../constants/colors';

interface LoanCardProps {
  loan: Loan;
  onPress: (loan: Loan) => void;
}

function formatCurrency(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export function LoanCard({loan, onPress}: LoanCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(loan)}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.bankName}>{loan.bankName}</Text>
        <View
          style={[
            styles.loanTypeBadge,
            loan.loanType === 'secured'
              ? styles.securedBadge
              : styles.unsecuredBadge,
          ]}>
          <Text style={styles.loanTypeText}>
            {loan.loanType === 'secured' ? 'Secured' : 'Unsecured'}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Loan Amount</Text>
          <Text style={styles.detailValue}>
            {formatCurrency(loan.loanAmount)}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Interest Rate</Text>
          <Text style={styles.interestRate}>{loan.interestRate}% p.a.</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F7FC',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    // Simulating gradient with layered background colors
    // React Native doesn't support CSS gradients natively
    borderWidth: 1,
    borderColor: 'rgba(154, 142, 194, 0.2)',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  loanTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  securedBadge: {
    backgroundColor: 'rgba(39, 174, 96, 0.15)',
  },
  unsecuredBadge: {
    backgroundColor: 'rgba(78, 60, 134, 0.15)',
  },
  loanTypeText: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.primary,
    textTransform: 'uppercase',
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
    marginBottom: 4,
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

