import { Language } from '@/libs/enums';
import { ValueOf } from '@/libs/types';
import { useAppStore } from '@/stores/app.store';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';

type ChangeLanguageDialogProps = {
  open: boolean;
  onClose: () => void;
};

const ChangeLanguageDialog = (props: ChangeLanguageDialogProps) => {
  const { open, onClose } = props;

  const currentLanguage = useAppStore((state) => state.language);
  const [language, setLanguage] = useState(currentLanguage);

  const changeLanguage = useAppStore((state) => state.changeLanguage);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value as ValueOf<typeof Language>);
  };

  const handleSaveClick = () => {
    changeLanguage(language);
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Change language</Typography>
      </DialogTitle>
      <DialogContent>
        <RadioGroup value={language} onChange={handleLanguageChange}>
          <FormControlLabel
            sx={{ justifyContent: 'space-between', margin: 0 }}
            value="en"
            control={<Radio />}
            labelPlacement="start"
            label="English"
          />
          <FormControlLabel
            sx={{ justifyContent: 'space-between', margin: 0 }}
            value="uk"
            labelPlacement="start"
            control={<Radio />}
            label={
              <Box>
                <Typography>Українська</Typography>
                <Typography variant="caption">Ukrainian</Typography>
              </Box>
            }
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSaveClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export { ChangeLanguageDialog };
