import { ArtTrackRounded, PersonRounded } from '@mui/icons-material';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { StudyInfoFormSectionHeader } from './study-info-form-section-header';
import {
  GENDER_SELECT_OPTIONS,
  STUDY_SUBJECT_SELECT_OPTIONS,
} from './constants';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { StudyInfo } from './types';
import { parseISO } from 'date-fns';

const StudyInfoForm = () => {
  const { control } = useForm<StudyInfo>({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: undefined,
      subject: undefined,
      birthDate: undefined,
    },
  });

  return (
    <Stack component="form" sx={styles.root} onChange={(e) => console.log(e)}>
      <Stack sx={styles.sectionRoot}>
        <StudyInfoFormSectionHeader
          title="Patient information"
          description="Fill in any available information about the patient."
          icon={<PersonRounded color="primary" />}
        />
        <Box sx={styles.fieldsRow}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextField
                required
                fullWidth
                variant="filled"
                label="First name"
                placeholder="Enter patient's first name"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <TextField
                required
                fullWidth
                variant="filled"
                label="Last name"
                placeholder="Enter patient's last name"
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={styles.fieldsRow}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Date of birth"
                slotProps={{
                  textField: { variant: 'filled', fullWidth: true },
                }}
                {...field}
                value={field.value ? parseISO(field.value) : undefined}
                onChange={(e) => {
                  field.onChange(e?.toISOString());
                }}
              />
            )}
          />
          <FormControl fullWidth variant="filled">
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select
                  labelId="gender-select-label"
                  {...field}
                  value={field.value || ''}
                >
                  {GENDER_SELECT_OPTIONS.map(({ key, value, title }) => (
                    <MenuItem key={key} value={value}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>
      </Stack>
      <Stack sx={styles.sectionRoot}>
        <StudyInfoFormSectionHeader
          title="Study metadata"
          description="Choose what is shown on the image and other information."
          icon={<ArtTrackRounded color="primary" />}
        />
        <FormControl variant="filled" fullWidth>
          <InputLabel required id="study-subject-select-label">
            Subject
          </InputLabel>
          <Controller
            control={control}
            name="subject"
            render={({ field }) => (
              <Select
                labelId="study-subject-select-label"
                {...field}
                value={field.value || ''}
              >
                {STUDY_SUBJECT_SELECT_OPTIONS.map(({ key, value, title }) => (
                  <MenuItem key={key} value={value}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
};

export { StudyInfoForm };
