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
import { useState } from 'react';
import { StudyCard, StudyDetailsDrawer } from './libs/components';
import { StudyStatus, studiesApi } from '@/packages/studies';
import { useQuery } from 'react-query';
import { MAX_STUDY_LOADING_PREVIEWS } from './libs/constants';

const IMAGE_SRC =
  'https://prod-images-static.radiopaedia.org/images/1371188/0a1f5edc85aa58d5780928cb39b08659c1fc4d6d7c7dce2f8db1d63c7c737234_big_gallery.jpeg';

const Studies = () => {
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
  const [tab, setTab] = useState<number>(0);
  const detailsDrawerOpen = Boolean(selectedStudyId);

  const { isLoading, data: studies } = useQuery(
    'Studies@create-study',
    studiesApi.getAllStudies,
  );

  const tabs = [
    {
      icon: <AllInboxRounded />,
      count: 36,
      title: 'All',
      key: 'all',
    },
    {
      icon: <CheckCircleRounded />,
      count: 34,
      title: 'Completed',
      key: 'completed',
    },
    {
      icon: <AccessTimeFilledRounded />,
      count: 2,
      title: 'Pending',
      key: 'success',
    },
  ];

  const handleDetailsDrawerClose = () => {
    setSelectedStudyId(null);
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
            onViewDetails={setSelectedStudyId}
          />
        ))}
      </Stack>
      <StudyDetailsDrawer
        open={detailsDrawerOpen}
        onClose={handleDetailsDrawerClose}
        study={{
          id: '3455',
          diagnostic: 'Класифікація COVID-аномалій',
          status: StudyStatus.COMPLETED,
          imageSrc: IMAGE_SRC,
          date: '25 May 2024',
        }}
      />
    </Box>
  );
};

export { Studies };
