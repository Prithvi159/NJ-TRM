import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("src/json/table.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);


server.put("/table/rows/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;

  try {
    const table = router.db.get("table").value();
    const updatedRows = table.rows.map((row) => {
      if (row.id === id) {
        return { ...row, ...newData }; // update existing row data with the new data
      } else {
        return row;
      }
    });

    const isRowUpdated = updatedRows.some((row) => row.id === id); // Check if the row was updated
    if (isRowUpdated) {
      router.db.set("table.rows", updatedRows).write(); // Update the table rows in the database
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error updating table row:", error);
    res.sendStatus(500);
  }
});

server.get("/table", (req, res) => {
  try {
    const tableData = router.db.get("table").value();
    return res.json(tableData);
  } catch (error) {
    console.error("Error reading JSON data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

server.get("/table/rows", (req, res) => {
  const tableData = router.db.get("table").value();
  const rows = tableData.rows;
  return res.json(rows);
});

server.use(middlewares);
server.use(router);


const PORT = 4000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
