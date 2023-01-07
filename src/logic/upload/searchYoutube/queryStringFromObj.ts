const queryStringFromObj = (data:{[key:string]:any}) => {
  const str = Object.keys(data).map(key => (
    `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
  ));

  return str.join('&');
};

export default queryStringFromObj;