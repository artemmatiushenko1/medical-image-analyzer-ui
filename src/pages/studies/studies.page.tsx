import {
  Box,
  Divider,
  Paper,
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
import { StudyCard } from './libs/components';
import { StudyStatus } from '@/packages/studies';

const IMAGE_SRC =
  'https://prod-images-static.radiopaedia.org/images/1371188/0a1f5edc85aa58d5780928cb39b08659c1fc4d6d7c7dce2f8db1d63c7c737234_big_gallery.jpeg';

const Studies = () => {
  const [tab, setTab] = useState<number>(0);

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

  const studies = [
    {
      diagnostic: 'Детекція аномалій в легенях',
      status: StudyStatus.COMPLETED,
      imageSrc: IMAGE_SRC,
      date: '25 May 2024',
    },
    {
      diagnostic: 'Детекція аномалій в легенях',
      status: StudyStatus.PENDING,
      imageSrc: IMAGE_SRC,
      date: '25 May 2024',
    },
    {
      diagnostic: 'Детекція аномалій в легенях',
      status: StudyStatus.COMPLETED,
      imageSrc: IMAGE_SRC,
      date: '25 May 2024',
    },
  ];

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
                                  color: ({ palette }) => palette.primary.main,
                                  backgroundColor: ({ palette }) =>
                                    alpha(palette.primary.main, 0.1),
                                }
                              : {}),
                          }}
                        >
                          {count}
                        </Box>
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
        {studies.map((study) => (
          <StudyCard
            date={study.date}
            key={study.imageSrc}
            status={study.status}
            imageSrc={study.imageSrc}
            diagnostic={study.diagnostic}
          />
        ))}
      </Stack>
    </Box>
  );
};

export { Studies };
