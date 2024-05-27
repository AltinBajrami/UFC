require('dotenv').config();
require('express-async-errors');
// express

const express = require('express');
const app = express();
// rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const fileUpload = require('express-fileupload');
const path = require('path');
// database
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const fightFinishRouter = require('./routes/fightFinishRoutes');
const weightClassesRouter = require('./routes/weightClassesRoutes');
const fighterRoutesRouter = require('./routes/fighterRoutes');
const fightRoutesRouter = require('./routes/fightsRoutes');
const rankedRoutesRouter = require('./routes/rankedRoutes');
const referRoutesRouter = require('./routes/referRoutes');
const quoteRoutesRouter = require('./routes/quoteRoutes');
const arenaRouter = require('./routes/arenaRoutes');
const seatingLayoutRouter = require('./routes/seatingLayoutRoutes');
const ticketsRouter = require('./routes/ticketsRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('dev'));
app.use(fileUpload());
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api/v1/events/:id', (req, res) => {
  const events = [
    { name: 'ufc 300', arena: '663240312801f9758587e8d8' },
    { name: 'ufc 301', arena: '663240722801f9758587e8de' },
  ];
  const event = events.filter(item => item.arena === req.params.id);
  res.status(200).json({ event });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/fightFinish', fightFinishRouter);
app.use('/api/v1/fighters', fighterRoutesRouter);
app.use('/api/v1/weightClasses', weightClassesRouter);
app.use('/api/v1/fights', fightRoutesRouter);
app.use('/api/v1/ranked', rankedRoutesRouter);
app.use('/api/v1/refers', referRoutesRouter);
app.use('/api/v1/quotes', quoteRoutesRouter);
app.use('/api/v1/arena', arenaRouter);
app.use('/api/v1/seatingLayout', seatingLayoutRouter);
app.use('/api/v1/tickets', ticketsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
