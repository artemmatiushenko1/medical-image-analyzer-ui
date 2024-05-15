import { Language } from '@/libs/enums';
import { ValueOf } from '@/libs/types';
import { useAppStore } from '@/stores/app.store';
import { LanguageRounded } from '@mui/icons-material';
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
import { styles } from './styles';
import { mergeSx } from '@/libs/theme';
import { HighlightedIcon } from '../highlighted-icon';
import { LANGUAGE_DETAILS } from '@/i18n';

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

  const languages = [Language.ENGLISH, Language.UKRAINIAN];

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="xs"
      PaperProps={{
        sx: styles.paper,
      }}
    >
      <DialogTitle>
        <Box sx={styles.title}>
          <HighlightedIcon iconElement={<LanguageRounded />} />
          <Typography variant="h6">Language</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <RadioGroup
          value={language}
          sx={styles.radioGroup}
          onChange={handleLanguageChange}
        >
          {languages.map((item) => {
            const languageDetails = LANGUAGE_DETAILS[item];

            return (
              <FormControlLabel
                key={item}
                sx={mergeSx(
                  styles.languageItem,
                  item === language && styles.languageItemSelected,
                )}
                value={item}
                control={<Radio />}
                labelPlacement="start"
                label={
                  <Box>
                    <Typography>{languageDetails.nativeVariant}</Typography>
                    <Typography variant="caption">
                      {languageDetails.enVariant}
                    </Typography>
                  </Box>
                }
              />
            );
          })}
        </RadioGroup>
      </DialogContent>
      <DialogActions sx={styles.actions}>
        <Button onClick={onClose} sx={styles.cancelButton}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSaveClick}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ChangeLanguageDialog };
