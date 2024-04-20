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

const StudyInfoForm = () => {
  return (
    <Stack component="form" sx={styles.root}>
      <Stack sx={styles.sectionRoot}>
        <StudyInfoFormSectionHeader
          title="Patient information"
          description="Fill in any available information about the patient."
          icon={<PersonRounded color="primary" />}
        />
        <Box sx={styles.fieldsRow}>
          <FormControl fullWidth>
            <TextField
              required
              placeholder="Enter patient's first name"
              variant="filled"
              label="First name"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              required
              label="Last name"
              placeholder="Enter patient's last name"
              variant="filled"
            />
          </FormControl>
        </Box>
        <Box sx={styles.fieldsRow}>
          <FormControl fullWidth>
            <DatePicker
              label="Date of birth"
              slots={{
                textField: (props) => <TextField {...props} variant="filled" />,
              }}
            />
          </FormControl>
          <FormControl fullWidth variant="filled">
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select labelId="gender-select-label">
              {GENDER_SELECT_OPTIONS.map(({ key, value, title }) => (
                <MenuItem key={key} value={value}>
                  {title}
                </MenuItem>
              ))}
            </Select>
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
          <Select labelId="study-subject-select-label">
            {STUDY_SUBJECT_SELECT_OPTIONS.map(({ key, value, title }) => (
              <MenuItem key={key} value={value}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export { StudyInfoForm };
