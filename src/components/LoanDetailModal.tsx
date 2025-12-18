import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loan} from '../types';
import {Colors} from '../constants/colors';

interface LoanDetailModalProps {
  loan: Loan | null;
  visible: boolean;
  onClose: () => void;
}

function formatCurrency(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export function LoanDetailModal({loan, visible, onClose}: LoanDetailModalProps) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          stiffness: 150,
          mass: 0.8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset position when not visible
      slideAnim.setValue(SCREEN_HEIGHT);
      fadeAnim.setValue(0);
    }
  }, [visible, slideAnim, fadeAnim]);

  const handleClose = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!loan) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent
      onRequestClose={handleClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[styles.overlay, {opacity: fadeAnim}]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.modalContent,
            {
              paddingBottom: insets.bottom + 20,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.bankInfo}>
              <Text style={styles.bankName}>{loan.bankName}</Text>
              <View
                style={[
                  styles.loanTypeBadge,
                  loan.loanType === 'secured'
                    ? styles.securedBadge
                    : styles.unsecuredBadge,
                ]}>
                <Text
                  style={[
                    styles.loanTypeText,
                    loan.loanType === 'secured'
                      ? styles.securedText
                      : styles.unsecuredText,
                  ]}>
                  {loan.loanType === 'secured' ? 'Secured' : 'Unsecured'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Loan Amount Highlight */}
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Loan Amount</Text>
            <Text style={styles.amountValue}>{formatCurrency(loan.loanAmount)}</Text>
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Interest Rate</Text>
              <Text style={styles.detailValueHighlight}>{loan.interestRate}%</Text>
              <Text style={styles.detailSubtext}>per annum</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Tenure</Text>
              <Text style={styles.detailValue}>{loan.tenure}</Text>
              <Text style={styles.detailSubtext}>months</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Processing Fee</Text>
              <Text style={styles.detailValue}>{formatCurrency(loan.processingFee)}</Text>
              <Text style={styles.detailSubtext}>one time</Text>
            </View>
          </View>

          {/* Note */}
          <View style={styles.noteSection}>
            <Text style={styles.noteText}>
              💡 Rates may vary based on credit profile and bank policies.
            </Text>
          </View>

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleClose}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  loanTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  securedBadge: {
    backgroundColor: 'rgba(39, 174, 96, 0.12)',
  },
  unsecuredBadge: {
    backgroundColor: 'rgba(78, 60, 134, 0.12)',
  },
  loanTypeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  securedText: {
    color: '#27AE60',
  },
  unsecuredText: {
    color: Colors.primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  amountSection: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  detailBox: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 6,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  detailValueHighlight: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  detailSubtext: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 2,
  },
  noteSection: {
    backgroundColor: 'rgba(78, 60, 134, 0.06)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
