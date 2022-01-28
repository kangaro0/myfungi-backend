import * as express from 'express';
import { default as BlogRouter } from './blog';
// MongoDB Error Codes
// https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.yml
let router = express.Router();
// setup middleware
// setup child routes
router.use('/blog', BlogRouter);
const Router = router;
export default Router;
