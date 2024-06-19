import {
  CloseRounded,
  ExpandMoreRounded,
  InfoOutlined,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectProps,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { selectedDiagnosticAccordion as styles } from '../choose-diagnostics/styles';
import { useId } from 'react';
import { useNewStudyStore } from '@/pages/new-study/store';
import { heather } from '@/libs/theme/colors';
import { useTranslation } from 'react-i18next';
import { Model } from '@/packages/diagnostics';
import { formatVersionString } from '@/libs/helpers';

type SelectedDiagnosticAccordionProps = {
  id: string;
  title: string;
  deleteDisabled: boolean;
  diagnosticId: string;
  models: Model[];

  onDelete: (id: string) => void;
};

const SelectedDiagnosticAccordion = (
  props: SelectedDiagnosticAccordionProps,
) => {
  const {
    title,
    onDelete,
    id,
    deleteDisabled = false,
    models: availableModels,
    diagnosticId,
  } = props;

  const { t } = useTranslation('NewStudy');

  const modelSelectId = useId();

  const selectedModelIds = useNewStudyStore(
    (state) => state.selectedModelIds[diagnosticId] ?? [],
  );

  const updateSelectedModelIds = useNewStudyStore(
    (state) => state.updateSelectedModelIds,
  );

  const handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.stopPropagation();

    onDelete(id);
  };

  const handleModelSelectChange: SelectProps<string[]>['onChange'] = (e) => {
    if (Array.isArray(e.target.value)) {
      updateSelectedModelIds(diagnosticId, e.target.value);
    }
  };

  return (
    <>
      <Accordion defaultExpanded sx={styles.root}>
        <AccordionSummary
          expandIcon={
            <ExpandMoreRounded
              sx={{ color: ({ palette }) => palette.neutral.main }}
            />
          }
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              {title}
            </Typography>
            <Tooltip
              title={
                deleteDisabled ? t('StudyMustContainAtLeastOneDiagnostic') : ''
              }
            >
              <span>
                <IconButton
                  size="small"
                  disabled={deleteDisabled}
                  className="delete-icon"
                  sx={{ color: ({ palette }) => palette.neutral.main }}
                  onClick={handleDeleteButtonClick}
                >
                  <CloseRounded />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography
              variant="caption"
              fontSize="13px"
              sx={{ marginBottom: 1, display: 'inline-block' }}
            >
              {t('ChooseAiModel')}
            </Typography>
            <Tooltip title={t('ModelSelectTooltip')}>
              <InfoOutlined sx={styles.infoIcon} />
            </Tooltip>
          </Box>
          <Box sx={styles.selectWrapper}>
            <FormControl size="small" variant="outlined" fullWidth>
              <Select
                multiple
                id={modelSelectId}
                value={selectedModelIds}
                onChange={handleModelSelectChange}
                MenuProps={{
                  sx: {
                    '& .MuiList-root': {
                      gap: 0.5,
                      display: 'flex',
                      flexDirection: 'column',
                    },
                  },
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const option = availableModels.find(
                        (model) => model.id === value,
                      );

                      return (
                        <Chip
                          sx={{
                            alignSelf: 'center',
                            backgroundColor: heather[100],
                            color: heather[800],
                          }}
                          key={value}
                          label={option?.name}
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {availableModels.map(
                  ({ id, name, description, currentVersion }) => (
                    <MenuItem key={id} value={id}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                        alignItems="center"
                      >
                        <Stack>
                          <Typography variant="body2">{name}</Typography>
                          <Typography variant="caption">
                            {description}
                          </Typography>
                        </Stack>
                        <Box>
                          <Chip
                            sx={{
                              color: ({ palette }) => palette.primary.main,
                              backgroundColor: ({ palette }) =>
                                alpha(palette.primary.main, 0.1),
                              border: ({ palette }) =>
                                `1px solid ${palette.primary.main}`,
                            }}
                            color="primary"
                            label={
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <Box
                                  sx={{
                                    width: '6px',
                                    height: '6px',
                                    backgroundColor: 'currentColor',
                                    borderRadius: '100px',
                                  }}
                                />
                                {currentVersion && (
                                  <Typography
                                    fontSize="inherit"
                                    color="text.primary"
                                  >
                                    {formatVersionString(
                                      currentVersion.version,
                                    )}
                                  </Typography>
                                )}
                              </Stack>
                            }
                          />
                        </Box>
                      </Stack>
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export { SelectedDiagnosticAccordion };
