import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Interview = pgTable('Interview', {
    id: serial('id').primaryKey(),
    TailoredInterviewData: text('TailoredInterviewData').notNull(),
    position: varchar('position').notNull(), // Ensure this field is named correctly
    description: varchar('description').notNull(),
    experience: varchar('experience').notNull(), // Corrected typo
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    uuid: varchar('uuid').notNull()
});
