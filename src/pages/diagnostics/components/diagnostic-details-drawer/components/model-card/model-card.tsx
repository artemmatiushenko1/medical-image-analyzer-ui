import {
  DeleteRounded,
  ManageHistoryRounded,
  MoreVertRounded,
} from '@mui/icons-material';
import {
  Card,
  CardContent,
  IconButton,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { styles } from './styles';
import { useMenuPopover } from '@/libs/hooks';
import { formatVersionString } from '@/libs/helpers';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem } from '@/libs/components';
import {
  useChangeModelStatus,
  useDeleteModel,
} from '@/pages/diagnostics/libs/queries';
import { ValueOf } from '@/libs/types';
import { ModelStatus } from '@/packages/diagnostics';
import { useDiagnosticsStore } from '@/pages/diagnostics/store';

type ModelCardProps = {
  id: string;
  name: string;
  version: number;
  status: ValueOf<typeof ModelStatus>;

  onViewDetails: () => void;
};

const ModelCard = (props: ModelCardProps) => {
  const { id, name, version, status, onViewDetails } = props;

  const selectedDiagnostic = useDiagnosticsStore(
    (state) => state.selectedDiagnostic,
  );

  if (!selectedDiagnostic) {
    throw new Error('Diagnostic must be set!');
  }

  const { t } = useTranslation('Diagnostics', {
    keyPrefix: 'DiagnosticsDrawer.Stages.DiagnosticDetails',
  });

  const {
    mutate: changeModelStatus,
    isPending,
    variables,
  } = useChangeModelStatus(id);

  const { mutate: deleteModel, isPending: isDeleteModelLoading } =
    useDeleteModel(selectedDiagnostic.id);

  const { open, openMenu, closeMenu, anchorEl } =
    useMenuPopover<HTMLButtonElement>();

  const menuItems: MenuItem[] = [
    {
      icon: ManageHistoryRounded,
      name: t('ModelCard.ViewDetailsItem'),
      onClick: onViewDetails,
    },
    {
      icon: DeleteRounded,
      name: 'Delete',
      onClick: () => deleteModel(id),
      loading: isDeleteModelLoading,
    },
  ];

  const handleEnabledChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    changeModelStatus({
      status: checked ? ModelStatus.ENABLED : ModelStatus.DISABLED,
    });
  };

  return (
    <Card sx={styles.root}>
      <CardContent sx={styles.content}>
        <Stack flex={1}>
          <Typography
            component="div"
            fontWeight={500}
            fontSize={16}
            noWrap
            maxWidth={200}
          >
            {name}
          </Typography>
          <Typography variant="caption">{t('ModelCard.NameLabel')}</Typography>
        </Stack>
        <Stack flex={0.33}>
          <Typography component="div" fontWeight={500} fontSize={16}>
            {formatVersionString(version)}
          </Typography>
          <Typography variant="caption">
            {t('ModelCard.VersionLabel')}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} flex={0.33}>
          <Stack spacing={0.5}>
            <Switch
              color="success"
              size="small"
              checked={
                isPending
                  ? variables.status === ModelStatus.ENABLED
                  : status === ModelStatus.ENABLED
              }
              onChange={handleEnabledChange}
            />
            <Typography variant="caption">
              {t('ModelCard.EnabledLabel')}
            </Typography>
          </Stack>
          <IconButton
            onClick={openMenu}
            sx={{ color: ({ palette }) => palette.neutral.dark }}
          >
            <MoreVertRounded />
          </IconButton>
        </Stack>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={closeMenu}
          items={menuItems}
        />
      </CardContent>
    </Card>
  );
};

const ModelCardSkeleton = () => {
  const spacing = 0.35;

  return (
    <Card sx={styles.root}>
      <CardContent sx={{ ...styles.content, gap: 2 }}>
        <Stack flex={1} spacing={spacing}>
          <Typography component="div" fontWeight={500} fontSize={16}>
            <Skeleton />
          </Typography>
          <Typography component="div" variant="caption">
            <Skeleton />
          </Typography>
        </Stack>
        <Stack flex={0.33} spacing={spacing}>
          <Typography component="div" fontWeight={500} fontSize={16}>
            <Skeleton />
          </Typography>
          <Typography component="div" variant="caption">
            <Skeleton />
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} flex={0.33}>
          <Stack spacing={spacing}>
            <Skeleton component="div" variant="rounded">
              <Switch size="small" />
            </Skeleton>
            <Typography component="div" variant="caption">
              <Skeleton />
            </Typography>
          </Stack>
          <Skeleton component="div" variant="circular">
            <IconButton>
              <MoreVertRounded />
            </IconButton>
          </Skeleton>
        </Stack>
      </CardContent>
    </Card>
  );
};

ModelCard.Skeleton = ModelCardSkeleton;

export { ModelCard };
