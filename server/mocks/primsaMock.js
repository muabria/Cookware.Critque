const { mockDeep, mockReset } = require('jest-mock-extended')

const prisma = require('../db/client')
const prismaMock = prisma

jest.mock('../db/client', () => mockDeep())

beforeEach(() => {
  mockReset(prismaMock)
})

module.exports = prismaMock;