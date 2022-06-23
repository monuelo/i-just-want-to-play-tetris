class API {
  constructor(url) {
    this.baseURL = url
      ? url
      : 'https://i-just-want-to-play-tetris.herokuapp.com';
  }

  async GET(route) {
    try {
      const response = await fetch(this.baseURL + route);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async POST(route, content) {
    try {
      const url = this.baseURL + route;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(content),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      alert('Oops, there has been an error. Please try again.\n\n' + error);
      throw new Error(error);
    }
  }
}
