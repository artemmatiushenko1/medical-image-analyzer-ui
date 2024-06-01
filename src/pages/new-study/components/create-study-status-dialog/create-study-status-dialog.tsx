import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/app';
import { useCreateStudy } from '@/packages/studies';
import { Dialog, SuccessCheckmark } from '@/libs/components';
import { useTranslation } from 'react-i18next';

const CreateStudyStatusDialog = () => {
  const { t } = useTranslation('NewStudy');

  const navigate = useNavigate();

  const { isLoading, isSuccess } = useCreateStudy();

  const handleOkClick = () => {
    navigate(AppRoute.HOME);
  };

  const getLoadingTypography = () => {
    return (
      <Stack textAlign="center">
        <Typography variant="h6">
          {t('CreateStudyStatusDialog.CreatingNewStudy')}
        </Typography>
        <Typography variant="caption">
          {t('CreateStudyStatusDialog.ItMightTakeAMoment')}
        </Typography>
      </Stack>
    );
  };

  const getSuccessTypography = () => {
    return (
      <Stack textAlign="center">
        <Typography variant="h6">
          {t('CreateStudyStatusDialog.StudyWasSuccessullyCreated')}
        </Typography>
        <Typography variant="caption">
          {t(
            'CreateStudyStatusDialog.YouCanTrackTheStudyStatusOnTheReportsPage',
          )}
        </Typography>
      </Stack>
    );
  };

  return (
    <Dialog open maxWidth="lg">
      <Dialog.Content sx={styles.dialogContent}>
        <Stack alignItems="center" gap={4}>
          {isLoading && (
            <>
              <CircularProgress size="45px" />
              {getLoadingTypography()}
            </>
          )}
          {isSuccess && (
            <>
              <SuccessCheckmark />
              {getSuccessTypography()}
              <Button variant="contained" onClick={handleOkClick}>
                {t('Ok')}
              </Button>
            </>
          )}
        </Stack>
      </Dialog.Content>
    </Dialog>
  );
};

export { CreateStudyStatusDialog };
