import database from "../../../../infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 1+1 as result;");
  console.log("\x1b[33m", result, "\x1b[0m");
  response.status(200).json({
    status: "ok",
  });
}

export default status;
