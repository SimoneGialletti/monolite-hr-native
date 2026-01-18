# Technical Milestone: [Feature Name]

> **Status**: DRAFT | IN REVIEW | APPROVED | IN PROGRESS | COMPLETED
> **Domain**: finance | inventory | projects-sites | workforce | documents | crm | system
> **Sprint/Milestone**: [Sprint number or milestone name]
> **Estimated Effort**: [Story points or time estimate]
> **Platform**: iOS | Android | Both
> **Created**: YYYY-MM-DD
> **Last Updated**: YYYY-MM-DD

## Overview

[Brief summary of what this technical implementation achieves]

**Structure**: This is the master README.md for a modular milestone. All technical milestones must follow this structure:
- This file: `plans/milestones/[domain]/[feature-name]/README.md` - Master plan with architecture
- `STATUS.md` - Implementation progress tracker (copy from STATUS-template.md)
- `01-database-schema.md` - Database changes (use milestone-module-template.md)
- `02-backend-functions.md` - Edge Functions, DB functions (use milestone-module-template.md)
- `03-frontend-hooks.md` - React Native hooks (use milestone-module-template.md)
- `04-frontend-components.md` - UI components if needed (use milestone-module-template.md)
- `05-frontend-screens.md` - Screen implementations if needed (use milestone-module-template.md)
- `06-testing.md` - Testing strategy (use milestone-module-template.md)

See [plans/README.md](../../../README.md#-milestone-structure-modular-approach) for complete structure guidelines.

### Feature Reference
- **Business Requirements**: [Link to feature doc in plans/features/]
- **Epic/Story ID**: [Jira/Linear/etc ID if applicable]

### Technical Goals
- Goal 1: [Specific technical objective]
- Goal 2: [Specific technical objective]

### Implementation Status

See [STATUS.md](STATUS.md) for detailed implementation progress tracking across all four phases (Database, Backend, Frontend, Testing).

## Architecture Overview

### High-Level Design

```
[ASCII diagram or description of architecture]

┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────>│   Backend   │─────>│  Database   │
└─────────────┘      └─────────────┘      └─────────────┘
```

### Components Affected
- **Frontend**: [List components]
- **Backend**: [List services/functions]
- **Database**: [List tables/views]
- **APIs**: [List endpoints]

### Technology Stack
- Frontend: React Native 0.74, TypeScript, React Navigation
- State Management: TanStack React Query, React Hook Form + Zod
- UI: Custom component library (`src/components/ui/`) with StyleSheet
- Styling: StyleSheet API with centralized theme (`src/theme/`)
- Backend: Supabase (Edge Functions, Auth, Database)
- Database: PostgreSQL via Supabase
- Native Modules: [List any native modules needed]

## Database Schema Changes

### New Tables

```sql
-- Table: [table_name]
CREATE TABLE [table_name] (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  [column_name] [type] [constraints],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_[table]_[column] ON [table]([column]);

-- RLS Policies
ALTER TABLE [table_name] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "[policy_name]"
  ON [table_name]
  FOR [SELECT|INSERT|UPDATE|DELETE]
  USING ([condition]);
```

### Modified Tables

```sql
-- Add columns to existing table
ALTER TABLE [existing_table]
  ADD COLUMN [new_column] [type] [constraints];

-- Update existing data
UPDATE [table] SET [column] = [value] WHERE [condition];
```

### Views

```sql
-- Create or replace view
CREATE OR REPLACE VIEW [view_name] AS
SELECT
  [columns]
FROM [tables]
WHERE [conditions];
```

### Migration Script

```sql
-- Migration: [YYYYMMDD_migration_name]
BEGIN;

-- 1. Schema changes
[SQL statements]

-- 2. Data migrations
[SQL statements]

-- 3. Verification
SELECT count(*) FROM [table]; -- Expected: [N]

COMMIT;
```

## API Design

### New Endpoints

#### Endpoint 1: [Method] /api/[path]

**Purpose**: [What this endpoint does]

**Request**:
```typescript
interface RequestBody {
  field1: string;
  field2: number;
  field3?: boolean;
}
```

**Response**:
```typescript
interface ResponseBody {
  data: {
    id: string;
    field1: string;
  };
  error?: string;
}
```

**Status Codes**:
- 200: Success
- 400: Bad Request - [When]
- 401: Unauthorized - [When]
- 404: Not Found - [When]
- 500: Internal Server Error

**Example**:
```bash
curl -X POST /api/[path] \
  -H "Content-Type: application/json" \
  -d '{"field1": "value"}'
```

### Modified Endpoints

#### Endpoint: [Method] /api/[existing-path]

**Changes**:
- Added: [New fields]
- Modified: [Changed fields]
- Deprecated: [Old fields - will be removed in v2]

## Frontend Implementation (React Native)

### New Components

#### Component: `[ComponentName]`

**Purpose**: [What this component does]

**Location**: `src/components/ui/[ComponentName].tsx`

**Props**:
```typescript
interface ComponentNameProps {
  prop1: string;
  prop2: number;
  onAction?: (data: DataType) => void;
}
```

**State Management**:
- Uses: [React Query/React Hook Form/useState]
- State: [What state it manages]

**Example Usage**:
```tsx
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';

<ComponentName
  prop1="value"
  prop2={42}
  onAction={(data) => console.log(data)}
/>

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
});
```

### Modified Components

#### Component: `[ExistingComponent]`

**Location**: `src/components/ui/[Component].tsx`

**Changes**:
- Add: [New functionality]
- Modify: [Changed behavior]
- Remove: [Deprecated code]

### Screens

#### Screen: `[ScreenName]`

**Purpose**: [What this screen does]

**Location**: `src/pages/[ScreenName].tsx`

**Navigation**:
- Route Name: `[RouteName]`
- Params: `{ param1: string; param2?: number }`

**Example**:
```tsx
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ScreenName'>;

export function ScreenName({ navigation, route }: Props) {
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

### Hooks

#### Hook: `use[HookName]`

**Purpose**: [What this hook does]

**Location**: `src/hooks/use[HookName].ts`

**Signature**:
```typescript
interface UseHookNameOptions {
  option1: string;
  option2?: boolean;
}

interface UseHookNameReturn {
  data: DataType;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useHookName(options: UseHookNameOptions): UseHookNameReturn;
```

**Example**:
```typescript
const { data, isLoading, error, refetch } = useHookName({
  option1: 'value'
});
```

### Navigation

**Screen Registration**: Add to `src/navigation/AppNavigator.tsx`

```tsx
<Stack.Screen
  name="ScreenName"
  component={ScreenName}
  options={{ title: 'Screen Title' }}
/>
```

**Navigation Types**: Update `src/navigation/types.ts`

```typescript
export type RootStackParamList = {
  // ... existing screens
  ScreenName: { param1: string; param2?: number };
};
```

### State Management

**React Query**: Primary state management for server data

```typescript
// src/hooks/useFeatureData.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useFeatureData() {
  return useQuery({
    queryKey: ['feature-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('table_name')
        .select('*');
      if (error) throw error;
      return data;
    },
  });
}
```

## Backend Implementation

### Edge Functions (if applicable)

#### Function: `[function-name]`

**Purpose**: [What this function does]

**Trigger**: [HTTP/Database/Schedule]

**Location**: `supabase/functions/[function-name]/index.ts`

**Input**:
```typescript
interface FunctionInput {
  field1: string;
  field2: number;
}
```

**Output**:
```typescript
interface FunctionOutput {
  success: boolean;
  data?: any;
  error?: string;
}
```

**Implementation**:
```typescript
Deno.serve(async (req) => {
  // Implementation details
});
```

### Database Functions

#### Function: `[function_name]`

**Purpose**: [What this function does]

**Signature**:
```sql
CREATE OR REPLACE FUNCTION [function_name](
  param1 type1,
  param2 type2
)
RETURNS return_type
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Implementation
END;
$$;
```

### Database Triggers

```sql
CREATE OR REPLACE FUNCTION [trigger_function_name]()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Trigger logic
  RETURN NEW;
END;
$$;

CREATE TRIGGER [trigger_name]
  AFTER INSERT ON [table_name]
  FOR EACH ROW
  EXECUTE FUNCTION [trigger_function_name]();
```

## Type Definitions

### Database Types

**Generate with**:
```bash
npx supabase gen types typescript --project-id [project-id] > src/integrations/supabase/types.ts
```

### Custom Types

```typescript
// src/types/[feature].ts

export interface [TypeName] {
  id: string;
  field1: string;
  field2: number;
  createdAt: string;
  updatedAt: string;
}

export type [ActionType] = 'action1' | 'action2' | 'action3';

export interface [RequestType] {
  // Request shape
}

export interface [ResponseType] {
  // Response shape
}
```

## Implementation Steps

### Phase 1: Database Setup
1. [ ] Create migration file: `supabase/migrations/[timestamp]_[name].sql`
2. [ ] Add schema changes (tables, columns, indexes)
3. [ ] Add RLS policies
4. [ ] Test migration locally: `supabase db reset`
5. [ ] Verify data integrity

### Phase 2: Backend Implementation
1. [ ] Create/update Edge Functions
2. [ ] Create database functions/triggers
3. [ ] Add database views
4. [ ] Write unit tests for backend logic
5. [ ] Test with curl/Postman

### Phase 3: Frontend Implementation (React Native)
1. [ ] Generate TypeScript types from Supabase
2. [ ] Create/update React Native hooks
3. [ ] Create/update UI components (`src/components/ui/`)
4. [ ] Create/update screens (`src/pages/`)
5. [ ] Add navigation routes (`src/navigation/`)
6. [ ] Implement UI/UX with theme tokens
7. [ ] Add error handling and toast messages
8. [ ] Add loading states with animations

### Phase 4: Integration
1. [ ] Connect frontend to backend via Supabase client
2. [ ] Test end-to-end flows on iOS simulator
3. [ ] Test end-to-end flows on Android emulator
4. [ ] Test edge cases
5. [ ] Add error boundaries
6. [ ] Add logging/monitoring

### Phase 5: Testing
1. [ ] Unit tests (backend Edge Functions)
2. [ ] Unit tests (React Native hooks)
3. [ ] Unit tests (React Native components)
4. [ ] Integration tests
5. [ ] Manual testing on iOS device
6. [ ] Manual testing on Android device
7. [ ] Manual testing checklist

### Phase 6: Documentation
1. [ ] Update API documentation
2. [ ] Update user documentation
3. [ ] Add code comments
4. [ ] Update README if needed

## Code Examples

### Example 1: [Use Case]

```typescript
// Description of what this does

import { something } from 'somewhere';

// Implementation
```

### Example 2: [Use Case]

```typescript
// Another example
```

## Testing Strategy

### Unit Tests

**Backend (Edge Functions)**:
```typescript
describe('[Function Name]', () => {
  it('should [behavior]', async () => {
    // Test implementation
  });
});
```

**React Native Components**:
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { ComponentName } from '../ComponentName';

describe('[Component Name]', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ComponentName prop1="value" />);
    expect(getByText('Expected text')).toBeTruthy();
  });

  it('should handle [action]', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<ComponentName onPress={onPress} />);
    fireEvent.press(getByTestId('button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

**React Native Hooks**:
```typescript
import { renderHook, waitFor } from '@testing-library/react-native';
import { useFeatureData } from '../useFeatureData';

describe('useFeatureData', () => {
  it('should fetch data', async () => {
    const { result } = renderHook(() => useFeatureData());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toBeDefined();
  });
});
```

### Integration Tests

```typescript
describe('[Feature] Integration', () => {
  it('should complete end-to-end flow', async () => {
    // Test the complete user journey
  });
});
```

### Manual Testing Checklist

**iOS Testing**:
- [ ] Happy path on iOS simulator
- [ ] Happy path on physical iOS device
- [ ] Safe area handling (notch, home indicator)
- [ ] Keyboard behavior and avoidance

**Android Testing**:
- [ ] Happy path on Android emulator
- [ ] Happy path on physical Android device
- [ ] Back button behavior
- [ ] Different screen sizes

**Cross-Platform**:
- [ ] Error case: [Test scenario]
- [ ] Edge case: [Test scenario]
- [ ] Offline behavior
- [ ] Performance: [Test scenario]
- [ ] Security: [Test scenario]

## React Native Considerations

### Platform-Specific Code
- **iOS-specific**: [Any iOS-only implementations]
- **Android-specific**: [Any Android-only implementations]
- **Platform checks**: Use `Platform.OS === 'ios'` or `Platform.select({})`

### Navigation Patterns
- **Stack Navigation**: [How screens are stacked]
- **Tab Navigation**: [If using bottom tabs]
- **Modal Presentation**: [Modal screens and their behavior]
- **Deep Linking**: [If applicable]

### Animations & Gestures
- **Animations**: Use `react-native-reanimated` for performant animations
- **Gestures**: Use `react-native-gesture-handler` for touch interactions
- **Transitions**: [Screen transition animations]

### Native Modules
- [List any native modules required]
- [Installation steps for native dependencies]
- [Pod install for iOS, Gradle sync for Android]

### Performance Optimization
- **List rendering**: Use `FlatList` with `keyExtractor` and `getItemLayout`
- **Memoization**: Use `React.memo`, `useMemo`, `useCallback` appropriately
- **Image optimization**: Use proper image sizes and caching
- **Bundle size**: Monitor JS bundle size

## Security Considerations

### Authentication & Authorization
- [How is this feature secured]
- [What permissions are required]
- [RLS policies applied]
- Supabase Auth integration with `useAuth()` hook

### Input Validation
- [What inputs are validated]
- [How validation is performed]
- Use Zod schemas with React Hook Form

### Data Privacy
- [Any PII considerations]
- [Data access controls]
- AsyncStorage encryption for sensitive data

## Performance Considerations

### Expected Load
- Concurrent users: [Estimate]
- Requests per second: [Estimate]
- Data volume: [Estimate]

### Optimizations
- [ ] Database indexes on [columns]
- [ ] Query optimization: [Description]
- [ ] Caching strategy: [Description]
- [ ] Pagination: [Implementation]

### Monitoring
- Metrics to track: [List metrics]
- Alerts to set: [List alerts]

## Error Handling

### Frontend Errors
```typescript
try {
  // Operation
} catch (error) {
  // User-friendly message
  // Logging
  // Fallback behavior
}
```

### Backend Errors
```typescript
// Error responses
return new Response(
  JSON.stringify({ error: 'User-friendly message' }),
  { status: 400 }
);
```

### Error Messages
- Error 1: [Message and resolution]
- Error 2: [Message and resolution]

## Rollback Plan

### How to Rollback

1. **Database**:
   ```sql
   -- Revert migration
   [Rollback SQL]
   ```

2. **Code**:
   ```bash
   git revert [commit-hash]
   ```

3. **Verification**:
   - [ ] Check [metric]
   - [ ] Verify [functionality]

## Deployment Checklist

### Pre-Deployment
- [ ] Code review completed
- [ ] Tests passing (unit, integration)
- [ ] Database migration tested locally
- [ ] iOS build successful
- [ ] Android build successful
- [ ] Performance tested on devices
- [ ] Security reviewed
- [ ] Documentation updated

### Deployment Steps
1. [ ] Run database migration: `supabase db push`
2. [ ] Deploy Edge Functions: `supabase functions deploy`
3. [ ] Build iOS app: `npx react-native run-ios --mode Release`
4. [ ] Build Android app: `npx react-native run-android --mode release`
5. [ ] Verify deployment health
6. [ ] Monitor for errors

### Post-Deployment
- [ ] Smoke tests passed on iOS
- [ ] Smoke tests passed on Android
- [ ] Monitor error rates (Sentry/Crashlytics)
- [ ] Monitor performance metrics
- [ ] User acceptance testing
- [ ] Team notification

### App Store Deployment (if applicable)
- [ ] TestFlight build uploaded
- [ ] Play Store internal testing build uploaded
- [ ] Release notes prepared
- [ ] Screenshots updated (if UI changes)

## Monitoring & Metrics

### Key Metrics
- Metric 1: [What to track]
- Metric 2: [What to track]

### Success Criteria
- [ ] Criterion 1: [Measurable outcome]
- [ ] Criterion 2: [Measurable outcome]

## Known Issues & Limitations

- Issue 1: [Description and workaround]
- Issue 2: [Description and workaround]

## Future Improvements

- Enhancement 1: [Description]
- Enhancement 2: [Description]

## References

- Feature Doc: [Link to plans/features/]
- Design: [Link to design files]
- API Docs: [Link to API documentation]
- Related Tickets: [Links to issue tracker]

---

**Next Step**: Use this document as the prompt for Claude to implement the actual code.
