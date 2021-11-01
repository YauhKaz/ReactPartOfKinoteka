import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from '@material-table/core';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { tableIcons } from '../components/TableIcons';
import LayoutContext from '../store/layout-context';

export default function Table(props) {
  const layoutContext = useContext(LayoutContext);
  let theme = layoutContext.theme;
  const history = useHistory();

  return (
    <>
      <MaterialTable
        style={{
          color: `${theme.palette.primary.main}`,
          backgroundColor: `${theme.palette.background.paper}`,
        }}
        options={{
          headerStyle: {
            backgroundColor: `${theme.palette.background.paper}`,
            color: `${theme.palette.primary.main}`,
          },
          rowStyle: {
            backgroundColor: `${theme.palette.background.paper}`,
            color: `${theme.palette.primary.main}`,
          },
        }}
        icons={tableIcons}
        columns={props.column}
        data={props.data}
        title={props.nameOfTable}
        actions={[
          {
            icon: AddIcon,
            tooltip: 'Add Item',
            isFreeAction: true,
            onClick: () => {
              history.push('/actors/new');
            },
          },
          {
            icon: DeleteIcon,
            tooltip: 'Delete Item',
            onClick: (e, rowData) => {
              props.deleteRow(rowData.id);
            },
          },
          {
            icon: EditIcon,
            tooltip: 'Edit Item',
            onClick: (e, rowData) => {
              history.push(`/actors/${rowData.id}`);
            },
          },
        ]}
      />
    </>
  );
}
