import express from 'express';
import { json, urlencoded } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import userRoute from './server/routes/users';
import loanRoute from './server/routes/loan';
import swaggerDocument from './server/routes/doc/swagger.json';

const app = express();
const PORT = process.env.PORT || 7000;
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(userRoute);
app.use(loanRoute);
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Get loans with a good interest',
  });
});
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});

export default app;
