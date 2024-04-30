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
          <Typography>{title}</Typography>
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </Accordion>
  );
};

export { SelectedDiagnosticAccordion };
