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

export const UserAnswer=pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    interviewRef:varchar('interviewRef').notNull(),
    question:varchar('question').notNull(),
    correctAns:varchar('correctAns'),
    userAns:varchar('userAns'),
    feedback:text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt')
})