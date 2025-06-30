import { DataSource } from 'typeorm';
import { User } from '../../src/user/entities/user.entity';
import { Role } from '../../src/user/enums/role.enum';
import * as bcrypt from 'bcrypt';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  // Проверяем, есть ли уже пользователи
  const existingUsers = await userRepository.find();
  if (existingUsers.length > 0) {
    console.log('Users already seeded, skipping...');
    return;
  }

  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = [
    {
      email: 'admin@example.com',
      password: hashedPassword,
      role: Role.Admin,
      emailVerified: true,
      phone: '+1234567890',
    },
    {
      email: 'seller@example.com',
      password: hashedPassword,
      role: Role.Seller,
      emailVerified: true,
      phone: '+1234567891',
    },
    {
      email: 'user@example.com',
      password: hashedPassword,
      role: Role.User,
      emailVerified: true,
      phone: '+1234567892',
    },
    {
      email: 'unverified@example.com',
      password: hashedPassword,
      role: Role.User,
      emailVerified: false,
      phone: '+1234567893',
    },
  ];

  for (const userData of users) {
    const user = userRepository.create(userData);
    await userRepository.save(user);
  }

  console.log('Users seeded successfully!');
  console.log('Test accounts:');
  console.log('- Admin: admin@example.com / password123');
  console.log('- Seller: seller@example.com / password123');
  console.log('- User: user@example.com / password123');
  console.log('- Unverified: unverified@example.com / password123');
}; 