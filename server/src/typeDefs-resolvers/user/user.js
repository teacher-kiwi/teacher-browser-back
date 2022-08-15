const Attendance = require("../../models/Attendance");
const FamilyStory = require("../../models/FamilyStory");
const FamilyStoryLike = require("../../models/FamilyStoryLike");
const Journal = require("../../models/Journal");
const Schedule = require("../../models/Schedule");
const Student = require("../../models/Student");
const StudentList = require("../../models/StudentList");
const TimeRecord = require("../../models/TimeRecord");
const TimetableData = require("../../models/TimetableData");
const TimetableTime = require("../../models/TimetableTime");
const ToDoList = require("../../models/ToDoList");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { protectedResolver } = require("../../utils/_utils");

resolver = {
  User: {
    studentNum: async ({ email }) => {
      const teacher = await User.findOne({ email });
      return await Student.count({ teacherEmail: teacher.email });
    },
  },
  Query: {
    me: protectedResolver(async (_, __, { loggedInUser }) => await User.findOne({ email: loggedInUser.email })),
  },
  Mutation: {
    createUser: async (_, { email, password }, context) => {
      const existUser = await User.findOne({ email }).exec();
      if (existUser) return { ok: false, error: "이메일이 존재합니다." };

      if (password.length < 7 || password.length > 17)
        return { ok: false, error: "비밀번호는 8자리 이상 16자리 이하만 가능합니다." };
      if (password.match(/[^a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]/) !== null)
        return { ok: false, error: "비밀번호는 숫자와 영문 또는 특수문자만 입력할 수 있습니다." };

      const num = password.search(/[0-9]/g);
      if (num < 0) return { ok: false, error: "비밀번호는 숫자 1자 이상을 포함해야 합니다." };

      const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
      if (spe < 1) return { ok: false, error: "비밀번호는 특수문자 2자 이상을 포함해야 합니다." };

      const uglyPassword = await bcrypt.hash(password, 10);
      await User.create({ email, password: uglyPassword });

      return { ok: true };
    },

    updateUser: protectedResolver(
      async (_, { userEmail, schoolName, schoolCode, areaCode, schoolAdress, bgTheme, alergy, agreePolicy }) => {
        await User.updateOne(
          { email: userEmail },
          { schoolName, schoolCode, areaCode, schoolAdress, bgTheme, alergy, agreePolicy },
        );
        return { ok: true };
      },
    ),

    deleteUser: protectedResolver(async (_, { teacherEmail }) => {
      await Attendance.deleteMany({ userEmail: teacherEmail });
      await FamilyStory.deleteMany({ userEmail: teacherEmail });
      await FamilyStoryLike.deleteMany({ userEmail: teacherEmail });
      await Journal.deleteMany({ teacherEmail });
      await Schedule.deleteMany({ userEmail: teacherEmail });
      await Student.deleteMany({ teacherEmail });
      await StudentList.deleteMany({ teacherEmail });
      await TimeRecord.deleteMany({ userEmail: teacherEmail });
      await TimetableData.deleteMany({ teacherEmail });
      await TimetableTime.deleteMany({ teacherEmail });
      await ToDoList.deleteMany({ userEmail: teacherEmail });
      await User.deleteMany({ email: teacherEmail });
      return { ok: true };
    }),

    createTag: protectedResolver(async (_, { userEmail, tag }) => {
      await User.updateOne({ email: userEmail }, { $addToSet: { tag } });
      return { ok: true };
    }),

    deleteTag: protectedResolver(async (_, { userEmail, tag }) => {
      await User.updateOne({ email: userEmail }, { $pull: { tag } });
      await Student.updateMany({ teacherEmail: userEmail }, { $pull: { tag } });
      return { ok: true };
    }),

    deleteSchoolInfo: protectedResolver(async (_, { userEmail }) => {
      await User.updateOne({ email: userEmail }, { schoolName: "", schoolCode: "", areaCode: "", schoolAdress: "" });
      return { ok: true };
    }),

    setFavoriteNews: protectedResolver(async (_, { news, userEmail }) => {
      const user = await User.findOne({ email: userEmail });
      const existNews = user.favoriteNews.includes(news);
      if (existNews) {
        await User.updateOne({ email: userEmail }, { $pull: { favoriteNews: news } });
      } else {
        await User.updateOne({ email: userEmail }, { $addToSet: { favoriteNews: news } });
      }
      return { ok: true };
    }),
  },
};

module.exports = resolver;
