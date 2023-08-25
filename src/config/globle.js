

window.year = new Date().getFullYear();
window.getRandomId = () => Math.random().toString(36).slice(2);
window.isEmail = email=> /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(email)