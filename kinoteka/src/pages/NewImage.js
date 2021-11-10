import * as React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PreImage from '../components/PreImage';
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

const NewImage = (props) => {
  const URL = process.env.REACT_APP_URL;
  let tempNewItem;
  const layoutContext = useContext(LayoutContext);
  const { theme } = layoutContext;
  const { id } = useParams();
  const [initialValue, setInitialValue] = React.useState({
    isMain: false,
    url: '',
  });
  React.useEffect(() => {
    if (id !== undefined) {
      const urlCurrent = `${URL}/images/` + id;
      new Api().loadOneActor(urlCurrent).then((result) => {
        setInitialValue({
          isMain: result.isMain,
          url: result.url,
        });
      });
    }
  }, []);

  const validationShema = yup.object().shape({
    isMain: yup
      .boolean()
      .typeError('Должно быть boolean')
      .required('Обязательно'),
    url: yup
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
              isMain: values.isMain,
              url: values.url,
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
                    label="isMain"
                    variant="outlined"
                    type={'text'}
                    value={values.isMain}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'isMain'}
                  />
                  {touched.isMain && errors.isMain && <p>{errors.isMain}</p>}
                </Div>
                <Div>
                  <TextField
                    label="Photo"
                    variant="outlined"
                    type={'text'}
                    value={values.url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'url'}
                  />
                  <PreImage image={values.url} />
                  {touched.url && errors.url && <p>{errors.url}</p>}
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

export default NewImage;
