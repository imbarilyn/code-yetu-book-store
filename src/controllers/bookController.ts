import { Request, Response } from "express";
import { pool} from "../db";

const getBooks = async(req: Request, res: Response) => {
    const { id } = req.params;
    try{
        if(id){
        //     fetch single book by id
            const result =  await pool.query(
                "SELECT * FROM books WHERE id = $1", [id],
            )
            if(result.rows.length  === 0){
                return res.status(404).json({message: "Book not found"})
            }
            return res.status(200).json(result.rows[0])
        } else{
        //     fetch all books
            const result = await pool.query(
                "SELECT * FROM BOOKS ORDER BY id ASC"
            )
            if(result.rows.length === 0){
                console.log("No book in the store");
                return res.status(200).json({message: "No available books in the store", books: []})
            }
            console.log("There are books in the store");
            return res.status(200).json(result.rows)
        }

    } catch(err){
        console.error("Error fetching books:", err);
        return res.status(500).json({message: "Internal server error"})
    }
}

const checkBookExists = async (title: string, author: string) => {
    const result = await pool.query(
        "SELECT * FROM books WHERE title = $1 AND author = $2", [title, author]
    );
    return result.rows.length > 0;
}

const checkBookExistsById = async (id: number) => {
    console.log("Checking if book exists with id:", id);
    const result = await pool.query(
        "SELECT * FROM books WHERE id = $1", [id]
    )
    console.log("Check book exists result:", result.rows.length > 0);
    return result.rows.length > 0;
}

// post a book to the database
const addBook = async(req: Request, res: Response) => {
    const { title, author, year, synopsis } = req.body;
    const bookExists = await checkBookExists(title, author);
    if(bookExists){
        return res.status(400).json({message: "Book already exists"})
    }
    try{
        const result = await pool.query(
            "INSERT INTO books (title, author, year, synopsis) VALUES ($1, $2, $3, $4) RETURNING *", [title, author, year, synopsis]
        );
        return res.status(201).json({message: "Book added successfully"})
    }
    catch (err){
        console.error("Error adding book:", err);
        return res.status(500).json({message: "Internal server error"})
    }
}

// update a book that exist in the database

const updateBook = async(req:Request, res: Response) =>{
    const { id } = req.params;
    const { title, author, year, synopsis } = req.body;
    const bookExists = await checkBookExistsById(Number(id));
    if(!title && !author && !year && !synopsis){
        return res.status(400).json({message: "At least one field (title, author, year, synopsis) must be provided for update"})
    }
    try {
      if(!bookExists){
          console.log("The book is not in the database")
            return res.status(404).json({message: "Book not found"})
      }
      const updates: string [] = []
        const values: any[] = []
        let index: number = 1

        if(title){
            updates.push(`title =  $${index++}`)
            values.push(title)
        }
        if(author){
            updates.push(`author =  $${index++}`)
            values.push(author)
        }
        if(year){
            updates.push(`year =  $${index++}`)
            values.push(year)
        }
        if(synopsis){
            updates.push(`synopsis =  $${index++}`)
            values.push(synopsis)
        }

        values.push(id)
        console.log(`These is the updates string: ${updates}`);

        const query = `
        UPDATE books SET ${updates.join(", ")} WHERE id=$${index} RETURNING *`
        const result = await pool.query(query, values)
        return res.status(200).json({message: "Book updated successfully", book: result.rows[0]})
    }
    catch (err){
        console.error("Error updating book:", err);
        return res.status(500).json({message: "Internal server error"})
    }
}

// delete a book from the dataa base
const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookExists = await checkBookExistsById(Number(id));
    if(!bookExists){
        return res.status(404).json({message: "Book not found"})
    }
    try{
        await pool.query(
            "DELETE FROM books WHERE id = $1", [id]
        )
        return res.status(200).json({message: "Book deleted successfully"})
    }
    catch (err){
        console.error("Error deleting book:", err);
        return res.status(500).json({message: "Internal server error"})
    }
}


export default  {
    getBooks,
    addBook,
    updateBook,
    deleteBook
}