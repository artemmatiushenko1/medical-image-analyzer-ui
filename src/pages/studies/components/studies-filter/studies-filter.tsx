import { ValueOf } from '@/libs/types';
import { StudyStatus } from '@/packages/studies';
import {
  Box,
  Skeleton,
  Tab,
  Tabs,
  TabsOwnProps,
  Typography,
  alpha,
} from '@mui/material';

type ValueType = ValueOf<typeof StudyStatus> | null;

type StudiesFilterProps = {
  value: ValueType;
  isLoading: boolean;
  onChange: (tab: ValueType) => void;
  tabs: {
    key: ValueType;
    count: number;
    title: string;
    icon: React.ReactNode;
  }[];
};

const StudiesFilter = (props: StudiesFilterProps) => {
  const { value, onChange, tabs, isLoading } = props;

  const handleTabChange: TabsOwnProps['onChange'] = (_, tab) => {
    onChange(tab);
  };

  return (
    <Tabs value={value} orientation="vertical" onChange={handleTabChange}>
      {tabs.map(({ key, count, title, icon }) => (
        <Tab
          disabled={isLoading}
          key={key}
          value={key}
          sx={{
            pl: 3,
            maxWidth: 'unset',
            textTransform: 'capitalize',
            color: ({ palette }) =>
              palette.mode === 'dark'
                ? palette.neutral.dark
                : palette.neutral.main,
            '&.Mui-selected': {
              color: ({ palette }) =>
                palette.mode === 'dark'
                  ? palette.neutral.light
                  : palette.neutral.dark,
            },
          }}
          label={
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignSelf: 'flex-start',
                width: '100%',
                fontSize: '15px',
              }}
            >
              {icon}
              <Typography
                fontWeight={500}
                sx={{ display: 'flex', flex: 1, fontSize: 'inherit' }}
              >
                <span>{title}</span>{' '}
                {isLoading ? (
                  <Skeleton
                    width={25}
                    height={25}
                    variant="circular"
                    sx={{ marginLeft: 'auto' }}
                  />
                ) : (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 'auto',
                      fontWeight: 600,
                      width: '25px',
                      height: '25px',
                      borderRadius: '100px',
                      fontSize: '14px',
                      ...(key === value
                        ? {
                            color: ({ palette }) => palette.primary.main,
                            backgroundColor: ({ palette }) =>
                              alpha(palette.primary.main, 0.1),
                          }
                        : {}),
                    }}
                  >
                    {count}
                  </Box>
                )}
              </Typography>
            </Box>
          }
        />
      ))}
    </Tabs>
  );
};

export { StudiesFilter };
