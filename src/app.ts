import express from 'express';

const app = express()
app.use(express.json())

// routing
app.get('/', function(req: Request, res: Response, next: NextFunction) {
    res.status(200).send("Hello World");
});

export default app;
