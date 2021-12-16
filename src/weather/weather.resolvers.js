import axios from "axios";

async function getPmGrade(lat, lng) {
  const tmCoord = await axios(
    `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${lng}&y=${lat}&output_coord=TM`,
    {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
      },
    }
  );

  const stationName = await axios(
    `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList` +
      `?serviceKey=${process.env.DATA_API_KEY}` +
      `&returnType=json` +
      `&tmX=${tmCoord.data.documents[0].x}` +
      `&tmY=${tmCoord.data.documents[0].y}`
  ).catch((error) => error.message);

  const pmGrade = await axios(
    `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty` +
      `?serviceKey=${process.env.DATA_API_KEY}` +
      `&returnType=json` +
      `&numOfRows=100` +
      `&stationName=${encodeURI(
        stationName.data?.response?.body?.items[0]?.stationName
      )}` +
      `&dataTerm=DAILY` +
      `&ver=1.3`
  ).catch((error) => error.message);

  return { pm10grade: pmGrade.data.response.body.items[0]?.pm10Grade1h };
}

async function getWeather(lat, lng) {
  const data = await axios(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.WEATHER_API_KEY}`
  ).catch((error) => error.message);

  return {
    icon: data?.data?.weather[0].icon,
    temp: data?.data?.main.temp,
  };
}

async function getAdress(lat, lng) {
  const {
    data: {
      documents: [data],
    },
  } = await axios({
    url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
    method: "get",
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
    },
  });
  return {
    address1: data?.address.region_2depth_name,
    address2: data?.address.region_3depth_name,
  };
}

async function weather(lat, lng) {
  const result = Object.assign(
    await getAdress(lat, lng),
    await getWeather(lat, lng),
    await getPmGrade(lat, lng)
  );
  return result;
}

export default {
  Query: {
    weather: (_, { lat, lng }) => weather(lat, lng),
  },
};
