import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id:        integer("id").primaryKey({ autoIncrement: true }),
  naam:      text("naam").notNull(),
  email:     text("email").notNull(),
  telefoon:  text("telefoon"),
  straat:    text("straat").notNull(),
  postcode:  text("postcode").notNull(),
  stad:      text("stad").notNull(),
  opmerking: text("opmerking"),
  status:    text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});

export const orderItems = sqliteTable("order_items", {
  id:          integer("id").primaryKey({ autoIncrement: true }),
  orderId:     integer("order_id").notNull().references(() => orders.id),
  productId:   integer("product_id").notNull(),
  productName: text("product_name").notNull(),
  size:        text("size"),
  quantity:    integer("quantity").notNull().default(1),
  priceCents:  integer("price_cents").notNull(),
});
