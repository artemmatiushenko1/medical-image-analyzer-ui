import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import {
  AccessTimeFilledRounded,
  AllInboxRounded,
  CheckCircleRounded,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { StudiesFilter, StudyCard, StudyDetailsDrawer } from './components';
import { StudyStatus } from '@/packages/studies';
import { ValueOf } from '@/libs/types';
import { useClosable } from '@/libs/hooks';
import { Trans, useTranslation } from 'react-i18next';
import { useGetStudies } from './libs/queries';
import { EmptyState } from '@/libs/components';
import { motion } from 'framer-motion';
import { NoResultsIcon } from '@/libs/components/icons';

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

  const { isLoading, data: studies = [] } = useGetStudies();

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
      : studies.filter((study) => study.status === statusFilter);

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
      <Stack sx={{ flex: '78%', p: 3, overflow: 'scroll' }}>
        {isLoading && (
          <Stack gap={3}>
            <StudyCard.Skeleton />
            <StudyCard.Skeleton />
            <StudyCard.Skeleton />
            <StudyCard.Skeleton />
            <StudyCard.Skeleton />
            <StudyCard.Skeleton />
          </Stack>
        )}
        {filteredStudies.length >= 1 && (
          <Stack
            gap={3}
            component={motion.div}
            initial="initial"
            animate="animated"
            transition={{ staggerChildren: 0.1, duration: 0.3, type: 'just' }}
          >
            {filteredStudies?.map((study) => (
              <Box
                component={motion.div}
                key={study.id}
                variants={{
                  initial: { opacity: 0, y: 5 },
                  animated: { opacity: 1, y: 0 },
                }}
              >
                <StudyCard
                  id={study.id}
                  date={study.createdAt}
                  status={study.status}
                  imageSrc={study.image.src}
                  name={study.name}
                  description={study.description}
                  onViewDetails={handleViewStudyDetails}
                />
              </Box>
            ))}
          </Stack>
        )}
        {studies?.length === 0 && !isLoading ? (
          <EmptyState
            icon={<NoResultsIcon />}
            fullHeight
            title={t('NoStudies.Title')}
            description={<Trans t={t} i18nKey={'NoStudies.Description'} />}
          />
        ) : null}
      </Stack>
      <StudyDetailsDrawer
        open={isDetailsDrawerOpen}
        onClose={closeDetailsDrawer}
        studyId={selectedStudyId}
        onCloseFinished={handleDetailsDrawerCloseFinised}
      />
    </Box>
  );
};

export { Studies };
