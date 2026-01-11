import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextComponent } from '@/components/ui/text';
import { colors, spacing, borderRadius } from '@/theme';

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const isItalian = i18n.language === 'it';

  const renderContent = () => {
    if (isItalian) {
      return (
        <View style={styles.content}>
          <Section title="1. Introduzione">
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite HR ("noi", "nostro" o "ci") gestisce l'applicazione Monolite HR (il "Servizio").
              Questa pagina vi informa delle nostre politiche riguardanti la raccolta, l'uso e la divulgazione
              dei dati personali quando utilizzate il nostro Servizio e le scelte che avete associate a tali dati.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Utilizziamo i vostri dati per fornire e migliorare il Servizio. Utilizzando il Servizio,
              accettate la raccolta e l'uso delle informazioni in conformità con questa politica.
            </TextComponent>
          </Section>

          <Section title="2. Definizioni">
            <BulletPoint text="Servizio: si riferisce all'applicazione Monolite HR gestita da Monolite AI (monoliteai.com)" />
            <BulletPoint text="Dati Personali: dati relativi a un individuo vivente che può essere identificato da tali dati" />
            <BulletPoint text="Dati di Utilizzo: dati raccolti automaticamente generati dall'uso del Servizio" />
            <BulletPoint text="Cookie: piccoli file memorizzati sul vostro dispositivo" />
          </Section>

          <Section title="3. Raccolta e Uso delle Informazioni">
            <TextComponent variant="body" style={styles.paragraph}>
              Durante l'utilizzo del nostro Servizio, potremmo chiedervi di fornirci alcune informazioni
              personalmente identificabili che possono essere utilizzate per contattarvi o identificarvi.
            </TextComponent>
            <TextComponent variant="body" style={styles.subheading}>
              Dati Personali
            </TextComponent>
            <BulletPoint text="Indirizzo email" />
            <BulletPoint text="Nome e cognome" />
            <BulletPoint text="Numero di telefono" />
            <BulletPoint text="Città di residenza" />
            <BulletPoint text="Informazioni sull'occupazione" />
            <BulletPoint text="Dettagli del contratto" />
            <BulletPoint text="Registrazioni delle ore di lavoro" />
          </Section>

          <Section title="4. Uso dei Dati">
            <BulletPoint text="Fornire e mantenere il nostro Servizio" />
            <BulletPoint text="Notificarvi le modifiche al nostro Servizio" />
            <BulletPoint text="Fornire assistenza ai clienti" />
            <BulletPoint text="Raccogliere analisi per migliorare il nostro Servizio" />
            <BulletPoint text="Gestire le registrazioni delle ore di lavoro" />
          </Section>

          <Section title="5. Base Giuridica per il Trattamento dei Dati Personali ai sensi del GDPR">
            <TextComponent variant="body" style={styles.paragraph}>
              Se siete residenti nello Spazio Economico Europeo (SEE), la base giuridica di Monolite HR per
              raccogliere e utilizzare le informazioni personali dipende dai Dati Personali che raccogliamo.
            </TextComponent>
            <BulletPoint text="Dobbiamo eseguire un contratto con voi (contratto di lavoro)" />
            <BulletPoint text="Ci avete dato il permesso di farlo" />
            <BulletPoint text="Il trattamento è nel nostro interesse legittimo" />
            <BulletPoint text="Per conformarci alla legge" />
          </Section>

          <Section title="16. Contattaci">
            <TextComponent variant="body" style={styles.paragraph}>
              Se avete domande su questa Informativa sulla Privacy, contattateci:
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
              Monolite HR ("us", "we", or "our") operates the Monolite HR application (the "Service").
              This page informs you of our policies regarding the collection, use, and disclosure of personal
              data when you use our Service.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              We use your data to provide and improve the Service. By using the Service, you agree to the
              collection and use of information in accordance with this policy.
            </TextComponent>
          </Section>

          <Section title="2. Definitions">
            <BulletPoint text="Service: refers to the Monolite HR application operated by Monolite AI (monoliteai.com)" />
            <BulletPoint text="Personal Data: data about a living individual who can be identified from those data" />
            <BulletPoint text="Usage Data: data collected automatically generated by the use of the Service" />
            <BulletPoint text="Cookies: small files stored on your device" />
          </Section>

          <Section title="3. Information Collection and Use">
            <TextComponent variant="body" style={styles.paragraph}>
              While using our Service, we may ask you to provide us with certain personally identifiable
              information that can be used to contact or identify you.
            </TextComponent>
            <TextComponent variant="body" style={styles.subheading}>
              Personal Data
            </TextComponent>
            <BulletPoint text="Email address" />
            <BulletPoint text="First name and last name" />
            <BulletPoint text="Phone number" />
            <BulletPoint text="City of residence" />
            <BulletPoint text="Employment information" />
            <BulletPoint text="Contract details" />
            <BulletPoint text="Work hour logs" />
          </Section>

          <Section title="4. Use of Data">
            <BulletPoint text="To provide and maintain our Service" />
            <BulletPoint text="To notify you about changes to our Service" />
            <BulletPoint text="To provide customer support" />
            <BulletPoint text="To gather analysis to improve our Service" />
            <BulletPoint text="To manage employee work hour records" />
          </Section>

          <Section title="5. Legal Basis for Processing Personal Data Under GDPR">
            <TextComponent variant="body" style={styles.paragraph}>
              If you are from the European Economic Area (EEA), Monolite HR legal basis for collecting and
              using the personal information depends on the Personal Data we collect.
            </TextComponent>
            <BulletPoint text="We need to perform a contract with you (employment contract)" />
            <BulletPoint text="You have given us permission to do so" />
            <BulletPoint text="The processing is in our legitimate interests" />
            <BulletPoint text="To comply with the law" />
          </Section>

          <Section title="16. Contact Us">
            <TextComponent variant="body" style={styles.paragraph}>
              If you have any questions about this Privacy Policy, please contact us:
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
                {isItalian ? 'Informativa sulla Privacy' : 'Privacy Policy'}
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
  subheading: {
    color: colors.foreground,
    fontWeight: '600',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
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
