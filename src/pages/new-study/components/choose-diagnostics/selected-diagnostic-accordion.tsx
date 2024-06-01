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
  Tooltip,
  Typography,
} from '@mui/material';
import { selectedDiagnosticAccordion as styles } from './styles';
import { useId } from 'react';
import { useNewStudyStore } from '@/pages/new-study/store';
import { heather } from '@/libs/theme/colors';
import { useTranslation } from 'react-i18next';

type SelectedDiagnosticAccordionProps = {
  id: string;
  title: string;

  onDelete: (id: string) => void;
};

const SelectedDiagnosticAccordion = (
  props: SelectedDiagnosticAccordionProps,
) => {
  const { title, onDelete, id } = props;

  const { t } = useTranslation('NewStudy');

  const modelSelectId = useId();

  const availableModels = useNewStudyStore((state) => state.availableModels);
  const selectedModelIds = useNewStudyStore((state) => state.selectedModelIds);
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
      updateSelectedModelIds(e.target.value);
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
            <IconButton
              size="small"
              className="delete-icon"
              sx={{ color: ({ palette }) => palette.neutral.main }}
              onClick={handleDeleteButtonClick}
            >
              <CloseRounded />
            </IconButton>
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
                value={
                  selectedModelIds.length > 0
                    ? selectedModelIds
                    : [availableModels[0].id]
                }
                onChange={handleModelSelectChange}
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
                {availableModels.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    <Typography variant="body2">{name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export { SelectedDiagnosticAccordion };
