import database from "infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 1+1 as result;");
  console.log(result.rows[0]);
  response.status(200).json({
    status: "ok",
  });
}

export default status;
