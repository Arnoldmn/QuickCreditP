import express from 'express';
import { json, urlencoded } from 'body-parser';
import userRoute from './routes/users';

const app = express();
const PORT = process.env.PORT || 7000;
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(userRoute);

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});

export default app;
