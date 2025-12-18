import React, {memo} from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../constants/colors';
import {BorderRadius, Spacing} from '../../constants/theme';

interface DetailBoxProps {
  label: string;
  value: string | number;
  subtext?: string;
  highlight?: boolean;
  style?: StyleProp<ViewStyle>;
}

const DetailBox: React.FC<DetailBoxProps> = ({
  label,
  value,
  subtext,
  highlight = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight && styles.valueHighlight]}>
        {value}
      </Text>
      {subtext && <Text style={styles.subtext}>{subtext}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md + 2,
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs + 2,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  valueHighlight: {
    color: Colors.primary,
  },
  subtext: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: Spacing.xxs,
  },
});

export default memo(DetailBox);

