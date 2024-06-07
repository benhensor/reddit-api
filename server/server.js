import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


const clientId = process.env.REDDIT_CLIENT_ID;
const clientSecret = process.env.REDDIT_CLIENT_SECRET;
const redirectUri = process.env.REDDIT_REDIRECT_URI;
const PORT = process.env.PORT || 5000;


const app = express();