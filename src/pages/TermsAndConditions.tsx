import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextComponent } from '@/components/ui/text';
import { colors, spacing, borderRadius } from '@/theme';

export default function TermsAndConditions() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const isItalian = i18n.language === 'it';

  const renderContent = () => {
    if (isItalian) {
      return (
        <View style={styles.content}>
          <Section title="1. Introduzione">
            <TextComponent variant="body" style={styles.paragraph}>
              Benvenuti in Monolite HR. Questi Termini e Condizioni regolano il vostro utilizzo
              dell'applicazione Monolite HR gestita da Monolite AI.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Il vostro accesso e utilizzo del Servizio è condizionato alla vostra accettazione e conformità
              a questi Termini. Accedendo o utilizzando il Servizio accettate di essere vincolati da questi Termini.
            </TextComponent>
          </Section>

          <Section title="2. Account">
            <TextComponent variant="body" style={styles.paragraph}>
              Quando create un account con noi, dovete fornirci informazioni accurate, complete e aggiornate
              in ogni momento. Siete responsabili della salvaguardia della password che utilizzate per accedere al Servizio.
            </TextComponent>
          </Section>

          <Section title="3. Proprietà Intellettuale">
            <TextComponent variant="body" style={styles.paragraph}>
              Il Servizio e il suo contenuto originale sono e rimarranno proprietà esclusiva di Monolite AI e dei
              suoi licenziatari. Il Servizio è protetto da copyright, marchi e altre leggi.
            </TextComponent>
          </Section>

          <Section title="14. Relazione con il Datore di Lavoro">
            <TextComponent variant="body" style={styles.paragraph}>
              Questo Servizio è destinato all'uso nell'ambito di un rapporto di lavoro. Comprendete e accettate che:
            </TextComponent>
            <BulletPoint text="Il vostro datore di lavoro ha accesso ai dati che inserite nel sistema" />
            <BulletPoint text="Le registrazioni delle ore di lavoro sono condivise con il vostro datore di lavoro" />
            <BulletPoint text="Il vostro datore di lavoro può monitorare la vostra attività sul Servizio" />
            <BulletPoint text="I dati inseriti possono essere utilizzati per scopi di libro paga e conformità" />
          </Section>

          <Section title="18. Contattaci">
            <TextComponent variant="body" style={styles.paragraph}>
              Se avete domande su questi Termini, contattateci:
            </TextComponent>
            <BulletPoint text="Via email: matteo@monoliteai.com" />
            <BulletPoint text="Tramite il nostro sito web: https://monoliteai.com" />
          </Section>
        </View>
      );
    } else {
      return (
        <View style={styles.content}>
          <Section title="1. Introduction">
            <TextComponent variant="body" style={styles.paragraph}>
              Welcome to Monolite HR. These Terms and Conditions govern your use of the Monolite HR application
              operated by Monolite AI.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with
              these Terms. By accessing or using the Service you agree to be bound by these Terms.
            </TextComponent>
          </Section>

          <Section title="2. Accounts">
            <TextComponent variant="body" style={styles.paragraph}>
              When you create an account with us, you must provide us information that is accurate, complete,
              and current at all times. You are responsible for safeguarding the password that you use to access the Service.
            </TextComponent>
          </Section>

          <Section title="3. Intellectual Property">
            <TextComponent variant="body" style={styles.paragraph}>
              The Service and its original content are and will remain the exclusive property of Monolite AI and its
              licensors. The Service is protected by copyright, trademark, and other laws.
            </TextComponent>
          </Section>

          <Section title="14. Employment Relationship">
            <TextComponent variant="body" style={styles.paragraph}>
              This Service is intended for use within an employment relationship. You understand and agree that:
            </TextComponent>
            <BulletPoint text="Your employer has access to data you enter into the system" />
            <BulletPoint text="Work hour logs are shared with your employer" />
            <BulletPoint text="Your employer may monitor your activity on the Service" />
            <BulletPoint text="Data entered may be used for payroll and compliance purposes" />
          </Section>

          <Section title="18. Contact Us">
            <TextComponent variant="body" style={styles.paragraph}>
              If you have any questions about these Terms, please contact us:
            </TextComponent>
            <BulletPoint text="By email: matteo@monoliteai.com" />
            <BulletPoint text="Through our website: https://monoliteai.com" />
          </Section>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="ghost"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={20} color={colors.gold} />
          <TextComponent variant="body" style={styles.backButtonText}>
            {t('common.back')}
          </TextComponent>
        </Button>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <CardHeader style={styles.cardHeader}>
            <CardTitle>
              <TextComponent variant="h1" style={styles.title}>
                {isItalian ? 'Termini e Condizioni' : 'Terms and Conditions'}
              </TextComponent>
            </CardTitle>
            <TextComponent variant="caption" style={styles.date}>
              {isItalian ? 'Ultimo aggiornamento: 10 Novembre 2025' : 'Last updated: November 10, 2025'}
            </TextComponent>
          </CardHeader>
          <CardContent style={styles.cardContent}>
            {renderContent()}
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={sectionStyles.section}>
    <TextComponent variant="h3" style={sectionStyles.title}>
      {title}
    </TextComponent>
    {children}
  </View>
);

const BulletPoint: React.FC<{ text: string }> = ({ text }) => (
  <View style={sectionStyles.bulletPoint}>
    <TextComponent variant="body" style={sectionStyles.bulletText}>
      • {text}
    </TextComponent>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  backButtonText: {
    color: colors.gold,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  card: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cardHeader: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: spacing.lg,
  },
  title: {
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  date: {
    color: colors.mutedForeground,
  },
  cardContent: {
    padding: spacing.lg,
  },
  content: {
    gap: spacing.xl,
  },
  paragraph: {
    color: colors.foreground,
    marginBottom: spacing.md,
    lineHeight: 24,
  },
});

const sectionStyles = StyleSheet.create({
  section: {
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  bulletPoint: {
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
  },
  bulletText: {
    color: colors.foreground,
    lineHeight: 24,
  },
});
