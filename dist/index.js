import express from 'express';
import { config } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
import { createBooksTable } from "./models/books.js";
const app = express();
// middelware
app.use(express.json());
app.use("/api", bookRoutes);
await createBooksTable();
// start server
app.listen(config.SERVER_PORT, () => {
    console.log(`Server is running on port ${config.SERVER_PORT}`);
});
//# sourceMappingURL=index.js.map