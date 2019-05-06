const ALL = [
  { title: 'transfer money', action: 'transfer' },
  { title: 'send airtime', action: 'airtime-others' },
  { title: 'purchase airtime', action: 'airtime-self' },
  { title: 'check account balance', action: 'balance' },
  { title: 'main menu', action: 'menu'},
]

export default [
  {
    name: 'Access Bank',
    logo: 'Access Bank PLC Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*901#',
      'balance': '*901*5#',
      'transfer-self': '*901*1*{{amount}}*{{number}}#', // transfer to same bank
      'transfer-others': '*901*2*{{amount}}*{{number}}#',
      'airtime-self': '*901*{{amount}}#' ,
      'airtime-others': '*901*{{amount}}*{{number}}#',
    }
  }, {
    name: 'Ecobank',
    logo: 'Ecobank Logo.svg',
    menu: [
      { title: 'purchase airtime', action: 'airtime-self'},
      { title: 'main menu', action: 'menu'},
    ],
    codes: {
      'menu': '*326#',
      'airtime-self': '*326*{{amount}}#',
    }
  }, {
    name: 'Fidelity Bank',
    logo: 'Fidelity Bank Nigeria Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*770#',
      'balance': '*770*0#',
      'transfer-self': '*770*{{number}}*{{amount}}#',
      'transfer-others': '*770*{{number}}*{{amount}}#',
      'airtime-self': '*770*{{amount}}#',
      'airtime-others': '*770*{{number}}*{{amount}}#',
    }
  }, {
    name: 'First Bank',
    logo: 'First Bank Nigeria Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*894#',
      'balance': '*894*00#',
      'transfer-self': '*894*{{amount}}*{{number}}#',
      'transfer-others': '*894*{{amount}}*{{number}}#',
      'airtime-self': '*894*{{amount}}#',
      'airtime-others': '*894*{{amount}}*{{number}}#',
    }
  }, {
    name: 'First City Monument Bank',
    shortName: "FCMB",
    logo: 'First City Monument Bank Ltd Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*329#',
      'balance': '*329*00#',
      'transfer-self': '*329*{{amount}}*{{number}}#',
      'transfer-others': '*329*{{amount}}*{{number}}#',
      'airtime-self': '*329*{{amount}}#',
      'airtime-others': '*329*{{amount}}*{{number}}#',
    }
  }, {
    name: 'Guaranty Trust Bank',
    shortName: 'GTBank',
    logo: 'Guaranty Trust Bank Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*737#',
      'balance': '*737*6*1#',
      'transfer-self': '*737*1*{{amount}}*{{number}}#',
      'transfer-others': '*737*2*{{amount}}*{{number}}#',
      'airtime-self': '*737*{{amount}}#',
      'airtime-others': '*737*{{amount}}*{{number}}#',
    }
  }, {
    name: 'Heritage Bank',
    logo: 'Heritage Bank PLC Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*322*030#',
      'balance': '*322*030#',
      'transfer-self': '*322*030*{{number}}*{{amount}}#',
      'transfer-others': '*322*030*{{number}}*{{amount}}#',
      'airtime-self': '*322*030*{{amount}}#',
      'airtime-others': '*322*030*{{number}}*{{amount}}#',
    }
  }, {
    name: 'Keystone Bank',
    logo: 'Keystone Bank Limited Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*7111#',
      'balance': '*7111*1#',
      'transfer-self': '7111*{{amount}}*{{number}}#',
      'transfer-others': '7111*{{amount}}*{{number}}#',
      'airtime-self': '*7111*{{amount}}#',
      'airtime-others': '7111*{{amount}}*{{number}}#',
    }
  }, {
    name: 'Polaris Bank',
    logo: 'Polaris Bank Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*833#',
      'balance': '*833*6#',
      'transfer-self': '*833*{{amount}}*{{number}}#',
      'transfer-others': '*833*{{amount}}*{{number}}#',
      'airtime-self': '*833*{{amount}}#',
      'airtime-others': '*833*{{amount}}*{{number}}#',
    }
  }, {
    name: 'Stanbic IBTC Bank',
    logo: 'Stanbic IBTC Bank Logo.svg',
    menu: [
      { title: 'purchase airtime', action: 'airtime-self' },
      { title: 'main menu', action: 'menu' },
    ],
    codes: {
      'menu': '*909#',
      'airtime-self': '*909*{{amount}}#',
    }
  }, {
    name: 'Sterling Bank',
    logo: 'Sterling Bank Plc Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*822#',
      'balance': '*822*6#',
      'transfer-self': '*822*4*{{number}}*{{amount}}#',
      'transfer-others': '*822*5*{{number}}*{{amount}}#',
      'airtime-self': '*822*{{amount}}#',
      'airtime-others': '*822*{{amount}}*{{number}}#',
    }
  }, {
    name: 'Union Bank',
    logo: 'Union Bank Nigeria Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*826#',
      'balance': '*826#',
      'transfer-self': '*826*1*{{amount}}*{{number}}#',
      'transfer-others': '*826*2*{{amount}}*{{number}}#',
      'airtime-self': '*826*{{amount}}#',
      'airtime-others': '*826*{{amount}}*{{number}}#',
    }
  },{
    name: 'UBA',
    logo: 'UBA Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*919#',
      'balance': '*919*00#',
      'transfer-self': '*919*3*{{number}}*{{amount}}#',
      'transfer-others': '*919*4*{{number}}*{{amount}}#',
      'airtime-self': '*919*{{amount}}#',
      'airtime-others': '*919*{{number}}*{{amount}}#',
    }
  }, {
    name: 'Wema Bank',
    logo: 'Wema Bank Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*945#',
      'balance': '*945*0#',
      'transfer-self': '*945*{{number}}*{{amount}}#',
      'transfer-others': '*945*{{number}}*{{amount}}#',
      'airtime-self': '*945*{{amount}}#',
      'airtime-others': '*945*{{number}}*{{amount}}#',
    }
  }, {
    name: 'Zenith Bank',
    logo: 'Zenith Bank Logo.svg',
    menu: ALL,
    codes: {
      'menu': '*966#',
      'balance': '*966*00#',
      'transfer-self': '*966*{{amount}}*{{number}}#',
      'transfer-others': '*966*{{amount}}*{{number}}#',
      'airtime-self': '*966*{{amount}}#',
      'airtime-others': '*966*{{amount}}*{{number}}#',
    }
  }
]