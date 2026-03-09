import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Pressable, Linking, FlatList, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { CitySearchInput } from '@/components/ui/city-search-input';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TextComponent } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { AppBar } from '@/components/ui/app-bar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loading } from '@/components/ui/loading';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { supabase } from '@/integrations/supabase/client';
import Toast from 'react-native-toast-message';
import { colors, spacing, borderRadius } from '@/theme';
import { formatLocalizedDate } from '@/utils/dateLocale';

interface ContractData {
  contractType: string;
  startDate: string;
  position: string;
  department: string;
  salary: string;
  workingHours: string;
}

interface PayrollDocument {
  id: string;
  file_name: string;
  file_url: string;
  uploaded_at: string;
  file_size: number;
}

interface CertificateDocument {
  id: string;
  document_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  status: string;
  expiry_date: string | null;
  type_code: string;
  type_name: string;
  attached_at: string;
  notes: string | null;
}

export default function Settings() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [payrollDocuments, setPayrollDocuments] = useState<PayrollDocument[]>([]);
  const [contractDoc, setContractDoc] = useState<PayrollDocument | null>(null);
  const [certificates, setCertificates] = useState<CertificateDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('contract');

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editName, setEditName] = useState('');
  const [editSurname, setEditSurname] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCityId, setEditCityId] = useState('');
  const [editCityLabel, setEditCityLabel] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [newAvatarUri, setNewAvatarUri] = useState<string | null>(null);
  const [userCityLabel, setUserCityLabel] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserName(user.user_metadata?.name || '');
        setUserSurname(user.user_metadata?.surname || '');
        setUserPhone(user.user_metadata?.phone || '');
        setUserEmail(user.email || '');
        setUserId(user.id);

        // Load profile data (avatar, city)
        await loadProfileData(user.id, user.user_metadata?.city_id);

        await loadContractData(user.id);
        await loadPayrollDocuments(user.id);
        await loadCertificates(user.id);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProfileData = async (uid: string, cityId?: string) => {
    try {
      const { data: profile } = await (supabase as any)
        .from('profiles')
        .select('avatar_url, city_id')
        .eq('id', uid)
        .maybeSingle();

      if (profile?.avatar_url) {
        setAvatarUrl(profile.avatar_url);
      }

      const cid = cityId || profile?.city_id;
      if (cid) {
        setEditCityId(cid);
        // Load city label
        const { data: cityData } = await (supabase as any)
          .from('cities')
          .select('full_location_name, city_name')
          .eq('id', cid)
          .maybeSingle();

        if (cityData) {
          const label = cityData.full_location_name || cityData.city_name || '';
          setUserCityLabel(label);
          setEditCityLabel(label);
        }
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const searchCities = async (query: string) => {
    try {
      const { data, error } = await supabase
        .rpc('search_cities', { search_query: query, result_limit: 20 });

      if (error) return [];

      return (data || []).map((city: any) => ({
        label: city.full_location_name || city.city_name,
        value: city.id.toString(),
      }));
    } catch {
      return [];
    }
  };

  const handleStartEdit = () => {
    setEditName(userName);
    setEditSurname(userSurname);
    setEditPhone(userPhone);
    setEditEmail(userEmail);
    setNewAvatarUri(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewAvatarUri(null);
  };

  const handlePickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', maxWidth: 400, maxHeight: 400, quality: 0.8 },
      (response) => {
        if (response.didCancel || response.errorCode) return;
        const asset = response.assets?.[0];
        if (asset?.uri) {
          setNewAvatarUri(asset.uri);
        }
      }
    );
  };

  const handleSaveProfile = async () => {
    if (!userId) return;
    if (!editName.trim() || !editSurname.trim()) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('common.required'),
      });
      return;
    }

    setSaving(true);
    try {
      let uploadedAvatarUrl = avatarUrl;

      // Upload new avatar if selected
      if (newAvatarUri) {
        const fileName = `${userId}/${Date.now()}.jpg`;
        const response = await fetch(newAvatarUri);
        const blob = await response.blob();

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, blob, { contentType: 'image/jpeg', upsert: true });

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          uploadedAvatarUrl = urlData.publicUrl;
        }
      }

      // Update auth metadata
      const emailChanged = editEmail !== userEmail;
      const updatePayload: any = {
        data: {
          name: editName.trim(),
          surname: editSurname.trim(),
          phone: editPhone,
          city_id: editCityId,
        },
      };
      if (emailChanged) {
        updatePayload.email = editEmail.trim();
      }

      const { error: authError } = await supabase.auth.updateUser(updatePayload);
      if (authError) throw authError;

      // Upsert profiles table
      const { error: profileError } = await (supabase as any)
        .from('profiles')
        .upsert({
          id: userId,
          name: editName.trim(),
          surname: editSurname.trim(),
          phone: editPhone,
          email: userEmail, // Don't update email here — it updates after email change confirmation
          city_id: editCityId || null,
          avatar_url: uploadedAvatarUrl,
          has_completed_onboarding: true,
          updated_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error('Error updating profile:', profileError);
      }

      // Update local state
      setUserName(editName.trim());
      setUserSurname(editSurname.trim());
      setUserPhone(editPhone);
      if (uploadedAvatarUrl) setAvatarUrl(uploadedAvatarUrl);
      if (editCityLabel) setUserCityLabel(editCityLabel);

      if (emailChanged) {
        setUserEmail(editEmail.trim());
        Toast.show({
          type: 'success',
          text1: t('common.success'),
          text2: t('profile.emailChangeNote'),
        });
      } else {
        Toast.show({
          type: 'success',
          text1: t('common.success'),
          text2: t('profile.profileUpdated'),
        });
      }

      setIsEditing(false);
      setNewAvatarUri(null);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error.message || 'Failed to update profile',
      });
    } finally {
      setSaving(false);
    }
  };

  const loadContractData = async (userId: string) => {
    try {
      const { data: worker, error } = await (supabase as any)
        .from('v_company_workers')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Error loading contract data:', error);
        return;
      }

      if (!worker) return;

      setCompanyId(worker.company_id);

      const currentLang = i18n.language;
      const workAreasStr = worker.work_areas?.join(', ') || t('profile.notAvailable');
      const hourlyRateStr = worker.hourly_rate
        ? `€${worker.hourly_rate}/${currentLang === 'it' ? 'ora' : 'hour'}`
        : t('profile.notAvailable');

      const contractTypeName = currentLang === 'it'
        ? (worker.contract_type_it || worker.contract_type_en || t('profile.notAvailable'))
        : (worker.contract_type_en || t('profile.notAvailable'));

      setContractData({
        contractType: contractTypeName,
        startDate: worker.contract_start_date
          ? formatLocalizedDate(new Date(worker.contract_start_date), 'PP')
          : t('profile.notAvailable'),
        position: worker.role_display_name || t('profile.worker'),
        department: workAreasStr,
        salary: hourlyRateStr,
        workingHours: currentLang === 'it' ? '40 ore/settimana' : '40 hours/week',
      });

      const { data: contractDocs } = await (supabase as any)
        .from('v_worker_document_history')
        .select('*')
        .eq('worker_id', userId)
        .eq('type_code', 'CONTRACT_WORKER')
        .eq('status', 'active')
        .order('attached_at', { ascending: false })
        .limit(1);

      if (contractDocs && contractDocs.length > 0) {
        const doc = contractDocs[0];
        setContractDoc({
          id: doc.document_id,
          file_name: doc.file_name,
          file_url: doc.file_url,
          uploaded_at: doc.attached_at || doc.uploaded_at,
          file_size: doc.file_size,
        });
      }
    } catch (error) {
      console.error('Error in loadContractData:', error);
    }
  };

  const loadPayrollDocuments = async (userId: string) => {
    try {
      const { data: payslips, error } = await (supabase as any)
        .from('v_worker_document_history')
        .select('*')
        .eq('worker_id', userId)
        .eq('type_code', 'PAYSLIP')
        .eq('status', 'active')
        .order('attached_at', { ascending: false })
        .limit(12);

      if (error) {
        console.error('Error loading payroll documents:', error);
        return;
      }

      if (payslips && payslips.length > 0) {
        setPayrollDocuments(payslips.map((doc: any) => ({
          id: doc.document_id,
          file_name: doc.file_name,
          file_url: doc.file_url,
          uploaded_at: doc.attached_at || doc.uploaded_at,
          file_size: doc.file_size,
        })));
      }
    } catch (error) {
      console.error('Error in loadPayrollDocuments:', error);
    }
  };

  const loadCertificates = async (userId: string) => {
    try {
      const { data: certs, error } = await (supabase as any)
        .from('v_worker_document_history')
        .select('*')
        .eq('worker_id', userId)
        .in('type_code', ['CERT_DPI_TRAINING', 'CERT_HEALTH'])
        .in('status', ['active', 'expiring'])
        .order('attached_at', { ascending: false });

      if (error) {
        console.error('Error loading certificates:', error);
        return;
      }

      if (certs && certs.length > 0) {
        setCertificates(certs.map((doc: any) => ({
          id: doc.worker_document_id,
          document_id: doc.document_id,
          file_name: doc.file_name,
          file_url: doc.file_url,
          file_size: doc.file_size,
          status: doc.status,
          expiry_date: doc.expiry_date,
          type_code: doc.type_code,
          type_name: doc.type_name,
          attached_at: doc.attached_at || doc.uploaded_at,
          notes: doc.worker_doc_notes,
        })));
      }
    } catch (error) {
      console.error('Error in loadCertificates:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate('Auth');
  };

  const handlePasswordReset = async () => {
    if (!userEmail) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('profile.emailNotFound'),
      });
      return;
    }

    setResetPasswordLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
        redirectTo: 'monolite-hr://auth/callback',
      });

      if (error) throw error;

      const resetUrl = 'monolite-hr://auth/callback';

      const { error: functionError } = await supabase.functions.invoke(
        'send-password-reset-email',
        {
          body: {
            email: userEmail,
            resetUrl,
          },
        }
      );

      if (functionError) {
        console.error('Error sending email via Brevo:', functionError);
      }

      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('profile.resetEmailSent') || 'Password reset email sent. Please check your inbox.',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error.message || t('profile.failedPasswordReset'),
      });
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('profile.userNotFound'),
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('delete-user-account', {
        body: { userId },
      });

      if (error) throw error;

      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('profile.accountDeleted') || 'Your account has been deleted successfully',
      });

      await supabase.auth.signOut();
      navigation.navigate('Auth');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error.message || t('profile.failedDeleteAccount'),
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    try {
      return formatLocalizedDate(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return dateString;
    }
  };

  const getStatusIcon = (status: string, expiryDate: string | null) => {
    if (status === 'expired' || (expiryDate && new Date(expiryDate) < new Date())) {
      return <Icon name="close-circle" size={20} color={colors.destructive} />;
    }
    if (expiryDate) {
      const daysUntilExpiry = Math.floor(
        (new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysUntilExpiry <= 30) {
        return <Icon name="alert" size={20} color="#FFA500" />;
      }
    }
    return <Icon name="check-circle" size={20} color="#34C759" />;
  };

  const getStatusBadge = (status: string, expiryDate: string | null) => {
    if (status === 'expired' || (expiryDate && new Date(expiryDate) < new Date())) {
      return <Badge variant="destructive">{t('profile.statusExpired')}</Badge>;
    }
    if (expiryDate) {
      const daysUntilExpiry = Math.floor(
        (new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysUntilExpiry <= 30) {
        return <Badge variant="secondary">{t('profile.statusExpiringSoon')}</Badge>;
      }
    }
    return <Badge variant="default">{t('profile.statusValid')}</Badge>;
  };

  const openDocument = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error('Error opening document:', err);
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Could not open document',
      });
    });
  };

  const tabs = [
    { value: 'contract', label: t('profile.contract') },
    { value: 'payroll', label: t('profile.payroll') },
    { value: 'certificates', label: t('profile.certificates') },
    { value: 'notifications', label: t('notifications.title') },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppBar />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >

        {/* User Info Card */}
        <Card style={styles.card}>
          <CardContent style={styles.userCardContent}>
            <View style={styles.userHeader}>
              {/* Avatar */}
              <Pressable onPress={isEditing ? handlePickImage : undefined} style={styles.avatarContainer}>
                {(newAvatarUri || avatarUrl) ? (
                  <Image
                    source={{ uri: newAvatarUri || avatarUrl || '' }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <View style={styles.avatarFallback}>
                    <TextComponent variant="h3" style={styles.avatarText}>
                      {(userName.charAt(0) + userSurname.charAt(0)).toUpperCase() || '?'}
                    </TextComponent>
                  </View>
                )}
                {isEditing && (
                  <View style={styles.cameraOverlay}>
                    <Icon name="camera" size={16} color="#FFFFFF" />
                  </View>
                )}
              </Pressable>
              <View style={{ flex: 1 }}>
                <TextComponent variant="h3" style={styles.userName}>
                  {userName} {userSurname}
                </TextComponent>
                <TextComponent variant="caption" style={styles.userSubtitle}>
                  {t('profile.accountProfile')}
                </TextComponent>
              </View>
              {!isEditing && (
                <Pressable onPress={handleStartEdit} style={styles.editButton}>
                  <Icon name="pencil" size={20} color={colors.gold} />
                </Pressable>
              )}
            </View>

            {isEditing ? (
              <View style={styles.editForm}>
                <Input
                  label={t('profile.name')}
                  value={editName}
                  onChangeText={setEditName}
                  autoCapitalize="words"
                />
                <Input
                  label={t('profile.surname')}
                  value={editSurname}
                  onChangeText={setEditSurname}
                  autoCapitalize="words"
                />
                <PhoneInput
                  label={t('profile.phone')}
                  value={editPhone}
                  onChangeText={setEditPhone}
                  placeholder={t('auth.phonePlaceholder')}
                />
                <Input
                  label={t('profile.email')}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <CitySearchInput
                  label={t('profile.city')}
                  placeholder={t('auth.searchCity')}
                  value={editCityId}
                  onValueChange={(value, label) => {
                    setEditCityId(value);
                    setEditCityLabel(label || '');
                  }}
                  onSearch={searchCities}
                  selectedCityLabel={editCityLabel}
                />

                <View style={styles.editActions}>
                  <Button
                    variant="outline"
                    onPress={handleCancelEdit}
                    style={styles.editActionButton}
                  >
                    <TextComponent variant="body" style={styles.cancelButtonText}>
                      {t('profile.cancelEdit')}
                    </TextComponent>
                  </Button>
                  <Button
                    onPress={handleSaveProfile}
                    style={styles.editActionButton}
                    loading={saving}
                  >
                    <TextComponent variant="body" style={styles.saveButtonText}>
                      {t('profile.saveProfile')}
                    </TextComponent>
                  </Button>
                </View>
              </View>
            ) : (
              <View style={styles.userInfo}>
                <View style={styles.infoRow}>
                  <TextComponent variant="caption" style={styles.infoLabel}>
                    {t('profile.name')}
                  </TextComponent>
                  <View style={styles.infoValueContainer}>
                    <TextComponent variant="body" style={styles.infoValue}>
                      {userName}
                    </TextComponent>
                  </View>
                </View>
                <View style={styles.infoRow}>
                  <TextComponent variant="caption" style={styles.infoLabel}>
                    {t('profile.surname')}
                  </TextComponent>
                  <View style={styles.infoValueContainer}>
                    <TextComponent variant="body" style={styles.infoValue}>
                      {userSurname}
                    </TextComponent>
                  </View>
                </View>
                <View style={styles.infoRow}>
                  <TextComponent variant="caption" style={styles.infoLabel}>
                    {t('profile.phone')}
                  </TextComponent>
                  <View style={styles.infoValueContainer}>
                    <TextComponent variant="body" style={styles.infoValue}>
                      {userPhone || t('profile.notAvailable')}
                    </TextComponent>
                  </View>
                </View>
                <View style={styles.infoRow}>
                  <TextComponent variant="caption" style={styles.infoLabel}>
                    {t('profile.email')}
                  </TextComponent>
                  <View style={styles.infoValueContainer}>
                    <TextComponent variant="body" style={styles.infoValue}>
                      {userEmail}
                    </TextComponent>
                  </View>
                </View>
                {userCityLabel ? (
                  <View style={styles.infoRow}>
                    <TextComponent variant="caption" style={styles.infoLabel}>
                      {t('profile.city')}
                    </TextComponent>
                    <View style={styles.infoValueContainer}>
                      <TextComponent variant="body" style={styles.infoValue}>
                        {userCityLabel}
                      </TextComponent>
                    </View>
                  </View>
                ) : null}
              </View>
            )}
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} tabs={tabs}>
          {activeTab === 'contract' && (
            <View style={styles.tabContent}>
              {loading ? (
                <View style={styles.centerContainer}>
                  <Loading message={t('common.loading')} />
                </View>
              ) : contractData ? (
                <>
                  <Card style={styles.card}>
                    <CardContent style={styles.cardContent}>
                      <TextComponent variant="h3" style={styles.sectionTitle}>
                        {t('profile.contractDetails')}
                      </TextComponent>
                      <View style={styles.contractInfo}>
                        <View style={styles.infoRow}>
                          <TextComponent variant="caption" style={styles.infoLabel}>
                            {t('profile.contractType')}
                          </TextComponent>
                          <View style={styles.infoValueContainer}>
                            <TextComponent variant="body" style={styles.infoValue}>
                              {contractData.contractType}
                            </TextComponent>
                          </View>
                        </View>
                        <View style={styles.infoRow}>
                          <TextComponent variant="caption" style={styles.infoLabel}>
                            {t('profile.startDate')}
                          </TextComponent>
                          <View style={styles.infoValueContainer}>
                            <TextComponent variant="body" style={styles.infoValue}>
                              {contractData.startDate}
                            </TextComponent>
                          </View>
                        </View>
                        <View style={styles.infoRow}>
                          <TextComponent variant="caption" style={styles.infoLabel}>
                            {t('profile.position')}
                          </TextComponent>
                          <View style={styles.infoValueContainer}>
                            <TextComponent variant="body" style={styles.infoValue}>
                              {contractData.position}
                            </TextComponent>
                          </View>
                        </View>
                        <View style={styles.infoRow}>
                          <TextComponent variant="caption" style={styles.infoLabel}>
                            {t('profile.department')}
                          </TextComponent>
                          <View style={styles.infoValueContainer}>
                            <TextComponent variant="body" style={styles.infoValue}>
                              {contractData.department}
                            </TextComponent>
                          </View>
                        </View>
                        <View style={styles.infoRow}>
                          <TextComponent variant="caption" style={styles.infoLabel}>
                            {t('profile.salary')}
                          </TextComponent>
                          <View style={styles.infoValueContainer}>
                            <TextComponent variant="body" style={{ ...styles.infoValue, ...styles.goldText }}>
                              {contractData.salary}
                            </TextComponent>
                          </View>
                        </View>
                        <View style={styles.infoRow}>
                          <TextComponent variant="caption" style={styles.infoLabel}>
                            {t('profile.workingHours')}
                          </TextComponent>
                          <View style={styles.infoValueContainer}>
                            <TextComponent variant="body" style={styles.infoValue}>
                              {contractData.workingHours}
                            </TextComponent>
                          </View>
                        </View>
                      </View>
                    </CardContent>
                  </Card>

                  {contractDoc && (
                    <Card style={styles.card}>
                      <CardContent style={styles.cardContent}>
                        <TextComponent variant="h3" style={styles.sectionTitle}>
                          {t('profile.contractDocument')}
                        </TextComponent>
                        <View style={styles.documentRow}>
                          <View style={styles.documentInfo}>
                            <Icon name="file-document" size={20} color={colors.primary} />
                            <View style={styles.documentText}>
                              <TextComponent variant="body" style={styles.documentName}>
                                {contractDoc.file_name}
                              </TextComponent>
                              <TextComponent variant="caption" style={styles.documentMeta}>
                                {formatFileSize(contractDoc.file_size)} • {t('profile.uploaded')}: {formatDate(contractDoc.uploaded_at)}
                              </TextComponent>
                            </View>
                          </View>
                          <Button
                            variant="outline"
                            size="sm"
                            onPress={() => openDocument(contractDoc.file_url)}
                            style={{ flexShrink: 0 }}
                          >
                            <Icon name="eye" size={16} color={colors.gold} />
                            <TextComponent variant="caption" style={styles.viewButtonText}>
                              {t('profile.view')}
                            </TextComponent>
                          </Button>
                        </View>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <View style={styles.centerContainer}>
                  <TextComponent variant="body" style={styles.emptyText}>
                    {t('profile.noContractData')}
                  </TextComponent>
                </View>
              )}
            </View>
          )}

          {activeTab === 'payroll' && (
            <View style={styles.tabContent}>
              {loading ? (
                <View style={styles.centerContainer}>
                  <Loading message={t('common.loading')} />
                </View>
              ) : payrollDocuments.length > 0 ? (
                <FlatList
                  data={payrollDocuments}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <Card style={styles.card}>
                      <CardContent style={styles.cardContent}>
                        <View style={styles.documentRow}>
                          <View style={styles.documentInfo}>
                            <Icon name="file-document" size={20} color={colors.primary} />
                            <View style={styles.documentText}>
                              <TextComponent variant="body" style={styles.documentName}>
                                {item.file_name}
                              </TextComponent>
                              <TextComponent variant="caption" style={styles.documentMeta}>
                                {formatFileSize(item.file_size)} • {t('profile.uploaded')}: {formatDate(item.uploaded_at)}
                              </TextComponent>
                            </View>
                          </View>
                          <Button
                            variant="outline"
                            size="sm"
                            onPress={() => openDocument(item.file_url)}
                            style={{ flexShrink: 0 }}
                          >
                            <Icon name="eye" size={16} color={colors.gold} />
                            <TextComponent variant="caption" style={styles.viewButtonText}>
                              {t('profile.view')}
                            </TextComponent>
                          </Button>
                        </View>
                      </CardContent>
                    </Card>
                  )}
                />
              ) : (
                <View style={styles.centerContainer}>
                  <TextComponent variant="body" style={styles.emptyText}>
                    {t('profile.noPayslips')}
                  </TextComponent>
                </View>
              )}
            </View>
          )}

          {activeTab === 'certificates' && (
            <View style={styles.tabContent}>
              {loading ? (
                <View style={styles.centerContainer}>
                  <Loading message={t('common.loading')} />
                </View>
              ) : certificates.length > 0 ? (
                <FlatList
                  data={certificates}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <Card style={styles.card}>
                      <CardContent style={styles.cardContent}>
                        <View style={styles.certificateHeader}>
                          <View style={styles.certificateInfo}>
                            {getStatusIcon(item.status, item.expiry_date)}
                            <View style={styles.certificateText}>
                              <TextComponent variant="h4" style={styles.certificateName}>
                                {item.type_name}
                              </TextComponent>
                              <TextComponent variant="caption" style={styles.certificateFileName}>
                                {item.file_name}
                              </TextComponent>
                            </View>
                          </View>
                          <View style={{ flexShrink: 0 }}>
                            {getStatusBadge(item.status, item.expiry_date)}
                          </View>
                        </View>
                        <View style={styles.certificateMeta}>
                          <TextComponent variant="caption" style={styles.metaText}>
                            {formatFileSize(item.file_size)} • {t('profile.uploaded')}: {formatDate(item.attached_at)}
                          </TextComponent>
                          {item.expiry_date && (
                            <View style={styles.expiryRow}>
                              <Icon name="calendar" size={12} color={colors.mutedForeground} />
                              <TextComponent variant="caption" style={styles.metaText}>
                                {t('profile.validUntil')}: {formatDate(item.expiry_date)}
                              </TextComponent>
                            </View>
                          )}
                          {item.notes && (
                            <TextComponent variant="caption" style={styles.notesText}>
                              {item.notes}
                            </TextComponent>
                          )}
                        </View>
                        <Button
                          variant="outline"
                          size="sm"
                          style={styles.viewButton}
                          onPress={() => openDocument(item.file_url)}
                        >
                          <Icon name="eye" size={16} color={colors.gold} />
                          <TextComponent variant="caption" style={styles.viewButtonText}>
                            {t('profile.view')}
                          </TextComponent>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                />
              ) : (
                <View style={styles.centerContainer}>
                  <TextComponent variant="body" style={styles.emptyText}>
                    {t('profile.noCertificates')}
                  </TextComponent>
                </View>
              )}
            </View>
          )}

          {activeTab === 'notifications' && (
            <View style={styles.tabContent}>
              <NotificationSettings />
            </View>
          )}
        </Tabs>

        {/* Account Security Section */}
        <Card style={styles.accountSecurityCard}>
          <CardContent style={styles.cardContent}>
            <TextComponent variant="h3" style={styles.sectionTitle}>
              {t('profile.accountSecurity') || 'Account Security'}
            </TextComponent>
            <View style={styles.securityActions}>
              <Pressable
                style={styles.securityButton}
                onPress={handlePasswordReset}
                disabled={resetPasswordLoading}
              >
                {resetPasswordLoading ? (
                  <Loading size="small" />
                ) : (
                  <Icon name="key" size={20} color={colors.gold} />
                )}
                <TextComponent variant="body" style={styles.securityButtonText}>
                  {t('profile.resetPassword') || 'Reset Password'}
                </TextComponent>
              </Pressable>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Pressable
                    style={[styles.securityButton, styles.deleteButton]}
                  >
                    <Icon name="delete" size={20} color={colors.destructive} />
                    <TextComponent variant="body" style={{ ...styles.securityButtonText, ...styles.deleteButtonText }}>
                      {t('profile.deleteAccount') || 'Delete Account'}
                    </TextComponent>
                  </Pressable>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t('profile.deleteAccountConfirmTitle') || 'Are you absolutely sure?'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('profile.deleteAccountConfirmDesc') || 'This action cannot be undone. This will permanently delete your account and remove all your data from our servers.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {t('common.cancel') || 'Cancel'}
                    </AlertDialogCancel>
                    <AlertDialogAction onPress={handleDeleteAccount}>
                      {t('common.delete') || 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </View>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card style={styles.card}>
          <CardContent style={styles.cardContent}>
            <Pressable
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Icon name="logout" size={20} color={colors.destructive} />
              <TextComponent variant="body" style={styles.logoutButtonText}>
                {t('profile.logout')}
              </TextComponent>
            </Pressable>
          </CardContent>
        </Card>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: 100, // Space for blurred app bar
    paddingBottom: spacing['3xl'], // Space for tab bar
  },
  header: {
    marginBottom: spacing.lg,
  },
  headerTitle: {
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.mutedForeground,
  },
  card: {
    marginBottom: spacing.lg,
  },
  accountSecurityCard: {
    marginBottom: spacing.lg,
    marginTop: spacing.xl,
  },
  userCardContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.primaryForeground,
    fontWeight: '700',
    fontSize: 20,
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.card,
  },
  editButton: {
    padding: spacing.sm,
  },
  editForm: {
    gap: spacing.md,
  },
  editActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  editActionButton: {
    flex: 1,
  },
  cancelButtonText: {
    color: colors.foreground,
    fontWeight: '600',
  },
  saveButtonText: {
    color: colors.primaryForeground,
    fontWeight: '600',
  },
  userName: {
    color: colors.foreground,
  },
  userSubtitle: {
    color: colors.mutedForeground,
  },
  userInfo: {
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
    minHeight: 24,
  },
  infoLabel: {
    color: colors.mutedForeground,
    flexShrink: 0,
    minWidth: 100,
    maxWidth: 120,
  },
  infoValueContainer: {
    flex: 1,
    alignItems: 'flex-end',
    minWidth: 0,
    flexShrink: 1,
    paddingLeft: spacing.sm,
  },
  infoValue: {
    color: colors.foreground,
    fontWeight: '500',
    textAlign: 'right',
  },
  goldText: {
    color: colors.gold,
  },
  tabContent: {
    marginTop: spacing.md,
  },
  centerContainer: {
    paddingVertical: spacing['2xl'],
    alignItems: 'center',
  },
  emptyText: {
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  cardContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  sectionTitle: {
    color: colors.foreground,
    marginBottom: spacing.lg,
  },
  contractInfo: {
    gap: spacing.md,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: colors.muted + '30',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border + '80',
    gap: spacing.md,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },
  documentText: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },
  documentName: {
    color: colors.foreground,
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  documentMeta: {
    color: colors.mutedForeground,
    marginTop: spacing.sm,
  },
  viewButtonText: {
    color: colors.gold,
    marginLeft: spacing.xs,
  },
  certificateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  certificateInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },
  certificateText: {
    flex: 1,
    minWidth: 0,
  },
  certificateName: {
    color: colors.foreground,
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
  },
  certificateFileName: {
    color: colors.mutedForeground,
    flexWrap: 'wrap',
  },
  certificateMeta: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  metaText: {
    color: colors.mutedForeground,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  notesText: {
    color: colors.mutedForeground,
    fontStyle: 'italic',
  },
  viewButton: {
    width: '100%',
  },
  securityActions: {
    gap: spacing.lg,
  },
  securityButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: colors.gold,
    borderRadius: borderRadius.lg,
    backgroundColor: 'transparent',
    gap: spacing.sm,
    minHeight: 48,
  },
  securityButtonText: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    borderColor: colors.destructive,
  },
  deleteButtonText: {
    color: colors.destructive,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: colors.destructive,
    borderRadius: borderRadius.lg,
    backgroundColor: 'transparent',
    gap: spacing.sm,
    minHeight: 48,
  },
  logoutButtonText: {
    color: colors.destructive,
    fontSize: 16,
    fontWeight: '600',
  },
});
