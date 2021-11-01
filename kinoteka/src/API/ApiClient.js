export default function api(data) {
  console.log(data);
}

api.load = function (data, history) {
  const url = 'http://localhost:3000/auth/login';

  async function userLoginFetch() {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      if (response.ok && data.username === 'admin') {
        history.push('/movies');
      } else {
        alert('You sre not admin');
      }
      console.log('Успех:');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  userLoginFetch();
};

api.loadNewActor = function (data, history) {
  const url = 'http://localhost:3000/actors';

  async function loadNewActor() {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      if (response.ok) {
        history.push('/actors');
      } else {
        alert('You are not admin');
      }
      console.log('Успех:');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  loadNewActor();
};

api.loadUpdateActor = function (id, data, history) {
  const url = 'http://localhost:3000/actors/' + id;

  async function loadUpdateActor() {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (response.ok) {
        history.push('/actors');
      } else {
        alert('You are not upload actor');
      }
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  loadUpdateActor();
};

api.loadOneActor = function (id) {
  const url = 'http://localhost:3000/actors/' + id;
  async function loadOneActor() {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  return loadOneActor();
};

api.deleteItem = function (id, table) {
  const url = `http://localhost:3000/${table}/${id}`;

  async function deleteItem() {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('You delete item');
      } else {
        alert('You do not delete item');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  deleteItem();
};
