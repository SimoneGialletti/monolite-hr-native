# Feature: Push Notifications

> **Status**: ACTIVE
> **Domain**: system
> **Priority**: P1 (High)
> **Created**: 2026-01-16
> **Last Updated**: 2026-01-16

## Business Goal

Enable real-time communication with users through push notifications, keeping them informed about important events like request approvals, announcements, and document expirations without needing to open the app.

### Success Metrics
- 80%+ of users enable push notifications
- Average notification delivery time < 5 seconds
- Notification tap-through rate > 30%
- Reduction in user check-ins for status updates by 50%

## Problem Statement

### Current State
- Users must manually open the app to check for updates
- No way to alert users about time-sensitive approvals or rejections
- Managers miss pending requests that need attention
- Document expiry dates are easily forgotten
- No communication channel for company announcements

### Desired State
- Users receive instant notifications when their requests are processed
- Managers get daily summaries of pending items requiring attention
- Document expiry warnings are sent proactively
- Company announcements reach all relevant users immediately
- Users can customize which notifications they receive

## User Stories

### Primary Users
- **Workers**: Submit requests, receive status updates, get document reminders
- **Managers**: Review requests, receive submission alerts, get daily summaries
- **Admins**: Send announcements, monitor notification delivery

### Stories
1. As a **worker**, I want to receive a push notification when my leave request is approved or rejected so that I can plan accordingly without checking the app repeatedly
2. As a **manager**, I want to receive a daily summary of pending requests so that I don't miss items that need my attention
3. As a **worker**, I want to be notified when my documents are about to expire so that I can renew them in time
4. As a **user**, I want to tap a notification and go directly to the relevant item so that I can take action immediately
5. As a **user**, I want to control which notifications I receive so that I'm not overwhelmed with alerts
6. As a **manager**, I want to choose what time I receive my daily summary so that it fits my work schedule

## Business Rules & Constraints

### Rules
1. **Notification Routing**: Notifications must only be sent to the app they're relevant to (HR app vs Warehouse app share same Firebase project)
2. **User Preferences**: Respect user's notification preferences before sending any push
3. **Quiet Hours**: Do not send notifications during user-configured quiet hours
4. **Batch Notifications**: Manager summaries are aggregated and sent at user-configurable time
5. **Deep Linking**: Every notification must link to a specific actionable item

### Constraints
- **Technical**: Must use Firebase Cloud Messaging (FCM) - shared project with Warehouse app
- **Regulatory**: Respect device notification permissions (iOS requires explicit consent)
- **Business**: Notifications should not contain sensitive personal data in the preview
- **Performance**: Notification delivery should complete within 5 seconds

## Functional Requirements

### Must Have (MVP)
- [ ] Request status change notifications (approved/rejected)
- [ ] In-app notification center with unread count badge
- [ ] Mark notifications as read (individual and bulk)
- [ ] Deep linking from notification to specific item
- [ ] Master push notification toggle
- [ ] Per-notification-type toggles in settings
- [ ] Multi-app support (app_id routing)

### Should Have (Phase 2)
- [ ] Document expiry warning notifications (30 days before)
- [ ] Manager daily batch summary notifications
- [ ] Configurable batch notification time
- [ ] Announcement/broadcast notifications
- [ ] Quiet hours configuration

### Nice to Have (Future)
- [ ] Rich notifications with images
- [ ] Notification grouping/stacking
- [ ] Email notification fallback
- [ ] Notification analytics dashboard
- [ ] Push notification A/B testing

## User Flows

### Primary Flow: Receive Request Status Notification
1. Manager approves/rejects worker's request in the system
2. System detects status change via database trigger
3. Edge Function checks worker's notification preferences
4. If enabled, FCM push is sent to worker's registered devices (filtered by app_id)
5. Worker receives push notification on device
6. Worker taps notification
7. App opens directly to MyActivities screen showing the request

### Alternative Flow: Manager Daily Summary
1. System runs scheduled job at configured time (per manager)
2. Aggregates pending requests count for manager
3. Sends single summary notification
4. Manager taps notification
5. App opens to pending requests view

### Alternative Flow: Document Expiry Warning
1. Daily scheduled job checks documents expiring within 30 days
2. For each user with expiring documents, check notification preferences
3. Send notification with count and nearest expiry date
4. User taps notification
5. App opens to Settings/Documents section

## Edge Cases & Scenarios

### Scenario 1: User Has Multiple Devices
- **Condition**: User has the app installed on phone and tablet
- **Expected Behavior**: Notification sent to all registered devices for that user
- **Rationale**: User should not miss notifications regardless of which device they're using

### Scenario 2: User Disables Notifications Mid-Flow
- **Condition**: User disables push after notification created but before delivery
- **Expected Behavior**: Notification still saved to in-app center, but push not sent
- **Rationale**: Respect user's current preferences, but preserve notification history

### Scenario 3: User Uses Both HR and Warehouse Apps
- **Condition**: Same user has both apps installed on same device
- **Expected Behavior**: HR notifications only go to HR app, warehouse to warehouse app
- **Rationale**: `app_id` column in user_devices ensures proper routing

### Scenario 4: Token Refresh
- **Condition**: FCM token changes (app reinstall, token rotation)
- **Expected Behavior**: New token automatically registered, old token replaced
- **Rationale**: Firebase messaging SDK handles token refresh, app must update database

### Error Cases
- **FCM Delivery Failure**: Log error, mark notification as failed, keep in in-app center
- **Invalid Token**: Remove stale token from user_devices table
- **Rate Limiting**: Queue notifications and retry with exponential backoff

## Data Requirements

### Input Data
- **user_id**: uuid, required - recipient of notification
- **app_id**: text, required - 'monolite-hr' or 'warehouse'
- **title**: text, required, max 100 chars - notification title
- **body**: text, required, max 500 chars - notification message
- **notification_type**: enum, required - type for filtering/preferences
- **entity_type**: text, optional - type of related entity
- **entity_id**: uuid, optional - ID of related entity for deep linking
- **deep_link_path**: text, optional - path for navigation

### Output Data
- **notification_id**: uuid - created notification record
- **push_sent**: boolean - whether FCM was called
- **devices_notified**: number - count of devices that received push

### Data Sources
- **worker_requests** table - triggers for status changes
- **user_devices** table - FCM tokens and app registration
- **notification_preferences** table - user settings
- **v_worker_statistics** view - expiring documents count

## UI/UX Considerations (Mobile)

### Screens/Components Affected
- **AppBar**: Add notification badge with unread count on bell icon
- **NotificationCenter**: New modal/sheet for notification list
- **Settings**: Add Notifications tab with preference toggles

### User Experience
- Loading states: Skeleton loader for notification list
- Error messages: Toast for failed mark-as-read operations
- Success feedback: Subtle animation when marking as read
- Accessibility: VoiceOver/TalkBack support for notification items
- Haptic feedback: Light haptic on notification tap

### Mobile-Specific UX
- **Gestures**: Swipe to dismiss notification from list
- **Navigation**: Modal presentation for NotificationCenter
- **Keyboard**: N/A - no text input in notification UI
- **Offline**: Show cached notifications, queue mark-as-read for sync
- **Orientation**: Portrait only

### Design Notes
- Use existing theme tokens from `src/theme/`
- Notification items should show icon based on type
- Unread items have subtle background highlight
- Time displayed as relative ("5 minutes ago")
- Gold accent color for unread badge

## Acceptance Criteria

### Functional Criteria
- [ ] When a request status changes, the requester receives a push notification within 5 seconds
- [ ] When user taps notification, app navigates to the correct screen
- [ ] When user disables a notification type, they no longer receive those notifications
- [ ] Given a user with multiple devices, all devices receive the notification
- [ ] Given a user uses both apps, notifications route to the correct app only

### Non-Functional Criteria
- [ ] Performance: Notification delivery < 5 seconds from trigger
- [ ] Security: FCM server key stored in Supabase Vault, never exposed to client
- [ ] Accessibility: Notification center fully accessible with screen readers
- [ ] Platform Support: iOS 13+ / Android 10+
- [ ] Device Support: Phone only (tablet layout not required)

## Dependencies

### Technical Dependencies
- Depends on: Supabase Edge Functions, Firebase project setup
- Blocks: Future email notification feature (shares preferences model)

### External Dependencies
- Firebase Cloud Messaging (FCM)
- Apple Push Notification service (APNs) - via FCM
- Supabase Vault for secrets

## Assumptions

- Firebase project already exists (shared with Warehouse app)
- Users will grant notification permissions when prompted
- Internet connectivity available for push delivery
- Supabase pg_cron extension available for scheduled functions
- Supabase pg_net extension available for HTTP calls from triggers

## Out of Scope

- Email notifications (future enhancement)
- SMS notifications
- In-app real-time toast for foreground notifications (using existing Toast component)
- Notification sounds customization
- Rich media notifications (images, action buttons)
- Web push notifications
- Notification scheduling (send later)

## Questions & Open Issues

- [x] Which push service? **Answered: FCM**
- [x] Multi-app support needed? **Answered: Yes, with app_id routing**
- [x] Manager notification preference? **Answered: Daily batch, user-configurable time**
- [ ] Do we need notification categories for iOS? (grouping in notification center)
- [ ] Should we track notification analytics (delivery rate, tap rate)?

## Related Documents

- Technical Spec: [plans/milestones/system/push-notifications/README.md](../../milestones/system/push-notifications/README.md)
- Design: N/A (using existing design system)
- Related Features: Communications page (future announcement broadcast)

---

**Next Step**: Use this document as input to Claude to generate the technical milestone document in `plans/milestones/system/push-notifications/`
