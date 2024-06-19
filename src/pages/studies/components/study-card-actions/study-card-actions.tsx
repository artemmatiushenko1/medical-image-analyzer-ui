import { Menu, MenuItem, MenuProps } from '@/libs/components';
import { DownloadIcon } from '@/libs/components/icons';
import { useSaveStudyReport } from '../../libs/hooks';
import { useTranslation } from 'react-i18next';

type StudyCardActionsProps = Omit<MenuProps, 'items'> & { studyId: string };

const StudyCardActions = (props: StudyCardActionsProps) => {
  const { studyId } = props;

  const { t } = useTranslation('Studies');

  const { isLoading, saveReport } = useSaveStudyReport();

  const menuItems: MenuItem[] = [
    {
      name: t('StudyCard.DownloadReport'),
      icon: DownloadIcon,
      loading: isLoading,
      onClick: () => void saveReport(studyId),
    },
  ];

  return <Menu {...props} items={menuItems} />;
};

export { StudyCardActions };
