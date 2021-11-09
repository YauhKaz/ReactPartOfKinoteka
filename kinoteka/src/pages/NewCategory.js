import * as React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LayoutContext from '../store/layout-context';
import { Api } from '../API/ApiClient';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 10px 0px;
  & div {
    min-width: 100%;
  }
`;

const NewCategory = (props) => {
  const URL = process.env.REACT_APP_URL;
  let tempNewItem;
  const layoutContext = useContext(LayoutContext);
  const { theme } = layoutContext;
  const { id } = useParams();
  const [initialValue, setInitialValue] = React.useState({
    title: '',
    description: '',
  });
  React.useEffect(() => {
    if (id !== undefined) {
      const urlCurrent = `${URL}/categories/` + id;
      new Api().loadOneActor(urlCurrent).then((result) => {
        setInitialValue({
          title: result.title,
          description: result.description,
        });
      });
    }
  }, []);

  const validationShema = yup.object().shape({
    title: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательно')
      .min(1, 'Короткое описание')
      .max(150, 'Длинное описание'),
    description: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательно')
      .min(3, 'Короткое описание')
      .max(150, 'Длинное описание'),
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          margin: 'auto auto',
          width: '800px',
          height: '400px',
          background: 'white',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Formik
          initialValues={initialValue}
          validateOnBlur
          validationSchema={validationShema}
          enableReinitialize
          onSubmit={(values) => {
            tempNewItem = [];
            tempNewItem.push({
              title: values.title,
              description: values.description,
            });
            if (id === undefined) props.loadRow(tempNewItem[0]);
            else props.editRow(id, tempNewItem[0]);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            handleReset,
          }) => (
            <>
              <Section>
                <Div>
                  <TextField
                    label="Title"
                    variant="outlined"
                    type={'text'}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'title'}
                  />
                  {touched.title && errors.title && <p>{errors.title}</p>}
                </Div>
                <Div>
                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue="Description"
                    type={'text'}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'description'}
                  />
                  {touched.description && errors.description && (
                    <p>{errors.description}</p>
                  )}
                </Div>
                <div>
                  <button onClick={handleSubmit} type={'submit'}>
                    Submit
                  </button>
                  <input onClick={handleReset} type="button" value="Clear" />
                </div>
              </Section>
            </>
          )}
        </Formik>
      </Box>
    </ThemeProvider>
  );
};

export default NewCategory;
