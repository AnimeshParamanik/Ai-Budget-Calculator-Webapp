export function saveData(data) {
  localStorage.setItem("budget-data", JSON.stringify(data));
}

export function loadData() {
  return JSON.parse(localStorage.getItem("budget-data"));
}
