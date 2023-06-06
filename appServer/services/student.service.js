const EnumServerDefinitions = require("../common/enums/enum_server_definitions");
const Classroom = require("../models/class_room.model");
const Student = require("../models/student.model");


class StudentService {
    async findStudentById(id) {
        try {
            const student = await Student.findOne({
                where: {
                    id: id,
                    status: EnumServerDefinitions.STATUS.ACTIVE
                }
            });
            return student;
        } catch (error) {
            throw error;
        }
    }
    async findClassroomByStudentId(studentId) {
        try {
            const student = await Student.findOne({
                where: {
                    id: studentId,
                    status: EnumServerDefinitions.STATUS.ACTIVE
                },
                include: [Classroom]
            });
            return student.Classrooms;
        } catch (error) {
            throw error;
        }
    }
    async findStudentByAccountId(accountId) {
        try {
            const student = await Student.findOne({
                where: {
                    account_id: accountId,
                    status: EnumServerDefinitions.STATUS.ACTIVE
                }
            });
            return student;
        } catch(error) {
            throw error;
        }
    }
    async addStudent(studentCode, firstName, lastName, dateOfBirth, gender, phoneNumber, CCCD, accountId, address, transaction) {
        try {
            const newStudent = await Student.create({
                student_code: studentCode,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                gender: gender,
                phone_number: phoneNumber,
                CCCD: CCCD,
                account_id: accountId,
                address: address
            }, { transaction: transaction});
            return newStudent;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new StudentService;