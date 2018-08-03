let users = JSON.parse(localStorage.getItem('users'));

export function userRegister(userInfo) {
  if (!users) {
    users = []
  }
  let user = users.filter((user) => {
    return userInfo.username === user.username
  })[0];
  if (user) {
    return {
      status: -2,
      message: '用户已存在'
    }
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

export function setUserCode(code) {
  localStorage.setItem('userCode', JSON.stringify(code));
}

export function userFindPassword(username, code) {
  let serverCode = JSON.parse(localStorage.getItem('userCode'));

  let user = users.filter((user) => {
    return username === user.username
  })[0];

  if (!user) {
    return {
      status: -2,
      message: '用户不存在'
    }
  }
  if (code !== serverCode) {
    return {
      status: -1,
      message: '验证码不正确'
    }
  } else {
    return {
      status: 1,
      message: '确认成功'
    }
  }
}

export function userResetPassword(username, password) {
  let reset = false;

  users.forEach((user) => {
    if (username === user.username) {
      user.password = password;
      reset = true;
    }
  });

  if (reset) {
    localStorage.setItem('users', JSON.stringify(users));
    return {
      status: 1,
      message: '确认成功'
    }
  } else {
    return {
      status: -1,
      message: '修改密码失败，请重试'
    }
  }
}
