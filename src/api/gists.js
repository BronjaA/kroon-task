import axios from "axios";

export default {
  get: (since, per_page, page) => {
    return axios.get("https://api.github.com/gists/public", {
      params: { since, per_page, page },
    });
  },
};
