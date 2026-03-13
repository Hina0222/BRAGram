import {
  pgTable,
  serial,
  integer,
  varchar,
  date,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';

export const missions = pgTable(
  'missions',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 100 }).notNull(),
    description: varchar('description', { length: 500 }).notNull(),
    exampleImageUrl: varchar('example_image_url', { length: 500 }),
    baseScore: integer('base_score').notNull().default(10),
    scheduledAt: date('scheduled_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [unique('missions_scheduled_at_unique').on(table.scheduledAt)],
);
