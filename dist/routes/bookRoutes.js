import { Router } from 'express';
import endpoint from "../controllers/bookController.js";
const router = Router();
// http://localhost:4000/api/all/books
router.get("/all/books", endpoint.getBooks);
router.get("/single/book/:id", endpoint.getBooks);
router.post("/add/book", endpoint.addBook);
router.put("/update/book/:id", endpoint.updateBook);
router.delete("/delete/book/:id", endpoint.deleteBook);
export default router;
//# sourceMappingURL=bookRoutes.js.map