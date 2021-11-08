const temp = process.env.REACT_APP_URL;
let token = [];

export class Api {
  url = `${temp}/auth/login`;

  async load(data) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      token = await response.json();
      return response;
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  async loadAllItems(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (response.ok) {
        return json;
      } else {
        alert('You are not admin');
      }
      console.log('Успех:');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  async loadNewActor(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      if (response.ok) {
        return response;
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  async loadUpdateActor(url, id, data) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      await response.json();
      if (response.ok) {
        return response;
      } else {
        alert('You are not upload actor');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  async loadOneActor(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  async deleteItem(url) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      if (response.ok) {
        alert('You delete item');
        return response;
      } else {
        alert('You do not delete item');
      }
      return response;
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
}
