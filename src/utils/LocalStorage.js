export default class {
  static save(key, val, stringify = true) {
    if (stringify) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
        return true;
      } catch (e) {
        return false;
      }
    }

    localStorage.setItem(key, val);
    return true;
  }

  static load(key, parse = true) {
    try {
      const str = localStorage.getItem(key);
      if (parse) {
        return JSON.parse(str);
      }
      return str;
    } catch (e) {
      return null;
    }
  }
}
