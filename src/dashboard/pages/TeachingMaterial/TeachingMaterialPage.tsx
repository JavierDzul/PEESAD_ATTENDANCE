// src/pages/TeachingMaterial/TeachingMaterial.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Tab } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Subject } from '../../../interfaces/subject';
import SectionsTab from '../../components/Sections/SectionsTab';
import ActiviesTab from '../../components/Activities/ActiviesTab';
import ScheduledActivitiesTab from '../../components/ScheduledActivities/ScheduledActivitiesTab';
import WeightsTab from '../../components/Weight/WeightsTab';

const TeachingMaterial = () => {
  const location = useLocation();

  const subject = location.state as Subject;
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Material Didáctico para {subject.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Clave: {subject.clave}
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="teaching material tabs">
            <Tab label="Temario" value="1" />
            <Tab label="Actividades" value="2" />
            <Tab label="Actividades Programadas" value="3" />
            <Tab label="Ponderaciones" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SectionsTab subject={subject} />
        </TabPanel>
        <TabPanel value="2">
          <Typography variant="h6" gutterBottom>Actividades</Typography>

          <ActiviesTab subject={subject} />

        </TabPanel>
        <TabPanel value="3">
          <ScheduledActivitiesTab subject={subject} />
        </TabPanel>
        <TabPanel value="4">
          <WeightsTab subject={subject} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TeachingMaterial;