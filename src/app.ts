import express from 'express';
import dotenv from 'dotenv';
import { addOrUpdateCredits, createCompany } from './controllers/appController';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

setupSwagger(app);

app.post('/create_company', createCompany);
app.post('/add_or_update_credits', addOrUpdateCredits);

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});