import { Study, StudyStatus } from '@/packages/studies';
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
import {
  CONFIDENCE_PROGRESS_SIZE,
  CONFIDENCE_PROGRESS_THICKNESS,
} from './constants';

type StudyDetailsDrawerProps = {
  open: boolean;
  study: Study;

  onClose: () => void;
};

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
              #{study.id}
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack gap={3}>
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
                height: 'auto',
                width: '450px',
                objectFit: 'contain',
              }}
            >
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
                src={study.imageSrc}
              />
            </Box>
          </Stack>
          {study.status === StudyStatus.PENDING && (
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
                  There's no result available yet.
                  <br /> The image is still being examined by AI.
                </Typography>
              </Stack>
            </Paper>
          )}
          {study.status === StudyStatus.COMPLETED && (
            <Stack gap={3}>
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
                      size={CONFIDENCE_PROGRESS_SIZE}
                      thickness={CONFIDENCE_PROGRESS_THICKNESS}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={87}
                      color="error"
                      size={CONFIDENCE_PROGRESS_SIZE}
                      thickness={CONFIDENCE_PROGRESS_THICKNESS}
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
                        height: CONFIDENCE_PROGRESS_SIZE,
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
                    sx={{
                      color: ({ palette }) => palette.primary.contrastText,
                    }}
                  >
                    Класифікація_COVID-аномалій_
                    {study.date?.replaceAll(' ', '_')}
                    .pdf
                  </Typography>
                  <IconButton
                    sx={{
                      color: ({ palette }) => palette.primary.contrastText,
                    }}
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
          )}
        </Stack>
      </DialogContent>
    </Drawer>
  );
};

export { StudyDetailsDrawer };
