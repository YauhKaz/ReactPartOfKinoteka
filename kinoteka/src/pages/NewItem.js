import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import LayoutContext from '../store/layout-context';
import api from '../API/ApiClient';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 250px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

const NewItem = () => {
  const history = useHistory();
  let tempNewItem;
  const layoutContext = useContext(LayoutContext);
  let theme = layoutContext.theme;
  const { id } = useParams();
  const [initialValue, setInitialValue] = React.useState({
    name: '',
    dob: '',
    sex: '',
    photoUrl: '',
  });
  React.useEffect(() => {
    if (id !== undefined) {
      api.loadOneActor(id).then((result) => {
        let date = new Date(result.dob);
        let day =
          date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        setInitialValue({
          name: result.name,
          dob: `${date.getFullYear()}-${date.getMonth() + 1}-${day}`,
          sex: result.sex,
          photoUrl: result.photoUrl,
        });
      });
    }
  }, []);

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
              name: values.name,
              dob: values.dob,
              sex: values.sex,
              photoUrl: values.photoUrl,
            });
            if (id === undefined) api.loadNewActor(tempNewItem[0], history);
            else api.loadUpdateActor(id, tempNewItem[0], history);
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
                  <label htmlFor="name"> Name </label>
                  <input
                    type={'text'}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'name'}
                  />
                  {touched.name && errors.name && <p>{errors.name}</p>}
                </Div>
                <Div>
                  <label htmlFor="dob">Date of Birthday</label>
                  <input
                    type={'date'}
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'dob'}
                  />
                  {touched.dob && errors.dob && <p>{errors.dob}</p>}
                </Div>
                <Div>
                  <label htmlFor="sex">Sex</label>
                  <input
                    type={'text'}
                    value={values.sex}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'sex'}
                  />
                  {touched.sex && errors.sex && <p>{errors.sex}</p>}
                </Div>
                <Div>
                  <label htmlFor="photoUrl">Photo</label>
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
