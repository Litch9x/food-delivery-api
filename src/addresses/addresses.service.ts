import { Injectable } from "@nestjs/common";
import { CreateAddressDto, UpdateAddressDto } from "../dto/addresses.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAddressDto) {
    const { street, city, province, postal_code, user_id } = dto;

    return this.prisma.address.create({
      data: {
        street,
        city,
        province,
        postalCode: postal_code, // Prisma dùng camelCase
        user: {
          connect: {
            id: user_id, // phải connect user theo ID
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.address.findMany();
  }

  findOne(id: number) {
    return this.prisma.address.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateAddressDto) {
    const { street, city, province, postal_code, user_id } = dto;

    return this.prisma.address.update({
      where: { id },
      data: {
        street,
        city,
        province,
        postalCode: postal_code,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.address.delete({ where: { id } });
  }
}
