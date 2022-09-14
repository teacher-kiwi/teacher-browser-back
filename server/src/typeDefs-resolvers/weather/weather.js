const axios = require("axios");

// 미세먼지 불러오기 함수(1.좌표 변환, 2. 측정소 검색, 3. 미세먼지 수치 확인)
async function getPmGrade(lat, lng) {
  return await axios(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${lng}&y=${lat}&output_coord=TM`, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
    },
  })
    .then(
      async ({
        data: {
          documents: [tmCoord],
        },
      }) => {
        console.log("변환된 좌표: ", tmCoord);
        return await axios(
          `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList` +
            `?serviceKey=${process.env.DATA_API_KEY}` +
            `&returnType=json` +
            `&tmX=${tmCoord.x}` +
            `&tmY=${tmCoord.y}`,
        )
          .then(
            async ({
              data: {
                response: {
                  body: {
                    items: [{ stationName }],
                  },
                },
              },
            }) => {
              console.log("측정소: ", stationName);
              return await axios(
                `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty` +
                  `?serviceKey=${process.env.DATA_API_KEY}` +
                  `&returnType=json` +
                  `&numOfRows=100` +
                  `&stationName=${encodeURI(stationName)}` +
                  `&dataTerm=DAILY` +
                  `&ver=1.3`,
              )
                .then(
                  ({
                    data: {
                      response: {
                        body: {
                          items: [{ pm10Grade1h }],
                        },
                      },
                    },
                  }) => {
                    console.log("미세먼지 수치: ", pm10Grade1h);
                    return { pm10grade: pm10Grade1h };
                  },
                )
                .catch(({ response }) => console.log("미세먼지 수치 불러오기 실패", response));
            },
          )
          .catch(({ response }) => console.log("측정소 불러오기 실패: ", response));
      },
    )
    .catch(({ response }) => console.log("좌표 변환 실패: ", response.data.msg));
}

// 날씨 불러오기 함수
async function getWeather(lat, lng) {
  return await axios(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.WEATHER_API_KEY}`,
  )
    .then(
      ({
        data: {
          weather: [{ icon }],
          main: { temp },
        },
      }) => {
        console.log("날씨: ", { icon, temp });
        return { icon, temp };
      },
    )
    .catch(({ response }) => console.log("날씨 불러오기 실패: ", response.data.message));
}

// 주소 불러오기 함수
async function getAddress(lat, lng) {
  return await axios({
    url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
    method: "get",
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
    },
  })
    .then(
      ({
        data: {
          documents: [
            {
              address: { region_2depth_name, region_3depth_name },
            },
          ],
        },
      }) => {
        const address = { address1: region_2depth_name, address2: region_3depth_name };
        console.log("주소: ", address);
        return address;
      },
    )
    .catch(({ response }) => console.log("주소 불러오기 실패", response.data.message));
}

const resolver = {
  Query: {
    weather: async (_, { lat, lng }) => {
      console.log("날씨 정보 불러오기 시작!");
      const result = Object.assign(await getAddress(lat, lng), await getWeather(lat, lng), await getPmGrade(lat, lng));
      console.log("날씨 정보 불러오기 끝!");
      return result;
    },
  },
};

module.exports = resolver;
