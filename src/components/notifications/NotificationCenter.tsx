import React from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/theme';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationItem } from './NotificationItem';
import type { Database } from '@/integrations/supabase/types';

type Notification = Database['public']['Tables']['notifications']['Row'];

interface NotificationCenterProps {
  visible: boolean;
  onClose: () => void;
}

export function NotificationCenter({ visible, onClose }: NotificationCenterProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    notifications,
    unreadCount,
    isLoading,
    refetch,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    isMarkingAllAsRead,
  } = useNotifications();

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    if (!notification.read_at) {
      markAsRead(notification.id);
    }

    // Navigate to deep link if available
    if (notification.deep_link_path) {
      const parts = notification.deep_link_path.split('/').filter(Boolean);
      onClose();

      if (parts[0] === 'activities') {
        (navigation as any).navigate('Main', {
          screen: 'Home',
          params: { screen: 'ActivitiesTab' },
        });
      } else if (parts[0] === 'messages' || parts[0] === 'communications') {
        (navigation as any).navigate('Main', {
          screen: 'Home',
          params: { screen: 'MessagesTab' },
        });
      } else if (parts[0] === 'settings') {
        (navigation as any).navigate('Main', {
          screen: 'Home',
          params: { screen: 'ProfileTab' },
        });
      }
    } else if (notification.entity_type) {
      onClose();
      switch (notification.entity_type) {
        case 'worker_request':
          (navigation as any).navigate('Main', {
            screen: 'Home',
            params: { screen: 'ActivitiesTab' },
          });
          break;
        case 'communication':
          (navigation as any).navigate('Main', {
            screen: 'Home',
            params: { screen: 'MessagesTab' },
          });
          break;
      }
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="bell-outline" size={64} color={colors.mutedForeground} />
      <Text style={styles.emptyTitle}>{t('notifications.empty.title')}</Text>
      <Text style={styles.emptySubtitle}>{t('notifications.empty.subtitle')}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Notification }) => (
    <NotificationItem
      notification={item}
      onPress={() => handleNotificationPress(item)}
      onMarkAsRead={() => markAsRead(item.id)}
      onDelete={() => deleteNotification(item.id)}
    />
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={colors.foreground} />
          </TouchableOpacity>

          <Text style={styles.title}>{t('notifications.title')}</Text>

          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={markAllAsRead}
              disabled={isMarkingAllAsRead}
              style={styles.markAllButton}
            >
              {isMarkingAllAsRead ? (
                <ActivityIndicator size="small" color={colors.gold} />
              ) : (
                <Text style={styles.markAllText}>
                  {t('notifications.markAllRead')}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.gold} />
          </View>
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={
              notifications.length === 0 ? styles.emptyList : undefined
            }
            ListEmptyComponent={renderEmptyState}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={refetch}
                tintColor={colors.gold}
              />
            }
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    flex: 1,
    textAlign: 'center',
  },
  markAllButton: {
    padding: 4,
    minWidth: 80,
    alignItems: 'flex-end',
  },
  markAllText: {
    fontSize: 14,
    color: colors.gold,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 20,
  },
});
