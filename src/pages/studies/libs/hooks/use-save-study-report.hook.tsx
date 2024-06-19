import { useSavePdf } from '@/libs/hooks';
import { useGetStudyMutation } from '../queries';
import { StudyReportDocument } from '../pdf-templates';
import { useAuthStore } from '@/app';
import dayjs from 'dayjs';
import { DateFormat } from '@/libs/enums';
import { Study } from '@/packages/studies';

const useSaveStudyReport = () => {
  const currentUser = useAuthStore((state) => state.user);

  const { isPending, mutateAsync: getStudy } = useGetStudyMutation();

  const { savePdf, isLoading: isSavingPdf } = useSavePdf();

  const getReportFilename = (study: Study) => {
    return `study_${study.id}_report_${dayjs(study.createdAt)
      .format(DateFormat.YEAR_MONTH_DAY_DASHES)
      ?.replaceAll(' ', '_')}.pdf`;
  };

  const saveReport = async (studyId: string) => {
    if (!currentUser) return;

    const study = await getStudy(studyId);

    const reportFilename = getReportFilename(study);

    await savePdf(
      <StudyReportDocument study={study} issuer={currentUser} />,
      reportFilename,
    );
  };

  return { isLoading: isPending || isSavingPdf, saveReport, getReportFilename };
};

export { useSaveStudyReport };
