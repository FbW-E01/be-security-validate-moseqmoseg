import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
app.use(express.json());

const birds = [{
    species: "Bird ",
    notes: "This is a bird example",
    estimatedAmount: 5
}]

const birdValidator = [
    body("species").isLength({ min: 0, max: undefined }).withMessage("The Species name is not the correct lenght"),
    body("species").isAlpha('en-US', { ignore: " -,/()" }).withMessage("The Species name must only contain letters"),
    body("notes").isLength({ max: 140 }).withMessage("The note is too long"),
    body("notes").isAlpha('en-US', { ignore: " -,/()." }).withMessage("Notes must only contain letters"),
    body("estimatedAmount").isNumeric().withMessage("Estimated Amount must be a number"),
];

app.get("/birds", (req, res) => {


    res.send(birds);
});

app.post("/birds", birdValidator, (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400)
        res.json({
            errors: result.errors.map(x => x.msg)
        });
        return;
    }
    birds.push(req.body)
    res.send(birds);
});

app.listen(3000, console.log("API is running"));