import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1739522622563 implements MigrationInterface {
    name = 'InitialMigration1739522622563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`parentRole\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`depth\` int NOT NULL, \`mpath\` varchar(255) NULL DEFAULT '', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`startDate\` date NOT NULL, \`roles\` text NOT NULL, \`password\` varchar(255) NOT NULL, \`enabled\` tinyint NOT NULL, \`accountNonExpired\` tinyint NOT NULL, \`credentialsNonExpired\` tinyint NOT NULL, \`accountNonLocked\` tinyint NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`employeeId\` int NOT NULL, \`jobId\` varchar(255) NOT NULL, \`jobTitle\` varchar(255) NOT NULL, \`department\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`status\` varchar(255) NOT NULL, \`reason\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contract\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`employeeId\` int NOT NULL, \`contractId\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`status\` varchar(255) NOT NULL, \`notes\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`salary\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`employeeId\` int NOT NULL, \`salaryId\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`currency\` varchar(255) NOT NULL, \`paymentMethod\` varchar(255) NOT NULL, \`effectiveDate\` datetime NOT NULL, \`notes\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`userId\` int NOT NULL, \`employeeId\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`dateOfBirth\` datetime NOT NULL, \`gender\` varchar(255) NOT NULL, \`maritalStatus\` varchar(255) NOT NULL, \`nationality\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`zipCode\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`joinedDate\` datetime NOT NULL, \`probationPeriod\` varchar(255) NOT NULL, \`probationEnd\` datetime NOT NULL, \`employmentType\` varchar(255) NOT NULL, \`jobTitle\` varchar(255) NOT NULL, \`department\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`grade\` varchar(255) NOT NULL, \`salary\` int NOT NULL, \`currency\` varchar(255) NOT NULL, \`paymentMethod\` varchar(255) NOT NULL, \`bankAccount\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_817d1d427138772d47eca04885\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`leave\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`employeeId\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`startDate\` date NOT NULL, \`endDate\` date NOT NULL, \`days\` int NOT NULL, \`reason\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`employeeId\` int NOT NULL, \`paymentDate\` datetime NOT NULL, \`amount\` int NOT NULL, \`paymentMethod\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`startDate\` date NOT NULL, \`endDate\` date NOT NULL, \`status\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`employeeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attendance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`updatedAt\` date NOT NULL, \`employeeId\` int NOT NULL, \`date\` date NOT NULL, \`checkIn\` time NOT NULL, \`checkOut\` time NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_employees_employee\` (\`projectId\` int NOT NULL, \`employeeId\` int NOT NULL, INDEX \`IDX_8f60a620feca36927331cc2f12\` (\`projectId\`), INDEX \`IDX_615f6cc16e65ad2d177bb099cb\` (\`employeeId\`), PRIMARY KEY (\`projectId\`, \`employeeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_cdb4db95384a1cf7a837c4c683e\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD CONSTRAINT \`FK_3e02d32dd4707c91433de0390ea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_79ff2b8fa4129034e76d221dc01\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contract\` ADD CONSTRAINT \`FK_06da19485ca2e1aa777cacc64b6\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_ee746d55416ea53ee1d7b2eb3b7\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_f4b0d329c4a3cf79ffe9d565047\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD CONSTRAINT \`FK_b8ff759530cff3e5f39f7dd0102\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_62ef561a3bb084a7d12dad8a2d9\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`document\` ADD CONSTRAINT \`FK_79168b6c01d01766f5b99dcd741\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_07731c02b0333dc9b2678f98213\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_employees_employee\` ADD CONSTRAINT \`FK_8f60a620feca36927331cc2f12a\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_employees_employee\` ADD CONSTRAINT \`FK_615f6cc16e65ad2d177bb099cbc\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_employees_employee\` DROP FOREIGN KEY \`FK_615f6cc16e65ad2d177bb099cbc\``);
        await queryRunner.query(`ALTER TABLE \`project_employees_employee\` DROP FOREIGN KEY \`FK_8f60a620feca36927331cc2f12a\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_07731c02b0333dc9b2678f98213\``);
        await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_79168b6c01d01766f5b99dcd741\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_62ef561a3bb084a7d12dad8a2d9\``);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP FOREIGN KEY \`FK_b8ff759530cff3e5f39f7dd0102\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_f4b0d329c4a3cf79ffe9d565047\``);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_ee746d55416ea53ee1d7b2eb3b7\``);
        await queryRunner.query(`ALTER TABLE \`contract\` DROP FOREIGN KEY \`FK_06da19485ca2e1aa777cacc64b6\``);
        await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_79ff2b8fa4129034e76d221dc01\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP FOREIGN KEY \`FK_3e02d32dd4707c91433de0390ea\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_cdb4db95384a1cf7a837c4c683e\``);
        await queryRunner.query(`DROP INDEX \`IDX_615f6cc16e65ad2d177bb099cb\` ON \`project_employees_employee\``);
        await queryRunner.query(`DROP INDEX \`IDX_8f60a620feca36927331cc2f12\` ON \`project_employees_employee\``);
        await queryRunner.query(`DROP TABLE \`project_employees_employee\``);
        await queryRunner.query(`DROP TABLE \`attendance\``);
        await queryRunner.query(`DROP TABLE \`document\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP TABLE \`leave\``);
        await queryRunner.query(`DROP INDEX \`IDX_817d1d427138772d47eca04885\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP TABLE \`salary\``);
        await queryRunner.query(`DROP TABLE \`contract\``);
        await queryRunner.query(`DROP TABLE \`job\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
