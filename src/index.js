import express from 'express';
import { config } from "./config";
import bookRoutes from "./routes/bookRoutes";
import { createBooksTable } from "./models/books";
const app = express();
// middelware
app.use(express.json());
app.use("/api", bookRoutes);
await createBooksTable();
// start server
app.listen(config.SERVER_PORT, () => {
    console.log(`Server is running on port ${config.SERVER_PORT}`);
});
