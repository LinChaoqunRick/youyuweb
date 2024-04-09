interface infoType {
  name: string,
  ltd: string,
  width: number,
  correctWidth: number,
}

const icons = {
  1: {type: 'unknown', code: 1, name: '假机柜', icon: '/static/micro/images/ups.png', color: 0x899ab6},
  2: {type: 'control', code: 2, name: '管控柜', icon: '/static/micro/images/control.png', color: 0xa1d465},
  3: {type: 'electric', code: 3, name: '配电柜', icon: '/static/micro/images/electric.png', color: 0xfba82c},
  4: {type: 'hvdc', code: 4, name: 'HVDC柜', icon: '/static/micro/images/hvdc.png', color: 0xfba82c},
  5: {type: 'battery', code: 5, name: '电池柜', icon: '/static/micro/images/battery.png', color: 0xfba82c},
  6: {type: 'cooling', code: 6, name: '空调柜', icon: '/static/micro/images/cooling.png', color: 0x26afff},
  7: {type: 'it', code: 7, name: 'IT机柜', icon: '/static/micro/images/it.png', color: 0x3ed0ba},
  9: {type: 'ups', code: 9, name: 'UPS柜', icon: '/static/micro/images/ups.png', color: 0xfba82c},
}

export {icons};
export type {infoType};
