const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')



const resolvers = {
  Query: {
    incomes: (root, args, context, info) => {
      return context.db.query.incomes({}, info)
    },
    // 2
    expenses: (root, args, context, info) => {
      return context.db.query.expenses({}, info)
    },
  },
  // 3
  Mutation: {
    // 2
    addIncome: (root, args, context, info) => {
      return context.db.mutation.createIncome({
        data: {
          value: args.value,
          description: args.description,
        },
      }, info)
    },
    addExpense: (root, args, context, info) => {
      return context.db.mutation.createExpense({
        data: {
          value: args.value,
          description: args.description,
        },
      }, info)
    },
    deleteIncome: (root, args, context, info) => {
      return context.db.mutation.deleteIncome({
        data: {
          value: args.value,
          description: args.description,
        },
      }, info)
    },
    deleteExpense: (root, args, context, info) => {
      return context.db.mutation.deleteExpense({
        data: {
          value: args.value,
          description: args.description,
        },
      }, info)
    },
  },
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/siestaderek/database/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))