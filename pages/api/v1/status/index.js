import database from "infra/database";
async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresVersionResult = await database.query("SHOW server_version;");
  const postgresVersionValue = postgresVersionResult.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity where datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnections.rows[0].count;

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        current_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
