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
  Tooltip,
  Typography,
} from '@mui/material';
import { selectedDiagnosticAccordion as styles } from './styles';
import { useId } from 'react';

type SelectedDiagnosticAccordionProps = {
  id: string;
  title: string;
  onDelete: (id: string) => void;
};

const SelectedDiagnosticAccordion = (
  props: SelectedDiagnosticAccordionProps,
) => {
  const { title, onDelete, id } = props;

  const modelSelectId = useId();

  const handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.stopPropagation();

    onDelete(id);
  };

  const AI_MODEL_SELECT_OPTIONS = [
    { key: '1', title: 'Feedforward Neural Networks (FNN)', value: '1' },
    { key: '2', title: 'Recurrent Neural Networks (RNN)', value: '2' },
    { key: '3', title: 'Generative Adversarial Networks (GAN)', value: '3' },
  ];

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
              Choose AI model
            </Typography>
            <Tooltip title="Results of diagnostic may vary depending on which model you choose. It's recommended to choose multiple models if possible.">
              <InfoOutlined sx={styles.infoIcon} />
            </Tooltip>
          </Box>
          <Box sx={styles.selectWrapper}>
            <FormControl size="small" variant="outlined" fullWidth>
              <Select
                multiple
                id={modelSelectId}
                defaultValue={[AI_MODEL_SELECT_OPTIONS[0].value]}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const option = AI_MODEL_SELECT_OPTIONS.find(
                        (item) => item.value === value,
                      );

                      return (
                        <Chip
                          sx={{ alignSelf: 'center' }}
                          key={value}
                          label={option?.title}
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {AI_MODEL_SELECT_OPTIONS.map(({ key, value, title }) => (
                  <MenuItem key={key} value={value}>
                    <Typography variant="body2">{title}</Typography>
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
