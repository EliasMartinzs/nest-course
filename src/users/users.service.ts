import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      email: 'carlos.oliveira@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      nome: 'Ana Souza',
      email: 'ana.souza@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      nome: 'Pedro Costa',
      email: 'pedro.costa@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArrays = this.users.filter((user) => user.role === role);

      if (rolesArrays.length === 0)
        throw new NotFoundException('Roles not found!');

      return rolesArrays;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const id = this.users.length + 1;

    const newUser = {
      id: id,
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
