// Reads / writes the admin saved by your Signup page (localStorage "userInfo")
export const getAdmin = () => {
  try { return JSON.parse(localStorage.getItem("userInfo")) || {} } catch { return {} }
}
export const saveAdmin = (data) => localStorage.setItem("userInfo", JSON.stringify(data))
export const money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN")
export const dateStr = (d) => (d ? new Date(d).toLocaleDateString() : "-")
