export default {
  async getAllProducts() {
    return fetch('names.json')
      .then(resp => resp.json())
  },
  async getAvailableProducts() {
    return fetch('data.json')
      .then(resp => resp.json())
  },
}
