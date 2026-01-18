# Technical Milestone: Push Notifications

> **Status**: IN PROGRESS
> **Domain**: system
> **Sprint/Milestone**: Push Notifications v1
> **Platform**: Both (iOS & Android)
> **Created**: 2026-01-16
> **Last Updated**: 2026-01-16

## Overview

Implement a comprehensive push notification system using Firebase Cloud Messaging (FCM) with multi-app support, in-app notification center, granular user preferences, and deep linking.

**Structure**: This milestone follows the modular structure:
- `README.md` (this file) - Master plan with architecture
- `STATUS.md` - Implementation progress tracker
- `01-database-schema.md` - Database tables, RLS, indexes
- `02-backend-functions.md` - Edge Functions, triggers, scheduled jobs
- `03-frontend-hooks.md` - React Native hooks
- `04-frontend-components.md` - UI components
- `05-frontend-screens.md` - Settings integration
- `06-testing.md` - Testing strategy

### Feature Reference
- **Business Requirements**: [plans/features/system/push-notifications.md](../../../features/system/push-notifications.md)

### Technical Goals
- FCM integration for cross-platform push notifications
- Multi-app routing (shared Firebase project with Warehouse app)
- Real-time in-app notification center
- Granular user notification preferences
- Deep linking from notifications to specific items
- Scheduled batch notifications for managers

### Implementation Status

See [STATUS.md](STATUS.md) for detailed progress tracking.

## Architecture Overview

### High-Level Design

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           TRIGGER LAYER                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  Database Triggers          │  Scheduled Jobs           │  Manual       │
│  - worker_requests UPDATE   │  - Daily batch (pg_cron)  │  - API call   │
│  - announcements INSERT     │  - Doc expiry check       │               │
└──────────────┬──────────────┴──────────────┬────────────┴───────────────┘
               │                              │
               ▼                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        EDGE FUNCTION LAYER                               │
├─────────────────────────────────────────────────────────────────────────┤
│                     send-push-notification                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ Check user  │→ │ Check quiet │→ │ Create      │→ │ Send FCM    │    │
│  │ preferences │  │ hours       │  │ notification│  │ to devices  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
└──────────────────────────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATABASE LAYER                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌───────────────────┐  ┌────────────────────────┐   │
│  │ user_devices │  │ notifications     │  │ notification_preferences│   │
│  │ - fcm_token  │  │ - history         │  │ - per-type toggles     │   │
│  │ - app_id     │  │ - read status     │  │ - batch settings       │   │
│  └──────────────┘  └───────────────────┘  └────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       REACT NATIVE LAYER                                 │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────┐  ┌────────────────────┐  │
│  │usePushNotifications│  │ useNotifications  │  │ NotificationCenter │  │
│  │- Permission request│  │- Fetch/subscribe  │  │- Bell icon + badge │  │
│  │- Token registration│  │- Mark as read     │  │- Notification list │  │
│  │- Deep link handling│  │- Unread count     │  │- Settings toggles  │  │
│  └───────────────────┘  └───────────────────┘  └────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Components Affected

- **Frontend**:
  - `src/hooks/usePushNotifications.ts` (new)
  - `src/hooks/useNotifications.ts` (new)
  - `src/components/notifications/NotificationCenter.tsx` (new)
  - `src/components/settings/NotificationSettings.tsx` (new)
  - `src/components/ui/app-bar.tsx` (modify)
  - `src/pages/Settings.tsx` (modify)
  - `src/navigation/AppNavigator.tsx` (modify)

- **Backend**:
  - `supabase/functions/send-push-notification/` (new)
  - Database triggers on `worker_requests`
  - Scheduled functions via pg_cron

- **Database**:
  - `user_devices` (modify)
  - `notifications` (new)
  - `notification_preferences` (new)
  - `notification_batch_queue` (new)

### Technology Stack

- **Frontend**: React Native 0.74, TypeScript, React Navigation
- **Push Service**: Firebase Cloud Messaging (FCM)
- **Native SDK**: @react-native-firebase/messaging
- **State Management**: TanStack React Query, Supabase Realtime
- **UI**: Custom components with StyleSheet, theme tokens
- **Backend**: Supabase Edge Functions (Deno)
- **Database**: PostgreSQL via Supabase
- **Scheduling**: pg_cron extension
- **HTTP from DB**: pg_net extension

## Module Index

| Module | File | Description |
|--------|------|-------------|
| 1 | [01-database-schema.md](01-database-schema.md) | Tables, indexes, RLS policies, migrations |
| 2 | [02-backend-functions.md](02-backend-functions.md) | Edge Functions, triggers, scheduled jobs |
| 3 | [03-frontend-hooks.md](03-frontend-hooks.md) | usePushNotifications, useNotifications hooks |
| 4 | [04-frontend-components.md](04-frontend-components.md) | NotificationCenter, NotificationItem components |
| 5 | [05-frontend-screens.md](05-frontend-screens.md) | Settings integration, AppBar updates |
| 6 | [06-testing.md](06-testing.md) | Testing strategy for iOS & Android |

## Implementation Order

```
Phase 1: Database (01-database-schema.md)
    │
    ▼
Phase 2: Backend (02-backend-functions.md)
    │
    ▼
Phase 3: Frontend Hooks (03-frontend-hooks.md)
    │
    ▼
Phase 4: Frontend Components (04-frontend-components.md)
    │
    ▼
Phase 5: Screen Integration (05-frontend-screens.md)
    │
    ▼
Phase 6: Testing (06-testing.md)
```

## Security Considerations

### Authentication & Authorization
- All notification endpoints require authenticated user
- RLS policies ensure users only see their own notifications
- FCM server key stored in Supabase Vault, never exposed to client
- Edge Function uses service role for database operations

### Input Validation
- Notification type must be from allowed enum
- Entity IDs validated as UUIDs
- Deep link paths sanitized

### Data Privacy
- Notification previews should not contain sensitive PII
- User can delete their notification history
- FCM tokens rotated and cleaned up

## Performance Considerations

### Expected Load
- ~1000 daily active users
- ~50 notifications per hour during peak
- ~5000 devices registered

### Optimizations
- Index on `notifications(user_id, created_at DESC)`
- Index on `user_devices(user_id, app_id)`
- Batch database operations where possible
- Pagination for notification history (limit 50)

### Monitoring
- Track notification delivery success rate
- Monitor Edge Function execution time
- Alert on high error rates

## Rollback Plan

### Database Rollback
```sql
-- Drop new tables (data will be lost)
DROP TABLE IF EXISTS notification_batch_queue;
DROP TABLE IF EXISTS notification_preferences;
DROP TABLE IF EXISTS notifications;

-- Remove new columns from user_devices
ALTER TABLE user_devices
  DROP COLUMN IF EXISTS app_id,
  DROP COLUMN IF EXISTS fcm_token,
  DROP COLUMN IF EXISTS platform,
  DROP COLUMN IF EXISTS push_enabled;
```

### Code Rollback
- Revert Firebase packages from package.json
- Remove notification-related hooks and components
- Revert AppBar and Settings changes

## Dependencies

### NPM Packages
```json
{
  "@react-native-firebase/app": "^18.x",
  "@react-native-firebase/messaging": "^18.x",
  "react-native-device-info": "^10.x"
}
```

### Firebase Setup
1. Firebase project (existing, shared with Warehouse)
2. `google-services.json` for Android
3. `GoogleService-Info.plist` for iOS
4. Service account JSON in Supabase Vault

### Supabase Extensions
- `pg_cron` - scheduled functions
- `pg_net` - HTTP calls from triggers

## References

- Feature Doc: [plans/features/system/push-notifications.md](../../../features/system/push-notifications.md)
- Firebase Messaging Docs: https://firebase.google.com/docs/cloud-messaging
- React Native Firebase: https://rnfirebase.io/messaging/usage
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
