import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { postgresDb, ProductDB } from '../../db/drizzle'
import { ProductService } from '../../../application/product-service'

export const getProductHandle: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/products',
    {
      schema: {
        tags: ['product'],
        description: 'Get Product',
        querystring: z.object({
          id: z.string()
        }),
        response: {
          201: z.object({
            product: z.object({
              id: z.string(),
              name: z.string(),
              status: z.string(),
              price: z.number()
            })
          }),
          500: z.object({
            error: z.string()
          })
        }
      }
    },

    async (request, reply) => {
      try {
        const { id } = request.query

        const db = postgresDb
        const productDb = new ProductDB(db)
        const productService = new ProductService(productDb)

        const product = await productService.get(id)

        if (!product) {
          return reply.status(404).send({ error: 'Product not found' })
        }

        return reply.status(201).send({ product })
      } catch (e: any) {
        return reply.status(500).send({ error: e })
      }
    }
  )
}
