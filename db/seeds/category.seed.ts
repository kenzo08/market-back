import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { categoriesData } from './categories.data';
import { CategoryEntity } from '../../src/category/entities/category.entity';
import { OfferEntity } from '../../src/offer/entities/offer.entity';
import { ReviewEntity } from '../../src/review/entities/review.entity';
import { dataSourceOptions } from '../data-source';

async function seed() {
  dotenv.config();
  process.env.NODE_ENV = 'seeding';

  const dataSource = new DataSource({
    ...dataSourceOptions,
    entities: [CategoryEntity, OfferEntity, ReviewEntity],
  });

  await dataSource.initialize();

  // Используем TreeRepository для работы с иерархией
  const categoryTreeRepository = dataSource.getTreeRepository(CategoryEntity);

  try {
    // Удаляем данные с учетом зависимостей (CASCADE)
    await dataSource.query(`
      TRUNCATE TABLE 
        offers, 
        reviews, 
        categories 
      RESTART IDENTITY CASCADE
    `);

    // Создаем родительские категории
    const parentCategories = await Promise.all(
      categoriesData.map((parentData) =>
        categoryTreeRepository.save({
          name: parentData.name,
          description: parentData.description || null
        })
      )
    );

    // Создаем дочерние категории
    for (let i = 0; i < categoriesData.length; i++) {
      const parentData = categoriesData[i];
      const parent = parentCategories[i];

      if (parentData.children?.length) {
        await categoryTreeRepository.save(
          parentData.children.map((childData) => ({
            name: childData.name,
            description: childData.description || null,
            parent: parent, // Устанавливаем связь с родителем
          })),
        );
      }
    }

    console.log('✅ Categories seeded successfully with tree structure!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error) => {
  console.error('❌ Fatal seeding error:', error);
  process.exit(1);
});
