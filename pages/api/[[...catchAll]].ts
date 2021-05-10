import { NextApiRequest, NextApiResponse } from "next";
import { getNestListener } from "../../backend/main";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // prevent redirect loop
  if (req.url === "/api") {
    req.url = "/api/";
  }

  return new Promise(async (resolve) => {
    const listener = await getNestListener();
    listener(req, res);
    res.on("finish", resolve);
  });
};
