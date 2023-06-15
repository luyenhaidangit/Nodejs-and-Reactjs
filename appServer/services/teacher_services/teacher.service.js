const Teacher = require('../../models/teacher.model');
const EnumServerDefinitions = require("../../common/enums/enum_server_definitions");

class TeacherService {
    async findTeacherByAccountId(accountId) {
        try {
            const teacher = await Teacher.findOne({
                account_id: accountId,
                status: EnumServerDefinitions.STATUS.ACTIVE
            });
            return teacher;
        } catch (error) {
            throw error;
        }
    }
    async findAllUsersByIds(teacherIds) {
        try {
            if (teacherIds.length === EnumServerDefinitions.EMPTY) {
                return [];
            }
            const teachers = await Teacher.findAll({
                where: {
                    id: teacherIds,
                    status: EnumServerDefinitions.STATUS.ACTIVE
                }
            });
            return teachers;
        } catch (error) {
            throw error;
        }
    }
    async checkTeacherByDepartmentId(teacherId, departmentId) {
        try {
            const isTeacher = await Teacher.findOne({
                where: {
                    id: teacherId,
                    department_id: departmentId,
                    status: EnumServerDefinitions.STATUS.ACTIVE
                },
            });
            return !!isTeacher;
        } catch (error) {
            throw error;
        }
    }
    async addTeacher(teacherCode, firstName, lastName, dateOfBirth, gender, phoneNumber, CCCD, accountId, departmentId, address, transaction) {
        try {
            const newTeacher = await Teacher.create({
                teacher_code: teacherCode,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                gender: gender,
                phone_number: phoneNumber,
                CCCD: CCCD,
                account_id: accountId,
                department_id: departmentId,
                address: address
            }, { transaction: transaction });
            return newTeacher;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TeacherService;