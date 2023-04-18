/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("User", (table) => {
      table.increments("id").primary();
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("email").notNullable();
      table.boolean("reviewerStatus").notNullable();
    }),

    knex.schema.createTable("Item", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("description").notNullable();
      table.int("price").notNullable();
      table.int("sellerId").notNullable().references("User.id");
      table.string("datePosted").notNullable();
      table.boolean("isAvailable").notNullable();
      table.specificType("images", "text[]").notNullable();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("Item"),
    knex.schema.dropTableIfExists("User"),
  ]);
};
