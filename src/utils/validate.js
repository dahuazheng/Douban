function isMobile(str) {
  let reg = /^1[0-9]{10}$/;
  return reg.test(str);
}

function isEmail(str) {
  let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i;
  return reg.test(str);
}

function isPassword(str) {
  let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/;
  return reg.test(str);
}

export function isNumber(str) {
  let reg = /^[0-9]+.?[0-9]*$/;
  return reg.test(str);
}

export function validate(option) {
  let action = option.label;
  let actions = {
    'username': function () {
      if (!option.value)
        return '请输入手机号或邮箱';
      else if (isNumber(option.value)) {
        if (!isMobile(option.value))
          return '手机号码不正确';
        else return '';
      } else {
        if (!isEmail(option.value))
          return '邮箱不正确';
        else return '';
      }
    },
    'password': function () {
      if (!option.value)
        return '请输入密码';
      else if (!isPassword(option.value))
        return '请输入6~20位数字和字母组合的密码';
      else return '';
    },
    'nickname': function () {
      if (!option.value)
        return '请输入昵称';
      else return '';
    },
    'code': function () {
      if (!option.value)
        return '请输入验证码';
      else return '';
    },
    'date': function () {
      if (!option.value)
        return '请选择日期';
      else return '';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }

  return actions[action]();
}

export function verify(option) {
  let action = option.name;
  let actions = {
    'name': function () {
      if (!option.value)
        return '请输入昵称';
      else return '';
    },
    'phone': function () {
      if (!option.value)
        return '请输入手机号';
      else if (!isMobile(option.value))
        return '手机号码不正确';
      else return '';
    },
    'mail': function () {
      if (!option.value)
        return '请输入邮箱';
      else if (!isEmail(option.value))
        return '邮箱账号不正确';
      else return '';
    },
    'mailLogin': function () {
      if (!option.value)
        return '请输入邮箱';
      else return '';
    },
    'code': function () {
      if (!option.value)
        return '请输入验证码';
      else return '';
    },
    'passwordLogin': function () {
      if (!option.value)
        return '请输入密码';
      else return '';
    },
    'password': function () {
      if (!option.value)
        return '请输入新密码';
      else if (!isPassword(option.value))
        return '请输入8~20位数字和字母组合的密码';
      else return '';
    },
    'passwordConfirm': function () {
      if (!option.value)
        return '请输入确认密码';
      else if (!isPassword(option.value))
        return '请输入8~20位数字和字母组合的密码';
      else if (option.value !== option.compare)
        return '两次输入的密码不一致';
      else return '';
    },
    'date': function () {
      if (!option.value)
        return '请选择日期';
      else return '';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }

  return actions[action]();
}
