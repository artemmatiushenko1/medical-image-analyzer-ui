import {
  Box,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
  alpha,
} from '@mui/material';
import { styles } from './styles';
import {
  AccessTimeFilledRounded,
  AllInboxRounded,
  CheckCircleRounded,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { StudyCard, StudyDetailsDrawer } from './libs/components';
import {
  Study,
  StudyQueryKey,
  StudyStatus,
  studiesApi,
} from '@/packages/studies';
import { useQuery } from 'react-query';
import {
  MAX_STUDY_LOADING_PREVIEWS,
  STUDIES_QUERY_KEY_PREFIX,
} from './libs/constants';
import { createQueryKey } from '@/libs/packages/react-query';

const Studies = () => {
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
  const [tab, setTab] = useState<number>(0);
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(
    Boolean(selectedStudyId),
  );

  const { isLoading, data: studies } = useQuery(
    createQueryKey(STUDIES_QUERY_KEY_PREFIX, StudyQueryKey.GET_ALL_STUDIES),
    studiesApi.getAllStudies,
  );

  const selectedStudy =
    studies?.find((study) => study.id === selectedStudyId) ?? ({} as Study);

  useEffect(() => {
    setDetailsDrawerOpen(selectedStudyId ? true : false);
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
      title: 'All',
      key: 'all',
    },
    {
      icon: <CheckCircleRounded />,
      count: completedStudiesCount?.length ?? 0,
      title: 'Completed',
      key: 'completed',
    },
    {
      icon: <AccessTimeFilledRounded />,
      count: pendingStudiesCount?.length ?? 0,
      title: 'Pending',
      key: 'success',
    },
  ];

  const handleViewStudyDetails = (id: string) => {
    setSelectedStudyId(id);
    setDetailsDrawerOpen(true);
  };

  const handleDetailsDrawerClose = () => {
    setTimeout(() => {
      setSelectedStudyId(null);
    }, 100);
    setDetailsDrawerOpen(false);
  };

  return (
    <Box sx={styles.root}>
      <Paper square sx={{ borderTop: 'none', flex: '22%' }}>
        <Stack>
          <Stack sx={{ p: 3 }}>
            <Typography variant="h6" fontSize="18px" fontWeight={600}>
              My studies
            </Typography>
            <Typography variant="caption">
              All of the studies you've created are here. You can check their
              details from here.
            </Typography>
          </Stack>
          <Divider />
          <Stack sx={{ py: 3, gap: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: ({ palette }) => palette.neutral.main, pl: 3 }}
            >
              Filter
            </Typography>
            <Tabs
              orientation="vertical"
              value={tab}
              onChange={(_, value) => setTab(value)}
            >
              {tabs.map(({ key, count, title, icon }, index) => (
                <Tab
                  disabled={isLoading}
                  key={key}
                  sx={{
                    pl: 3,
                    maxWidth: 'unset',
                    textTransform: 'capitalize',
                    color: ({ palette }) => palette.neutral.main,
                    '&.Mui-selected': {
                      color: ({ palette }) => palette.neutral.dark,
                    },
                  }}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        alignSelf: 'flex-start',
                        width: '100%',
                        fontSize: '15px',
                      }}
                    >
                      {icon}
                      <Typography
                        fontWeight={500}
                        sx={{ display: 'flex', flex: 1, fontSize: 'inherit' }}
                      >
                        <span>{title}</span>{' '}
                        {isLoading ? (
                          <Skeleton
                            width={25}
                            height={25}
                            variant="circular"
                            sx={{ marginLeft: 'auto' }}
                          />
                        ) : (
                          <Box
                            component="span"
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: 'auto',
                              fontWeight: 600,
                              width: '25px',
                              height: '25px',
                              borderRadius: '100px',
                              fontSize: '14px',
                              ...(index === tab
                                ? {
                                    color: ({ palette }) =>
                                      palette.primary.main,
                                    backgroundColor: ({ palette }) =>
                                      alpha(palette.primary.main, 0.1),
                                  }
                                : {}),
                            }}
                          >
                            {count}
                          </Box>
                        )}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Stack>
        </Stack>
      </Paper>
      <Stack sx={{ flex: '78%', p: 3, gap: 3, overflow: 'scroll' }}>
        {isLoading &&
          Array(MAX_STUDY_LOADING_PREVIEWS)
            .fill(crypto.randomUUID)
            .map((_, index) => <StudyCard.Skeleton key={index} />)}
        {studies?.map((study) => (
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
        open={detailsDrawerOpen}
        onClose={handleDetailsDrawerClose}
        study={selectedStudy}
      />
    </Box>
  );
};

export { Studies };
