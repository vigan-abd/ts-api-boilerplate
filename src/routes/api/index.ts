import { AwilixContainer } from 'awilix';
import * as express from 'express';
const router = express.Router();
import RouteBuilder = require("simple-express-route-builder");

import AuthMiddleware from '@middlewares/AuthMiddleware';
import MainAPIController from '@controllers/api/MainAPIController';
import AuthenticationAPIController from '@controllers/api/AuthenticationAPIController';

const register = (container: AwilixContainer) => {
  // // MIDDLEWARES
  const authMiddleware: AuthMiddleware = container.resolve("AuthMiddleware");

  // // CONTROLLERS
  const authenticationAPIController: AuthenticationAPIController = container.resolve("authenticationAPIController");
  const mainAPIController: MainAPIController = container.resolve("mainAPIController");

  const builder = new RouteBuilder('/api', router);

  builder.use((group, action) => action('GET', mainAPIController.index));

  builder.use((group, action) =>
    group("/v1/auth", [
      action("GET", [authMiddleware.authHandler], authenticationAPIController.currentUser),
      group("/signup", [
        action("POST", authenticationAPIController.signup)
      ]),
      group("/login", [
        action("POST", authenticationAPIController.signin)
      ]),
      group("/update-password", [authMiddleware.authHandler], [
        action("PATCH", authenticationAPIController.updatePassword)
      ])
    ])
  );

  return router;
};

export default register;