import React, {useEffect, useRef, useCallback, memo} from 'react';
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
import {Colors, Strings, Spacing, BorderRadius, Shadows, Animation} from '../constants';
import {formatCurrency} from '../utils';
import {Badge, Button, DetailBox} from './ui';

interface LoanDetailModalProps {
  loan: Loan | null;
  visible: boolean;
  onClose: () => void;
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const SPRING_CONFIG = {damping: 20, stiffness: 150, mass: 0.8, useNativeDriver: true};

const LoanDetailModal: React.FC<LoanDetailModalProps> = ({loan, visible, onClose}) => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: Animation.normal,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {toValue: 0, ...SPRING_CONFIG}),
      ]).start();
    } else {
      slideAnim.setValue(SCREEN_HEIGHT);
      fadeAnim.setValue(0);
    }
  }, [visible, slideAnim, fadeAnim]);

  const handleClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: Animation.fast + 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: Animation.normal,
        useNativeDriver: true,
      }),
    ]).start(onClose);
  }, [fadeAnim, slideAnim, onClose]);

  if (!loan) {
    return null;
  }

  const isSecured = loan.loanType === 'secured';
  const {loanDetail: strings} = Strings;

  return (
    <Modal
      visible={visible}
      transparent
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
              paddingBottom: insets.bottom + Spacing.xl,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.bankInfo}>
              <Text style={styles.bankName}>{loan.bankName}</Text>
              <Badge
                label={isSecured ? Strings.loanCard.secured : Strings.loanCard.unsecured}
                variant={isSecured ? 'success' : 'primary'}
              />
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Loan Amount Highlight */}
          <View style={[styles.amountSection, Shadows.lg]}>
            <Text style={styles.amountLabel}>{strings.loanAmount}</Text>
            <Text style={styles.amountValue}>{formatCurrency(loan.loanAmount)}</Text>
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <DetailBox
              label={strings.interestRate}
              value={`${loan.interestRate}%`}
              subtext={strings.perAnnum}
              highlight
            />
            <DetailBox
              label={strings.tenure}
              value={loan.tenure}
              subtext={strings.months}
            />
            <DetailBox
              label={strings.processingFee}
              value={formatCurrency(loan.processingFee)}
              subtext={strings.oneTime}
            />
          </View>

          {/* Note */}
          <View style={styles.noteSection}>
            <Text style={styles.noteText}>{strings.note}</Text>
          </View>

          {/* Apply Button */}
          <Button title={strings.applyNow} onPress={handleClose} size="lg" />
        </Animated.View>
      </View>
    </Modal>
  );
};

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
    borderTopLeftRadius: BorderRadius.xxl + 8,
    borderTopRightRadius: BorderRadius.xxl + 8,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.xxs,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.round,
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
    borderRadius: BorderRadius.lg + 4,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  amountLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: Spacing.xs,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    gap: Spacing.sm + 2,
  },
  noteSection: {
    backgroundColor: 'rgba(78, 60, 134, 0.06)',
    borderRadius: BorderRadius.sm + 2,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  noteText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default memo(LoanDetailModal);
