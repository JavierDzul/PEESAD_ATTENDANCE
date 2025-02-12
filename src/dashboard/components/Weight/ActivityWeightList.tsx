import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActivityWeight } from '../../../interfaces/weight';

interface ActivityWeightListProps {
  activityWeights: ActivityWeight[];
  onDelete: (id: number) => void;
}

const ActivityWeightList: React.FC<ActivityWeightListProps> = ({ activityWeights, onDelete }) => (
  <List>
    {activityWeights.map((activityWeight) => (
      <ListItem
        key={activityWeight.id}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(activityWeight.id)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={`Actividad: ${activityWeight.scheduledActivity.activity.title}`}
          secondary={`Porcentaje: ${activityWeight.percentage}%`}
        />
      </ListItem>
    ))}
  </List>
);

export default ActivityWeightList;