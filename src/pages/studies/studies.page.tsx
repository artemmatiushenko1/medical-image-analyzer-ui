import {
  Box,
  Chip,
  Divider,
  IconButton,
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
  EventNote,
  MoreHoriz,
} from '@mui/icons-material';
import { useState } from 'react';

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
      <Stack sx={{ flex: '78%', p: 3 }}>
        <Paper sx={{ borderRadius: ({ shape }) => shape.borderRadius, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
            <Box
              sx={{
                display: 'flex',
                // fontSize: '14px',
                alignItems: 'center',
                gap: 1,
                color: ({ palette }) => palette.neutral.dark,
              }}
            >
              <EventNote fontSize="inherit" />
              <Typography variant="caption">25 May 2024</Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  width: '120px',
                  height: '65px',
                  overflow: 'hidden',
                  borderRadius: ({ shape }) => shape.borderRadius,
                }}
              >
                <Box
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  component="img"
                  src={IMAGE_SRC}
                />
              </Box>
            </Box>
            <Stack>
              <Typography variant="caption">Name</Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                Lungs study
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption">Diagnostics</Typography>
              <Stack>
                <Typography variant="subtitle2" fontWeight={600}>
                  Детекція аномалій в легенях
                </Typography>
                <Typography variant="caption">2+ more</Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'stretch',
                gap: 3,
              }}
            >
              <Chip
                sx={{
                  backgroundColor: 'transparent',
                  py: 2,
                  border: ({ palette }) => `1px solid ${palette.divider}`,
                }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: 100,
                        backgroundColor: ({ palette }) => palette.success.main,
                      }}
                    >
                      &nbsp;
                    </Box>
                    <Typography fontSize="13px" fontWeight={500}>
                      Completed
                    </Typography>
                  </Box>
                }
              />
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export { Studies };
