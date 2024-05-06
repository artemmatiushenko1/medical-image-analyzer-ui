import { DeleteOutline, ExpandMoreRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { selectedDiagnosticAccordion as styles } from './styles';

type SelectedDiagnosticAccordionProps = {
  id: string;
  title: string;
  onDelete: (id: string) => void;
};

const SelectedDiagnosticAccordion = (
  props: SelectedDiagnosticAccordionProps,
) => {
  const { title, onDelete, id } = props;

  const handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.stopPropagation();

    onDelete(id);
  };

  const ARCHITECTURE_OPTIONS = [
    { key: '1', title: 'Feedforward Neural Networks (FNN)', value: '1' },
    { key: '2', title: 'Recurrent Neural Networks (RNN)', value: '2' },
    { key: '3', title: 'Generative Adversarial Networks (GAN)', value: '3' },
  ];

  return (
    <>
      <Accordion defaultExpanded sx={styles.root}>
        <AccordionSummary expandIcon={<ExpandMoreRounded />}>
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
              onClick={handleDeleteButtonClick}
            >
              <DeleteOutline />
            </IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl size="small" variant="outlined" fullWidth>
            <InputLabel htmlFor="test-select-label">
              Model Architecture
            </InputLabel>
            <Select id="test-select-label" label="Model Architecture">
              {ARCHITECTURE_OPTIONS.map(({ key, value, title }) => (
                <MenuItem key={key} value={value}>
                  <Typography variant="body2">{title}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export { SelectedDiagnosticAccordion };
