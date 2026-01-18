# Module: [Module Name]

> **Parent Milestone**: [Link to parent README.md]
> **Module Type**: Database | Backend | Frontend (Hooks) | Frontend (Components) | Frontend (Screens) | Testing
> **Platform**: iOS | Android | Both
> **Created**: YYYY-MM-DD
> **Last Updated**: YYYY-MM-DD

---

## Overview

[Brief summary of what this module implements - 2-3 sentences]

**Scope**: This module covers [specific scope - e.g., "all database schema changes including tables, indexes, and RLS policies"]

**Dependencies**:
- Depends on: [List other modules that must be completed first, or "None"]
- Blocks: [List modules that depend on this one, or "None"]

---

## Implementation Checklist

- [ ] Task 1: [Specific implementation task]
- [ ] Task 2: [Specific implementation task]
- [ ] Task 3: [Specific implementation task]
- [ ] Task 4: [Specific implementation task]
- [ ] Task 5: [Specific implementation task]

---

## Detailed Implementation

### [Section 1 Name]

[Detailed implementation guidance]

**Files to Create/Modify**:
- `src/hooks/useFeature.ts` - [Purpose]
- `src/components/ui/FeatureComponent.tsx` - [Purpose]
- `src/pages/FeatureScreen.tsx` - [Purpose]
- `supabase/migrations/YYYYMMDD_feature.sql` - [Purpose]

**Code Example (React Native Component)**:
```typescript
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface FeatureProps {
  title: string;
  onPress?: () => void;
}

export function Feature({ title, onPress }: FeatureProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  title: {
    ...typography.heading,
    color: colors.text,
  },
});
```

---

### [Section 2 Name]

[Detailed implementation guidance]

**Files to Create/Modify**:
- `src/navigation/AppNavigator.tsx` - Add screen route
- `src/navigation/types.ts` - Add route params type

**Code Example (React Native Screen)**:
```typescript
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FeatureScreen'>;

export function FeatureScreen({ navigation, route }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Screen content */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
```

---

## Type Definitions

```typescript
// Relevant TypeScript types for this module

export interface ModuleType {
  id: string;
  field1: string;
  field2: number;
}
```

---

## Testing This Module

### Unit Tests

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Feature } from '../Feature';

describe('Feature Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Feature title="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('should handle press', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Feature title="Test" onPress={onPress} />
    );
    fireEvent.press(getByTestId('feature-button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### Integration Tests

[Describe how to test this module in integration with other parts]

### Manual Testing

**iOS**:
1. **Test Case 1**: [Description]
   - Steps: [Step-by-step]
   - Expected: [Expected result]
   - Device: iPhone simulator / physical device

**Android**:
2. **Test Case 2**: [Description]
   - Steps: [Step-by-step]
   - Expected: [Expected result]
   - Device: Android emulator / physical device

---

## Verification Steps

After implementing this module, verify:

1. [ ] **TypeScript compilation**: No type errors
   ```bash
   npx tsc --noEmit
   ```

2. [ ] **iOS build**: App builds successfully
   ```bash
   npx react-native run-ios
   ```

3. [ ] **Android build**: App builds successfully
   ```bash
   npx react-native run-android
   ```

4. [ ] **Jest tests**: All tests pass
   ```bash
   npm test
   ```

5. [ ] **Feature verification**: [How to verify it works in the app]

---

## Common Issues & Solutions

### Issue 1: [Problem description]

**Symptoms**: [How this manifests]

**Solution**: [How to fix]

```typescript
// Code example of fix
```

---

### Issue 2: [Problem description]

**Symptoms**: [How this manifests]

**Solution**: [How to fix]

---

## Security Considerations

- **Security Point 1**: [Description and mitigation]
- **Security Point 2**: [Description and mitigation]

---

## Performance Considerations

- **Performance Point 1**: [Description and optimization]
- **Performance Point 2**: [Description and optimization]

---

## Rollback Plan

If this module needs to be rolled back:

1. **Step 1**: [Rollback action]
   ```sql
   -- Rollback SQL if applicable
   ```

2. **Step 2**: [Rollback action]

---

## References

- Parent Milestone: [Link to README.md](README.md)
- Related Modules: [Links to related module files]
- External Docs: [Any external documentation links]

---

## Module-Specific Notes

[Any additional notes, gotchas, or important information specific to this module]
