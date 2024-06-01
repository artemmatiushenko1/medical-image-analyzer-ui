import { Button, Dialog } from '@/libs/components';
import { UploadIcon } from '@/libs/components/icons';
import { Stack, Typography } from '@mui/material';
import { useDiagnosticDrawerStore } from '../../store';
import { DiagnosticDrawerStage } from '../../enums';
import { ModelVersionHistory } from '../model-version-history';
import { ModelVersion } from '@/packages/diagnostics';

const ModelDetails = () => {
  const selectedModel = useDiagnosticDrawerStore(
    (state) => state.selectedModel,
  );
  const navigateToNextStage = useDiagnosticDrawerStore(
    (state) => state.navigateToNextStage,
  );

  const versions: ModelVersion[] = [
    {
      id: '7',
      revision: 7,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
      notes: '',
    },
    {
      id: '6',
      revision: 6,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
      notes: '',
    },
    {
      id: '5',
      revision: 5,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
      notes: '',
    },
    {
      id: '4',
      revision: 4,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
      notes: '',
    },
    {
      id: '3',
      revision: 3,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
      notes: '',
    },
    {
      id: '2',
      revision: 2,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
      notes: '',
    },
    {
      id: '1',
      revision: 1,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
      notes: '',
    },
  ];

  const handleUploadNewVersionClick = () => {
    navigateToNextStage(DiagnosticDrawerStage.UPLOAD_MODEL_VERSION);
  };

  return (
    <Dialog.Content>
      <Stack spacing={3}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={handleUploadNewVersionClick}
        >
          Upload new version
        </Button>
        <Stack>
          <Typography variant="subtitle2">Version History</Typography>
          <Typography variant="caption">
            All the existing model versions listed below.
          </Typography>
        </Stack>
        {selectedModel && (
          <ModelVersionHistory
            currentVersionId={versions[0].id}
            history={versions}
          />
        )}
      </Stack>
    </Dialog.Content>
  );
};

export { ModelDetails };
