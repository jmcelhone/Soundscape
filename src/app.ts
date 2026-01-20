import express from 'express';

const app = express()
app.use(express.json())
app.use(express.static(__dirname));

// routing
app.get('/', function(req: Request, res: Response, next: NextFunction) => {
    
});

export default app;
