let users = JSON.parse(localStorage.getItem('users'));

export function userRegister(userInfo) {
  if (!users) {
    users = []
  }
  users.push(userInfo);
  localStorage.setItem('users', JSON.stringify(users));
}

export function userLogin(userInfo) {
  if (!users) {
    return {
      status: -2,
      message: '用户不存在'
    }
  }
  let user = users.filter((user) => {
    return userInfo.username === user.username || userInfo.password === user.password
  });
  if (user.length <= 0) {
    return {
      status: -2,
      message: '用户不存在'
    }
  }
  let data = {
    status: -1,
    message: '用户名或密码错误'
  };
  users.some((user) => {
    if (userInfo.username === user.username && userInfo.password === user.password) {
      data.status = 1;
      data.message = '登录成功，请稍后'
    }
    return data.status === 1
  });
  return data
}
