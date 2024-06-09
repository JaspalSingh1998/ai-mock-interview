import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Interview = pgTable('Interview', {
    id:serial('id').primaryKey(),
    tailoredInterviewData:text('TailoredInterviewData').notNull(),
    postion:varchar('position').notNull(),
    description:varchar('description').notNull(),
    expereince:varchar('expereince').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    uuid:varchar('uuid').notNull()
})