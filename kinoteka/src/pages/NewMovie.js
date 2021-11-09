import * as React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Checkmarks from '../components/Checkmarks';
import LayoutContext from '../store/layout-context';
import { Api } from '../API/ApiClient';
import PreImage from '../components/PreImage';

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
  width: 50%;
`;

const NewItem = (props) => {
  const URL = process.env.REACT_APP_URL;
  let tempNewItem;
  // const categoryArray = [];
  // new Api().loadAllItems(`${URL}/categories/`).then((result) => {
  //   result.map((item) => categoryArray.push(item.title));
  //   console.log(categoryArray);
  // });
  const layoutContext = useContext(LayoutContext);
  const { theme } = layoutContext;
  const { id } = useParams();
  const [initialValue, setInitialValue] = React.useState({
    title: '',
    description: '',
    createAt: '',
    updateAt: '',
    year: '',
    images: [],
    actors: [],
    categories: [],
  });
  React.useEffect(() => {
    if (id !== undefined) {
      const url = `${URL}/movies/` + id;
      new Api().loadOneActor(url).then((result) => {
        const dateCreate = new Date(result.createAt);
        const dateUpdate = new Date(result.updateAt);
        const monthCreate =
          dateCreate.getMonth() + 1 < 10
            ? `0${dateCreate.getMonth() + 1}`
            : `${dateCreate.getMonth() + 1}`;
        const monthUpdate =
          dateUpdate.getMonth() + 1 < 10
            ? `0${dateUpdate.getMonth() + 1}`
            : `${dateUpdate.getMonth() + 1}`;
        const dayCreate =
          dateCreate.getDate() < 10
            ? `0${dateCreate.getDate()}`
            : `${dateCreate.getDate()}`;
        const dayUpdate =
          dateUpdate.getDate() < 10
            ? `0${dateUpdate.getDate()}`
            : `${dateUpdate.getDate()}`;
        setInitialValue({
          title: result.title,
          description: result.description,
          createAt: `${dateCreate.getFullYear()}-${monthCreate}-${dayCreate}`,
          updateAt: `${dateUpdate.getFullYear()}-${monthUpdate}-${dayUpdate}`,
          year: result.year,
          images: [],
          actors: [],
          categories: [],
        });
      });
    }
  }, []);

  const validationShema = yup.object().shape({
    title: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательно')
      .min(3, 'Короткое название'),
    description: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательно')
      .min(3, 'Короткое описание')
      .max(150, 'Длинное описание'),
    createAt: yup.date().required('Обязательно'),
    updateAt: yup.date().required('Обязательно'),
    year: yup.string().typeError('Должно быть числом').required('Обязательно'),
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          margin: 'auto auto',
          width: '800px',
          height: '600px',
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
              createAt: values.createAt,
              updateAt: values.updateAt,
              year: Number(values.year),
              images: [{ id: Number(values.images) }],
              actors: [],
              categories: [],
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
                  {/* <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    type={'text'}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'title'}
                  /> */}
                  <label htmlFor="title">Title</label>
                  <input
                    type={'text'}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'title'}
                  />
                  {touched.title && errors.title && <p>{errors.title}</p>}
                </Div>
                <Div>
                  {/* <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue="Description"
                    type={'text'}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'description'}
                  /> */}
                  <label htmlFor="description">Description</label>
                  <input
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
                <Div>
                  <label htmlFor="createAt">Date of Create</label>
                  <input
                    type={'date'}
                    value={values.createAt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'createAt'}
                  />
                  {touched.createAt && errors.createAt && (
                    <p>{errors.createAt}</p>
                  )}
                </Div>
                <Div>
                  <label htmlFor="updateAt">Date of Update</label>
                  <input
                    type={'date'}
                    value={values.updateAt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'updateAt'}
                  />
                  {touched.updateAt && errors.updateAt && (
                    <p>{errors.updateAt}</p>
                  )}
                </Div>
                <Div>
                  <label htmlFor="year">Year</label>
                  <input
                    type={'text'}
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'year'}
                  />
                  {touched.year && errors.year && <p>{errors.year}</p>}
                </Div>
                <Div>
                  <label htmlFor="images">Images</label>
                  <input
                    type={'text'}
                    value={values.images}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'images'}
                  />
                  <PreImage image={values.images} />
                  {touched.images && errors.images && <p>{errors.images}</p>}
                </Div>
                <Div>
                  <label htmlFor="actors">Actors</label>
                  <input
                    type={'text'}
                    value={values.actors}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'actors'}
                  />
                  {touched.actors && errors.actors && <p>{errors.actors}</p>}
                </Div>
                <Div>
                  <label htmlFor="categories">Categories</label>
                  <input
                    type={'text'}
                    value={values.categories}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'categories'}
                  />
                  {touched.categories && errors.categories && (
                    <p>{errors.categories}</p>
                  )}
                  {/* <Checkmarks categoryArray={categoryArray} /> */}
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
