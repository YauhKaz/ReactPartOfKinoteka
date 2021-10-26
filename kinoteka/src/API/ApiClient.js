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
      const json = await response.json();
      if (response.ok && data.username === 'admin') {
        history.push('/main');
      } else {
        alert('You sre not admin');
      }
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  userLoginFetch();
};
