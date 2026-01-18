# Module 6: Testing

> **Phase**: 6 of 6
> **Status**: Not Started
> **Dependencies**: All previous modules

## Overview

This module covers the testing strategy for the push notification system, including unit tests, integration tests, and manual testing checklists for both iOS and Android.

## Unit Tests

### Test: useNotifications Hook

```typescript
// __tests__/hooks/useNotifications.test.ts
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useNotifications } from '@/hooks/useNotifications';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            is: jest.fn(() => ({
              order: jest.fn(() => ({
                limit: jest.fn(() => Promise.resolve({
                  data: mockNotifications,
                  error: null,
                })),
              })),
            })),
          })),
        })),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => Promise.resolve({ error: null })),
        })),
      })),
    })),
    channel: jest.fn(() => ({
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn(),
    })),
    removeChannel: jest.fn(),
  },
}));

// Mock useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
  }),
}));

const mockNotifications = [
  {
    id: '1',
    title: 'Test Notification',
    body: 'Test body',
    notification_type: 'request_approved',
    read_at: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Read Notification',
    body: 'Already read',
    notification_type: 'announcement',
    read_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];

describe('useNotifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch notifications on mount', async () => {
    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.notifications).toHaveLength(2);
  });

  it('should calculate unread count correctly', async () => {
    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.unreadCount).toBe(1);
  });

  it('should mark notification as read', async () => {
    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.markAsRead('1');
    });

    expect(result.current.unreadCount).toBe(0);
  });

  it('should mark all notifications as read', async () => {
    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.markAllAsRead();
    });

    expect(result.current.unreadCount).toBe(0);
  });

  it('should dismiss notification', async () => {
    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.dismissNotification('1');
    });

    expect(result.current.notifications).toHaveLength(1);
  });
});
```

### Test: useNotificationPreferences Hook

```typescript
// __tests__/hooks/useNotificationPreferences.test.ts
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useNotificationPreferences } from '@/hooks/useNotificationPreferences';

jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({
              data: {
                push_enabled: true,
                notify_request_approved: true,
                notify_request_rejected: true,
                notify_announcements: false,
                batch_notifications_enabled: false,
              },
              error: null,
            })),
          })),
        })),
      })),
      upsert: jest.fn(() => Promise.resolve({ error: null })),
    })),
  },
}));

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
  }),
}));

describe('useNotificationPreferences', () => {
  it('should load preferences on mount', async () => {
    const { result } = renderHook(() => useNotificationPreferences());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.preferences.push_enabled).toBe(true);
    expect(result.current.preferences.notify_announcements).toBe(false);
  });

  it('should update single preference', async () => {
    const { result } = renderHook(() => useNotificationPreferences());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.updatePreference('notify_announcements', true);
    });

    expect(result.current.preferences.notify_announcements).toBe(true);
  });
});
```

### Test: NotificationCenter Component

```typescript
// __tests__/components/NotificationCenter.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

// Mock hooks
jest.mock('@/hooks/useNotifications', () => ({
  useNotifications: () => ({
    notifications: [
      {
        id: '1',
        title: 'Test Notification',
        body: 'Test body',
        notification_type: 'request_approved',
        read_at: null,
        created_at: new Date().toISOString(),
      },
    ],
    unreadCount: 1,
    loading: false,
    markAsRead: jest.fn(),
    markAllAsRead: jest.fn(),
    dismissNotification: jest.fn(),
    refetch: jest.fn(),
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('NotificationCenter', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render notifications list', () => {
    const { getByText } = render(
      <NotificationCenter visible={true} onClose={mockOnClose} />
    );

    expect(getByText('Test Notification')).toBeTruthy();
    expect(getByText('Test body')).toBeTruthy();
  });

  it('should call onClose when back button is pressed', () => {
    const { getByTestId } = render(
      <NotificationCenter visible={true} onClose={mockOnClose} />
    );

    // Assuming back button has testID="back-button"
    fireEvent.press(getByTestId('back-button'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should show empty state when no notifications', () => {
    jest.doMock('@/hooks/useNotifications', () => ({
      useNotifications: () => ({
        notifications: [],
        unreadCount: 0,
        loading: false,
        markAsRead: jest.fn(),
        markAllAsRead: jest.fn(),
        dismissNotification: jest.fn(),
        refetch: jest.fn(),
      }),
    }));

    const { getByText } = render(
      <NotificationCenter visible={true} onClose={mockOnClose} />
    );

    expect(getByText('notifications.noNotifications')).toBeTruthy();
  });
});
```

### Test: NotificationItem Component

```typescript
// __tests__/components/NotificationItem.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NotificationItem } from '@/components/notifications/NotificationItem';

describe('NotificationItem', () => {
  const mockNotification = {
    id: '1',
    title: 'Test Title',
    body: 'Test body message',
    notification_type: 'request_approved',
    entity_type: null,
    entity_id: null,
    deep_link_path: '/activities',
    read_at: null,
    dismissed_at: null,
    created_at: new Date().toISOString(),
    priority: 'normal',
    metadata: {},
  };

  const mockOnPress = jest.fn();
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render notification content', () => {
    const { getByText } = render(
      <NotificationItem
        notification={mockNotification}
        onPress={mockOnPress}
        onDismiss={mockOnDismiss}
      />
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test body message')).toBeTruthy();
  });

  it('should show unread indicator for unread notifications', () => {
    const { getByTestId } = render(
      <NotificationItem
        notification={mockNotification}
        onPress={mockOnPress}
        onDismiss={mockOnDismiss}
      />
    );

    // Assuming unread dot has testID
    expect(getByTestId('unread-dot')).toBeTruthy();
  });

  it('should call onPress when tapped', () => {
    const { getByText } = render(
      <NotificationItem
        notification={mockNotification}
        onPress={mockOnPress}
        onDismiss={mockOnDismiss}
      />
    );

    fireEvent.press(getByText('Test Title'));

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should call onDismiss when dismiss button is pressed', () => {
    const { getByTestId } = render(
      <NotificationItem
        notification={mockNotification}
        onPress={mockOnPress}
        onDismiss={mockOnDismiss}
      />
    );

    fireEvent.press(getByTestId('dismiss-button'));

    expect(mockOnDismiss).toHaveBeenCalled();
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
```

---

## Integration Tests

### Test: Notification Flow End-to-End

```typescript
// __tests__/integration/notificationFlow.test.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

describe('Notification Flow Integration', () => {
  const testUserId = 'test-user-uuid';
  let createdNotificationId: string;

  afterAll(async () => {
    // Cleanup
    if (createdNotificationId) {
      await supabase
        .from('notifications')
        .delete()
        .eq('id', createdNotificationId);
    }
  });

  it('should create notification via Edge Function', async () => {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/functions/v1/send-push-notification`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({
          user_id: testUserId,
          app_id: 'monolite-hr',
          title: 'Integration Test',
          body: 'Test notification body',
          notification_type: 'announcement',
        }),
      }
    );

    const result = await response.json();

    expect(response.ok).toBe(true);
    expect(result.notification_id).toBeDefined();

    createdNotificationId = result.notification_id;
  });

  it('should fetch created notification from database', async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('id', createdNotificationId)
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.title).toBe('Integration Test');
    expect(data.read_at).toBeNull();
  });

  it('should mark notification as read', async () => {
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', createdNotificationId);

    expect(error).toBeNull();

    const { data } = await supabase
      .from('notifications')
      .select('read_at')
      .eq('id', createdNotificationId)
      .single();

    expect(data.read_at).not.toBeNull();
  });
});
```

### Test: Database Trigger

```typescript
// __tests__/integration/databaseTrigger.test.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

describe('Database Trigger Integration', () => {
  it('should create notification when request status changes to approved', async () => {
    // This test requires a valid worker_request to exist
    const testRequestId = 'existing-request-uuid';
    const testUserId = 'request-owner-uuid';

    // Update request status
    await supabase
      .from('worker_requests')
      .update({ status: 'approved' })
      .eq('id', testRequestId);

    // Wait for trigger to execute
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check if notification was created
    const { data: notifications } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', testUserId)
      .eq('entity_id', testRequestId)
      .eq('notification_type', 'request_approved');

    expect(notifications).toBeDefined();
    expect(notifications!.length).toBeGreaterThan(0);
  });
});
```

---

## Manual Testing Checklist

### iOS Testing

#### Permission Flow
- [ ] Fresh install prompts for notification permission
- [ ] Permission granted: FCM token registered in database
- [ ] Permission denied: App functions without push
- [ ] Permission denied → Settings → Enable: Token registered on next app open
- [ ] Permission status correctly reflected in Settings

#### Push Notification Delivery
- [ ] App in foreground: Toast notification appears
- [ ] App in background: System notification appears
- [ ] App closed/killed: System notification appears
- [ ] Notification sound plays
- [ ] Badge count updates on app icon

#### Notification Interaction
- [ ] Tap notification in foreground toast → navigates correctly
- [ ] Tap notification from background → opens app and navigates
- [ ] Tap notification from killed state → opens app and navigates
- [ ] Notification marked as read after tap
- [ ] Bell icon badge count decreases after reading

#### Notification Center UI
- [ ] Bell icon shows correct unread count
- [ ] Notification center opens as modal
- [ ] Notifications list scrolls smoothly
- [ ] Pull-to-refresh works
- [ ] "Mark all read" clears all unread indicators
- [ ] Dismiss button removes notification from list
- [ ] Empty state shows when no notifications
- [ ] Tapping notification closes modal and navigates

#### Settings
- [ ] Master push toggle works
- [ ] Individual type toggles work
- [ ] Disabling push disables all type toggles
- [ ] Settings persist after app restart
- [ ] Manager batch toggle shows time picker when enabled

#### Safe Area / UI
- [ ] Notification center respects safe area (notch)
- [ ] Notification items display correctly
- [ ] Time stamps are localized
- [ ] Icons display for each notification type

### Android Testing

#### Permission Flow
- [ ] Android 13+: Permission dialog shown
- [ ] Android 12-: No permission dialog needed
- [ ] Permission granted: FCM token registered
- [ ] Permission denied: Settings prompt shown
- [ ] Token registered correctly in database

#### Push Notification Delivery
- [ ] App in foreground: Toast notification appears
- [ ] App in background: System notification appears
- [ ] App closed/killed: System notification appears
- [ ] Notification sound plays
- [ ] Notification icon appears correctly (custom icon)
- [ ] Notification color is gold

#### Notification Interaction
- [ ] Tap notification in foreground → navigates correctly
- [ ] Tap notification from tray → opens app and navigates
- [ ] Tap notification from killed state → cold start + navigate
- [ ] Back button behavior correct after navigation
- [ ] Notification marked as read after tap

#### Notification Center UI
- [ ] All iOS UI tests apply
- [ ] Back button closes notification center
- [ ] Navigation works after closing center

#### Settings
- [ ] All iOS settings tests apply
- [ ] Back button from settings works correctly

### Cross-Platform Testing

#### Real-time Updates
- [ ] New notification appears in list without refresh
- [ ] Unread count updates in real-time
- [ ] Multiple devices receive same notification

#### Multi-App Routing
- [ ] HR notifications only appear in HR app
- [ ] No cross-contamination with Warehouse app
- [ ] Same user, different apps, correct routing

#### Deep Linking
- [ ] `/activities` path opens MyActivities
- [ ] `/settings` path opens Settings
- [ ] `/messages` path opens Communications
- [ ] Invalid paths handled gracefully

#### Error Handling
- [ ] Network error during fetch shows error state
- [ ] Retry after error works
- [ ] Offline: cached notifications shown
- [ ] Mark as read queued when offline

#### Performance
- [ ] Notification list with 50+ items scrolls smoothly
- [ ] No memory leaks from real-time subscription
- [ ] Token refresh doesn't cause issues

---

## Security Testing

### Authentication
- [ ] Notifications API requires authentication
- [ ] Users can only see their own notifications
- [ ] RLS policies prevent cross-user access
- [ ] Service role can create notifications for any user

### Token Handling
- [ ] FCM token not exposed in logs
- [ ] Invalid tokens cleaned up automatically
- [ ] Token rotation handled gracefully

### Data Privacy
- [ ] Notification content doesn't contain sensitive PII
- [ ] Notification previews safe for lock screen display

---

## Performance Testing

### Load Testing
- [ ] 100 notifications load in < 2 seconds
- [ ] Pagination works correctly at 50 limit
- [ ] Real-time subscription handles rapid updates

### Memory Testing
- [ ] No memory leaks after opening/closing notification center
- [ ] Background listeners cleaned up on logout
- [ ] Large notification list doesn't cause OOM

---

## Test Data Setup

### Create Test Notifications

```sql
-- Insert test notifications for manual testing
INSERT INTO notifications (user_id, app_id, title, body, notification_type, created_at)
VALUES
  ('your-test-user-id', 'monolite-hr', 'Request Approved', 'Your leave request has been approved', 'request_approved', NOW()),
  ('your-test-user-id', 'monolite-hr', 'Request Rejected', 'Your material request was not approved', 'request_rejected', NOW() - INTERVAL '1 hour'),
  ('your-test-user-id', 'monolite-hr', 'Document Expiring', 'Your ID card expires in 30 days', 'document_expiring', NOW() - INTERVAL '2 hours'),
  ('your-test-user-id', 'monolite-hr', 'Announcement', 'Company meeting tomorrow at 10 AM', 'announcement', NOW() - INTERVAL '1 day');
```

### Cleanup Test Data

```sql
-- Remove test notifications
DELETE FROM notifications WHERE title LIKE 'Test%';
DELETE FROM notifications WHERE user_id = 'your-test-user-id';
```
