import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создание категорий
  const fishingRodsCategory = await prisma.category.create({
    data: {
      id: 'cat001',
      name: 'Удочки',
    },
  });

  const reelsCategory = await prisma.category.create({
    data: {
      id: 'cat002',
      name: 'Катушки',
    },
  });

  const baitsCategory = await prisma.category.create({
    data: {
      id: 'cat003',
      name: 'Приманки',
    },
  });

  // Создание типов характеристик
  const rodLengthType = await prisma.variantType.create({
    data: {
      id: 'varType001',
      categoryId: fishingRodsCategory.id,
      name: 'Длина удочки',
    },
  });

  const reelType = await prisma.variantType.create({
    data: {
      id: 'varType002',
      categoryId: reelsCategory.id,
      name: 'Тип катушки',
    },
  });

  const baitType = await prisma.variantType.create({
    data: {
      id: 'varType003',
      categoryId: baitsCategory.id,
      name: 'Тип приманки',
    },
  });

  // Создание скидок
  const fishingSale = await prisma.discount.create({
    data: {
      id: 'disc001',
      name: 'Весенняя рыбалка',
      percentage: 15.0,
      startDate: new Date('2025-04-01T00:00:00.000Z'),
      endDate: new Date('2025-04-15T23:59:59.999Z'),
    },
  });

  // Создание товаров
  const fishingRod = await prisma.product.create({
    data: {
      id: 'prod001',
      name: 'Удочка Shimano BeastMaster',
      description: 'Профессиональная удочка для дальнего заброса.',
      categoryId: fishingRodsCategory.id,
      images: ['https://example.com/shimano_beastmaster.jpg'],
      discountId: fishingSale.id,
    },
  });

  const fishingReel = await prisma.product.create({
    data: {
      id: 'prod002',
      name: 'Катушка Daiwa BG 4000',
      description: 'Мощная катушка с плавным ходом.',
      categoryId: reelsCategory.id,
      images: ['https://example.com/daiwa_bg4000.jpg'],
      discountId: fishingSale.id,
    },
  });

  const fishingBait = await prisma.product.create({
    data: {
      id: 'prod003',
      name: 'Воблер Rapala X-Rap',
      description: 'Популярный воблер для хищной рыбы.',
      categoryId: baitsCategory.id,
      images: ['https://example.com/rapala_xrap.jpg'],
    },
  });

  // Создание вариантов товаров
  const rodVariant1 = await prisma.productVariant.create({
    data: {
      id: 'var001',
      productId: fishingRod.id,
      sku: 'SHIMANO-BEAST-270',
      price: 15999.0,
      inStock: 10,
    },
  });

  const rodVariant2 = await prisma.productVariant.create({
    data: {
      id: 'var002',
      productId: fishingRod.id,
      sku: 'SHIMANO-BEAST-300',
      price: 16999.0,
      inStock: 8,
    },
  });

  const reelVariant = await prisma.productVariant.create({
    data: {
      id: 'var003',
      productId: fishingReel.id,
      sku: 'DAIWA-BG-4000',
      price: 11999.0,
      inStock: 15,
    },
  });

  const baitVariant = await prisma.productVariant.create({
    data: {
      id: 'var004',
      productId: fishingBait.id,
      sku: 'RAPALA-XRAP-10',
      price: 999.0,
      inStock: 25,
    },
  });

  // Создание атрибутов товаров
  await prisma.productAttribute.create({
    data: {
      id: 'attr001',
      productId: fishingRod.id,
      typeId: rodLengthType.id,
      value: '2.7 м',
    },
  });

  await prisma.productAttribute.create({
    data: {
      id: 'attr002',
      productId: fishingReel.id,
      typeId: reelType.id,
      value: 'Безынерционная',
    },
  });

  await prisma.productAttribute.create({
    data: {
      id: 'attr003',
      productId: fishingBait.id,
      typeId: baitType.id,
      value: 'Воблер',
    },
  });

  console.log('Тестовые данные для рыболовного магазина успешно добавлены!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
