import * as React from 'react';
import { useState, useContext } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import SelectedActorContext from '../store/selected-actor-context';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks(props) {
  const [personName, setPersonName] = useState([]);
  const [names] = useState(props.actorsArray);
  const { setSelectedActors } = useContext(SelectedActorContext);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedActors(value);
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Actors" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={personName.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
