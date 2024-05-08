import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { styles } from './styles';
import {
  AccessTimeFilledRounded,
  CheckCircleRounded,
  EventNote,
  VisibilityRounded,
} from '@mui/icons-material';
import { useState } from 'react';

const IMAGE_SRC =
  'https://prod-images-static.radiopaedia.org/images/1371188/0a1f5edc85aa58d5780928cb39b08659c1fc4d6d7c7dce2f8db1d63c7c737234_big_gallery.jpeg';

const Studies = () => {
  const [tab, setTab] = useState('');

  return (
    <Box sx={styles.root}>
      <Paper sx={{ borderTop: 'none', flex: '22%' }}>
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
              Status
            </Typography>
            <Tabs
              orientation="vertical"
              value={tab}
              onChange={(_, value) => setTab(value)}
            >
              <Tab
                key={1}
                sx={{ pl: 3, maxWidth: 'unset' }}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignSelf: 'flex-start',
                      width: '100%',
                    }}
                  >
                    <CheckCircleRounded color="success" />
                    <Typography
                      fontWeight={500}
                      sx={{ display: 'flex', flex: 1 }}
                    >
                      <span>Completed</span>{' '}
                      <Box
                        component="span"
                        sx={{ marginLeft: 'auto', fontWeight: 600 }}
                      >
                        34
                      </Box>
                    </Typography>
                  </Box>
                }
              />
              <Tab
                key={2}
                sx={{ pl: 3, maxWidth: 'unset' }}
                label={
                  // <Box
                  //   sx={{ display: 'flex', gap: 1, alignSelf: 'flex-start' }}
                  // >
                  //   <AccessTimeFilledRounded color="warning" />
                  //   <Typography fontWeight={500}>Pending: 2</Typography>
                  // </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignSelf: 'flex-start',
                      width: '100%',
                    }}
                  >
                    <AccessTimeFilledRounded color="warning" />
                    <Typography
                      fontWeight={500}
                      sx={{ display: 'flex', flex: 1 }}
                    >
                      <span>Pending</span>{' '}
                      <Box
                        component="span"
                        sx={{ marginLeft: 'auto', fontWeight: 600 }}
                      >
                        2
                      </Box>
                    </Typography>
                  </Box>
                }
              />
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
                fontSize: '14px',
                alignItems: 'center',
                gap: 1,
                color: ({ palette }) => palette.neutral.dark,
              }}
            >
              <EventNote fontSize="inherit" />
              <Typography fontSize="inherit">25 May 2024</Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  width: '140px',
                  height: '80px',
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
            <Box>
              <Button startIcon={<VisibilityRounded />}>View Details</Button>
            </Box>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export { Studies };
