import redis from "redis";

const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

redisClient.on("error", (err) => {
  console.error("Redis Error: ", err);
});

const languages = process.env.SUPPORTED_LANGS

async function setCache(key, value, expiration = 3600) {
  try {
    await redisClient.set(key, expiration, JSON.stringify(value));
  } catch (error) {
    res.status(401).json({error: `Redis Set Error: ${error}`});
  }
}

async function getCache(key) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    res.status(401).json({error: `Redis Get Error: ${error}`});
  }
}

async function deleteCache() {
  try {
    for (const lang of languages){
      await redisClient.del(`faqs_${lang}`);

    }
  } catch (error) {
    console.error("Redis Delete Error: ", error);
  }
}

export { redisClient, setCache, getCache, deleteCache };
