export const parseCookie = <T extends { [key: string]: string }>(cookie: string): Partial<T> =>
  cookie
    .split(" ")
    .map((s) => {
      const [key, value] = s.split("=");
      return { [key]: value.replace(";", "") };
    })
    .reduce((a, b) => ({ ...a, ...b }), {}) as Partial<T>;
