import {
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  Image,
  Font,
} from '@react-pdf/renderer';
import logoImg from '@/assets/logo.png';
import { Study } from '@/packages/studies';
import { toDate, format } from 'date-fns';
import { heather } from '@/libs/theme/colors';
import { shape } from '@/libs/theme/shape';

import RobotoRegular from '@/assets/fonts/Roboto-Regular.ttf';
import RobotoMedium from '@/assets/fonts/Roboto-Medium.ttf';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular, fontWeight: 400 },
    { src: RobotoMedium, fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  logo: {
    width: '125px',
  },
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    gap: '20px',
    fontWeight: 400,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  generationTimestamp: {
    color: heather[500],
    fontSize: '10px',
  },
  subtitle: {
    fontSize: '10px',
    color: heather[500],
    fontWeight: 600,
  },
  section: {
    gap: '10px',
  },
  image: {
    borderRadius: `${shape.borderRadius * 3}px`,
    width: '50%',
  },
});

type StudyReportDocumentProps = {
  study: Study;
};

// TOOD: use translations
const StudyReportDocument = (props: StudyReportDocumentProps) => {
  const { study } = props;

  const currentDate = toDate(new Date());
  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image source={logoImg} style={styles.logo} />
          <Text style={styles.generationTimestamp}>{formattedDate}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Diagnostic details</Text>
          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: '11px' }}>Name: {study.diagnostic}</Text>
            <Text style={{ fontSize: '11px' }}>Issued at: {study.date}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Image</Text>
          <Image style={styles.image} source={study.imageSrc}></Image>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Diagnosis confidence</Text>
          {/* TODO: complete information in PDF */}
        </View>
      </Page>
    </Document>
  );
};

export { StudyReportDocument };
