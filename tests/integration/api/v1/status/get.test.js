test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toBe("16.0");

  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBe(100);

  expect(responseBody.dependencies.database.current_connections).toBeDefined();
  expect(responseBody.dependencies.database.current_connections).toBe(1);

  const parsedDate = new Date(responseBody.updated_at).toISOString();
  expect(parsedDate).toEqual(responseBody.updated_at);
});
