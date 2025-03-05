import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, price: parseFloat(price) },
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Не вдалося створити продукт' });
  }
};
