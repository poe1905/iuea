export const gettoken = (data) => {
  const tuken = JSON.parse(window.localStorage.getItem(data)) ? JSON.parse(window.localStorage.getItem(data)) : ''
  return tuken
}

export const settoken = data => {
  window.localStorage.setItem('token', JSON.stringify(data))
}
