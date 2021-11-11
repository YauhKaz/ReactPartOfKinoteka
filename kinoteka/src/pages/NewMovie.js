import * as React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkmarks from '../components/Checkmarks';
import CheckmarksActor from '../components/CheckmarksActor';
import LayoutContext from '../store/layout-context';
import { Api } from '../API/ApiClient';
import PreImage from '../components/PreImage';
import SelectedCategoryContext from '../store/selected-category-context';
import SelectedActorContext from '../store/selected-actor-context';

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
  const { selectedCategories, setSelectedCategories } = React.useContext(
    SelectedCategoryContext,
  );
  const { selectedActors, setSelectedActors } =
    React.useContext(SelectedActorContext);
  const URL = process.env.REACT_APP_URL;
  let tempNewItem;
  const categoryArray = [];
  const actorsArray = [];
  new Api().loadAllItems(`${URL}/categories/`).then((result) => {
    result.map((item) => categoryArray.push(item.title));
  });
  new Api().loadAllItems(`${URL}/actors/`).then((result) => {
    result.map((item) => actorsArray.push(item.name));
  });
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
        console.log(result);
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
          images: result.images[0].url,
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
            tempNewItem = [];
            let resultActors = [];
            let resultCategories = [];
            if (selectedActors.length !== 0) {
              new Api().loadAllItems(`${URL}/actors`).then((result) => {
                selectedActors.map((elem) => {
                  result.map((item) => {
                    if (item.name === elem) {
                      resultActors.push({ id: item.id });
                    }
                  });
                });
              });
            }
            if (selectedCategories.length !== 0) {
              new Api().loadAllItems(`${URL}/categories`).then((result) => {
                selectedCategories.map((elem) => {
                  result.map((item) => {
                    if (item.title === elem) {
                      resultCategories.push({ id: item.id });
                    }
                  });
                });
              });
            }
            if (values.images.length !== 0) {
              new Api().loadNewImage(values.images).then(() => {
                new Api().loadAllItems(`${URL}/images`).then((result) => {
                  tempNewItem.push({
                    title: values.title,
                    description: values.description,
                    createAt: values.createAt,
                    updateAt: values.updateAt,
                    year: Number(values.year),
                    images: [{ id: result[result.length - 1].id }],
                    actors: resultActors,
                    categories: resultCategories,
                  });
                  setSelectedCategories([]);
                  setSelectedActors([]);
                  if (id === undefined) props.loadRow(tempNewItem[0]);
                  else props.editRow(id, tempNewItem[0]);
                });
              });
            } else {
              tempNewItem.push({
                title: values.title,
                description: values.description,
                createAt: values.createAt,
                updateAt: values.updateAt,
                year: Number(values.year),
                images: [],
                actors: resultActors,
                categories: resultCategories,
              });
              if (id === undefined) props.loadRow(tempNewItem[0]);
              else props.editRow(id, tempNewItem[0]);
            }
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
                <Div>
                  <TextField
                    label="Date of Create"
                    type="date"
                    defaultValue={values.createAt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'createAt'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {touched.createAt && errors.createAt && (
                    <p>{errors.createAt}</p>
                  )}
                </Div>
                <Div>
                  <TextField
                    label="Date of Update"
                    type="date"
                    defaultValue={values.updateAt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'updateAt'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {touched.updateAt && errors.updateAt && (
                    <p>{errors.updateAt}</p>
                  )}
                </Div>
                <Div>
                  <TextField
                    label="Year"
                    variant="outlined"
                    type={'text'}
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={'year'}
                  />
                  {touched.year && errors.year && <p>{errors.year}</p>}
                </Div>
                <Div>
                  <TextField
                    label="Images"
                    variant="outlined"
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
                  <CheckmarksActor actorsArray={actorsArray} />
                  {touched.actors && errors.actors && <p>{errors.actors}</p>}
                </Div>
                <Div>
                  {touched.categories && errors.categories && (
                    <p>{errors.categories}</p>
                  )}
                  <Checkmarks categoryArray={categoryArray} />
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
