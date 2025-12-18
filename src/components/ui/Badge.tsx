import React, {memo} from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../constants/colors';
import {BorderRadius, Spacing} from '../../constants/theme';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
}

const variantColors: Record<BadgeVariant, {bg: string; text: string}> = {
  primary: {
    bg: 'rgba(78, 60, 134, 0.15)',
    text: Colors.primary,
  },
  success: {
    bg: 'rgba(39, 174, 96, 0.15)',
    text: Colors.success,
  },
  warning: {
    bg: 'rgba(243, 156, 18, 0.15)',
    text: '#F39C12',
  },
  error: {
    bg: 'rgba(231, 76, 60, 0.15)',
    text: Colors.error,
  },
};

const Badge: React.FC<BadgeProps> = ({label, variant = 'primary', style}) => {
  const colors = variantColors[variant];

  return (
    <View style={[styles.badge, {backgroundColor: colors.bg}, style]}>
      <Text style={[styles.text, {color: colors.text}]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default memo(Badge);

