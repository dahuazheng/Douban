function isMobile(str) {
  let reg = /^1[0-9]{10}$/;
  return reg.test(str);
}

function isEmail(str) {
  let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i;
  return reg.test(str);
}

function isPassword(str) {
  let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/;
  return reg.test(str);
}


function verify(action, item, compare) {
  let actions = {
    'name': function () {
      if (!item.value)
        return '请输入昵称';
      else return '';
    },
    'phone': function () {
      if (!item.value)
        return '请输入手机号';
      else if (!isMobile(item.value))
        return '手机号码不正确';
      else return '';
    },
    'mail': function () {
      if (!item.value)
        return '请输入邮箱';
      else if (!isEmail(item.value))
        return '邮箱账号不正确';
      else return '';
    },
    'mailLogin': function () {
      if (!item.value)
        return '请输入邮箱';
      else return '';
    },
    'code': function () {
      if (!item.value)
        return '请输入验证码';
      else return '';
    },
    'passwordLogin': function () {
      if (!item.value)
        return '请输入密码';
      else return '';
    },
    'password': function () {
      if (!item.value)
        return '请输入新密码';
      else if (!isPassword(item.value))
        return '请输入8~20位数字和字母组合的密码';
      else return '';
    },
    'passwordConfirm': function () {
      if (!item.value)
        return '请输入确认密码';
      else if (!isPassword(item.value))
        return '请输入8~20位数字和字母组合的密码';
      else if (item.value != compare)
        return '两次输入的密码不一致';
      else return '';
    },
    'date': function () {
      if (!item.value)
        return '请选择日期';
      else return '';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }

  return actions[action]();
}
