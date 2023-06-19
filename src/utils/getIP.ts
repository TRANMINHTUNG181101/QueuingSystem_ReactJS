export const getIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const ip = data.ip;
    console.log(ip);
    return ip;
  } catch (error) {
    console.log("Lỗi khi lấy địa chỉ IP:", error);
    return null;
  }
};
