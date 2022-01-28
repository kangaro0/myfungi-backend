import * as express from 'express';
import BlogController from '../controllers/blog.controller';
let router = express.Router();
let controller = new BlogController();
// GET
router.get("/", async (req, res) => {
    try {
        let items = controller.getAll();
        res.status(200).json(items);
    }
    catch (err) {
        let message = { type: "Error", content: err.message };
        res.status(500).json(err);
    }
});
router.get("/:id", async (req, res) => {
    let id = null;
    try {
        id = parseInt(req.params[0]);
    }
    catch (err) {
        let message = { type: "Error", content: "Bad request" };
        res.status(400).json(message);
        return;
    }
    try {
        let item = await controller.getOne(id);
        res.status(200).json(item);
    }
    catch (err) {
        let message = { type: "Error", content: err.message };
        res.status(500).json(message);
    }
});
// POST
router.post("/", async (req, res) => {
    try {
        await controller.insertOne(req.body);
        let message = { type: "Success", content: "" };
        res.status(200).json(message);
    }
    catch (err) {
        let message = { type: "Error", content: err.message };
        let status = 0;
        switch (err.code) {
            case 11000: // duplicate key
                status = 400;
            default:
                status = 500;
        }
        res.status(status).json(message);
    }
});
// PUT
router.put("/:id", async (req, res) => {
    let id = null;
    try {
        id = parseInt(req.params[0]);
    }
    catch (err) {
        let message = { type: "Error", content: "Bad request" };
        res.status(400).json(message);
        return;
    }
    try {
        await controller.updateOne(id, req.body);
        let message = { type: "Success", content: "" };
        res.send(200).json(message);
    }
    catch (err) {
        let message = { type: "Error", content: err.code }; // return err code here for debugging
        res.status(500).json(message);
    }
});
// DELETE
router.delete("/:id", (req, res) => {
});
const Router = router;
export default Router;
