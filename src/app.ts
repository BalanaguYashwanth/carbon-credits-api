import express from 'express';
import { addOrUpdateCredits, createCompany } from './controllers/appController';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

const port = 3000;
app.use(express.json());
app.post('/create_company', createCompany);
app.post('/add_or_update_credits', addOrUpdateCredits);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});