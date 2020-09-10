import { NextApiHandler } from "next";
interface RouteSwitcher {
  get?: NextApiHandler;
  post?: NextApiHandler;
  put?: NextApiHandler;
  delete?: NextApiHandler;
}

export const routeSwitcher = (switcher: RouteSwitcher): NextApiHandler => {
  return async (req, res) => {
    switch (req.method) {
      case "GET":
        if (!switcher.get) break;
        return switcher.get(req, res);
      case "POST":
        if (!switcher.post) break;
        return switcher.post(req, res);
      case "PUT":
        if (!switcher.put) break;
        return switcher.put(req, res);
      case "DELETE":
        if (!switcher.delete) break;
        return switcher.delete(req, res);
    }

    res.statusCode = 404;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ message: "not found", status: 404 }));
  };
};
