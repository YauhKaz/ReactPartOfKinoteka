import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LayoutContext from '../store/layout-context';
import PreImage from '../components/PreImage';
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

const NewItem = (props) => {
  const URL = process.env.REACT_APP_URL;
  let tempNewItem;
  const layoutContext = useContext(LayoutContext);
  const { theme } = layoutContext;
  const { id } = useParams();
  const [initialValue, setInitialValue] = useState({
    name: '',
    dob: '',
    sex: '',
    photoUrl: '',
  });
  useEffect(() => {
    if (id !== undefined) {
      const url = `${URL}/actors/` + id;
      new Api().loadOneActor(url).then((result) => {
        const date = new Date(result.dob);
        const day =
          date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const month =
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`;
        setInitialValue({
          name: result.name,
          dob: `${date.getFullYear()}-${month}-${day}`,
          sex: result.sex,
          photoUrl: result.photoUrl,
        });
      });
    }
  }, []);

  const handleSubmit = (values) => {
    tempNewItem = [];
    tempNewItem.push({
      name: values.name,
      dob: values.dob,
      sex: values.sex,
      photoUrl: values.photoUrl,
    });
    if (id === undefined) props.loadRow(tempNewItem[0]);
    else props.editRow(id, tempNewItem[0]);
  };

  const validationShema = yup.object().shape({
    name: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательно')
      .min(3, 'Короткое название'),
    dob: yup.date().required('Обязательно'),
    sex: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательно')
      .max(10, 'Длинное описание'),
    photoUrl: yup
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
          width: '100%',
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
            handleSubmit(values);
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
                    label="Name"
                    variant="outlined"
                    type={'text'}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'name'}
                  />
                  {touched.name && errors.name && <p>{errors.name}</p>}
                </Div>
                <Div>
                  <TextField
                    label="Date of Birthday"
                    type="date"
                    defaultValue={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'dob'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {touched.dob && errors.dob && <p>{errors.dob}</p>}
                </Div>
                <Div>
                  <TextField
                    label="Sex"
                    variant="outlined"
                    type={'text'}
                    value={values.sex}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'sex'}
                  />
                  {touched.sex && errors.sex && <p>{errors.sex}</p>}
                </Div>
                <Div>
                  <TextField
                    label="Photo"
                    variant="outlined"
                    type={'text'}
                    value={values.photoUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'photoUrl'}
                  />
                  <PreImage image={values.photoUrl} />
                  {touched.photoUrl && errors.photoUrl && (
                    <p>{errors.photoUrl}</p>
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

export default NewItem;
