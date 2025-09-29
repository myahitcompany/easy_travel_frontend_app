

export const PersistentStorage = {
  // prefix: "ESAYTRAVEL_",
  engine: localStorage,

  getData(key: string, parse: boolean = true) {
    const itemKey = `${key}`;
    const dataStr = this.engine.getItem(itemKey);
    if (dataStr == null || dataStr === "undefined") return null;

    if (parse) return JSON.parse(dataStr);
    return dataStr;
  },

  setData(key: string, value: unknown, stringify: boolean = true) {
    const itemKey = `${key}`;

    // Si stringify est vrai, on transforme la valeur en JSON, sinon on l'enregistre tel quel
    const dataToStore = stringify ? JSON.stringify(value) : (value as string);
    this.engine.setItem(itemKey, dataToStore);
  },

  remove(key: string) {
    const itemKey = `${key}`;
    this.engine.removeItem(itemKey);
  },

  clear() {
    this.engine.clear();
  },
};

export const EphemeralStorage = {
  // prefix: "ESAYTRAVEL_",
  engine: sessionStorage,

  getData(key: string, parse: boolean = true) {
    const itemKey = `${key}`;
    const dataStr = this.engine.getItem(itemKey);
    if (dataStr == null || dataStr === "undefined") return null;

    if (parse) return JSON.parse(dataStr);
    return dataStr;
  },

  setData(key: string, value: unknown, stringify: boolean = true) {
    const itemKey = `${key}`;

    const dataToStore = stringify ? JSON.stringify(value) : (value as string);
    this.engine.setItem(itemKey, dataToStore);
  },

  remove(key: string) {
    const itemKey = `${key}`;
    this.engine.removeItem(itemKey);
  },

  clear() {
    this.engine.clear();
  },
};
