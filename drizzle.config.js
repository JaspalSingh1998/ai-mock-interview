/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-mock-interview_owner:oBk9uZn1zUaQ@ep-falling-cell-a539h87z.us-east-2.aws.neon.tech/ai-mock-interview?sslmode=require',
    }
  };
  