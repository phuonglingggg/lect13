// Data
const NAMES = [
  ["Michael", "Chang"], ["Neel", "Kishnani"], ["Kashif", "Nazir"]
];
const STUDENTS = {};
const COURSES = {};
for (let [givenName, surname] of NAMES) {
  let id = (givenName[0] + surname).toLowerCase();
  STUDENTS[id] = { id, givenName, surname, dept: null, units: 0 };
  COURSES[id] = [];
}

// api
import bodyParser from "body-parser";
import express from "express";

const api = new express.Router();

const initApi = (app) => {
  app.set("json spaces", 2);
  app.use("/api", api);
};

api.use(bodyParser.json());

api.use("/students/:id", (req, res, next) => {
  let id = req.params.id;
  let student = STUDENTS[id];
  if (!student) {
    res.status(404).json({ error: `Can't find student ${id}` });
    return;
  }
  next();
});

api.get("/students/:id", (req, res) => {
  let student = STUDENTS[req.params.id];
  res.json(student);
});

export default initApi;
