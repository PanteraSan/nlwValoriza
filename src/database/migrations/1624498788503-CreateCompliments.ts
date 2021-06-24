import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1624498788503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "userSenderId",
                        type: "uuid",
                    },
                    {
                        name: "userReceiverId",
                        type: "uuid",
                    },
                    {
                        name: "tagId",
                        type: "uuid",
                    },
                    {
                        name: "message",
                        type: "varchar",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserSenderCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userSenderId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUserReceiverCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userReceiverId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKTagCompliments",
                        referencedTableName: "tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tagId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
