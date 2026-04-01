import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id:        serial("id").primaryKey(),
  naam:      varchar("naam", { length: 255 }).notNull(),
  email:     varchar("email", { length: 255 }).notNull(),
  telefoon:  varchar("telefoon", { length: 50 }),
  straat:    varchar("straat", { length: 255 }).notNull(),
  postcode:  varchar("postcode", { length: 20 }).notNull(),
  stad:      varchar("stad", { length: 100 }).notNull(),
  opmerking: text("opmerking"),
  status:    varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id:           serial("id").primaryKey(),
  orderId:      integer("order_id").notNull().references(() => orders.id),
  productId:    integer("product_id").notNull(),
  productName:  varchar("product_name", { length: 255 }).notNull(),
  size:         varchar("size", { length: 20 }),
  quantity:     integer("quantity").notNull().default(1),
  priceCents:   integer("price_cents").notNull(),
});
