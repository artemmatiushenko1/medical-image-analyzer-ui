import { useSavePdf } from '@/libs/hooks';
import { useGetStudy } from '../queries';
import { StudyReportDocument } from '../pdf-templates';
import { useAuthStore } from '@/app';
import dayjs from 'dayjs';
import { DateFormat } from '@/libs/enums';
import { Study } from '@/packages/studies';

const useSaveStudyReport = (studyId: string) => {
  const currentUser = useAuthStore((state) => state.user);

  const { isLoading, refetch: getStudy } = useGetStudy(studyId, false);

  const { savePdf, isLoading: isSavingPdf } = useSavePdf();

  const getReportFilename = (study: Study) => {
    return `study_${study.id}_report_${dayjs(study.date)
      .format(DateFormat.YEAR_MONTH_DAY_DASHES)
      ?.replaceAll(' ', '_')}.pdf`;
  };

  const saveReport = async () => {
    if (!currentUser) return;

    const { data } = await getStudy();

    const study = data as Study;

    const reportFilename = getReportFilename(study);

    await savePdf(
      <StudyReportDocument study={study} issuer={currentUser} />,
      reportFilename,
    );
  };

  return { isLoading: isLoading || isSavingPdf, saveReport, getReportFilename };
};

export { useSaveStudyReport };
