const getThumbNailUrl = (url:string) => url.slice(0,url.length-5) + "_thumbNail.jpg";

export default getThumbNailUrl;