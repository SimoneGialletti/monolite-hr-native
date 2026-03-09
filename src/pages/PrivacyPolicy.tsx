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
              Monolite S.R.L. ("noi", "nostro" o "ci") gestisce l'applicazione Monolite HR (il "Servizio").
              Questa pagina vi informa delle nostre politiche riguardanti la raccolta, l'uso e la divulgazione
              dei dati personali quando utilizzate il nostro Servizio e le scelte che avete associate a tali dati.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Utilizziamo i vostri dati per fornire e migliorare il Servizio. Utilizzando il Servizio,
              accettate la raccolta e l'uso delle informazioni in conformità con questa politica.
              Il trattamento dei dati personali è effettuato nel rispetto del Regolamento (UE) 2016/679
              (Regolamento Generale sulla Protezione dei Dati, "GDPR") e del D.Lgs. 196/2003 (Codice Privacy),
              come modificato dal D.Lgs. 101/2018.
            </TextComponent>
          </Section>

          <Section title="2. Definizioni">
            <BulletPoint text="Servizio: si riferisce all'applicazione mobile Monolite HR gestita da Monolite S.R.L." />
            <BulletPoint text="Dati Personali: qualsiasi informazione relativa a una persona fisica identificata o identificabile (l'«interessato»), ai sensi dell'art. 4 del GDPR" />
            <BulletPoint text="Dati di Utilizzo: dati raccolti automaticamente generati dall'uso del Servizio (es. durata della sessione, pagine visitate, tipo di dispositivo)" />
            <BulletPoint text="Titolare del Trattamento: Monolite S.R.L., la persona giuridica che determina le finalità e i mezzi del trattamento dei dati personali" />
            <BulletPoint text="Responsabile del Trattamento: qualsiasi persona fisica o giuridica che tratta i dati personali per conto del Titolare del Trattamento" />
            <BulletPoint text="Interessato: qualsiasi persona fisica vivente i cui dati personali vengono trattati" />
            <BulletPoint text="Cookie: piccoli file memorizzati sul vostro dispositivo" />
          </Section>

          <Section title="3. Raccolta e Uso delle Informazioni">
            <TextComponent variant="body" style={styles.paragraph}>
              Durante l'utilizzo del nostro Servizio, potremmo chiedervi di fornirci alcune informazioni
              personalmente identificabili che possono essere utilizzate per contattarvi o identificarvi.
              Le informazioni personali identificabili possono includere, a titolo esemplificativo e non esaustivo:
            </TextComponent>
            <TextComponent variant="body" style={styles.subheading}>
              Dati Personali
            </TextComponent>
            <BulletPoint text="Indirizzo email" />
            <BulletPoint text="Nome e cognome" />
            <BulletPoint text="Numero di telefono" />
            <BulletPoint text="Città di residenza" />
            <BulletPoint text="Informazioni sull'occupazione (ruolo, reparto, sede)" />
            <BulletPoint text="Dettagli del contratto di lavoro" />
            <BulletPoint text="Registrazioni delle ore di lavoro" />
            <BulletPoint text="Richieste di ferie e permessi" />
            <BulletPoint text="Richieste di materiale" />
            <TextComponent variant="body" style={styles.subheading}>
              Dati di Utilizzo
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Potremmo raccogliere automaticamente informazioni su come il Servizio viene utilizzato,
              inclusi il tipo di dispositivo mobile, l'identificativo univoco del dispositivo, il sistema
              operativo, il tipo di browser, e altre statistiche diagnostiche.
            </TextComponent>
          </Section>

          <Section title="4. Uso dei Dati">
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite S.R.L. utilizza i dati raccolti per le seguenti finalità:
            </TextComponent>
            <BulletPoint text="Fornire e mantenere il nostro Servizio" />
            <BulletPoint text="Notificarvi le modifiche al nostro Servizio" />
            <BulletPoint text="Consentirvi di partecipare alle funzionalità interattive del nostro Servizio" />
            <BulletPoint text="Fornire assistenza ai clienti" />
            <BulletPoint text="Raccogliere analisi o informazioni utili per migliorare il nostro Servizio" />
            <BulletPoint text="Monitorare l'utilizzo del Servizio" />
            <BulletPoint text="Individuare, prevenire e risolvere problemi tecnici" />
            <BulletPoint text="Gestire le registrazioni delle ore di lavoro dei dipendenti" />
            <BulletPoint text="Gestire le richieste di ferie, permessi e materiale" />
            <BulletPoint text="Inviare notifiche push relative alle attività lavorative" />
          </Section>

          <Section title="5. Base Giuridica per il Trattamento (GDPR)">
            <TextComponent variant="body" style={styles.paragraph}>
              Ai sensi del Regolamento (UE) 2016/679 (GDPR), la base giuridica di Monolite S.R.L. per
              raccogliere e trattare le vostre informazioni personali dipende dai Dati Personali raccolti
              e dal contesto specifico in cui li raccogliamo. Possiamo trattare i vostri Dati Personali
              in quanto:
            </TextComponent>
            <BulletPoint text="Dobbiamo eseguire un contratto con voi (contratto di lavoro) — Art. 6(1)(b) GDPR" />
            <BulletPoint text="Ci avete dato il consenso esplicito per uno scopo specifico — Art. 6(1)(a) GDPR" />
            <BulletPoint text="Il trattamento è nel nostro interesse legittimo e non prevale sui vostri diritti — Art. 6(1)(f) GDPR" />
            <BulletPoint text="Dobbiamo conformarci a un obbligo legale — Art. 6(1)(c) GDPR" />
          </Section>

          <Section title="6. Conservazione dei Dati">
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite S.R.L. conserverà i vostri Dati Personali solo per il tempo necessario alle finalità
              indicate nella presente Informativa sulla Privacy. Conserveremo e utilizzeremo i vostri Dati
              Personali nella misura necessaria per adempiere ai nostri obblighi legali (ad esempio, per
              conformarci alla normativa fiscale e del lavoro), risolvere controversie e applicare i nostri
              accordi e politiche.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              I dati relativi al rapporto di lavoro saranno conservati per tutta la durata del rapporto
              stesso e, successivamente, per il periodo previsto dalla legge italiana per la conservazione
              dei documenti di lavoro (generalmente 10 anni dalla cessazione del rapporto). I Dati di Utilizzo
              saranno conservati per un periodo più breve, salvo che siano necessari per rafforzare la sicurezza,
              migliorare le funzionalità del Servizio, oppure siano obbligatori per legge.
            </TextComponent>
          </Section>

          <Section title="7. Trasferimento dei Dati">
            <TextComponent variant="body" style={styles.paragraph}>
              Le vostre informazioni, inclusi i Dati Personali, possono essere trasferite e conservate su
              server situati al di fuori del vostro stato, provincia, paese o altra giurisdizione governativa,
              dove le leggi sulla protezione dei dati possono differire da quelle della vostra giurisdizione.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Se vi trovate al di fuori dell'Italia e scegliete di fornirci informazioni, si prega di notare
              che trasferiamo i dati, inclusi i Dati Personali, in Italia e li trattiamo lì. Nel caso di
              trasferimenti verso paesi terzi al di fuori dello Spazio Economico Europeo (SEE), ci assicuriamo
              che siano in atto garanzie adeguate, come le Clausole Contrattuali Standard approvate dalla
              Commissione Europea (Art. 46 GDPR), o che il paese destinatario offra un livello adeguato di
              protezione (Art. 45 GDPR).
            </TextComponent>
          </Section>

          <Section title="8. Servizi di Terze Parti">
            <TextComponent variant="body" style={styles.paragraph}>
              Potremmo impiegare servizi di terze parti per facilitare il nostro Servizio, per fornire il
              Servizio per nostro conto, per eseguire servizi correlati al Servizio o per assisterci
              nell'analisi di come il nostro Servizio viene utilizzato. Queste terze parti hanno accesso ai
              vostri Dati Personali solo per svolgere queste attività per nostro conto e sono obbligate a non
              divulgarli o utilizzarli per qualsiasi altro scopo.
            </TextComponent>
            <TextComponent variant="body" style={styles.subheading}>
              Supabase
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Utilizziamo Supabase come piattaforma di database e autenticazione. Supabase conserva i vostri
              dati di account e le informazioni del profilo in modo sicuro. Per maggiori informazioni, consultate
              l'informativa sulla privacy di Supabase: https://supabase.com/privacy
            </TextComponent>
            <TextComponent variant="body" style={styles.subheading}>
              Notifiche Push
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Utilizziamo servizi di notifiche push per inviarvi aggiornamenti relativi alle vostre attività
              lavorative, come promemoria per la registrazione delle ore, approvazioni delle richieste e altre
              comunicazioni correlate al Servizio. Potete gestire le vostre preferenze di notifica nelle
              impostazioni del dispositivo in qualsiasi momento.
            </TextComponent>
          </Section>

          <Section title="9. I Vostri Diritti sui Dati">
            <TextComponent variant="body" style={styles.paragraph}>
              Ai sensi del GDPR, in quanto interessati al trattamento, avete i seguenti diritti:
            </TextComponent>
            <BulletPoint text="Diritto di accesso (Art. 15 GDPR): avete il diritto di richiedere una copia dei vostri dati personali in nostro possesso" />
            <BulletPoint text="Diritto di rettifica (Art. 16 GDPR): avete il diritto di richiedere la correzione di dati personali inesatti o incompleti" />
            <BulletPoint text="Diritto alla cancellazione (Art. 17 GDPR): avete il diritto di richiedere la cancellazione dei vostri dati personali, fatti salvi gli obblighi di legge" />
            <BulletPoint text="Diritto alla portabilità dei dati (Art. 20 GDPR): avete il diritto di ricevere i vostri dati personali in un formato strutturato, di uso comune e leggibile da dispositivo automatico" />
            <BulletPoint text="Diritto alla limitazione del trattamento (Art. 18 GDPR): avete il diritto di richiedere la limitazione del trattamento dei vostri dati personali in determinate circostanze" />
            <BulletPoint text="Diritto di opposizione (Art. 21 GDPR): avete il diritto di opporvi al trattamento dei vostri dati personali basato su interessi legittimi o finalità di marketing diretto" />
            <BulletPoint text="Diritto di revoca del consenso (Art. 7 GDPR): qualora il trattamento sia basato sul consenso, avete il diritto di revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prima della revoca" />
            <TextComponent variant="body" style={styles.paragraph}>
              Per esercitare uno qualsiasi di questi diritti, vi preghiamo di contattarci all'indirizzo
              info@monoliteai.com. Risponderemo alla vostra richiesta entro 30 giorni, come previsto dalla
              normativa vigente.
            </TextComponent>
          </Section>

          <Section title="10. Privacy dei Minori">
            <TextComponent variant="body" style={styles.paragraph}>
              Il nostro Servizio non è rivolto a persone di età inferiore ai 16 anni ("Minori"). Non
              raccogliamo consapevolmente informazioni personali identificabili da minori di 16 anni. Se
              siete un genitore o un tutore e siete consapevoli che il vostro minore ci ha fornito Dati
              Personali, vi preghiamo di contattarci. Se veniamo a conoscenza di aver raccolto Dati
              Personali da minori senza verifica del consenso genitoriale, provvederemo a rimuovere tali
              informazioni dai nostri server.
            </TextComponent>
          </Section>

          <Section title="11. Misure di Sicurezza">
            <TextComponent variant="body" style={styles.paragraph}>
              La sicurezza dei vostri dati è importante per noi. Adottiamo misure tecniche e organizzative
              adeguate per proteggere i vostri Dati Personali da accesso non autorizzato, alterazione,
              divulgazione o distruzione, in conformità con l'Art. 32 del GDPR. Tali misure includono:
            </TextComponent>
            <BulletPoint text="Crittografia dei dati in transito e a riposo" />
            <BulletPoint text="Autenticazione sicura tramite provider di identità affidabili" />
            <BulletPoint text="Controlli di accesso basati sui ruoli per limitare l'accesso ai dati" />
            <BulletPoint text="Monitoraggio regolare dei sistemi per individuare vulnerabilità" />
            <BulletPoint text="Backup regolari dei dati per prevenire la perdita accidentale" />
            <TextComponent variant="body" style={styles.paragraph}>
              Tuttavia, nessun metodo di trasmissione via Internet o metodo di archiviazione elettronica è
              sicuro al 100%. Pur impegnandoci a utilizzare mezzi commercialmente accettabili per proteggere
              i vostri Dati Personali, non possiamo garantirne la sicurezza assoluta.
            </TextComponent>
          </Section>

          <Section title="12. Cookie e Tracciamento">
            <TextComponent variant="body" style={styles.paragraph}>
              L'applicazione Monolite HR è un'applicazione mobile nativa e non utilizza cookie tradizionali
              del browser. Tuttavia, potremmo utilizzare tecnologie simili ai cookie, come token di sessione
              e archiviazione locale, per mantenere la vostra sessione di autenticazione e le vostre preferenze.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Non utilizziamo cookie o tecnologie di tracciamento a fini pubblicitari o di profilazione. Le
              eventuali tecnologie di archiviazione locale sono strettamente necessarie per il funzionamento
              del Servizio.
            </TextComponent>
          </Section>

          <Section title="13. Modifiche alla Presente Informativa">
            <TextComponent variant="body" style={styles.paragraph}>
              Potremmo aggiornare periodicamente la nostra Informativa sulla Privacy. Vi informeremo di
              eventuali modifiche pubblicando la nuova Informativa sulla Privacy in questa pagina e, se le
              modifiche sono significative, vi invieremo una notifica tramite il Servizio.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Vi consigliamo di rivedere periodicamente questa Informativa sulla Privacy per eventuali modifiche.
              Le modifiche a questa Informativa sulla Privacy sono efficaci quando pubblicate in questa pagina.
            </TextComponent>
          </Section>

          <Section title="14. Responsabile della Protezione dei Dati">
            <TextComponent variant="body" style={styles.paragraph}>
              Per qualsiasi questione relativa alla protezione dei vostri dati personali o per esercitare
              i vostri diritti, potete contattare il nostro Responsabile della Protezione dei Dati (DPO):
            </TextComponent>
            <BulletPoint text="Email: info@monoliteai.com" />
            <BulletPoint text="Azienda: Monolite S.R.L." />
          </Section>

          <Section title="15. Autorità di Controllo">
            <TextComponent variant="body" style={styles.paragraph}>
              Se ritenete che il trattamento dei vostri Dati Personali violi il GDPR, avete il diritto di
              proporre reclamo all'autorità di controllo competente. In Italia, l'autorità di controllo è
              il Garante per la Protezione dei Dati Personali:
            </TextComponent>
            <BulletPoint text="Sito web: https://www.garanteprivacy.it" />
            <BulletPoint text="Email: garante@gpdp.it" />
            <BulletPoint text="PEC: protocollo@pec.gpdp.it" />
          </Section>

          <Section title="16. Contattaci">
            <TextComponent variant="body" style={styles.paragraph}>
              Se avete domande su questa Informativa sulla Privacy, contattateci:
            </TextComponent>
            <BulletPoint text="Azienda: Monolite S.R.L." />
            <BulletPoint text="Via email: info@monoliteai.com" />
            <BulletPoint text="Tramite il nostro sito web: https://monoliteai.com" />
          </Section>
        </View>
      );
    } else {
      return (
        <View style={styles.content}>
          <Section title="1. Introduction">
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite S.R.L. ("us", "we", or "our") operates the Monolite HR application (the "Service").
              This page informs you of our policies regarding the collection, use, and disclosure of personal
              data when you use our Service and the choices you have associated with that data.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              We use your data to provide and improve the Service. By using the Service, you agree to the
              collection and use of information in accordance with this policy. The processing of personal
              data is carried out in compliance with Regulation (EU) 2016/679 (General Data Protection
              Regulation, "GDPR").
            </TextComponent>
          </Section>

          <Section title="2. Definitions">
            <BulletPoint text="Service: refers to the Monolite HR mobile application operated by Monolite S.R.L." />
            <BulletPoint text="Personal Data: any information relating to an identified or identifiable natural person ('data subject'), as defined by Art. 4 of the GDPR" />
            <BulletPoint text="Usage Data: data collected automatically generated by the use of the Service (e.g., session duration, pages visited, device type)" />
            <BulletPoint text="Data Controller: Monolite S.R.L., the legal entity that determines the purposes and means of the processing of personal data" />
            <BulletPoint text="Data Processor: any natural or legal person who processes personal data on behalf of the Data Controller" />
            <BulletPoint text="Data Subject: any living natural person whose personal data is being processed" />
            <BulletPoint text="Cookies: small files stored on your device" />
          </Section>

          <Section title="3. Information Collection and Use">
            <TextComponent variant="body" style={styles.paragraph}>
              While using our Service, we may ask you to provide us with certain personally identifiable
              information that can be used to contact or identify you. Personally identifiable information
              may include, but is not limited to:
            </TextComponent>
            <TextComponent variant="body" style={styles.subheading}>
              Personal Data
            </TextComponent>
            <BulletPoint text="Email address" />
            <BulletPoint text="First name and last name" />
            <BulletPoint text="Phone number" />
            <BulletPoint text="City of residence" />
            <BulletPoint text="Employment information (role, department, location)" />
            <BulletPoint text="Employment contract details" />
            <BulletPoint text="Work hour logs" />
            <BulletPoint text="Leave and time-off requests" />
            <BulletPoint text="Material requests" />
            <TextComponent variant="body" style={styles.subheading}>
              Usage Data
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              We may also collect information on how the Service is accessed and used, including your mobile
              device type, unique device identifier, operating system, browser type, and other diagnostic
              statistics.
            </TextComponent>
          </Section>

          <Section title="4. Use of Data">
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite S.R.L. uses the collected data for the following purposes:
            </TextComponent>
            <BulletPoint text="To provide and maintain our Service" />
            <BulletPoint text="To notify you about changes to our Service" />
            <BulletPoint text="To allow you to participate in interactive features of our Service" />
            <BulletPoint text="To provide customer support" />
            <BulletPoint text="To gather analysis or valuable information to improve our Service" />
            <BulletPoint text="To monitor the usage of the Service" />
            <BulletPoint text="To detect, prevent and address technical issues" />
            <BulletPoint text="To manage employee work hour records" />
            <BulletPoint text="To manage leave, time-off, and material requests" />
            <BulletPoint text="To send push notifications related to work activities" />
          </Section>

          <Section title="5. Legal Basis for Processing (GDPR)">
            <TextComponent variant="body" style={styles.paragraph}>
              In accordance with Regulation (EU) 2016/679 (GDPR), Monolite S.R.L.'s legal basis for
              collecting and using the personal information depends on the Personal Data we collect and
              the specific context in which we collect it. We may process your Personal Data because:
            </TextComponent>
            <BulletPoint text="We need to perform a contract with you (employment contract) — Art. 6(1)(b) GDPR" />
            <BulletPoint text="You have given us explicit consent for a specific purpose — Art. 6(1)(a) GDPR" />
            <BulletPoint text="The processing is in our legitimate interests and does not override your rights — Art. 6(1)(f) GDPR" />
            <BulletPoint text="We need to comply with a legal obligation — Art. 6(1)(c) GDPR" />
          </Section>

          <Section title="6. Data Retention">
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite S.R.L. will retain your Personal Data only for as long as is necessary for the
              purposes set out in this Privacy Policy. We will retain and use your Personal Data to the
              extent necessary to comply with our legal obligations (for example, to comply with tax and
              labor regulations), resolve disputes, and enforce our agreements and policies.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Employment-related data will be retained for the duration of the employment relationship
              and, subsequently, for the period required by Italian law for the retention of employment
              records (generally 10 years after the end of the relationship). Usage Data will be retained
              for a shorter period, unless it is needed to strengthen security, improve the functionality
              of the Service, or we are legally required to retain it.
            </TextComponent>
          </Section>

          <Section title="7. Data Transfers">
            <TextComponent variant="body" style={styles.paragraph}>
              Your information, including Personal Data, may be transferred to and maintained on servers
              located outside of your state, province, country, or other governmental jurisdiction where
              data protection laws may differ from those of your jurisdiction.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              If you are located outside Italy and choose to provide information to us, please note that
              we transfer the data, including Personal Data, to Italy and process it there. For transfers
              to third countries outside the European Economic Area (EEA), we ensure that appropriate
              safeguards are in place, such as the Standard Contractual Clauses approved by the European
              Commission (Art. 46 GDPR), or that the destination country provides an adequate level of
              protection (Art. 45 GDPR).
            </TextComponent>
          </Section>

          <Section title="8. Third-Party Services">
            <TextComponent variant="body" style={styles.paragraph}>
              We may employ third-party services to facilitate our Service, to provide the Service on our
              behalf, to perform Service-related tasks, or to assist us in analyzing how our Service is
              used. These third parties have access to your Personal Data only to perform these tasks on
              our behalf and are obligated not to disclose or use it for any other purpose.
            </TextComponent>
            <TextComponent variant="body" style={styles.subheading}>
              Supabase
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              We use Supabase as our database and authentication platform. Supabase stores your account
              data and profile information securely. For more information, please see the Supabase privacy
              policy: https://supabase.com/privacy
            </TextComponent>
            <TextComponent variant="body" style={styles.subheading}>
              Push Notifications
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              We use push notification services to send you updates related to your work activities, such
              as reminders for logging hours, request approvals, and other Service-related communications.
              You can manage your notification preferences in your device settings at any time.
            </TextComponent>
          </Section>

          <Section title="9. Your Data Rights">
            <TextComponent variant="body" style={styles.paragraph}>
              Under the GDPR, as a data subject, you have the following rights:
            </TextComponent>
            <BulletPoint text="Right of access (Art. 15 GDPR): You have the right to request a copy of the personal data we hold about you" />
            <BulletPoint text="Right to rectification (Art. 16 GDPR): You have the right to request the correction of inaccurate or incomplete personal data" />
            <BulletPoint text="Right to erasure (Art. 17 GDPR): You have the right to request the deletion of your personal data, subject to legal retention obligations" />
            <BulletPoint text="Right to data portability (Art. 20 GDPR): You have the right to receive your personal data in a structured, commonly used, and machine-readable format" />
            <BulletPoint text="Right to restriction of processing (Art. 18 GDPR): You have the right to request the restriction of processing of your personal data in certain circumstances" />
            <BulletPoint text="Right to object (Art. 21 GDPR): You have the right to object to the processing of your personal data based on legitimate interests or direct marketing purposes" />
            <BulletPoint text="Right to withdraw consent (Art. 7 GDPR): Where processing is based on consent, you have the right to withdraw your consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal" />
            <TextComponent variant="body" style={styles.paragraph}>
              To exercise any of these rights, please contact us at info@monoliteai.com. We will respond
              to your request within 30 days, as required by applicable law.
            </TextComponent>
          </Section>

          <Section title="10. Children's Privacy">
            <TextComponent variant="body" style={styles.paragraph}>
              Our Service does not address anyone under the age of 16 ("Children"). We do not knowingly
              collect personally identifiable information from anyone under 16 years of age. If you are a
              parent or guardian and you are aware that your child has provided us with Personal Data,
              please contact us. If we become aware that we have collected Personal Data from children
              without verification of parental consent, we take steps to remove that information from
              our servers.
            </TextComponent>
          </Section>

          <Section title="11. Security Measures">
            <TextComponent variant="body" style={styles.paragraph}>
              The security of your data is important to us. We implement appropriate technical and
              organizational measures to protect your Personal Data against unauthorized access,
              alteration, disclosure, or destruction, in accordance with Art. 32 of the GDPR. These
              measures include:
            </TextComponent>
            <BulletPoint text="Encryption of data in transit and at rest" />
            <BulletPoint text="Secure authentication through trusted identity providers" />
            <BulletPoint text="Role-based access controls to restrict data access" />
            <BulletPoint text="Regular monitoring of systems for vulnerabilities" />
            <BulletPoint text="Regular data backups to prevent accidental loss" />
            <TextComponent variant="body" style={styles.paragraph}>
              However, no method of transmission over the Internet or method of electronic storage is
              100% secure. While we strive to use commercially acceptable means to protect your Personal
              Data, we cannot guarantee its absolute security.
            </TextComponent>
          </Section>

          <Section title="12. Cookies and Tracking">
            <TextComponent variant="body" style={styles.paragraph}>
              The Monolite HR application is a native mobile application and does not use traditional
              browser cookies. However, we may use cookie-like technologies such as session tokens and
              local storage to maintain your authentication session and preferences.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              We do not use cookies or tracking technologies for advertising or profiling purposes. Any
              local storage technologies used are strictly necessary for the operation of the Service.
            </TextComponent>
          </Section>

          <Section title="13. Changes to This Policy">
            <TextComponent variant="body" style={styles.paragraph}>
              We may update our Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and, if the changes are significant, by sending
              you a notification through the Service.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this
              Privacy Policy are effective when they are posted on this page.
            </TextComponent>
          </Section>

          <Section title="14. Data Protection Officer">
            <TextComponent variant="body" style={styles.paragraph}>
              For any questions regarding the protection of your personal data or to exercise your rights,
              you may contact our Data Protection Officer (DPO):
            </TextComponent>
            <BulletPoint text="Email: info@monoliteai.com" />
            <BulletPoint text="Company: Monolite S.R.L." />
          </Section>

          <Section title="15. Supervisory Authority">
            <TextComponent variant="body" style={styles.paragraph}>
              If you believe that the processing of your Personal Data infringes the GDPR, you have the
              right to lodge a complaint with a supervisory authority. In Italy, the supervisory authority
              is the Garante per la Protezione dei Dati Personali (Italian Data Protection Authority):
            </TextComponent>
            <BulletPoint text="Website: https://www.garanteprivacy.it" />
            <BulletPoint text="Email: garante@gpdp.it" />
            <BulletPoint text="PEC: protocollo@pec.gpdp.it" />
          </Section>

          <Section title="16. Contact Us">
            <TextComponent variant="body" style={styles.paragraph}>
              If you have any questions about this Privacy Policy, please contact us:
            </TextComponent>
            <BulletPoint text="Company: Monolite S.R.L." />
            <BulletPoint text="By email: info@monoliteai.com" />
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
              {isItalian ? 'Ultimo aggiornamento: 7 Marzo 2026' : 'Last updated: March 7, 2026'}
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
