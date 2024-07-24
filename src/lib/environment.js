const zod = require("./zod");

const environmentSchema = zod.object({
  GUIAPERGUNTAS_NODE_ENV: zod.string().default("development"),
  GUIAPERGUNTAS_JWT_SECRET: zod.string(),
});

const environment = environmentSchema.parse(process.env);

module.exports = environment;
