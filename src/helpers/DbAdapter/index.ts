import env from '@helpers/EnvHelper';
import * as mongoose from "mongoose";
import config from '@config';

mongoose.connect(
  config.DB_CONNECTION_STRING, {
    user: env('DB_USERNAME', "root"),
    pass: env('DB_PASSWORD', "root"),
    authSource: env('DB_DATABASE_AUTH', "admin"),
    useNewUrlParser: true
  }
);

export default mongoose;