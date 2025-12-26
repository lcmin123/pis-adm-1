const { sqliteTable, integer, text } = require("drizzle-orm/sqlite-core");

const users = sqliteTable("users", {
  seq: integer("seq").primaryKey({ autoIncrement: true }),
  id: text("id").unique(),
  name: text("name").notNull(),
  birth: text("birth").notNull(),
  ath_no: text("ath_no").unique(),
  sex: integer("sex").notNull(),
});

module.exports = { users };
