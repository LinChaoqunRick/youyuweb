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

const mockCabinetData = {
  doorHeadType: '2',
  lintelLogoType: '1',
  lintelLogoFilePath: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2024/0416/20240416145052_tencent.png',
  lcdDisplayType: '99',
  lcdDisplayStandardFilePath: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2024/0416/20240416150049_1280_800.png',
  lcdDisplayHighEndFilePath: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2024/0416/20240416150205_791_1358.png',
  glassDoorLogoType: '99',
  glassDoorLogoFilepath: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/post/images/2024/0416/20240416150241_746_100.png',
  glassDoorType: '1',
  cabinetList: [
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 1,
      "assetId": 9,
      "cabinetShortName": "机柜01",
      "cabinetType": "1",
      "cabinetWidth": "1",
      "alarmLevel": 3,
      "alarmCount": 1,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 1,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 2,
      "assetId": 8,
      "cabinetShortName": "机柜02",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": 4,
      "alarmCount": 113,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 1,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 3,
      "assetId": 7,
      "cabinetShortName": "机柜03",
      "cabinetType": "2",
      "cabinetWidth": "1",
      "alarmLevel": 4,
      "alarmCount": 159,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 2,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 4,
      "assetId": 6,
      "cabinetShortName": "机柜04",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 2,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 5,
      "assetId": 5,
      "cabinetShortName": "机柜05",
      "cabinetType": "3",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 3,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 6,
      "assetId": 4,
      "cabinetShortName": "机柜06",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 3,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 7,
      "assetId": 3,
      "cabinetShortName": "机柜07",
      "cabinetType": "4",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 4,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 8,
      "assetId": 2,
      "cabinetShortName": "机柜08",
      "cabinetType": "4",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 4,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 9,
      "assetId": 1,
      "cabinetShortName": "机柜09",
      "cabinetType": "5",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 5,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 10,
      "assetId": 23,
      "cabinetShortName": "机柜10",
      "cabinetType": "9",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 5,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 11,
      "assetId": 21,
      "cabinetShortName": "机柜11",
      "cabinetType": "6",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 6,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 12,
      "assetId": 16,
      "cabinetShortName": "机柜12",
      "cabinetType": "2",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 6,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 13,
      "assetId": 14,
      "cabinetShortName": "机柜13",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 7,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 14,
      "assetId": 19,
      "cabinetShortName": "机柜14",
      "cabinetType": "3",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 7,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 15,
      "assetId": 18,
      "cabinetShortName": "机柜15",
      "cabinetType": "9",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 8,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 16,
      "assetId": 11,
      "cabinetShortName": "机柜16",
      "cabinetType": "9",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 8,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 17,
      "assetId": 10,
      "cabinetShortName": "机柜17",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 9,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 18,
      "assetId": 13,
      "cabinetShortName": "机柜18",
      "cabinetType": "5",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 9,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 19,
      "assetId": 12,
      "cabinetShortName": "机柜19",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 10,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 20,
      "assetId": 20,
      "cabinetShortName": "机柜20",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 10,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 21,
      "assetId": 24,
      "cabinetShortName": "机柜21",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 11,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 22,
      "assetId": 22,
      "cabinetShortName": "机柜22",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 11,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 23,
      "assetId": 17,
      "cabinetShortName": "机柜23",
      "cabinetType": "7",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "1",
      "cabinetRowOrder": 12,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 24,
      "assetId": 15,
      "cabinetShortName": "机柜24",
      "cabinetType": "6",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": "2",
      "cabinetRowOrder": 12,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 25,
      "assetId": 68,
      "cabinetShortName": "机柜25",
      "cabinetType": "1",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": null,
      "cabinetRowOrder": null,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    },
    {
      "deviceId": 1,
      "deviceType": "100",
      "deviceName": "192.168.68.227",
      "areaId": 1,
      "cabinetIndex": 26,
      "assetId": 69,
      "cabinetShortName": "机柜26",
      "cabinetType": "1",
      "cabinetWidth": "1",
      "alarmLevel": null,
      "alarmCount": 0,
      "cabinetLocateRow": null,
      "cabinetRowOrder": null,
      "cabinetOrderIndex": null,
      "avgTemp": null,
      "avgHumi": null
    }
  ],
};

const mockSecurityData = [
  {
    "microDeviceConfigId": 29,
    "deviceId": 18,
    "deviceName": "192.168.68.227_DI-11#11",
    "deviceLocation": "1",
    "deviceType": "70",
    "securityType": "4",
    "deviceAlarmInfoList": []
  },
  {
    "microDeviceConfigId": 31,
    "deviceId": 42,
    "deviceName": "192.168.68.227_网络摄像机(前)#1",
    "deviceLocation": "3",
    "deviceType": "38",
    "securityType": "2",
    "deviceAlarmInfoList": [
      {
        "unsolvedEventLogId": "22B65E0E2E574A83B4BBFE90C1EE3DDB",
        "deviceName": "192.168.68.227_网络摄像机(前)#1",
        "alarmEventName": "通讯中断",
        "alarmLevelName": "四级告警",
        "alarmLevel": 4,
        "eventStartTime": "2024-04-01 16:08:02",
        "handleState": "0",
        "areaName": "区域"
      }
    ]
  },
  {
    "microDeviceConfigId": 32,
    "deviceId": 43,
    "deviceName": "192.168.68.227_网络摄像机(后)#2",
    "deviceLocation": "8",
    "deviceType": "38",
    "securityType": "1",
    "deviceAlarmInfoList": [
      {
        "unsolvedEventLogId": "2E8D23DF56894F508ED97A2D8163728B",
        "deviceName": "192.168.68.227_网络摄像机(后)#2",
        "alarmEventName": "通讯中断",
        "alarmLevelName": "四级告警",
        "alarmLevel": 4,
        "eventStartTime": "2024-04-01 16:08:02",
        "handleState": "0",
        "areaName": "区域"
      }
    ]
  }
];

const mockAlarmListData = [
  {
    "alarmLevel": 1,
    "alarmLevelName": "一级告警",
    "alarmLevelColor": "rgba(237,64,20,1)",
  },
  {
    "alarmLevel": 2,
    "alarmLevelName": "二级告警",
    "alarmLevelColor": "rgba(255,153,0,1)",
  },
  {
    "alarmLevel": 3,
    "alarmLevelName": "三级告警",
    "alarmLevelColor": "rgba(13,148,170,1)",
  },
  {
    "alarmLevel": 4,
    "alarmLevelName": "四级告警",
    "alarmLevelColor": "rgba(155,29,234,1)",
  },
  {
    "alarmLevel": 5,
    "alarmLevelName": "五级告警",
    "alarmLevelColor": "rgba(255,255,255,1)",
  },
  {
    "alarmLevel": 6,
    "alarmLevelName": "六级告警",
    "alarmLevelColor": "rgba(255,255,255,1)",
  },
  {
    "alarmLevel": 7,
    "alarmLevelName": "七级告警",
    "alarmLevelColor": "rgba(255,255,255,1)",
  },
  {
    "alarmLevel": 8,
    "alarmLevelName": "八级告警",
    "alarmLevelColor": "rgba(255,255,255,1)",
  }
]

const mockMicroConfigEnum = {
  doorHeadType: [
    {"code": "1", "desc": "标准"},
    {"code": "2", "desc": "高端"}
  ],
  lintelLogoType: [
    {"code": "1", "desc": "海康Logo", image: 'menmei_logo.png'},
    {"code": "2", "desc": "门楣主题1", image: 'men_menmei_ping.png'},
    {"code": "3", "desc": "门楣主题2", image: 'men_menmei_ping_2.png'},
    {"code": "4", "desc": "门楣主题3", image: 'men_menmei_ping_3.png'},
    {"code": "5", "desc": "门楣主题4", image: 'men_menmei_ping_4.png'},
    {"code": "99", "desc": "自定义，尺寸340 * 120"}
  ],
  lcdStandardDisplayType: [
    {"code": "1", "desc": "白色主题液晶屏", image: 'menban_biaoping_ping.png'},
    {"code": "99", "desc": "自定义，尺寸1280 * 800"}
  ],
  lcdHighEndDisplayType: [
    {"code": "1", "desc": "49寸大屏", image: 'menban_daping_ping.png'},
    {"code": "99", "desc": "自定义，尺寸791 * 1358"}
  ],
  glassDoorLogoType: [
    {"code": "1", "desc": "白色Logo", image: 'men_pensha.png'},
    {"code": "99", "desc": "自定义，尺寸746 * 100"}
  ],
  glassDoorType: [
    {"code": "1", "desc": "平移门", image: 'pan_door.png'},
    {"code": "2", "desc": "旋转门", image: 'rotate_door.png'}
  ],
}

const mockCapacityData = [
  {
    "assetId": 9,
    "rate": 5
  },
  {
    "assetId": 8,
    "rate": 10
  },
  {
    "assetId": 7,
    "rate": 15
  },
  {
    "assetId": 6,
    "rate": 20
  },
  {
    "assetId": 5,
    "rate": 25
  },
  {
    "assetId": 4,
    "rate": 30
  },
  {
    "assetId": 3,
    "rate": 35
  },
  {
    "assetId": 2,
    "rate": 40
  },
  {
    "assetId": 1,
    "rate": 45
  },
  {
    "assetId": 23,
    "rate": 50
  },
  {
    "assetId": 21,
    "rate": 55
  },
  {
    "assetId": 16,
    "rate": 60
  },
  {
    "assetId": 14,
    "rate": 65
  },
  {
    "assetId": 19,
    "rate": 70
  },
  {
    "assetId": 18,
    "rate": 75
  },
  {
    "assetId": 11,
    "rate": 80
  },
  {
    "assetId": 10,
    "rate": 85
  },
  {
    "assetId": 13,
    "rate": 90
  },
  {
    "assetId": 12,
    "rate": 95
  },
  {
    "assetId": 20,
    "rate": 100
  },
  {
    "assetId": 24,
    "rate": 105
  },
  {
    "assetId": 22,
    "rate": 110
  },
  {
    "assetId": 17,
    "rate": 115
  },
  {
    "assetId": 15,
    "rate": 120
  },
  {
    "assetId": 68,
    "rate": 125
  },
  {
    "assetId": 69,
    "rate": 130
  }
]

export {icons, mockCabinetData, mockSecurityData, mockAlarmListData, mockMicroConfigEnum, mockCapacityData};
export type {infoType};
