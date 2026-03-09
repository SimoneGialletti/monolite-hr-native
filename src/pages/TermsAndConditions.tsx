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
              Benvenuti in Monolite HR. Questi Termini e Condizioni ("Termini") regolano il vostro utilizzo
              dell'applicazione mobile Monolite HR ("Servizio" o "App") gestita da Monolite S.R.L.
              ("Società", "noi", "nostro").
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Il vostro accesso e utilizzo del Servizio è condizionato alla vostra accettazione e conformità
              a questi Termini. Accedendo o utilizzando il Servizio accettate di essere vincolati da questi Termini.
              Se non siete d'accordo con una qualsiasi parte dei Termini, non potete accedere al Servizio.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Vi invitiamo a leggere attentamente questi Termini prima di utilizzare la nostra App. L'utilizzo
              del Servizio implica l'accettazione integrale e senza riserve dei presenti Termini.
            </TextComponent>
          </Section>

          <Section title="2. Account">
            <TextComponent variant="body" style={styles.paragraph}>
              Quando create un account con noi, dovete fornirci informazioni accurate, complete e aggiornate
              in ogni momento. La mancata osservanza di tale obbligo costituisce una violazione dei Termini, che
              può comportare la cessazione immediata del vostro account sul nostro Servizio.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Siete responsabili della salvaguardia della password che utilizzate per accedere al Servizio e di
              qualsiasi attività o azione svolta con la vostra password, sia che essa sia utilizzata con il
              nostro Servizio o con un servizio di terze parti.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Accettate di non divulgare la vostra password a terzi. Dovete informarci immediatamente di qualsiasi
              violazione della sicurezza o uso non autorizzato del vostro account.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Non potete utilizzare come nome utente il nome di un'altra persona o entità o che non sia legalmente
              disponibile per l'uso, un nome o marchio soggetto a diritti di terzi senza opportuna autorizzazione,
              o un nome che sia altrimenti offensivo, volgare o osceno.
            </TextComponent>
          </Section>

          <Section title="3. Proprietà Intellettuale">
            <TextComponent variant="body" style={styles.paragraph}>
              Il Servizio e il suo contenuto originale (escluso il contenuto fornito dagli utenti), le
              funzionalità e le caratteristiche sono e rimarranno proprietà esclusiva di Monolite S.R.L. e dei
              suoi licenziatari. Il Servizio è protetto da copyright, marchi e altre leggi sia italiane che
              internazionali.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              I nostri marchi e la nostra veste commerciale non possono essere utilizzati in relazione a
              prodotti o servizi senza il previo consenso scritto di Monolite S.R.L. Nulla di quanto contenuto
              in questi Termini deve essere interpretato come concessione di licenza o diritto di utilizzo di
              qualsiasi immagine, marchio, logo o nome commerciale di Monolite S.R.L.
            </TextComponent>
          </Section>

          <Section title="4. Descrizione del Servizio">
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite HR è un'applicazione di gestione delle risorse umane progettata per facilitare le
              seguenti funzionalità:
            </TextComponent>
            <BulletPoint text="Registrazione e monitoraggio delle ore di lavoro" />
            <BulletPoint text="Gestione delle richieste di ferie e permessi" />
            <BulletPoint text="Richieste di materiali e attrezzature" />
            <BulletPoint text="Gestione delle attività lavorative" />
            <BulletPoint text="Comunicazione tra dipendenti e datori di lavoro" />
            <TextComponent variant="body" style={styles.paragraph}>
              Il Servizio è destinato esclusivamente all'uso nell'ambito di un rapporto di lavoro e deve
              essere utilizzato in conformità con le politiche del vostro datore di lavoro.
            </TextComponent>
          </Section>

          <Section title="5. Obblighi dell'Utente">
            <TextComponent variant="body" style={styles.paragraph}>
              Come utente del Servizio, accettate di:
            </TextComponent>
            <BulletPoint text="Fornire informazioni veritiere, accurate e complete durante la registrazione e l'utilizzo del Servizio" />
            <BulletPoint text="Mantenere e aggiornare tempestivamente le vostre informazioni personali" />
            <BulletPoint text="Mantenere la sicurezza e la riservatezza delle vostre credenziali di accesso" />
            <BulletPoint text="Notificare immediatamente qualsiasi uso non autorizzato del vostro account" />
            <BulletPoint text="Registrare le ore di lavoro in modo accurato e onesto" />
            <BulletPoint text="Rispettare tutte le leggi e i regolamenti applicabili nell'utilizzo del Servizio" />
            <BulletPoint text="Non tentare di accedere a dati o funzionalità non autorizzati" />
          </Section>

          <Section title="6. Uso Consentito">
            <TextComponent variant="body" style={styles.paragraph}>
              Vi è consentito utilizzare il Servizio esclusivamente per gli scopi previsti, tra cui:
            </TextComponent>
            <BulletPoint text="Registrare le vostre ore di lavoro e attività professionali" />
            <BulletPoint text="Inviare e gestire richieste di ferie, permessi e materiali" />
            <BulletPoint text="Consultare le vostre informazioni lavorative e i vostri dati personali" />
            <BulletPoint text="Comunicare con il vostro datore di lavoro attraverso i canali previsti dall'App" />
            <TextComponent variant="body" style={styles.paragraph}>
              L'utilizzo del Servizio è limitato a scopi professionali legittimi nell'ambito del vostro
              rapporto di lavoro.
            </TextComponent>
          </Section>

          <Section title="7. Usi Vietati">
            <TextComponent variant="body" style={styles.paragraph}>
              È espressamente vietato:
            </TextComponent>
            <BulletPoint text="Utilizzare il Servizio per scopi illegali o non autorizzati" />
            <BulletPoint text="Tentare di decompilare, decodificare o disassemblare il software del Servizio" />
            <BulletPoint text="Inserire dati falsi, fuorvianti o fraudolenti" />
            <BulletPoint text="Accedere o tentare di accedere agli account di altri utenti" />
            <BulletPoint text="Interferire con o interrompere il funzionamento del Servizio o dei server ad esso collegati" />
            <BulletPoint text="Trasmettere virus, malware o altro codice dannoso" />
            <BulletPoint text="Raccogliere o conservare dati personali di altri utenti senza autorizzazione" />
            <BulletPoint text="Utilizzare il Servizio per inviare comunicazioni non richieste o spam" />
            <BulletPoint text="Copiare, modificare o distribuire il contenuto del Servizio senza autorizzazione scritta" />
            <BulletPoint text="Utilizzare sistemi automatizzati (bot, scraper) per accedere al Servizio" />
          </Section>

          <Section title="8. Dati e Privacy">
            <TextComponent variant="body" style={styles.paragraph}>
              La vostra privacy è importante per noi. L'utilizzo del Servizio è inoltre regolato dalla nostra
              Informativa sulla Privacy, che descrive come raccogliamo, utilizziamo e proteggiamo i vostri
              dati personali.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Utilizzando il Servizio, acconsentite alla raccolta e all'utilizzo delle informazioni in
              conformità con la nostra Informativa sulla Privacy e con il Regolamento (UE) 2016/679 (GDPR).
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Ci impegniamo a proteggere i vostri dati personali e a trattarli in conformità con le leggi
              applicabili sulla protezione dei dati, incluso il GDPR e il D.Lgs. 196/2003 (Codice della Privacy
              italiano) come modificato dal D.Lgs. 101/2018.
            </TextComponent>
          </Section>

          <Section title="9. Tariffe e Pagamento">
            <TextComponent variant="body" style={styles.paragraph}>
              Il Servizio è attualmente fornito gratuitamente. Ci riserviamo il diritto di introdurre tariffe
              per l'utilizzo del Servizio o di alcune sue funzionalità in futuro.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Nel caso in cui vengano introdotte tariffe, vi informeremo con un preavviso ragionevole e vi
              forniremo i dettagli relativi ai costi e alle modalità di pagamento. L'utilizzo continuato del
              Servizio dopo l'introduzione delle tariffe costituirà accettazione delle stesse.
            </TextComponent>
          </Section>

          <Section title="10. Disponibilità del Servizio e Modifiche">
            <TextComponent variant="body" style={styles.paragraph}>
              Ci riserviamo il diritto di modificare o interrompere, temporaneamente o permanentemente, il
              Servizio (o qualsiasi sua parte) con o senza preavviso. Non saremo responsabili nei vostri
              confronti o nei confronti di terzi per eventuali modifiche, sospensioni o interruzioni del Servizio.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Non garantiamo che il Servizio sarà disponibile in modo ininterrotto, tempestivo, sicuro o privo
              di errori. Ci riserviamo il diritto di effettuare manutenzione programmata e non programmata che
              potrebbe comportare l'indisponibilità temporanea del Servizio.
            </TextComponent>
          </Section>

          <Section title="11. Risoluzione">
            <TextComponent variant="body" style={styles.paragraph}>
              Possiamo risolvere o sospendere il vostro account immediatamente, senza preavviso o
              responsabilità, per qualsiasi motivo, incluso, senza limitazione, nel caso in cui violiate i Termini.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              In caso di risoluzione, il vostro diritto di utilizzare il Servizio cesserà immediatamente. Se
              desiderate risolvere il vostro account, potete semplicemente smettere di utilizzare il Servizio
              o contattarci per richiedere la cancellazione del vostro account.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Tutte le disposizioni dei Termini che per loro natura devono sopravvivere alla risoluzione,
              sopravvivranno alla risoluzione, incluse, senza limitazione, le disposizioni sulla proprietà
              intellettuale, le esclusioni di garanzia, l'indennizzo e le limitazioni di responsabilità.
            </TextComponent>
          </Section>

          <Section title="12. Limitazione di Responsabilità">
            <TextComponent variant="body" style={styles.paragraph}>
              Nella misura massima consentita dalla legge applicabile, in nessun caso Monolite S.R.L., i suoi
              amministratori, dipendenti, partner, agenti, fornitori o affiliati saranno responsabili per
              danni indiretti, incidentali, speciali, consequenziali o punitivi, inclusi, senza limitazione,
              perdita di profitti, dati, uso, avviamento o altre perdite immateriali, derivanti da:
            </TextComponent>
            <BulletPoint text="Il vostro accesso o utilizzo o l'impossibilità di accedere o utilizzare il Servizio" />
            <BulletPoint text="Qualsiasi condotta o contenuto di terzi sul Servizio" />
            <BulletPoint text="Qualsiasi contenuto ottenuto dal Servizio" />
            <BulletPoint text="Accesso non autorizzato, utilizzo o alterazione delle vostre trasmissioni o contenuti" />
            <TextComponent variant="body" style={styles.paragraph}>
              La responsabilità complessiva di Monolite S.R.L. per qualsiasi reclamo relativo al Servizio non
              supererà l'importo eventualmente pagato dall'utente per l'utilizzo del Servizio nei dodici (12)
              mesi precedenti il reclamo.
            </TextComponent>
          </Section>

          <Section title="13. Esclusione di Garanzie">
            <TextComponent variant="body" style={styles.paragraph}>
              Il Servizio è fornito "COSÌ COM'È" e "COME DISPONIBILE", senza garanzie di alcun tipo, espresse
              o implicite, incluse, a titolo esemplificativo ma non esaustivo, garanzie implicite di
              commerciabilità, idoneità per uno scopo particolare, non violazione o prestazioni.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite S.R.L. non garantisce che: (a) il Servizio funzionerà in modo ininterrotto, sicuro o
              disponibile in qualsiasi momento o luogo; (b) eventuali errori o difetti saranno corretti; (c) il
              Servizio sia privo di virus o altri componenti dannosi; o (d) i risultati dell'utilizzo del
              Servizio soddisferanno le vostre esigenze.
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
            <BulletPoint text="Il datore di lavoro è responsabile di garantire che l'uso del Servizio sia conforme alle leggi sul lavoro applicabili" />
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite S.R.L. non è parte del rapporto di lavoro tra voi e il vostro datore di lavoro. Non
              siamo responsabili per decisioni prese dal vostro datore di lavoro sulla base dei dati inseriti
              nel Servizio.
            </TextComponent>
          </Section>

          <Section title="15. Indennizzo">
            <TextComponent variant="body" style={styles.paragraph}>
              Accettate di difendere, indennizzare e tenere indenne Monolite S.R.L. e i suoi licenziatari,
              dipendenti, appaltatori, agenti, funzionari e amministratori da e contro qualsiasi reclamo,
              danno, obbligo, perdita, responsabilità, costo o debito e spese (incluse, a titolo esemplificativo,
              le spese legali) derivanti da:
            </TextComponent>
            <BulletPoint text="Il vostro utilizzo e accesso al Servizio" />
            <BulletPoint text="La vostra violazione di qualsiasi termine dei presenti Termini" />
            <BulletPoint text="La vostra violazione di diritti di terzi, inclusi, senza limitazione, diritti di proprietà intellettuale o diritti alla privacy" />
            <BulletPoint text="Qualsiasi dato falso o fuorviante inserito nel Servizio" />
          </Section>

          <Section title="16. Legge Applicabile">
            <TextComponent variant="body" style={styles.paragraph}>
              Questi Termini sono regolati e interpretati in conformità con le leggi della Repubblica Italiana,
              senza riguardo alle disposizioni sui conflitti di legge.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Per qualsiasi controversia derivante da o relativa a questi Termini o al Servizio, sarà
              competente in via esclusiva il Foro di Milano, Italia, fatti salvi i diritti inderogabili del
              consumatore previsti dalla legge applicabile.
            </TextComponent>
          </Section>

          <Section title="17. Risoluzione delle Controversie">
            <TextComponent variant="body" style={styles.paragraph}>
              Prima di intraprendere qualsiasi azione legale, le parti si impegnano a tentare di risolvere
              qualsiasi controversia in modo amichevole attraverso la negoziazione diretta. In caso di mancato
              accordo entro trenta (30) giorni dalla notifica scritta della controversia, ciascuna parte potrà
              adire il foro competente.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Ai sensi del Regolamento (UE) n. 524/2013, si informa che per la risoluzione delle controversie
              online è disponibile la piattaforma ODR dell'Unione Europea, accessibile al seguente link:
              https://ec.europa.eu/consumers/odr.
            </TextComponent>
          </Section>

          <Section title="18. Separabilità">
            <TextComponent variant="body" style={styles.paragraph}>
              Se una qualsiasi disposizione di questi Termini viene ritenuta inapplicabile o non valida, tale
              disposizione sarà modificata e interpretata per raggiungere gli obiettivi di tale disposizione
              nella misura massima possibile ai sensi della legge applicabile, e le restanti disposizioni
              continueranno ad essere pienamente efficaci e vincolanti.
            </TextComponent>
          </Section>

          <Section title="19. Modifiche ai Termini">
            <TextComponent variant="body" style={styles.paragraph}>
              Ci riserviamo il diritto, a nostra esclusiva discrezione, di modificare o sostituire questi
              Termini in qualsiasi momento. In caso di revisione sostanziale, cercheremo di fornire un preavviso
              di almeno trenta (30) giorni prima dell'entrata in vigore dei nuovi termini, tramite notifica
              nell'App o via email.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Il vostro utilizzo continuato del Servizio dopo la pubblicazione delle modifiche costituirà
              accettazione delle stesse. Se non siete d'accordo con i nuovi termini, siete pregati di cessare
              l'utilizzo del Servizio.
            </TextComponent>
          </Section>

          <Section title="20. Contattaci">
            <TextComponent variant="body" style={styles.paragraph}>
              Se avete domande su questi Termini, contattateci:
            </TextComponent>
            <BulletPoint text="Società: Monolite S.R.L." />
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
              Welcome to Monolite HR. These Terms and Conditions ("Terms") govern your use of the Monolite HR
              mobile application ("Service" or "App") operated by Monolite S.R.L. ("Company", "we", "our", "us").
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with
              these Terms. By accessing or using the Service you agree to be bound by these Terms. If you
              disagree with any part of the Terms, then you may not access the Service.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Please read these Terms carefully before using our App. Your use of the Service constitutes your
              full and unconditional acceptance of these Terms.
            </TextComponent>
          </Section>

          <Section title="2. Accounts">
            <TextComponent variant="body" style={styles.paragraph}>
              When you create an account with us, you must provide us information that is accurate, complete,
              and current at all times. Failure to do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our Service.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              You are responsible for safeguarding the password that you use to access the Service and for any
              activities or actions under your password, whether your password is with our Service or a
              third-party service.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              You agree not to disclose your password to any third party. You must notify us immediately upon
              becoming aware of any breach of security or unauthorized use of your account.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              You may not use as a username the name of another person or entity or that is not lawfully
              available for use, a name or trademark that is subject to any rights of another person or entity
              without appropriate authorization, or a name that is otherwise offensive, vulgar, or obscene.
            </TextComponent>
          </Section>

          <Section title="3. Intellectual Property">
            <TextComponent variant="body" style={styles.paragraph}>
              The Service and its original content (excluding content provided by users), features, and
              functionality are and will remain the exclusive property of Monolite S.R.L. and its licensors.
              The Service is protected by copyright, trademark, and other laws of both Italy and foreign
              countries.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Our trademarks and trade dress may not be used in connection with any product or service without
              the prior written consent of Monolite S.R.L. Nothing in these Terms shall be construed as
              granting any license or right to use any image, trademark, logo, or trade name of Monolite S.R.L.
            </TextComponent>
          </Section>

          <Section title="4. Service Description">
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite HR is a human resources management application designed to facilitate the following
              functionalities:
            </TextComponent>
            <BulletPoint text="Work hours logging and tracking" />
            <BulletPoint text="Leave and time-off request management" />
            <BulletPoint text="Material and equipment requests" />
            <BulletPoint text="Work activity management" />
            <BulletPoint text="Communication between employees and employers" />
            <TextComponent variant="body" style={styles.paragraph}>
              The Service is intended exclusively for use within an employment relationship and must be used
              in accordance with your employer's policies.
            </TextComponent>
          </Section>

          <Section title="5. User Obligations">
            <TextComponent variant="body" style={styles.paragraph}>
              As a user of the Service, you agree to:
            </TextComponent>
            <BulletPoint text="Provide truthful, accurate, and complete information during registration and use of the Service" />
            <BulletPoint text="Maintain and promptly update your personal information" />
            <BulletPoint text="Maintain the security and confidentiality of your login credentials" />
            <BulletPoint text="Notify us immediately of any unauthorized use of your account" />
            <BulletPoint text="Log work hours accurately and honestly" />
            <BulletPoint text="Comply with all applicable laws and regulations when using the Service" />
            <BulletPoint text="Not attempt to access unauthorized data or features" />
          </Section>

          <Section title="6. Acceptable Use">
            <TextComponent variant="body" style={styles.paragraph}>
              You are permitted to use the Service solely for its intended purposes, including:
            </TextComponent>
            <BulletPoint text="Recording your work hours and professional activities" />
            <BulletPoint text="Submitting and managing leave, time-off, and material requests" />
            <BulletPoint text="Viewing your employment information and personal data" />
            <BulletPoint text="Communicating with your employer through the channels provided in the App" />
            <TextComponent variant="body" style={styles.paragraph}>
              Use of the Service is limited to legitimate professional purposes within the scope of your
              employment relationship.
            </TextComponent>
          </Section>

          <Section title="7. Prohibited Uses">
            <TextComponent variant="body" style={styles.paragraph}>
              You are expressly prohibited from:
            </TextComponent>
            <BulletPoint text="Using the Service for any unlawful or unauthorized purpose" />
            <BulletPoint text="Attempting to decompile, reverse-engineer, or disassemble the Service software" />
            <BulletPoint text="Entering false, misleading, or fraudulent data" />
            <BulletPoint text="Accessing or attempting to access other users' accounts" />
            <BulletPoint text="Interfering with or disrupting the operation of the Service or its connected servers" />
            <BulletPoint text="Transmitting viruses, malware, or other harmful code" />
            <BulletPoint text="Collecting or storing personal data of other users without authorization" />
            <BulletPoint text="Using the Service to send unsolicited communications or spam" />
            <BulletPoint text="Copying, modifying, or distributing the Service content without written authorization" />
            <BulletPoint text="Using automated systems (bots, scrapers) to access the Service" />
          </Section>

          <Section title="8. Data and Privacy">
            <TextComponent variant="body" style={styles.paragraph}>
              Your privacy is important to us. Your use of the Service is also governed by our Privacy Policy,
              which describes how we collect, use, and protect your personal data.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              By using the Service, you consent to the collection and use of information in accordance with our
              Privacy Policy and the General Data Protection Regulation (EU) 2016/679 (GDPR).
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              We are committed to protecting your personal data and processing it in compliance with applicable
              data protection laws, including the GDPR and the Italian Legislative Decree 196/2003 (Italian
              Privacy Code) as amended by Legislative Decree 101/2018.
            </TextComponent>
          </Section>

          <Section title="9. Fees and Payment">
            <TextComponent variant="body" style={styles.paragraph}>
              The Service is currently provided free of charge. We reserve the right to introduce fees for the
              use of the Service or certain features thereof in the future.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              In the event that fees are introduced, we will provide you with reasonable advance notice and
              details regarding the costs and payment methods. Your continued use of the Service after the
              introduction of fees will constitute acceptance thereof.
            </TextComponent>
          </Section>

          <Section title="10. Service Availability and Modifications">
            <TextComponent variant="body" style={styles.paragraph}>
              We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any
              part thereof) with or without notice. We shall not be liable to you or to any third party for
              any modification, suspension, or discontinuation of the Service.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              We do not guarantee that the Service will be available on an uninterrupted, timely, secure, or
              error-free basis. We reserve the right to perform scheduled and unscheduled maintenance that may
              result in temporary unavailability of the Service.
            </TextComponent>
          </Section>

          <Section title="11. Termination">
            <TextComponent variant="body" style={styles.paragraph}>
              We may terminate or suspend your account immediately, without prior notice or liability, for any
              reason whatsoever, including without limitation if you breach the Terms.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Upon termination, your right to use the Service will cease immediately. If you wish to terminate
              your account, you may simply discontinue using the Service or contact us to request account
              deletion.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              All provisions of the Terms which by their nature should survive termination shall survive
              termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity,
              and limitations of liability.
            </TextComponent>
          </Section>

          <Section title="12. Limitation of Liability">
            <TextComponent variant="body" style={styles.paragraph}>
              To the maximum extent permitted by applicable law, in no event shall Monolite S.R.L., its
              directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect,
              incidental, special, consequential, or punitive damages, including without limitation, loss of
              profits, data, use, goodwill, or other intangible losses, resulting from:
            </TextComponent>
            <BulletPoint text="Your access to or use of or inability to access or use the Service" />
            <BulletPoint text="Any conduct or content of any third party on the Service" />
            <BulletPoint text="Any content obtained from the Service" />
            <BulletPoint text="Unauthorized access, use, or alteration of your transmissions or content" />
            <TextComponent variant="body" style={styles.paragraph}>
              The aggregate liability of Monolite S.R.L. for any claims relating to the Service shall not
              exceed the amount, if any, paid by you for the use of the Service in the twelve (12) months
              preceding the claim.
            </TextComponent>
          </Section>

          <Section title="13. Disclaimer of Warranties">
            <TextComponent variant="body" style={styles.paragraph}>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis, without warranties of any kind,
              whether express or implied, including, but not limited to, implied warranties of merchantability,
              fitness for a particular purpose, non-infringement, or course of performance.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite S.R.L. does not warrant that: (a) the Service will function uninterrupted, secure, or
              available at any particular time or location; (b) any errors or defects will be corrected; (c)
              the Service is free of viruses or other harmful components; or (d) the results of using the
              Service will meet your requirements.
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
            <BulletPoint text="Your employer is responsible for ensuring that use of the Service complies with applicable labor laws" />
            <TextComponent variant="body" style={styles.paragraph}>
              Monolite S.R.L. is not a party to the employment relationship between you and your employer. We
              are not responsible for decisions made by your employer based on data entered into the Service.
            </TextComponent>
          </Section>

          <Section title="15. Indemnification">
            <TextComponent variant="body" style={styles.paragraph}>
              You agree to defend, indemnify, and hold harmless Monolite S.R.L. and its licensees, employees,
              contractors, agents, officers, and directors from and against any and all claims, damages,
              obligations, losses, liabilities, costs or debt, and expenses (including but not limited to
              attorney's fees) arising from:
            </TextComponent>
            <BulletPoint text="Your use of and access to the Service" />
            <BulletPoint text="Your violation of any term of these Terms" />
            <BulletPoint text="Your violation of any third-party right, including without limitation any intellectual property right or privacy right" />
            <BulletPoint text="Any false or misleading data entered into the Service" />
          </Section>

          <Section title="16. Governing Law">
            <TextComponent variant="body" style={styles.paragraph}>
              These Terms shall be governed and construed in accordance with the laws of the Republic of Italy,
              without regard to its conflict of law provisions.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              For any dispute arising from or relating to these Terms or the Service, the courts of Milan,
              Italy shall have exclusive jurisdiction, without prejudice to the mandatory consumer rights
              provided by applicable law.
            </TextComponent>
          </Section>

          <Section title="17. Dispute Resolution">
            <TextComponent variant="body" style={styles.paragraph}>
              Before initiating any legal action, the parties agree to attempt to resolve any dispute amicably
              through direct negotiation. If no agreement is reached within thirty (30) days of written notice
              of the dispute, either party may bring the matter before the competent court.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              In accordance with Regulation (EU) No. 524/2013, please note that for online dispute resolution,
              the EU Online Dispute Resolution platform is available at the following link:
              https://ec.europa.eu/consumers/odr.
            </TextComponent>
          </Section>

          <Section title="18. Severability">
            <TextComponent variant="body" style={styles.paragraph}>
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be
              changed and interpreted to accomplish the objectives of such provision to the greatest extent
              possible under applicable law, and the remaining provisions will continue in full force and effect.
            </TextComponent>
          </Section>

          <Section title="19. Changes to Terms">
            <TextComponent variant="body" style={styles.paragraph}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
              revision is material, we will try to provide at least thirty (30) days' notice prior to any new
              terms taking effect, via in-App notification or email.
            </TextComponent>
            <TextComponent variant="body" style={styles.paragraph}>
              Your continued use of the Service after the posting of modifications constitutes your acceptance
              of those changes. If you do not agree to the new terms, please stop using the Service.
            </TextComponent>
          </Section>

          <Section title="20. Contact Us">
            <TextComponent variant="body" style={styles.paragraph}>
              If you have any questions about these Terms, please contact us:
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
                {isItalian ? 'Termini e Condizioni' : 'Terms and Conditions'}
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
