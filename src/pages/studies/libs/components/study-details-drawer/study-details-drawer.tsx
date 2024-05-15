import { Study } from '@/packages/studies';
import { CloseRounded, EventNote } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { DetailItemText } from '../detail-item-text';
import { StudyStatusChip } from '../study-status-chip';

type StudyDetailsDrawerProps = {
  open: boolean;
  study: Study;

  onClose: () => void;
};

const PROGRESS_SIZE = '85px';
const PROGRESS_THICKNESS = 4.5;

const StudyDetailsDrawer = (props: StudyDetailsDrawerProps) => {
  const { open, onClose, study } = props;

  return (
    <Drawer
      PaperProps={{
        sx: {
          borderTopLeftRadius: ({ shape }) => shape.borderRadius * 3,
          borderBottomLeftRadius: ({ shape }) => shape.borderRadius * 3,
          width: '500px',
        },
      }}
      open={open}
      onClose={onClose}
      anchor="right"
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography display="inline-block" fontSize="18px" fontWeight={600}>
              {study.diagnostic}
            </Typography>
            <Typography variant="caption" fontSize="14px" display="block">
              #3455
            </Typography>
          </Box>
          <IconButton>
            <CloseRounded />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <StudyStatusChip status={study.status} />
            <DetailItemText iconComponent={EventNote}>
              {study.date}
            </DetailItemText>
          </Box>
          <Stack gap={2}>
            <Typography
              fontSize="14px"
              fontWeight={600}
              sx={{ color: ({ palette }) => palette.neutral.dark }}
            >
              Image
            </Typography>
            <Box
              sx={{
                borderRadius: ({ shape }) => shape.borderRadius,
                overflow: 'hidden',
                height: '450px',
                width: '450px',
                objectFit: 'contain',
              }}
            >
              {/* Create a separate component to display an image -> it's already duplicated accross multiple places */}
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: '100%',

                  display: 'block',
                }}
                src={study.imageSrc}
              />
            </Box>
          </Stack>
          <Stack gap={3}>
            <Paper
              sx={{
                p: 2,
                borderRadius: ({ shape }) => shape.borderRadius,
              }}
            >
              <Stack sx={{ textAlign: 'center', alignItems: 'center', gap: 2 }}>
                <CircularProgress
                  disableShrink
                  size={20}
                  sx={{ animationDuration: '550ms' }}
                />
                <Typography variant="caption">
                  There's no result available yet. The study is still processing
                  by AI.
                </Typography>
              </Stack>
            </Paper>
            <Stack gap={2}>
              <Typography
                fontSize="14px"
                fontWeight={600}
                sx={{ color: ({ palette }) => palette.neutral.dark }}
              >
                Confidence
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      color: ({ palette }) => palette.error.light,
                    }}
                    size={PROGRESS_SIZE}
                    thickness={PROGRESS_THICKNESS}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={87}
                    color="error"
                    size={PROGRESS_SIZE}
                    thickness={PROGRESS_THICKNESS}
                    sx={{
                      strokeLinecap: 'round',
                      position: 'absolute',
                      inset: 0,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: PROGRESS_SIZE,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontSize="16px"
                      sx={{
                        display: 'inline-block',
                      }}
                    >
                      87.5%
                    </Typography>
                  </Box>
                </Box>
                <Stack>
                  <Typography fontWeight={600}>+ Positive</Typography>
                  <Typography variant="caption">
                    There's a high risk of a disease been studied.
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack gap={2}>
              <Typography
                fontSize="14px"
                fontWeight={600}
                sx={{ color: ({ palette }) => palette.neutral.dark }}
              >
                Report
              </Typography>
              <Paper
                sx={{
                  px: 3,
                  py: 1,
                  pr: 2,
                  backgroundColor: ({ palette }) => palette.primary.main,
                  border: 'none',
                  borderRadius: ({ shape }) => shape.borderRadius,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: ({ palette }) => palette.primary.contrastText }}
                >
                  Класифікація_COVID-аномалій_{study.date.replaceAll(' ', '_')}
                  .pdf
                </Typography>
                <IconButton
                  sx={{ color: ({ palette }) => palette.primary.contrastText }}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="20px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </IconButton>
              </Paper>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Drawer>
  );
};

export { StudyDetailsDrawer };
