import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import LayoutContext from '../store/layout-context';

const NewItem = () => {
  const history = useHistory();
  let tempNewItem;
  const layoutContext = useContext(LayoutContext);
  let theme = layoutContext.theme;

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
      .min(3, 'Короткое описание')
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
          width: '800px',
          height: '400px',
          background: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Formik
          initialValues={{
            name: '',
            dob: '',
            sex: '',
            photoUrl: '',
          }}
          validateOnBlur
          validationSchema={validationShema}
          onSubmit={(values) => {
            tempNewItem = [];
            tempNewItem.push({
              name: values.name,
              dob: values.dob,
              sex: values.sex,
              photoUrl: values.photoUrl,
            });

            const url = 'http://localhost:3000/actors';

            async function loadNewActor() {
              try {
                const response = await fetch(url, {
                  method: 'POST',
                  body: JSON.stringify(tempNewItem[0]),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                const json = await response.json();
                if (response.ok) {
                  history.push('/main');
                } else {
                  alert('You are not admin');
                }
                console.log('Успех:', JSON.stringify(json));
              } catch (error) {
                console.error('Ошибка:', error);
              }
            }
            loadNewActor();
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
              <section>
                <div>
                  <label htmlFor="name"> Name </label>
                  <br />
                  <input
                    type={'text'}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'name'}
                  />
                  {touched.name && errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="dob">DoB</label>
                  <input
                    type={'date'}
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'dob'}
                  />
                  {touched.dob && errors.dob && <p>{errors.dob}</p>}
                </div>
                <div>
                  <label htmlFor="sex">Sex</label>
                  <input
                    type={'text'}
                    value={values.poster}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'sex'}
                  />
                  {touched.sex && errors.sex && <p>{errors.sex}</p>}
                </div>
                <div>
                  <label htmlFor="photoUrl">photoUrl</label>
                  <input
                    type={'text'}
                    value={values.photoUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'photoUrl'}
                  />
                  {touched.photoUrl && errors.photoUrl && (
                    <p>{errors.photoUrl}</p>
                  )}
                </div>
                <div>
                  <button onClick={handleSubmit} type={'submit'}>
                    Submit
                  </button>
                  <input onClick={handleReset} type="button" value="Clear" />
                </div>
              </section>
            </>
          )}
        </Formik>
      </Box>
    </ThemeProvider>
  );
};

export default NewItem;
