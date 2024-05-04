import { DeleteOutline, ExpandMoreRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
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

  return (
    <Accordion sx={styles.root}>
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
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export { SelectedDiagnosticAccordion };
