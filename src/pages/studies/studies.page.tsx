import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import {
  AccessTimeFilledRounded,
  AllInboxRounded,
  CheckCircleRounded,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { StudiesFilter, StudyCard, StudyDetailsDrawer } from './components';
import { Study, StudyStatus, useGetStudies } from '@/packages/studies';
import { MAX_STUDY_LOADING_PREVIEWS } from './libs/constants';
import { ValueOf } from '@/libs/types';
import { useClosable } from '@/libs/hooks';
import { useTranslation } from 'react-i18next';

const Studies = () => {
  const { t } = useTranslation('Studies');

  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ValueOf<
    typeof StudyStatus
  > | null>(null);

  const {
    isOpen: isDetailsDrawerOpen,
    close: closeDetailsDrawer,
    open: openDetailsDrawer,
  } = useClosable(Boolean(selectedStudyId));

  const { isLoading, data: studies } = useGetStudies();

  const selectedStudy =
    studies?.find((study) => study.id === selectedStudyId) ?? ({} as Study);

  useEffect(() => {
    if (selectedStudyId) {
      openDetailsDrawer();
    } else {
      closeDetailsDrawer();
    }
  }, [selectedStudyId]);

  const completedStudiesCount = studies?.filter(
    (item) => item.status === StudyStatus.COMPLETED,
  );

  const pendingStudiesCount = studies?.filter(
    (item) => item.status === StudyStatus.PENDING,
  );

  const tabs = [
    {
      icon: <AllInboxRounded />,
      count: studies?.length ?? 0,
      title: t('StudiesFilter.All'),
      key: null,
    },
    {
      icon: <CheckCircleRounded />,
      count: completedStudiesCount?.length ?? 0,
      title: t('StudiesFilter.Completed'),
      key: StudyStatus.COMPLETED,
    },
    {
      icon: <AccessTimeFilledRounded />,
      count: pendingStudiesCount?.length ?? 0,
      title: t('StudiesFilter.Pending'),
      key: StudyStatus.PENDING,
    },
  ];

  const filteredStudies =
    statusFilter === null
      ? studies
      : studies?.filter((study) => study.status === statusFilter);

  const handleViewStudyDetails = (id: string) => {
    setSelectedStudyId(id);
    openDetailsDrawer();
  };

  const handleDetailsDrawerCloseFinised = () => {
    setSelectedStudyId(null);
  };

  return (
    <Box sx={styles.root}>
      <Paper
        square
        sx={{
          borderTop: 'none',
          borderLeft: 'none',
          borderBottom: 'none',
          flex: '22%',
        }}
      >
        <Stack>
          <Stack sx={{ p: 3 }}>
            <Typography variant="h6" fontSize="18px" fontWeight={600}>
              {t('PageTitle')}
            </Typography>
            <Typography variant="caption">{t('PageDescription')}</Typography>
          </Stack>
          <Divider />
          <Stack sx={{ py: 3, gap: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: ({ palette }) => palette.neutral.dark, pl: 3 }}
            >
              {t('StudiesFilter.Title')}
            </Typography>
            <StudiesFilter
              tabs={tabs}
              value={statusFilter}
              onChange={setStatusFilter}
              isLoading={isLoading}
            />
          </Stack>
        </Stack>
      </Paper>
      <Stack sx={{ flex: '78%', p: 3, gap: 3, overflow: 'scroll' }}>
        {isLoading &&
          Array(MAX_STUDY_LOADING_PREVIEWS)
            .fill(crypto.randomUUID)
            .map((_, index) => <StudyCard.Skeleton key={index} />)}
        {filteredStudies?.map((study) => (
          <StudyCard
            key={study.id}
            id={study.id}
            date={study.date}
            status={study.status}
            imageSrc={study.imageSrc}
            diagnostic={study.diagnostic}
            onViewDetails={handleViewStudyDetails}
          />
        ))}
      </Stack>
      <StudyDetailsDrawer
        open={isDetailsDrawerOpen}
        onClose={closeDetailsDrawer}
        study={selectedStudy}
        onCloseFinished={handleDetailsDrawerCloseFinised}
      />
    </Box>
  );
};

export { Studies };
