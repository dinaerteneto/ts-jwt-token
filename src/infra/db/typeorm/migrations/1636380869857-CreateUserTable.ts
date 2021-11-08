import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1636380869857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    { name: "id", type: "varchar", isPrimary: true },
                    { name: "email", type: "varchar" },
                    { name: "password", type: "varchar" },
                    { name: "created_at", type: "timestamp" },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
