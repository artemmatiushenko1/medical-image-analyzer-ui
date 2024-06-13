import { Language } from '@/libs/enums';
import { ValueOf } from '@/libs/types';
import { useAppStore } from '@/app';
import { LanguageRounded } from '@mui/icons-material';
import {
  Box,
  Button,
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
import { Dialog } from '../dialog';
import { useTranslation } from 'react-i18next';

type ChangeLanguageDialogProps = {
  open: boolean;
  onClose: () => void;
};

const ChangeLanguageDialog = (props: ChangeLanguageDialogProps) => {
  const { open, onClose } = props;

  const { t } = useTranslation('App');
  const { t: tCommon } = useTranslation('Common');

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
      <Dialog.Title>
        <Box sx={styles.title}>
          <HighlightedIcon iconElement={<LanguageRounded />} />
          <Typography variant="h6">{t('Language')}</Typography>
        </Box>
      </Dialog.Title>
      <Dialog.Content>
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
                control={<Radio size="small" />}
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
      </Dialog.Content>
      <Dialog.Actions sx={styles.actions}>
        <Button onClick={onClose} sx={styles.cancelButton}>
          {tCommon('Cancel')}
        </Button>
        <Button variant="contained" onClick={handleSaveClick}>
          {tCommon('Save')}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export { ChangeLanguageDialog };
