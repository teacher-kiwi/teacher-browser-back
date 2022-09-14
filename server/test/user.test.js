const testServer = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const queryData = {
  createUser: {
    query: `mutation CreateUser($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        ok
      }
    }`,
  },

  loginUser: {
    query: `mutation LoginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        ok
        token
      }
    }`,
  },

  updateUser: {
    query: `mutation UpdateUser($userEmail: String!, $nickname: String, $schoolName: String, $schoolCode: String, $areaCode: String, $schoolAdress: String, $bgTheme: String, $allergy: [Int], $agreePolicy: Boolean) {
      updateUser(userEmail: $userEmail, nickname: $nickname, schoolName: $schoolName, schoolCode: $schoolCode, areaCode: $areaCode, schoolAdress: $schoolAdress, bgTheme: $bgTheme, allergy: $allergy, agreePolicy: $agreePolicy) {
        ok
      }
    }`,
  },

  me: {
    query: `query Me {
      me {
        email
        nickname
        schoolName
        schoolCode
        areaCode
        schoolAdress
        bgTheme
        allergy
        agreePolicy
        favoriteNews
      }
    }`,
  },

  setFavoriteNews: {
    query: `mutation SetFavoriteNews($news: String!, $userEmail: String!) {
      setFavoriteNews(news: $news, userEmail: $userEmail) {
        ok
      }
    }`,
  },

  deleteUser: {
    query: `mutation DeleteUser($teacherEmail: String!) {
      deleteUser(teacherEmail: $teacherEmail) {
        ok
      }
    }`,
  },
};

describe("user test!", () => {
  let mongoServer;
  let server, url, token;

  beforeAll(async () => {
    ({ server, url } = await testServer.listen({ port: 0 }));
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    await server.close();
  });

  test("thing does create!", async () => {
    const response = await request(url)
      .post("/")
      .send(queryData.createUser)
      .send({ variables: { email: "test@test.test", password: "testtest1!!" } });
    expect(response.body.data?.createUser.ok).toBeTruthy();
  });

  test("thing does login!", async () => {
    const response = await request(url)
      .post("/")
      .send(queryData.loginUser)
      .send({ variables: { email: "test@test.test", password: "testtest1!!" } });
    token = response.body.data?.loginUser.token;

    expect(response.body.data?.loginUser.ok).toBeTruthy();
    expect(response.body.data?.loginUser.token).not.toBeNull();
  });

  test("thing does update!", async () => {
    const response = await request(url)
      .post("/")
      .set("token", token)
      .send(queryData.updateUser)
      .send({
        variables: {
          userEmail: "test@test.test",
          nickname: "nickname",
          schoolName: "school",
          schoolCode: "schoolCode",
          areaCode: "areaCode",
          schoolAdress: "adress",
          bgTheme: "theme",
          allergy: [1, 2, 3, 4, 5],
          agreePolicy: true,
        },
      });
    expect(response.body.data?.updateUser.ok).toBeTruthy();
  });

  test("thing does read!", async () => {
    const response = await request(url).post("/").set("token", token).send(queryData.me);
    expect(response.body.data?.me.email).toBe("test@test.test");
    expect(response.body.data?.me.nickname).toBe("nickname");
    expect(response.body.data?.me.schoolName).toBe("school");
    expect(response.body.data?.me.schoolCode).toBe("schoolCode");
    expect(response.body.data?.me.areaCode).toBe("areaCode");
    expect(response.body.data?.me.schoolAdress).toBe("adress");
    expect(response.body.data?.me.bgTheme).toBe("theme");
    expect(response.body.data?.me.allergy).toStrictEqual([1, 2, 3, 4, 5]);
    expect(response.body.data?.me.agreePolicy).toBeTruthy();
  });

  test("thing does update null!", async () => {
    const response = await request(url)
      .post("/")
      .set("token", token)
      .send(queryData.updateUser)
      .send({
        variables: {
          userEmail: "test@test.test",
          nickname: null,
          schoolName: null,
          schoolCode: null,
          areaCode: null,
          schoolAdress: null,
          bgTheme: null,
          allergy: null,
          agreePolicy: false,
        },
      });
    expect(response.body.data?.updateUser.ok).toBeTruthy();
  });

  test("thing does read null!", async () => {
    const response = await request(url).post("/").set("token", token).send(queryData.me);
    expect(response.body.data?.me.email).toBe("test@test.test");
    expect(response.body.data?.me.nickname).toBeNull();
    expect(response.body.data?.me.schoolName).toBeNull();
    expect(response.body.data?.me.schoolCode).toBeNull();
    expect(response.body.data?.me.areaCode).toBeNull();
    expect(response.body.data?.me.schoolAdress).toBeNull();
    expect(response.body.data?.me.bgTheme).toBeNull();
    expect(response.body.data?.me.allergy).toBeNull();
    expect(response.body.data?.me.agreePolicy).toBeFalsy();
  });

  test("thing does add favorite news!", async () => {
    const response = await request(url)
      .post("/")
      .set("token", token)
      .send(queryData.setFavoriteNews)
      .send({ variables: { news: "test", userEmail: "test@test.test" } });
    expect(response.body.data?.setFavoriteNews.ok).toBeTruthy();
  });

  test("thing does read favorite news!", async () => {
    const response = await request(url).post("/").set("token", token).send(queryData.me);
    expect(response.body.data?.me.favoriteNews).toStrictEqual(["test"]);
  });

  test("thing does pull favorite news!", async () => {
    const response = await request(url)
      .post("/")
      .set("token", token)
      .send(queryData.setFavoriteNews)
      .send({ variables: { news: "test", userEmail: "test@test.test" } });
    expect(response.body.data?.setFavoriteNews.ok).toBeTruthy();
  });

  test("thing does read empty favorite news!", async () => {
    const response = await request(url).post("/").set("token", token).send(queryData.me);
    expect(response.body.data?.me.favoriteNews).toStrictEqual([]);
  });

  test("thing does delete!", async () => {
    const response = await request(url)
      .post("/")
      .set("token", token)
      .send(queryData.deleteUser)
      .send({ variables: { teacherEmail: "test@test.test" } });
    expect(response.body.data?.deleteUser.ok).toBeTruthy();
  });
});
