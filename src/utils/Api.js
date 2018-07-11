import Axios from "axios";

export default class Pastebin {
  static async post(user, pass, data) {
    try {
      const res = await Axios.put(
        `${process.env.API_HOST}/json/${user}/${pass}`,
        data
      );

      return res;
    } catch (e) {
      return new Error("Could not find file");
    }
  }

  static async load(user, pass) {
    try {
      const res = await Axios.get(
        `${process.env.API_HOST}/json/${user}/${pass}`
      );

      return res;
    } catch (e) {
      return new Error("Could not find file");
    }
  }
}
