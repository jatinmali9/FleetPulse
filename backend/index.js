import * as dotenv from 'dotenv';
import connectToDatabase from './connect_db.js';

dotenv.config();

connectToDatabase();