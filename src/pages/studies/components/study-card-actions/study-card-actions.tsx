import { Menu, MenuItem, MenuProps } from '@/libs/components';
import { DownloadIcon } from '@/libs/components/icons';
import { useSaveStudyReport } from '../../libs/hooks';
import { useTranslation } from 'react-i18next';
import { StudyStatus } from '@/packages/studies';
import { ValueOf } from '@/libs/types';

type StudyCardActionsProps = Omit<MenuProps, 'items'> & {
  studyId: string;
  status: ValueOf<typeof StudyStatus>;
};

const StudyCardActions = (props: StudyCardActionsProps) => {
  const { studyId, status } = props;

  const { t } = useTranslation('Studies');

  const { isLoading, saveReport } = useSaveStudyReport();

  const menuItems: MenuItem[] = [
    {
      name: t('StudyCard.DownloadReport'),
      icon: DownloadIcon,
      loading: isLoading,
      disabled: status === StudyStatus.PENDING,
      onClick: () => void saveReport(studyId),
    },
  ];

  return <Menu {...props} items={menuItems} />;
};

export { StudyCardActions };
