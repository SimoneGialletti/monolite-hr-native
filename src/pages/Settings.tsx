import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Linking, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
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
import { supabase } from '@/integrations/supabase/client';
import Toast from 'react-native-toast-message';
import { colors, spacing, borderRadius } from '@/theme';
import { format } from 'date-fns';

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

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserName(user.user_metadata?.name || '');
        setUserSurname(user.user_metadata?.surname || '');
        setUserPhone(user.user_metadata?.phone || '');
        setUserEmail(user.email || '');
        setUserId(user.id);

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

  const loadContractData = async (userId: string) => {
    try {
      const { data: worker, error } = await (supabase as any)
        .from('v_company_workers')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single();

      if (error || !worker) {
        console.error('Error loading contract data:', error);
        return;
      }

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
          ? format(new Date(worker.contract_start_date), currentLang === 'it' ? 'dd/MM/yyyy' : 'MM/dd/yyyy')
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
        redirectTo: 'monolite-hr://auth',
      });

      if (error) throw error;

      const resetUrl = 'monolite-hr://auth?type=recovery';

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
      return format(new Date(dateString), 'dd/MM/yyyy');
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
      return <Badge variant="destructive">Expired</Badge>;
    }
    if (expiryDate) {
      const daysUntilExpiry = Math.floor(
        (new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysUntilExpiry <= 30) {
        return <Badge variant="secondary">Expiring Soon</Badge>;
      }
    }
    return <Badge variant="default">Valid</Badge>;
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
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppBar />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* User Info Card */}
        <Card style={styles.card}>
          <CardContent style={styles.userCardContent}>
            <View style={styles.userHeader}>
              <View style={styles.userIconContainer}>
                <Icon name="account" size={32} color={colors.gold} />
              </View>
              <View>
                <TextComponent variant="h3" style={styles.userName}>
                  {userName}
                </TextComponent>
                <TextComponent variant="caption" style={styles.userSubtitle}>
                  {t('profile.accountProfile')}
                </TextComponent>
              </View>
            </View>

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
                    {userPhone}
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
            </View>
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
                    No certificates available
                  </TextComponent>
                </View>
              )}
            </View>
          )}
        </Tabs>

        {/* Account Security Section */}
        <Card style={styles.card}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 100, // Space for blurred app bar
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
  userIconContainer: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
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
