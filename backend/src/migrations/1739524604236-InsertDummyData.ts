import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class InsertDummyData1739524604236 implements MigrationInterface {
    name = 'InsertDummyData1739524604236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const saltRounds = 10;
        const adminPassword = await bcrypt.hash('admin123', saltRounds);
        const managerPassword = await bcrypt.hash('manager123', saltRounds);
        const employeePassword = await bcrypt.hash('employee123', saltRounds);

        // Insert dummy users
        await queryRunner.query(`
            INSERT INTO user (username, email, firstName, lastName, password, roles, position, startDate, createdBy, createdAt, updatedBy, updatedAt, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked)
            VALUES 
            ('admin', 'admin@example.com', 'John', 'Doe', ?, '["ADMIN"]', 'Administrator', NOW(), 'system', NOW(), 'system', NOW(), 1, 1, 1, 1),
            ('manager', 'manager@example.com', 'Jane', 'Smith', ?, '["MANAGER"]', 'Manager', NOW(), 'system', NOW(), 'system', NOW(), 1, 1, 1, 1),
            ('employee', 'employee@example.com', 'Bob', 'Johnson', ?, '["EMPLOYEE"]', 'Developer', NOW(), 'system', NOW(), 'system', NOW(), 1, 1, 1, 1)
        `, [adminPassword, managerPassword, employeePassword]);

        // Insert dummy roles
        await queryRunner.query(`
            INSERT INTO role (name, description, parentRole, path, depth, createdBy, createdAt, updatedBy, updatedAt)
            VALUES 
            ('ADMIN', 'Administrator role', '', '/admin', 1, 'system', NOW(), 'system', NOW()),
            ('MANAGER', 'Manager role', '', '/manager', 1, 'system', NOW(), 'system', NOW()),
            ('EMPLOYEE', 'Employee role', '', '/employee', 1, 'system', NOW(), 'system', NOW())
        `);

        // Insert dummy permissions
        await queryRunner.query(`
            INSERT INTO permission (name, type, value, createdBy, createdAt, updatedBy, updatedAt)
            VALUES 
            ('CREATE_USER', 'USER', 'true', 'system', NOW(), 'system', NOW()),
            ('EDIT_USER', 'USER', 'true', 'system', NOW(), 'system', NOW()),
            ('DELETE_USER', 'USER', 'false', 'system', NOW(), 'system', NOW())
        `);

        // Get the inserted user IDs
        const users = await queryRunner.query(`SELECT id FROM user WHERE username IN ('admin', 'manager', 'employee')`);

        // Insert dummy employee
        await queryRunner.query(`
            INSERT INTO employee (
                employeeId, firstName, lastName, email, dateOfBirth, gender, maritalStatus, nationality,
                phone, address, city, state, zipCode, country, joinedDate, probationPeriod, probationEnd,
                employmentType, jobTitle, department, location, grade, salary, currency, paymentMethod,
                bankAccount, status, userId, createdBy, createdAt, updatedBy, updatedAt
            )
            VALUES 
            (
                1, 'John', 'Doe', 'john.doe@example.com', '1990-01-01', 'MALE', 'SINGLE', 'American',
                '123-456-7890', '123 Main St', 'New York', 'NY', '10001', 'USA', '2020-01-01', '3 months', '2020-04-01',
                'Full-time', 'Software Engineer', 'Engineering', 'New York', 'L3', 80000, 'USD', 'Direct Deposit',
                '123456789', 'ACTIVE', ${users[0].id}, 'system', NOW(), 'system', NOW()
            ),
            (
                2, 'Jane', 'Smith', 'jane.smith@example.com', '1992-05-15', 'FEMALE', 'MARRIED', 'Canadian',
                '987-654-3210', '456 Elm St', 'Toronto', 'ON', 'M5H 2N2', 'Canada', '2019-06-01', '6 months', '2019-12-01',
                'Full-time', 'Project Manager', 'Management', 'Toronto', 'L4', 90000, 'CAD', 'Direct Deposit',
                '987654321', 'ACTIVE', ${users[1].id}, 'system', NOW(), 'system', NOW()
            )
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete all inserted dummy data
        await queryRunner.query(`DELETE FROM user WHERE email LIKE '%@example.com'`);
        await queryRunner.query(`DELETE FROM role WHERE name IN ('ADMIN', 'MANAGER', 'EMPLOYEE')`);
        await queryRunner.query(`DELETE FROM permission WHERE name IN ('CREATE_USER', 'EDIT_USER', 'DELETE_USER')`);
        await queryRunner.query(`DELETE FROM employee WHERE email LIKE '%@example.com'`);
    }
}
