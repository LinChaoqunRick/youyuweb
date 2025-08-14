/******************************/
/*       date:2018-07-26      */
/*       version:2.0.6       */
/******************************/
var language_class = {
  status: {
    title: '状态',
    refresh: '刷新',
    manualrefresh: '手动刷新',
    stop: 'Stop',
    second: '秒',
    minute: '分钟',
    summary: {
      "title": "概况",
      "systemstatuslabel": "系统状态",
      "systeminfolabel": "系统信息",
      "cellularlabel": "蜂窝",
      "wanlabel": "WAN",
      "wlanlabel": "WLAN",
      "lanlabel": "LAN",
      "status": "状态",
      "nowSim": "当前蜂窝链路",
      "ip": "IP",
      "ipv4": "IPv4",
      "ipv6": "IPv6",
      "connectTime": "连接时长",
      "monthlycount": "SIM卡数据月度统计",
      "mode": "模式",
      "ssid": "SSID",
      "connectclientcount": "已连接客户端数",
      "connectdevicecount": "已连接设备数",
      "currentlink": "当前链路",
      model: '型号',
      partnumber: '部件号',
      sn: '序列号',
      pn: 'PN',
      mac: 'MAC',
      firmware: '固件版本',
      hardware: '硬件版本',
      localtime: '本地时间',
      uptime: '正常运行时间',
      cpu: '处理器负荷',
      cputemp: '处理器温度',
      tfcarduse: 'SD卡（可用/全部)',
      memory: '内存（可用/全部）',
      day: '天',
      flash: 'Flash（可用/全部)',
      hour: 'h',
      minute: 'm',
      second: 's',
      tip: [
        {
          title: '型号',
          con: '显示该设备的型号'
        },
        {
          title: '序列号',
          con: '显示该设备序列号'
        },
        {
          title: '固件版本',
          con: '显示当前固件版本'
        },
        {
          title: '硬件版本',
          con: '显示当前的硬件版本'
        },
        {
          title: '本地时间',
          con: '显示当前的系统时间'
        },
        {
          title: '正常运行时间',
          con: '显示系统从启动到当前的工作时长'
        },
        {
          title: '处理器负荷',
          con: '显示当前CPU的负荷情况'
        },
        {
          title: '内存（可用/全部）',
          con: '显示当前的内存可用容量和总容量'
        },
        {
          title: 'Flash（可用/全部）',
          con: '显示当前Flash可用容量和总容量'
        },
        {
          32: {
            "title": "当前SIM卡",
            "con": "显示当前蜂窝模块使用的SIM卡。"
          },
          35: {
            "title": "当前SIM卡",
            "con": "显示当前蜂窝模块使用的SIM卡。"
          }
        },
        {
          32: {
            "title": "数据月度统计",
            "con": "显示本月度当前SIM卡已使用的数据流量。"
          },
          '32L': {
            "title": "数据月度统计",
            "con": "显示本月度已使用的数据流量。"
          },
          35: {
            "title": "数据月度统计",
            "con": "显示本月度当前SIM卡已使用的数据流量。"
          }
        },
        {
          "title": "已连接客户端数",
          "con": "显示连接上路由器AP的客户端数量。"
        },
        {
          "title": "已连接设备数",
          "con": "显示连接上路由器局域网的设备数量。"
        },
        {
          "title": "当前链路",
          "con": "显示路由器目前正在使用的链路。"
        },
        {
          title: '自动刷新',
          con: '选择"5s-1minute"的时间间隔后状态页面可以进行自动刷新'
        }
      ]
    },
    cellular: {
      "title": "蜂窝",
      "datacountlabel": "月度数据统计",
      "sim1count": "SIM-1",
      "sim2count": "SIM-2",
      modemlabel: '蜂窝运行状态',
      model: '模块型号',
      version: '版本',
      cursim: '当前SIM卡',
      signal: '信号强度',
      register: '注册状态',
      imsi: 'IMSI',
      iccid: 'ICCID',
      netprovider: '运营商',
      nettype: '网络类型',
      plmnid: 'PLMN ID',
      lac: '位置区码',
      cellid: 'Cell ID',
      imei: 'IMEI',
      networklabel: '网络',
      status: '状态',
      ip: 'IP地址',
      netmask: '子网掩码',
      gate: '网关',
      dns: 'DNS',
      ipv4: 'IPv4 地址',
      ipv6: 'IPv6 地址',
      netmask: 'IPv4 子网掩码',
      ipv6_netmask: 'IPv6 子网掩码',
      gate: 'IPv4 网关',
      ipv6_gate: 'IPv6 网关',
      dns: 'IPv4 DNS',
      ipv6_dns: 'IPv6 DNS',
      time: '连接时长',
      overtip: '超出最大可用流量',
      cellBand: '蜂窝频段',
      tip: [
        {
          title: '状态',
          con: '显示模块和SIM卡的相关检测状态。'
        },
        {
          title: '模块型号',
          con: '显示蜂窝模块型号'
        },
        {
          title: '模块版本',
          con: '显示蜂窝模块版本'
        },
        {
          32: {
            title: '当前SIM卡',
            con: '显示当前使用的SIM卡'
          },
          35: {
            title: '当前SIM卡',
            con: '显示当前使用的SIM卡'
          }
        },
        {
          title: '信号强度',
          con: '显示蜂窝无线信号强度'
        },
        {
          title: '注册状态',
          con: '显示当前SIM卡的注册状态'
        },
        {
          title: 'IMEI',
          con: '显示模块IMEI'
        },
        {
          title: 'IMSI',
          con: '显示SIM卡的IMSI'
        },
        {
          title: 'ICCID',
          con: '显示SIM卡的ICCID'
        },
        {
          title: '运营商',
          con: '显示注册上的运营商'
        },
        {
          title: '网络类型',
          con: '显示拨号上的网络类型，如LTE，3G等'
        },
        {
          title: '蜂窝频段',
          con: '当使用蜂窝网络完成驻网时，路由器使用当前蜂窝频段进行通信。'
        },
        {
          title: 'PLMN ID',
          con: '显示移动国家代码（MCC)+移动网络代码（MNC),也显示位置区域码（LAC)和小区识别码'
        },
        {
          title: '位置区码',
          con: '显示SIM卡位置区域码'
        },
        {
          title: 'Cell ID',
          con: '显示SIM卡所在的蜂窝小区识别号'
        },
        {
          title: 'RSRP',
          con: '显示参考信号的接收功率。'
        },
        {
          title: 'RSRQ',
          con: '显示LTE参考信号的接收质量。'
        },
        {
          title: 'SINR',
          con: '显示信号与干扰加噪声比。'
        },
        {
          title: '状态',
          con: '显示蜂窝网络拨号状态'
        },
        {
          title: 'IP地址',
          con: '显示蜂窝拨号获取的IP地址'
        },
        {
          title: '网关',
          con: '显示蜂窝拨号获取的网关'
        },
        {
          title: 'DNS',
          con: '显示蜂窝拨号获取的DNS'
        },
        {
          title: '连接时长',
          con: '显示蜂窝拨号上线后的连接时长'
        },
        {
          32: {
            "title": "SIM-1",
            "con": "显示本月度SIM-1已使用的数据流量。"
          },
          35: {
            "title": "SIM-1",
            "con": "显示本月度SIM-1已使用的数据流量。"
          }
        },
        {
          32: {
            "title": "SIM-2",
            "con": "显示本月度SIM-2已使用的数据流量。"
          },
          35: {
            "title": "SIM-2",
            "con": "显示本月度SIM-2已使用的数据流量。"
          }
        },
        {
          title: '手动更新',
          con: '点击“刷新”按钮手动更新设备状态信息'
        },
        {
          title: '自动刷新',
          con: '选择"5s-1minute"的时间间隔后状态页面可以进行自动刷新'
        }
      ]
    },
    network: {
      title: '网络',
      wantitle: '广域网',
      name: '端口',
      status: '状态',
      type: '拨号类型',
      ip: 'IPv4地址',
      ipv6: 'IPv6地址',
      netmask: '子网掩码',
      prefixlength: '前缀长度',
      gate: '网关',
      dns: 'DNS',
      time: '连接时长',
      lantitle: '局域网',
      lanname: '名称',
      bridgename: '名称',
      bridgetitle: '网桥',
      vlan: 'VLAN ID',
      mtu: '最大传输单位',
      wifititle: 'WLAN客户端',
      signal: '信号',
      ssid: 'SSID',
      channel: '信道',
      auth: '认证方式',
      encry: '加密',
      stp: 'STP',
      members: 'Members',
      tip: [
        {
          title: 'WAN-IPv4',
          con: ''
        },
        {
          title: '端口',
          con: '显示WAN口的端口名称'
        },
        {
          title: '状态',
          con: '显示WAN口的状态。“上线”表示端口已经启用。'
        },
        {
          title: '拨号类型',
          con: '显示WAN口拨号的类型'
        },
        {
          title: 'IP地址',
          con: '显示WAN口的IPv4地址'
        },
        {
          title: '子网掩码',
          con: '显示WAN口的子网掩码'
        },
        {
          title: '网关',
          con: '显示WAN口的网关地址'
        },
        {
          title: 'DNS',
          con: '显示WAN口的DNS'
        },
        {
          title: '连接时长',
          con: '显示WAN口网线连接的时长。当禁用WAN功能或断开网线连接后停止计时'
        },
        {
          title: 'WAN-IPv6',
          con: ''
        },
        {
          title: '端口',
          con: '显示WAN口的端口名称'
        },
        {
          title: '状态',
          con: '显示WAN口的状态。“上线”表示端口已经启用。'
        },
        {
          title: '拨号类型',
          con: '显示WAN口拨号的类型'
        },
        {
          title: 'IP地址',
          con: '显示WAN口的IPv6地址'
        },
        {
          title: '前缀长度',
          con: '显示WAN口的前缀长度'
        },
        {
          title: '网关',
          con: '显示WAN口的网关地址'
        },
        {
          title: 'DNS',
          con: '显示WAN口的DNS'
        },
        {
          title: '连接时长',
          con: '显示WAN口网线连接的时长。当禁用WAN功能或断开网线连接后停止计时'
        },
        {
          title: 'Bridge',
          con: ''
        },
        {
          title: '名称',
          con: '显示网桥接口的名称'
        },
        {
          title: 'STP',
          con: '显示是否启用生成树协议'
        },
        {
          title: 'IP地址',
          con: '显示网桥接口的IP地址'
        },
        {
          title: '子网掩码',
          con: '显示网桥接口的子网掩码'
        },
        {
          title: '成员',
          con: '显示网桥的成员'
        },
        {
          title: '手动更新',
          con: '点击“刷新”按钮手动更新设备状态信息'
        },
        {
          title: '自动刷新',
          con: '选择"5s-1minute"的时间间隔后状态页面可以进行自动刷新'
        }
      ]
    },
    vpn: {
      title: 'VPN',
      clientstitle: '客户端',
      servertitle: '服务器',
      connectlisttitle: '已连接客户端',
      name: '名称',
      status: '状态',
      localip: '本地IP',
      remoteip: '远端IP',
      type: '服务器类型',
      clientip: '客户端IP',
      connecttime: '连接时间',
      tip: [
        {
          title: '客户端',
          con: ''
        },
        {
          title: '名称',
          con: '显示已经启用的VPN客户端的名称'
        },
        {
          title: '状态',
          con: '显示开启的客户端是否与服务器连接'
        },
        {
          title: '本地IP',
          con: '显示路由器的IP地址'
        },
        {
          title: '远端IP',
          con: '显示隧道的远端真实IP地址.'
        },
        {
          title: '服务器',
          con: ''
        },
        {
          title: '名称',
          con: '显示已经启用的VPN服务器的名称'
        },
        {
          title: '状态',
          con: '显示服务器的状态'
        },
        {
          title: '已连接客户端',
          con: ''
        },
        {
          title: '服务器类型',
          con: '显示连接的服务器类型'
        },
        {
          title: '客户端IP',
          con: '显示连接到该服务器的客户端的IP地址'
        },
        {
          title: '连接时间',
          con: '显示客户端与服务器的连接时间。当禁用该服务器时或连接断开后停止计时。'
        },
        {
          title: '手动更新',
          con: '点击“刷新”按钮手动更新设备状态信息'
        },
        {
          title: '自动刷新',
          con: '选择"5s-1minute"的时间间隔后状态页面可以进行自动刷新'
        }
      ]
    },
    router: {
      title: '路由信息',
      routetitle: '路由表',
      destination: '目的地址',
      netmask: '子网掩码/前缀长度',
      gateway: '网关',
      ifn: '接口',
      distance: '度量',
      arptitle: 'ARP 缓存',
      ip: 'IP',
      mac: 'MAC',
      tip: [
        {
          title: '路由表',
          con: ''
        },
        {
          title: '目的地址',
          con: '显示目的主机或目的网络的 IP 地址'
        },
        {
          title: '子网掩码/前缀长度',
          con: '显示目的主机或目的网络的子网掩码/前缀长度'
        },
        {
          title: '网关',
          con: '显示该静态路由规则网关的IP地址'
        },
        {
          title: '接口',
          con: '显示所配置的路由的出站接口'
        },
        {
          title: '度量',
          con: '显示路由的度量值'
        },
        {
          title: 'ARP Cache',
          con: ''
        },
        {
          title: 'IP',
          con: '显示ARP池的IP地址'
        },
        {
          title: 'MAC',
          con: '显示IP地址相对应的MAC地址'
        },
        {
          title: '接口',
          con: '显示ARP记录的绑定接口'
        },
        {
          title: '手动更新',
          con: '点击“刷新”按钮手动更新设备状态信息'
        },
        {
          title: '自动刷新',
          con: '选择"5s-1minute"的时间间隔后状态页面可以进行自动刷新'
        }
      ]
    },
    host: {
      title: '主机列表',
      dhcpleasetitle: 'DHCP 租约时间',
      ip: 'IP',
      mac: 'MAC/DUID',
      lease: '剩余租约时间',
      dhcphosttitle: 'MAC绑定',
      nolimit: '无限制',
      tip: [
        {
          title: 'DHCP 租约时间',
          con: ''
        },
        {
          title: 'IP',
          con: '显示DHCP租约主机的IP地址'
        },
        {
          title: 'MAC/DUID',
          con: '显示DHCP租约主机的MAC/DUID地址'
        },
        {
          title: '剩余租约时间',
          con: '显示DHCP租约剩余时间'
        },
        {
          title: 'MAC绑定',
          con: '显示DHCP服务中绑定的静态IP和MAC地址'
        },
        {
          title: '手动更新',
          con: '点击“刷新”按钮手动更新设备状态信息'
        },
        {
          title: '自动刷新',
          con: '选择"5s-1minute"的时间间隔后状态页面可以进行自动刷新'
        }
      ]
    },
    wlan: {
      title: 'WLAN',
      wifilabel: 'WLAN状态',
      name: '名称',
      status: '状态',
      modetype: '接口类型',
      ssid: 'SSID',
      ip: 'IP地址',
      ipv6: 'IPv6地址',
      mask: '子网掩码',
      assinterface: 'SSID名称',
      mac: 'MAC地址',
      addr: 'IP地址',
      connected: '连接时间',
      rx: '接收数据包',
      tx: '发射数据包',
      signal: '信号强度',
      rxrate: '接收速率',
      txrate: '发送速率',
      staslabel: '已关联无线用户',
      mode1: '接入点',
      mode2: '客户端',
      unknown: '未知',
      tip: [
        {
          title: 'WLAN状态',
          con: ''
        },
        {
          title: '名称',
          con: '显示Wi-Fi的名称'
        },
        {
          title: '状态',
          con: '显示Wi-Fi的状态'
        },
        {
          title: '接口类型',
          con: 'Wi-Fi的接口类型'
        },
        {
          title: 'SSID',
          con: '当接口类型为AP时，显示路由器的SSID。当接口类型为Client，显示路由器连接的接入点的SSID。'
        },
        {
          title: 'IP地址',
          con: '当接口类型为AP时，显示路由器的IP地址。当接口类型为Client，显示路由器连接的接入点的IP地址。'
        },
        {
          title: '子网掩码',
          con: '当接口类型为AP时，显示路由器的子网掩码。当接口类型为Client，显示路由器连接的接入点的子网掩码。'
        },
        {
          title: '已关联无线用户',
          con: ''
        },
        {
          title: 'SSID',
          con: '当接口类型为AP时，显示路由器的SSID。当接口类型为Client，显示路由器连接的接入点的SSID。'
        },
        {
          title: 'MAC地址',
          con: '当接口类型为AP时，显示已连接客户端的MAC地址。当接口类型为Client，显示路由器连接的设备的MAC地址。'
        },
        {
          title: 'IP地址',
          con: '当接口类型为AP时，显示已连接客户端的IP地址。当接口类型为Client，显示路由器连接的设备的IP地址。'
        },
        {
          title: '连接时间',
          con: '当接口类型为AP时，显示设备连接到路由器的时间。当接口类型为Client时，显示路由器连接到接入点的时间。'
        },
      ]
    },
    gps: {
      title: 'GPS',
      labeltitle: 'GPS状态',
      time: '定位时间',
      lat: '纬度',
      lng: '经度',
      speed: '速度',
      status: '状态',
      "visibleSatellite": "可见卫星数量",
      "useableSatellite": "卫星使用数量",
      "height": "高度",
      tip: [
        {
          title: '定位时间',
          con: '显示定位的时间'
        },
        {
          title: '纬度',
          con: '显示定位的纬度'
        },
        {
          title: '经度',
          con: '显示定位的经度'
        },
        {
          "title": "可见卫星数量",
          "con": "显示可见的卫星数量。"
        },
        {
          "title": "卫星使用数量",
          "con": "显示使用的卫星数量。"
        },
        {
          "title": "高度",
          "con": "显示路由器的高度信息。"
        },
        {
          title: '速度',
          con: '显示移动的速度'
        }
      ]
    },
    bluetooth: {
      basiclabel: '基础设置',
      title: '蓝牙',
      status: '状态',
      model: '模式',
      connectedlabel: '已连接设备',
      name: '名称',
      mac: 'MAC地址',
      servertype: '服务类型',
      description: '描述',
      uptime: '连接时长',
      uplinklabel: '上行链路',
      packreceived: '接收数据包',
      packreceivedstate: '接收数据包状态',
      packforward: 'Packets Forward',
      downlabel: '下行链路',
      pullreceived: '发往路由器的数据包',
      packsent: '发往设备的数据包',
      disabled: '未启用',
      running: 'Running',
      tip: [
        {
          title: '模式',
          con: '显示当前启用的蓝牙功能的模式'
        },
        {
          title: '状态',
          con: '显示当前蓝牙功能的状态'
        },
        {
          title: '已连接设备',
          con: ''
        },
        {
          title: '名称',
          con: '显示设备名称'
        },
        {
          title: '状态',
          con: '显示信号强度'
        },
        {
          title: 'MAC地址',
          con: '显示设备的MAC地址'
        },
        {
          title: '服务类型',
          con: '显示设备的连接类型'
        },
        {
          title: '描述',
          con: '显示对该设备的描述'
        },
        {
          title: '连接时长',
          con: '显示设备与路由器连接的时长'
        },
        {
          title: '上行链路',
          con: ''
        },
        {
          title: '接收数据包',
          con: '显示路由器从已连接设备接收到的数据包的数量'
        },
        {
          title: '接收数据包状态',
          con: '显示接收的数据包的状态<br>CRC_OK:CRC校验成功的比例<br>CRC_Fail:CRC校验失败的比例<br>NO_CRC:没有CRC校验的丢弃包的比例'
        },
        {
          title: '下行链路',
          con: ''
        },
        {
          title: '发往路由器的数据包',
          con: '显示从服务平台发送到路由器的数据包的数量和大小'
        },
        {
          title: '发往设备的数据包',
          con: '显示从路由器发送到设备的数据包的数量和大小'
        }
      ]
    }
  },
  lora: {
    title: 'LoRa',
    packetforward: {
      title: 'Packet Forward',
      general: {
        title: 'General',
        generallabel: 'General Setting',
        enable: 'Enable',
        mode: 'Mode',
        gweui: 'Gateway EUI',
        gwid: 'Gateway ID',
        servaddr: 'Server Address',
        servportup: 'Port UP',
        servportdown: 'Port Down',
        tip: []
      },
      radios: {
        title: 'Radios',
        radiolabel: 'Radio Channel Setting',
        frequency: 'Supported Frequency',
        radioname: 'Name',
        radiofreq: 'Center Frequency/MHz',
        multilabel: 'Multi Channels Setting',
        enable: 'Enable',
        index: 'Index',
        radio: 'Radio',
        freq: 'Frequency/MHz',
        loralabel: 'LoRa Channel Setting',
        band: 'Bandwidth/KHz',
        spread: 'Spread Factor',
        fsklabel: 'FSK Channel Setting',
        datarate: 'DataRate',
        tip: []
      },
      advanced: {
        title: 'Advanced',
        intervallabel: 'Intervals Setting',
        kpinterval: 'Keep Alive Interval',
        statinterval: 'Stat Interval',
        timeoutms: 'Push Timeout',
        forwardlabel: 'Forward CRC Setting',
        forwardenable: 'Forward CRC Enabled',
        forwarderror: 'Forward CRC Error',
        forwardvalid: 'Forward CRC Valid',
        second: 's',
        msecond: 'ms',
        networkmode: 'Network Mode',
        tip: []
      },
      custom: {
        title: 'Custom',
        customlabel: 'Custom Configuration',
        enable: 'Enable',
        exapmle: 'Example',
        clear: 'clear',
        tip: []
      },
      traffic: {
        title: 'Traffic',
        label: 'Traffic Setting',
        stop: 'Stop',
        start: 'Start',
        clear: 'Clear',
        rfch: 'Rfch',
        direction: 'Direction',
        tmst: 'Time',
        ticks: 'Ticks',
        freq: 'Frequency',
        datarate: 'Datarate',
        coderate: 'Coderate',
        rssi: 'RSSI',
        snr: 'SNR',
        tip: []
      }
    },
    networkserver: {
      title: 'Network Server',
      general: {
        title: 'General',
        label: 'General Setting',
        enable: 'Enable',
        mode: 'Mode',
        channelplan: 'Channel Plan',
        channelmask: 'Channel Mask',
        netid: 'NetID',
        maxdatarate: 'Max Datarate',
        mindatarate: 'Min Datarate',
        leasetime: 'Lease Time',
        loglevel: 'Log Level',
        additionalplantitle: 'Additional Channels',
        frequency: 'Frequency（MHz）',
        maxdatarat: 'Max Datarat',
        mindatarat: 'Min Datarat'
      },

      applications: {
        title: "Applications",
        name: "Name",
        description: "description",
        payload_codec: "Payload Codec",
        none: "None",
        custom: "Custom",
        cayenne_lpp: "Cayenne LPP"
      },

      profiles: {
        title: "Profiles",
        label: "Device Profiles",
        general: "General",
        name: "Name",
        join_type: "Join Type",
        class_type: "Class Type",
        max_tx_power: "Max Tx_Power",
        advanced: "Advanced",
        mac_version: "MAC Version",
        regional_parameter_revision: "Regional Parameters Revision",
        join: "Join",
        join_delay: "Join Delay",
        rx1_delay: "RX1 Delay",
        "rx1_datarate_offset": "RX1 Datarate Offset",
        "rX2_datarate": "RX2 Datarate",
        "rx2_channel_frequency": "RX2 Channel Frequency",
        frequency_list: "Frequency List",
        "class": "Class",
        ack_timeout: "ACK Timeout"
      },
      device: {
        title: 'Device',
        eui: 'EUI',
        general: 'General',
        device_name: 'Device Name',
        profile: 'Profile',
        application: 'Application',
        last_seen: 'Last Seen',
        actived: 'Actived',
        description: 'Description',
        device_eui: 'Device EUI',
        device_profile: 'Device-Profile',
        frame_counter_validation: 'Frame-counter Validation',
        activate_device: 'Activate Device(ABP)',
        application_key: 'Application Key',
        device_address: 'Device Address',
        network_session_key: 'Network Session Key',
        application_session_key: 'Application Session Key'
      },
      packets: {
        title: 'Packets',
        label: 'Network Server',
        device_eui: 'Device EUI',
        frequency: 'Frequency',
        datarate: 'Datarate',
        snr: 'SNR',
        rssi: 'RSSI',
        size: 'Size',
        fcnt: 'Fcnt',
        type: 'Type',
        time: 'Time',
        details: 'Details',
        mdal_title: 'Packet Details',
        dev_addr: 'Dev Addr',
        gweui: 'GwEUI',
        app_eui: 'AppEUI',
        dev_eui: 'DevEUI',
        immediately: 'Immediately',
        timesinceGPSEpoch: 'TimeSinceGPSEpoch',
        timestamp: 'Timestamp',
        adr: 'Adr',
        adrackreq: 'AdrAcKReq',
        ack: 'Ack',
        fopts: 'Fopts',
        fport: 'Fprot',
        modulation: 'Modulation',
        bandwidth: 'Bandwidth',
        spread_factor: 'SpreadFactor',
        bitrate: 'Bitrate',
        code_rate: 'CodeRate',
        power: 'Power',
        payload_b64: 'Payload(b64)',
        payload_hex: 'Payload(hex)',
        mic: 'MIC'
      }
    }

  },
  network: {
    title: '网络',
    interfaces: {
      title: "接口",
      backup: {
        "title": "链路备份",
        "prioritylabel": "链路优先级",
        "backuplabel": "设置",
        "resume_interval": "恢复间隔",
        "error_reboot": "链路异常则重启",
        "static_ip": "静态IP",
        "dhcp": "DHCP",
        "enable_rule": "启用规则",
        "priority": "优先级",
        "current_link": "当前链路",
        "interface_type": "接口",
        "link_type": "连接类型",
        "enable": "启用",
        "ping_title": "PING 探测",
        "dest_main": "目的地址(IPv4)",
        "dest_second": "备选目的地址(IPv4)",
        "v6_dest_main": "目的地址(IPv6)",
        "v6_dest_second": "备选目的地址(IPv6)",
        "icmp_period": "Ping间隔",
        "icmp_interval": "Ping重试间隔",
        "icmp_timeout": "Ping超时",
        "icmp_times": "最大重试次数",
        "enable_icmo_tip": "至少启用一条链路",
        link_switch_recovery: '恢复至高优先级链路',
        dual_card_switch_delay: '双卡切换延迟',
        dual_card_recovery_interval: '双卡恢复间隔',
        "tip": [
          {
            "title": "启用",
            "con": "启用链路Ping探测后，路由器会阶段性探测链路的连接状态。"
          },
          {
            "title": "目的地址(IPv4)",
            "con": "路由器 ping 主地址/域名来检测当前连接是否存在。"
          },
          {
            "title": "备选目的地址(IPv4)",
            "con": "路由器 ping 备用地址/域名来检测当前连接是否存在"
          },
          {
            "title": "Ping间隔",
            "con": "路由器每隔一个Ping间隔对目的地址进行Ping探测。"
          },
          {
            "title": "Ping重试间隔",
            "con": "设置 Ping 的重试间隔时间，当 Ping 失败后，路由器每隔一个 Ping 重试间隔再重新 Ping。"
          },
          {
            "title": "Ping超时",
            "con": "发送Ping命令后等待应答的超时时间。"
          },
          {
            "title": "最大重试次数",
            "con": "连续Ping失败并达到最大重试次数，判定此次Ping探测连接失败。"
          },
          {
            title: '恢复至高优先级链路',
            con: '自动检测更高优先级链路的连通性并尝试恢复至更高优先级的链路。'
          },
          {
            "title": "恢复间隔",
            "con": "指定等待多少秒后尝试切换至更高优先级的链路。设置为0时表示不切回。恢复间隔对于蜂窝双卡之间的切换不生效。"
          },
          {
            title: '双卡切换延迟',
            con: '当高优先级的蜂窝链路不可用时，延迟一段时间再切换至低优先级的蜂窝链路。设置为0时表示在不可用时立即进行切换。'
          },
          {
            title: '双卡恢复间隔',
            con: '尝试从低优先级的蜂窝链路恢复至高优先级的蜂窝链路的间隔，检测及恢复的过程会短暂断网。设置为0时表示不进行检测。'
          },
          {
            "title": "链路异常则重启",
            "con": "启用后，若当前系统无可用链路，系统将会重启。"
          }
        ]
      },
      cellular: {
        title: '蜂窝网络',
        cellulartitle: '蜂窝设置',
        sim1title: 'SIM1',
        sim2title: 'SIM2',
        enable: '启用',
        network: '网络类型',
        network1: '自动',
        network2: '4G优先',
        network3: '仅4G',
        network4: '3G优先',
        network5: '仅3G',
        network6: '2G优先',
        network7: '仅2G',
        apn: '接入点',
        user: '用户名',
        password: '密码',
        number: '拨号中心号码',
        pin: 'PIN码',
        auth: '认证方式',
        roam: '允许漫游',
        connmode: '连接模式',
        connmode0: '永远在线',
        connmode1: '按需拨号',
        connmode2: '手动拨号',
        redial: '重拨间隔(秒)',
        retires: '最大重试次数',
        idle: '最大空闲时间(秒)',
        triggerdata: '数据触发',
        triggercall: '电话触发',
        triggersms: '短信触发',
        triggerio: 'IO触发',
        dsimtitle: '双SIM卡策略',
        failicmp: '当连接失败后切换到后备卡',
        failconn: '当ICMP检测失败时切换后备卡',
        failroam: '检测到漫游后切换到后备卡',
        failio: 'IO口触发时切换到备卡',
        failoverflow: '超出数据流量时切换到备份卡',
        failbadgignal: '信号差时切卡策略',
        datastrategy: '流量切卡策略',
        billingday: '清算日',
        nat: '启用NAT',
        errreboot: '拨号失败时重启',
        primary: '主SIM卡',
        connect: '连接',
        callgroup: '拨号组别',
        smsgroup: '短信组别',
        smstext: '短信内容',
        dualsim: '双SIM卡策略',
        smstitle: '短信设置',
        smsmode: '短信模式',
        smspoll: '查询间隔',
        customMask: '自定义IPv4子网掩码',
        mask: 'IPv4子网掩码',
        imsenable: '启用IMS',
        smscenter: '短信中心号码',
        icmpserver: 'ICMP服务器',
        icmpserverdesc: '备选ICMP服务器',
        icmpcount: '最大重试次数',
        icmploss: '丢包率',
        icmptimeout: 'ICMP 探测超时时间',
        icmpinterval: 'ICMP 探测间隔',
        smsenable: '短信远程控制',
        smsauthtype: '认证类型',
        smsphone: '电话号码',
        smsphonepsw: '密码+电话号码',
        smsauthpsw: '密码',
        second: '秒',
        smsphonegroup: '电话组',
        voipTitle: '电话设置',
        dialTimeout: '拨号间隔超时',
        volte: 'VoLTE',
        hotline: '热线',
        onlyHotline: '只允许拨打以上电话',
        txgain: '设置麦克风算法增益',
        txdgain: '设置麦克风数字增益',
        rxgain: '设置接收音量增益',
        clvl: '设置扬声器音量等级',
        country: '国家/地区',
        featureDigit1: '速拨码1',
        dialnumber1: '电话号码1',
        featureDigit2: '速拨码2',
        dialnumber2: '电话号码2',
        featureDigit3: '速拨码3',
        dialnumber3: '电话号码3',
        dianumberTip: '请输入相匹配的电话号码。',
        featureDigitTip: '请输入相匹配的速拨码。',
        onlyHotlineTip: '请至少输入一组电话号码和速拨码。',
        "datalimit": "最大可用流量",
        "connect_setting": "连接设置",
        "pppFirst": "PPP优先",
        "everyMonth": "每月",
        "day": "日",
        protocolType: '协议类型',
        focusmtu: '自定义最大传输单元',
        mtu: '最大传输单元',
        cellularBand: '蜂窝频段',
        lteBand: 'LTE 频段',
        bandTip: '指定频段时请至少选择一个！',
        pridns: '首选DNS（IPv4）',
        secdns: '备选DNS（IPv4）',
        pridns6: '首选DNS（IPv6）',
        secdns6: '备选DNS（IPv6）',
        interface_name: '接口名称',
        status: '状态',
        connect_success: '连接成功',
        connect_failed: '连接失败',
        enable_status: '启用状态',
        sim_setting: 'SIM卡设置',
        setting: '设置',
        tip: [
          {
            title: '蜂窝设置',
            con: ''
          },
          {
            title: '接入点',
            con: '输入由本地互联网服务供应商提供的蜂窝网拨号连接的接入点'
          },
          {
            title: '用户名',
            con: '输入由本地互联网服务供应商提供的蜂窝网拨号连接的用户名'
          },
          {
            title: '密码',
            con: '输入由本地互联网服务供应商提供的蜂窝网拨号连接的密码'
          },
          {
            title: 'PIN码',
            con: '输入用于解锁SIM卡的PIN代码，4-8位'
          },
          {
            title: '拨号中心号码',
            con: '输入由本地运营商提供的网络拨号号码'
          },
          {
            title: '认证方式',
            con: '三种可选：Auto、PAP、CHAP。跟运营商匹配。'
          },
          {
            title: '网络类型',
            con: '选择蜂窝网络类型，即网络访问顺序。可选“自动”，"仅4G”，"仅3G"，"仅2G”'
          },
          {
            title: '蜂窝频段',
            con: '选择路由器当前支持的LTE频段，该功能仅在网络类型为4G时生效。'
          },
          {
            title: 'LTE频段',
            con: '显示路由器支持的LTE频段，路由器使用已勾选的LTE频段进行通信。'
          },
          {
            "title": "PPP优先",
            "con": "优先使用PPP拨号方式。"
          },
          {
            title: '短信中心号码',
            con: '短消息进行存储转发的中心号码。通常依号码归属地不同短信中心的号码亦不同'
          },
          {
            title: '启用NAT',
            con: '勾选开启NAT功能'
          },
          {
            title: '允许漫游',
            con: '勾选开启漫游功能后路由器会自动搜索并连上信号好的漫游网络；当取消漫游选项，漫游的SIM卡不能拨号上网。使用本地卡时，勾选漫游和取消漫游功能都不影响SIM卡拨号上网'
          },
          {
            title: 'IPv4 子网掩码',
            con: '路由器使用该子网掩码进行联网。',
          },
          {
            title: '首选DNS',
            con: '设置DNS服务器作为首选服务器，通过DNS服务器提供的域名解析服务可以将域名解析为相应IP地址，使用域名及即可访问网站和其他网络资源。'
          },
          {
            title: '备选DNS',
            con: '设备备选DNS服务器，当首选DNS服务器出现故障、维护或者网络问题，备选DNS服务器可以接替其工作，确保域名解析服务不中断。'
          },
          {
            title: '自定义最大传输单元',
            con: '启用/禁用自定义最大传输单元。启用时，使用用户自定义的MTU值。禁用时，使用和运营商的协商值。'
          },
          {
            "title": "最大可用流量",
            "con": "设置每月的最大可使用流量，当数据流量超过设定值时，该SIM卡将被禁止使用。0表示不限制流量"
          },
          {
            title: '清算日',
            con: '指定每个月的数据流量结算日。已使用的流量记录将在这一天的00:00清零，重新计算。合法值：1-28'
          },
          {
            title: '连接模式',
            con: '可选择永远在线，按需拨号'
          },
          {
            title: '永远在线',
            con: '永远在线是系统默认拨号方式，正常状态下设备一直在线'
          },
          {
            32: {
              title: '按需拨号',
              con: '按需拨号分为：电话触发、短信触发、IO触发三种触发拨号方式'
            },
            '32L': {
              title: '按需拨号',
              con: '按需拨号分为：电话触发、短信触发两种触发拨号方式'
            },
            35: {
              title: '按需拨号',
              con: '按需拨号分为：电话触发、短信触发、IO触发三种触发拨号方式'
            }
          },
          {
            title: '重拨间隔（秒）',
            con: '设备每次掉线重新拨号等待的时间。合法值：0-3600'
          },
          {
            title: '最大空闲时间（秒）',
            con: '设置设备当前链路闲置持续的最长时间。合法值：10-3600'
          },
          {
            title: '电话触发',
            con: '当路由器接到指定电话号码的来电时，路由器自动从不在线状态转变为连接到蜂窝网络模式'
          },
          {
            title: '拨号组别',
            con: '选择用于电话触发的电话组别。用户通过Web页面“系统 > 常规 > 电话”来设置电话群组。'
          },
          {
            title: '短信触发',
            con: '当路由器收到从指定号码发过来的指定内容的短信时，自动从不在线状态转变为连接到蜂窝网络模式'
          },
          {
            title: '短信组别',
            con: '选择触发的短信组别。用户通过Web页面“系统 > 常规 > 电话”来设置电话群组。'
          },
          {
            title: '短信内容',
            con: '填写触发的短信内容'
          },
          {
            32: {
              title: 'IO触发',
              con: '当DI状态有变化时，路由器自动从不在线状态转变为连接到移动网络模式。用户通过Web页面“工业 > I/O > 数字输入”来设置IO触发条件。'
            },
            35: {
              title: 'IO触发',
              con: '当DI状态有变化时，路由器自动从不在线状态转变为连接到移动网络模式。用户通过Web页面“工业 > I/O > 数字输入”来设置IO触发条件。'
            }
          },
          {
            visible: function(model, pn) {
              return model.indexOf('35') != -1 && pn[18] == 1;
            },
            tips: [
              {
                title: '电话设置',
                con: ''
              },
              {
                title: '拨号间隔超时',
                con: '用户键入相邻两个数字之间的间隔时间。\n 从键入前一个号码键到此参数所设定的时间内，若未键入下一个号码键，设备将认为用户拨号结束，并根据已键入的号码呼出。'
              },
              {
                title: '国家/地区',
                con: '选择相应国家，使用预先配置好的适用于该区域的呼叫音。'
              },
              {
                title: '速拨号',
                con: '假设设置速拨号1为*11，电话号码1为123456789，当拨打*11时，实际拨打的号码为123456789。'
              },
              {
                title: '只允许拨打以上号码',
                con: '启用后，则只能拨打以上输入框内的电话号码。拨打其他号码将拨打失败。'
              }
            ]
          }
        ]
      },
      port: {
        title: '端口',
        porttitle: '端口设置',
        port: '端口',
        status: '状态',
        property: '属性',
        speed: '端口速率',
        duplex: '端口模式',
        connectionStatus: '连接状态',
        connected: '已连接',
        disconnected: '未连接',
        close: '关闭',
        open: '开启',
        powerStatus: '供电状态',
        powerOn: '供电中',
        powerOff: '未供电',
        voltage: '电压（V）',
        current: '电流（mA）',
        power: '功率（W）',
        describe: '描述',
        pingDest: 'PING 探测地址',
        pingTitle: 'PING 探测重启',
        enable: '启用',
        icmpDest: '目的地址',
        icmpPeriod: 'Ping间隔',
        icmpInterval: 'Ping重试间隔',
        icmpTimeout: '超时时间',
        icmpTimes: '最大重试次数',
        icmpCutInterval: '重启间隔',
        rebootTimes: '最大重启次数',

        radiusAuth: 'Radius认证',
        enable: '启用',
        radiusAuthAddr: 'Radius认证服务器',
        radiusAuthPort: 'Radius认证服务器端口',
        radiusAuthSecret: 'Radius认证服务器密钥',
        nasId: 'NAS Identifier',



        tip: [
          {
            title: '端口',
            con: '用户可根据自己的需要，对以太网口进行配置'
          },
          {
            title: '连接状态',
            con: '显示以太网口和设备的连接状态。已连接：表示该以太网口有设备连接。未连接：表示该以太网口没有设备连接。'
          },
          {
            title: '状态',
            con: '设置以太网口的状态。“up”表示启用；“down”表示禁用'
          },
          {
            title: '属性',
            con: '设置以太网口的类型，即LAN或者WAN',
            52: {
              title: '属性',
              con: "FE0和FE1类型分别为WAN和LAN，用户不可更改"
            },
            51: {
              title: '属性',
              con: "FE端口为LAN口，用户不可更改"
            }
          },
          {
            title: '端口速率',
            con: '设置以太网口速率，可选择auto,100Mbps,10Mbps'
          },
          {
            title: '端口模式',
            con: '设置以太网口模式，可选择auto,full,half'
          },
          {
            title: '端口',
            con: '支持POE的接口，名称与设备对应'
          },
          {
            title: 'PoE',
            con: '配置LAN口的供电模式。开启：对应接口对下接设备进行供电。关闭：对应接口不对设备进行供电。'
          },
          {
            title: '供电状态',
            con: '表示对应接口当前的供电状态。供电中：该接口正在给接入设备进行供电。未供电：该接口没有进行供电。'
          },
          {
            title: '电压',
            con: '表示该接口当前的输出电压值。'
          },
          {
            title: '电流',
            con: '表示该接口当前的输出电流值。'
          },
          {
            title: '功率',
            con: '表示该接口当前的输出功率。'
          },
          {
            title: '描述',
            con: '允许自定义对连接各个以太网口设备的描述。'
          },
          {
            title: 'PING探测地址',
            con: '显示PING探测重启弹窗中配置的目的地址。'
          },
          {
            title: '操作',
            con: '点击编辑按钮可以在PING探测重启弹窗中进行PING探测配置。可上下移动箭头调整不同LAN口的POE供电优先级，低优先级的LAN口在供电不足的时候可能无法正常工作。'
          },
          {
            title: 'PING探测重启',
            con: '启用功能时，路由器将进行PING 探测，若PING探测失败，则会重启下接设备。'
          },
          {
            title: '启用',
            con: '开启/关闭ping探测重启',
          },
          {
            title: '目的地址',
            con: '设置要进行Ping探测的目的地址，建议填写当前LAN口IP。',
          },
          {
            title: 'Ping间隔',
            con: '路由器每隔一个Ping间隔对设置的目的地址进行Ping探测。合法值：5-1440min',
          },
          {
            title: 'Ping重试间隔',
            con: '路由器会在Ping失败后每隔一个重试间隔时间重新进行Ping探测。合法值：3~600。',
          },
          {
            title: '超时时间',
            con: '设置发送Ping命令后等待应答的超时时间。合法值：1~10。',
          },
          {
            title: '最大重试次数',
            con: '连续Ping失败并达到最大重试次数，判定此次Ping探测连接失败。合法值：1~10。',
          },
          {
            title: '重启间隔',
            con: '重启时，LAN口会断电，并等待该断电时间后，再重新恢复供电。合法值：1~255。',
          },
          {
            title: '最大重启次数',
            con: '当连续重启次数达到该值后，不再对设备进行重启，直至PING探测成功。当为0时，每次PING失败都会重启。合法值：0~255。',
          },
        ]
      },
      wan: {
        title: '广域网',
        wantitle: '广域网设置',
        tbltitle: '广域网',
        enable: '启用',
        port: '网口',
        protocol: '拨号类型',
        saddrress: '静态IP地址',
        dhcp: 'DHCP客户端',
        pppoe: 'PPPoE',
        pppoev6: 'PPPoEv6',
        dual_stack_lite: 'Dual-Stack Lite',
        ip6rd: 'IPv6-over-IPv4(6rd)',
        ipaddress: 'IPv4地址',
        netmask: '子网掩码',
        gateway: 'IPv4网关',
        user: '用户名',
        password: '密码',
        redial: '链路检测间隔（秒）',
        retries: '最大重拨次数',
        mtu: '最大传输单元',
        enabledns: '使用对端DNS',
        pridns: '首选DNS（IPv4）',
        secdns: '备选DNS（IPv4）',
        pridns6: '首选DNS（IPv6）',
        secdns6: '备选DNS（IPv6）',
        enablenat: '启用NAT',
        multiip: '多IP地址',
        multiip_ip: 'IP地址',
        multiip_mask: '子网掩码',
        ipv6addr: 'IPv6 地址',
        ipv6gateway: 'IPv6 网关',
        ip6prefixlen: '前缀长度',
        dhcpv6: 'DHCPv6 Client',
        requestmode: '请求IPv6地址模式',
        requestmode0: 'None',
        requestmode1: 'Try',
        requestmode2: 'Force',
        prefixlen: '前缀长度',
        ipv6auto: 'automatic',
        dsl_aftr_address: 'DS-Lite AFTR地址',
        local_ipv6_address: '本地IPv6地址',
        local_ipv4_address: '本地Ipv4地址',
        remote_ipv4_address: 'Remote IPv4 Address',
        ipv6_prefix: 'IPv6 prefix',
        ipv6_prefix_length: 'IPv6 prefix length',
        ipv4_prefix_length: 'IPv4 prefix length',
        doubleLan: '若需使用WAN，请将LAN1/WAN端口属性配置为wan',
        tip: [
          {
            title: '启用',
            con: '启用WAN功能'
          },
          {
            title: '网口',
            con: '当前设置为WAN口的以太网口'
          },
          {
            title: '拨号类型',
            con: '选择WAN口上网的方式。可选“静态IP地址”、“DHCP客户端”、“PPPoE”'
          },
          {
            title: 'IPv4地址',
            con: '设置可以访问互联网的IPv4地址，如192.168.1.2'
          },
          {
            title: '子网掩码',
            con: '设置WAN口的子网掩码，如果子网掩码填的是IPv4地址(IPv6) 的格式，则访问网络是优先使用IPv4 (IPv6)的地址。'
          },
          {
            title: 'IPv4网关',
            con: '设置WAN口的IPv4地址的网关'
          },
          {
            title: 'IPv6地址',
            con: '设置可以访问互联网的IPv6地址，默认地址为：路由器根据WAN口MAC地址生成的IPv6地址'
          },
          {
            title: '前缀长度',
            con: '"设置IPv6前缀长度以标识网段中全局单播IPv6地址的位数.如: 在2001:0DB8:0000:000b::/64中, 64用来标识在该网段中的前64位."'
          },
          {
            title: 'IPv6网关',
            con: '设置WAN口的IPv6地址的网关'
          },
          {
            title: '获取IPv6地址',
            con: '"选择路由器从DHCPv6 服务器获取的IPv6地址的方式。可选项为：Try、Force、None.Try：服务器优先分配特定的地址,Force：服务器只能分配特定的地址,None：服务器随机分配地址,该特定地址与你设置的前缀长度有关'
          },
          {
            title: '获取IPv6前缀长度',
            con: '设置路由器期望从服务器获取的IPv6地址的前缀长度.'
          },
          {
            title: '最大传输单元',
            con: '设置WAN口最大传输单元。合法值：68-1500'
          },
          {
            title: '首选DNS服务器',
            con: '设置首选的DNS服务器'
          },
          {
            title: '备用DNS服务器',
            con: '设置备用的DNS服务器'
          },
          {
            title: '启用NAT',
            con: '启用/禁用NAT功能。启用后可以把私网 IP 地址转换成公网 IP 地址'
          },
          {
            title: '多IP地址',
            con: '除主 IP 以外用户还可以配多个从 IP 地址'
          },
          {
            title: 'IP地址',
            con: '设置从IP地址'
          },
          {
            title: '子网掩码',
            con: '设置子网掩码'
          },
          {
            title: '使用对端DNS',
            con: 'PPP拨号时自动获取对端DNS'
          },
          {
            title: '用户名',
            con: '输入由您的互联网服务供应商提供的用户名'
          },
          {
            title: '密码',
            con: '输入由您的互联网服务供应商提供的密码'
          },
          {
            title: '链路检测间隔（秒）',
            con: 'PPPOE建立连接后发送心跳报文时间间隔 ，合法值：1-600'
          },
          {
            title: '最大重拨次数',
            con: '设置拨号失败后的最大重新连接次数，合法值：0-9'
          }
        ]
      },
      "switch": {
        title: '交换机',
        lantitle: '局域网设置',
        name: '名称',
        vlanid: 'VLAN ID',
        ip: 'IP地址',
        mask: '子网掩码',
        mtu: '最大传输单元(MTU)',
        vlantitle: 'VLAN设置',
        vid: 'VLAN ID',
        port0: 'FE 1/1',
        port1: 'FE 1/2',
        port2: 'FE 1/3',
        port3: 'FE 1/4',
        lan1: 'LAN 1',
        lan2: 'LAN 2',
        lan3: 'LAN 3',
        lan4: 'LAN 4',
        cpu: 'CPU',
        samename: 'vlan名称重复',
        sameip: ' ip地址不能同网段',
        tip: [
          {
            title: '局域网设置',
            con: ''
          },
          {
            title: '名称',
            con: '设置VLAN接口名称'
          },
          {
            title: 'VLAN ID',
            con: '选择接口的VLAN标签'
          },
          {
            title: 'IP地址',
            con: '设置LAN口的IP地址'
          },
          {
            title: '子网掩码',
            con: '设置LAN口的IP子网掩码'
          },
          {
            title: '最大传输单元（MTU）',
            con: '设置LAN口的最大传输单元。合法值：68-1500'
          },
          {
            title: 'VLAN设置',
            con: ''
          },
          {
            title: 'VLAN ID',
            con: '用户自定义VLAN的标签 ID，合法值：1-4094'
          },
          {
            title: 'LAN 1,LAN 2,LAN 3,LAN 4',
            con: '把VLAN绑定到相应的端口并设置Ethernet frame在trunk link上的状态，即"Tagged", ""Untagged", 或"Close"',
            32: {
              title: 'LAN 1, LAN 2',
              con: '把VLAN绑定到相应的端口并设置Ethernet frame在trunk link上的状态，即"Tagged", ""Untagged", 或"Close"'
            },
            '32L': {
              title: 'LAN 1, LAN 2',
              con: '把VLAN绑定到相应的端口并设置Ethernet frame在trunk link上的状态，即"Tagged", ""Untagged", 或"Close"'
            },
            35: {
              title: 'LAN 1, LAN 2, LAN 3, LAN 4',
              con: '把VLAN绑定到相应的端口并设置Ethernet frame在trunk link上的状态，即"Tagged", ""Untagged", 或"Close"'
            }
          },
          {
            title: 'CPU',
            con: '控制该vlan和其他网络的互相通信'
          }
        ]
      },
      lan: {
        title: '局域网',
        lanlabel: '局域网设置',
        ifn: '端口',
        ip: 'IP地址',
        netmask: '子网掩码',
        mtu: '最大传输单元（MTU）',
        tip: [
          {
            title: '端口',
            con: '选择要设置的局域网接口'
          },
          {
            title: 'IP地址',
            con: '设置LAN口的IP地址'
          },
          {
            title: '子网掩码',
            con: '设置LAN口的子网掩码'
          },
          {
            title: '最大传输单元（MTU）',
            con: '设置LAN口的最大传输单元。合法值：68-1500'
          }
        ]
      },
      bridge: {
        title: '网桥',
        bridgelabel: '网桥设置',
        ifn: '端口',
        ip: 'IP地址',
        netmask: '子网掩码',
        mtu: '最大传输单元（MTU）',
        name: '名称',
        stp: 'STP',
        ipLabel: '多个IP地址',
        bridgeMember: '网桥群组',
        groupId: 'Group ID',
        labelist: 'List',
        members: 'Members',
        labelselected: 'Selected',
        ipv6: 'IPv6地址',
        tip: [
          {
            title: '网桥设置',
            con: ''
          },
          {
            title: '名称',
            con: '显示网桥名称，默认为Bridge0且不可更改'
          },
          {
            title: 'STP',
            con: '开启/关闭STP'
          },
          {
            title: 'IP地址',
            con: '设置网桥的IP地址'
          },
          {
            title: '子网掩码',
            con: '设置网桥的子网掩码'
          },
          {
            title: 'MTU',
            con: '设置网桥的MTU，合法值:68-1500'
          },
          {
            title: '多个IP地址',
            con: ''
          },
          {
            title: 'IP地址',
            con: '设置从IP地址.'
          },
          {
            title: '子网掩码',
            con: '设置从子网掩码，如255.255.255.0'
          }
        ]
      },
      vlan: {
        title: 'VLAN',
        vlanlabel: 'VLAN设置',
        enable: '启用',
        ifn: '接口',
        vid: 'VLAN ID',
        ip: 'IP地址',
        netmask: '子网掩码',
        tip: [
          {
            title: '启用',
            con: '启用后，路由器可以封装或解封装虚拟局域网的标签'
          },
          {
            title: '接口',
            con: '选择开启VLAN的接口，即相应的LAN口'
          },
          {
            title: 'VLAN ID',
            con: '用户自定义VLAN的标签 ID，合法值：1-4094'
          },
          {
            title: 'IP地址',
            con: '设置VLAN接口的IP地址'
          },
          {
            title: '子网掩码',
            con: '设置VLAN接口的子网掩码'
          }
        ]
      },
      wlan: {
        title: 'WLAN',
        wlantitle: 'WLAN设置',
        wifilabel: 'WLAN',
        enable: '启用',
        mode: '接口类型',
        mode1: '接入点',
        mode2: '客户端',
        attach: 'Attached to',
        broadcastssid: 'SSID广播',
        apisolate: 'AP隔离',
        hwmode: '射频类型',
        mtu: '最大传输单元',
        channel: '信道',
        auto: '自动',
        ssid_ap: 'SSID',
        ssid_client: 'SSID',
        open: '开放式',
        encryption: '加密方式',
        cipher: '加密模式',
        none: '无',
        key: '密钥',
        keyslot: 'Key Slot',
        key0: 'Key #0',
        key1: 'Key #1',
        key2: 'Key #2',
        key3: 'Key #3',
        htcapab: '无线频宽',
        maxsta: '最大客户端数目',
        ipsetlabel: 'IP设置',
        protocol: '协议',
        ip: 'IP地址',
        mask: '子网掩码',
        gate: '网关',
        dns: 'DNS',
        scan: '扫描',
        scanTip: 'wifi热点即将关闭，请确保当前配置PC与路由器通过网口连接，否则会因为连接断开而导致配置失败！',
        ssiderror: '两个字段必须任选其一',
        keyerror: '密钥长度应为5，13个字符，或10,26位十六进制数。',
        spaceerror: '输入的内容不应该含有空格',
        goback: '< 返回',
        scanlabel: 'SSID',
        scan_ssid: 'SSID',
        scan_channel: '信道',
        scan_signal: '信号',
        scan_bss: 'BSSID',
        scan_auth: '安全',
        scan_freq: '频率',
        scan_join: '加入网络',
        bssid: 'BSSID',
        countrycode: '国家代码',
        multissidtitle: 'SSID设置',
        guestnetwork: '游客网络',
        ssidenable: '启用此SSID',
        ssidstatus: '状态',
        ssiddes: '描述',
        indexid: 'ID',
        ssidstatus1: '启用',
        ssidstatus2: '禁用',
        enabletip: '该设备无双Client模式',
        wlan2modetip: 'WLAN2无法使用client模式',
        samessid: 'SSID名称重复',
        enable7xtip: '请优先使用WLAN1',
        xsupplicantType: 'Xsupplicant类型',
        identity: '匿名标识符',
        username: '用户名',
        password: '密码',
        clientCert: 'CA证书',
        clientPublicKey: '公钥',
        clientPrivKey: '私钥',
        privKeyPasswd: '私钥密码',
        phase1: 'Phase1',
        phase2: 'Phase2',
        phase2Tip: '只允许字母，数字或"_"或"="',
        serverCertify: 'Public Server Certificate',
        "mac_address_title": "MAC地址过滤",
        "filter_type": "类型",
        "mac_address": "MAC 地址",
        "mac_white_list": "白名单",
        "mac_black_list": "黑名单",
        "delete_last_mac_tip": "至少添加1条MAC地址",

        radiusAuthAddr: 'Radius认证服务器',
        radiusAuthPort: 'Radius认证服务器端口',
        radiusAuthSecret: 'Radius认证服务器密钥',
        radiusAcctAddr: 'Radius计费服务器地址',
        radiusAcctPort: 'Radius计费服务器端口',
        radiusAcctSecret: 'Radius计费服务器密钥',
        nasId: 'NAS Identifier',



        tip: [
          {
            title: '启用',
            con: '启用/禁用WLAN功能'
          },
          {
            title: '接口类型',
            con: '选择WLAN工作类型，可选“客户端”和“接入点”。'
          },
          {
            title: '扫描',
            con: '点击“扫描”按钮搜索附近的接入点。'
          },
          {
            title: 'SSID',
            con: '填入接入点SSID。'
          },
          {
            title: 'BSSID',
            con: '填入接入点的MAC地址。可以从SSID和BSSID中选择任意一种方式加入到网络。'
          },
          {
            title: '加密方式',
            con: '当路由器选择工作在客户端时，可以配置加密方式'
          },
          {
            title: '加密模式',
            con: '配置WiFi网络的加密算法，选择Auto时可根据网络自动选择加密算法'
          },
          {
            title: 'Xsupplicant类型',
            con: '根据企业AP网络的Radius 服务器类型，配置与之对应的认证类型'
          },
          {
            title: '用户名',
            con: '配置认证时使用的用户名'
          },
          {
            title: '密码',
            con: '配置认证时使用的密码'
          },
          {
            title: '匿名标识符',
            con: '配置认证过程中的匿名标识符'
          },
          {
            title: 'Phase1',
            con: '配置Phase1认证阶段使用的参数，使用指令配置，用空格隔开，例：peapver=1 peaplabel=1'
          },
          {
            title: 'Phase2',
            con: '配置Phase2认证阶段使用的参数，使用指令配置，用空格隔开，例：autheap=MSCHAPV2 autheap=MD5'
          },
          {
            title: 'CA证书',
            con: '配置认证服务器的证书文件'
          },
          {
            title: '公钥',
            con: '配置认证服务器的公钥,若密钥文件类型为p12则此处为空，将密钥上传至私钥即可'
          },
          {
            title: '私钥',
            con: '配置认证服务器的私钥'
          },
          {
            title: '私钥密码',
            con: '当私钥文件为加密时，需要填写该项，用于对私钥进行解密'
          },
          {
            title: 'SSID广播',
            con: '路由器作为接入点时，禁用SSID广播，则其他无线设备不能自动发现这个无线接入点。用户必须手动键入SSID让它们可以接入路由器AP发出的无线网络。'
          },
          {
            title: 'AP隔离',
            con: '启用AP隔离后，接入的所有用户之间的二层报文相互不能进行转发。'
          },
          {
            title: '访客模式',
            con: '该功能启用后，连接该SSID不能访问内网.'
          },
          {
            title: '最大客户端数量',
            con: '输入该SSID可允许连接的最大客户端数量.合法值：1-128'
          },
          {
            title: '射频类型',
            con: '选择射频类型，可选“802.11b (2.4 GHz)”、“802.11g (2.4 GHz)”、“802.11n (2.4 GHz)”、“802.11n (5 GHz)”和“802.11ac (5 GHz)”。'
          },
          {
            title: '信道',
            con: '选择无线信道，可选“Auto"、“1”、“2”......"13”。'
          },
          {
            title: '无线频宽',
            con: '选择无线频宽，可选“20MHz" 和“40MHz"。'
          },
          {
            title: '最大客户端数目',
            con: '设置作为接入点时，连接的最大客户端数目。'
          },
          {
            title: 'IP设置',
            con: ''
          },
          {
            title: '协议',
            con: '路由器作为客户端时，选择无线网络接入方式，可选“DHCP Client”和|“Static IP”'
          },
          {
            title: 'IP地址',
            con: '设置无线网络中的IP地址'
          },
          {
            title: '子网掩码',
            con: '设置无线网络中的子网掩码'
          },
          {
            title: '网关',
            con: '设置无线网络中的网关'
          },
          {
            title: '扫描',
            con: ''
          },
          {
            title: 'SSID',
            con: '显示SSID'
          },
          {
            title: '信道',
            con: '显示无线信道'
          },
          {
            title: '信号',
            con: '显示无线信号'
          },
          {
            title: 'BSSID',
            con: '显示BSSID'
          },
          {
            title: '安全',
            con: '显示加密方式'
          },
          {
            title: '频率',
            con: '显示射频频率'
          },
          {
            title: '加入网络',
            con: '点击该按钮加入网络'
          },
          {
            "title": "类型",
            "con": "选择过滤类型"
          },
          {
            "title": "白名单",
            "con": "只有在访问控制列表里面的地址才能访问路由器AP。"
          },
          {
            "title": "黑名单",
            "con": "在访问控制列表里的地址都被拒绝访问路由器 AP。"
          }
        ]
      },
      loopback: {
        title: '环回',
        lookbacklabel: '环回地址',
        ip: 'IP地址',
        netmask: '子网掩码',
        multiiplabel: '多IP地址',
        multiip: 'IP地址',
        multimask: '子网掩码',
        tip: [
          {
            title: '环回',
            con: '环回接口是路由器上一个逻辑接口（也称虚拟接口），不同于物理接口，除非设备瘫痪，否则其状态始终up。常用来做路由器的唯一标识。'
          },
          {
            title: 'IP地址',
            con: '用户不可更改'
          },
          {
            title: '子网掩码',
            con: '用户不可更改'
          },
          {
            title: '多IP地址',
            con: '除上边IP以外用户还可以配其他IP地址'
          },
          {
            title: 'IP地址',
            con: '设置从IP地址'
          },
          {
            title: '子网掩码',
            con: '设置子网掩码'
          }
        ]
      }
    },
    dhcp: {
      title: 'DHCP',
      server: {
        title: 'DHCP服务器',
        serverlabel: 'DHCP服务器',
        enable: '启用',
        network: '接口',
        startip: '起始地址',
        endip: '结束地址',
        mask: '子网掩码',
        prefixLen: '前缀长度',
        lease: '有效期(分钟)',
        pridns: '首选DNS服务器',
        secdns: '备选DNS服务器',
        wins: 'Windows名称服务器',
        staticip: '静态IP',
        macaddress: 'MAC地址',
        ipaddress: 'IP地址',
        tip: [
          {
            title: 'DHCP服务器',
            con: 'DHCP采用客户端/服务器通信模式，由客户端向服务器提出配置申请，服务器返回为客户端分配的IP地址等相应的配置信息，以实现IP地址等信息的动态配置'
          },
          {
            title: '启用',
            con: '开启/关闭 DHCP服务器功能'
          },
          {
            title: '接口',
            con: '选择接口，如FE1'
          },
          {
            title: '起始地址',
            con: '设置地址池中分配给客户端设备的起始IP地址'
          },
          {
            title: '前缀长度',
            con: '设置DHCP 客户端从 DHCP 服务端获取的 IP 地址的前缀长度'
          },
          {
            title: '子网掩码',
            con: '设置DHCP 客户端从 DHCP 服务端获取的 IP 地址的子网掩码'
          },
          {
            title: '有效期（分钟）',
            con: '设置分配IP的地址的有效期，过期DHCP服务器将回收分配给客户端的IP地址并重新分配IP地址。合法值：5-1440，不能为空'
          },
          {
            title: '首选DNS服务器',
            con: '设置首选的DNS服务器'
          },
          {
            title: '备选DNS服务器',
            con: '设置备选的DNS服务器'
          },
          {
            title: 'Windows 名称服务器',
            con: 'Windows 服务器对应的地址'
          },
          {
            title: '静态IP',
            con: ''
          },
          {
            title: 'MAC 地址',
            con: '设置一个静态指定的DHCP客户端的MAC地址（不能与其他MAC相同，防止冲突）'
          },
          {
            title: 'IP地址',
            con: '设置一个静态指定的DHCP客户端的IP地址（必须在起始IP地址和结束IP地址范围外）'
          }
        ]
      },
      v6server: {
        title: 'DHCPv6服务器',
        serverlabel: 'DHCPv6服务器',
        enable: '启用',
        network: '接口',
        startip: '起始地址',
        endip: '结束地址',
        prefixLen: '前缀长度',
        lease: '有效期(分钟)',
        pridns: '首选DNS服务器',
        secdns: '备选DNS服务器',
        wins: 'Windows名称服务器',
        staticip: '静态IP',
        macaddress: 'MAC地址',
        duid: 'DUID',
        ipaddress: 'IP地址',
        ipv6address: 'IPv6地址',
        tip: [
          {
            title: 'DHCPv6服务器',
            con: 'DHCP采用客户端/服务器通信模式，由客户端向服务器提出配置申请，服务器返回为客户端分配的IP地址等相应的配置信息，以实现IP地址等信息的动态配置'
          },
          {
            title: '启用',
            con: '开启/关闭 DHCP服务器功能'
          },
          {
            title: '接口',
            con: '选择接口，如GE1'
          },
          {
            title: '起始地址',
            con: '设置地址池中分配给客户端设备的起始IP地址'
          },
          {
            title: '结束地址',
            con: '设置地址池中分配给客户端设备的结束IP地址'
          },
          {
            title: '前缀长度',
            con: '设置DHCP 客户端从 DHCP 服务端获取的 IP 地址的前缀长度'
          },
          {
            title: '有效期（分钟）',
            con: '设置分配IP的地址的有效期，过期DHCP服务器将回收分配给客户端的IP地址并重新分配IP地址。合法值：5-1440，不能为空'
          },
          {
            title: '首选DNS服务器',
            con: '设置首选的DNS服务器'
          },
          {
            title: '备选DNS服务器',
            con: '设置备选的DNS服务器'
          },
          {
            title: 'Windows 名称服务器',
            con: 'Windows 服务器对应的地址'
          },
          {
            title: '静态IP',
            con: ''
          },
          {
            title: 'MAC 地址',
            con: '设置一个静态指定的DHCP客户端的MAC地址（不能与其他MAC相同，防止冲突）'
          },
          {
            title: 'IP地址',
            con: '设置一个静态指定的DHCP客户端的IP地址（必须在起始IP地址和结束IP地址范围外）'
          }
        ]
      },
      relay: {
        title: 'DHCP中继',
        relaytitle: 'DHCP中继',
        enable: '启用',
        dhcpserver: 'DHCP服务器',
        tip: [
          {
            title: 'DHCP中继',
            con: '通过DHCP转发可以实现让DHCP请求和应答数据包穿越多台路由器（宽带路由器）的功能'
          },
          {
            title: '启用',
            con: '开启/关闭 DHCP中继功能'
          },
          {
            title: 'DHCP服务器',
            con: '设置DHCP服务器，最多可以配置10个 （以空格或","隔开）'
          }
        ]
      }
    },
    firewall: {
      title: '防火墙',
      security: {
        title: '安全',
        labeltitle: '防止被攻击',
        dosenable: 'Protect Dos',
        ddosenable: '防止DoS/DDoS攻击',
        sysenable: 'Protect SYN Flood',
        spienable: 'SPI 防火墙',
        additionalfilter: 'Additional Filters',
        accesscontrol: '访问控制',
        service: 'Service',
        enable: 'Enable',
        port: '端口号',
        http: 'HTTP',
        https: 'HTTPS',
        telnet: 'TELNET',
        ssh: 'SSH',
        ftp: 'FTP',
        local: 'Local',
        blocknumber: 'Maximum Number',
        remote: '远程访问',
        websiteblocking: '网址过滤',
        namelabel: 'Name',
        urladdresslabel: '通过URL地址过滤',
        keywordlabel: '关键字过滤',
        tip: [
          {
            title: '防止被攻击',
            con: ''
          },
          {
            title: '防止DoS/DDoS攻击',
            con: '启用/禁用 防止DoS、DDoS攻击功能'
          },
          {
            title: '访问控制',
            con: ''
          },
          {
            title: '端口号',
            con: '设置相应服务的端口号。合法值：1-65535.'
          },
          {
            title: 'HTTP',
            con: '勾选后，用户就可以通过 HTTP 协议从本地登录设备，利用 Web 功能访问并控制设备。默认端口是80。'
          },
          {
            title: 'HTTPS',
            con: '勾选后，用户就可以通过 HTTPS 协议从本地或远程登录设备，利用 Web 功能访问并控制设备。默认端口是443。'
          },
          {
            title: 'TELNET',
            con: '勾选后，用户就可以通过Telnet协议从本地远程或远程登录设备。默认端口是23。'
          },
          {
            title: 'SSH',
            con: '勾选后，用户可以通过SSH协议从本地或远程登陆设备，保证在不安全网络上提供安全的远程登录。默认端口是22。'
          },
          {
            title: 'FTP',
            con: '勾选后，用户可以通过FTP协议从本地或远程登陆设备，保证在不安全网络上提供安全的远程登录。默认端口是21。'
          },
          {
            title: '远程访问',
            con: '通过远程访问路由器。'
          },
          {
            title: '网址过滤',
            con: ''
          },
          {
            title: '通过URL地址过滤',
            con: '通过输入的HTTP地址来封锁对该网址的访问'
          },
          {
            title: '关键字过滤',
            con: '通过输入关键字来封锁部分网络的访问,只能输入字母。最多不成超过64个字符。'
          }
        ]
      },
      acl: {
        title: '访问控制列表',
        labeltitle: '访问控制',
        policy: '默认处理策略',
        accept: '放行',
        drop: '阻止',
        acltitle: '访问控制列表',
        type: '类型',
        extended: '扩展',
        standard: '标准',
        aclid: 'ID',
        action: '动作',
        action1: '允许',
        action2: '拒绝',
        protocol: '协议',
        protocol1: 'ip',
        source: '源IP地址',
        sourcewildcard: '源地址反掩码',
        sourceport: '源端口类型',
        sourceports1: '源端口',
        sourceports: '起始源端口',
        sourceporte: '结束源端口',
        destination: '目的IP地址',
        destinationwildcard: '目的地址反掩码',
        destinationport: '目的端口类型',
        destinationports1: '目的端口',
        destinationports: '起始目的端口',
        destinationporte: '结束目的端口',
        icmptype: 'ICMP类型',
        icmpcode: 'ICMP代码',
        description: '说明',
        interfacetitle: '网络接口列表',
        "interface": '接口名称',
        inacl: '入站规则',
        outacl: '出站规则',
        more: '详细信息',
        tip: [
          {
            title: '访问控制列表',
            con: '通过配置一系列匹配规则，对指定数据流（如限定的源IP地址）执行允许或禁止通过，达到对网络接口数据的过滤。'
          },
          {
            title: '默认处理策略',
            con: '可选“放行”或“拒绝”。对于不满足访问控制列表的报文，采取该默认处理策略'
          },
          {
            title: '类型',
            con: '选择“扩展”或“标准”。扩展类型具有更多访问条件。'
          },
          {
            title: 'ID',
            con: '输入ACL规则编号，合法值：1-199'
          },
          {
            title: '动作',
            con: '选择允许或拒绝报文通过'
          },
          {
            title: '协议',
            con: '访问控制协议,可选"ip","icmp","tcp","udp","1-255"'
          },
          {
            title: '源IP地址',
            con: '输入ACL规则匹配报文的源地址，为空表示所有'
          },
          {
            title: '源地址反掩码',
            con: '输入ACL规则匹配报文的源地址反掩码'
          },
          {
            title: '目的IP地址',
            con: '输入ACL规则匹配报文的目的地址，空表示所有'
          },
          {
            title: '目的地址反掩码',
            con: '输入ACL规则匹配报文目的地址反掩码'
          },
          {
            title: 'ICMP类型',
            con: '输入ICMP包的类型。合法值：0-255'
          },
          {
            title: 'ICMP代码',
            con: '输入ICMP包的代码。合法值：0-255'
          },
          {
            title: '源端口类型',
            con: '选择源端口类型，如指定端口，或端口范围，等等'
          },
          {
            title: '源端口',
            con: '设置源端口号。合法值：1-65535'
          },
          {
            title: '起始源端口',
            con: '设置起始源端口号。合法值：1-65535'
          },
          {
            title: '结束源端口',
            con: '设置结束源端口号。合法值：1-65535'
          },
          {
            title: '目的端口类型',
            con: '选择目的端口类型，如指定端口，或端口范围，等等'
          },
          {
            title: '目的端口',
            con: '设置目的端口号。合法值：1-65535'
          },
          {
            title: '起始目的端口',
            con: '设置起始目的端口号。合法值：1-65535'
          },
          {
            title: '结束目的端口',
            con: '设置结束目的端口号。合法值：1-65535'
          },
          {
            title: '说明',
            con: '对同一个ID号的组进行统一说明'
          },
          {
            title: '详细信息',
            con: '显示端口信息'
          },
          {
            title: '接口名称',
            con: '选择访问控制的网络接口'
          },
          {
            title: '入站规则',
            con: '从访问控制列表ID中选择规则作入站过滤'
          },
          {
            title: '出站规则',
            con: '从访问控制列表ID中选择规则作出站过滤'
          }
        ]
      },
      portmapping: {
        title: '端口映射',
        labeltitle: '端口映射',
        dst: '远端地址',
        dstport: '到达端口',
        todst: '映射到地址',
        todport: '映射到端口',
        desc: '描述',
        protocol: '协议',
        tip: [
          {
            title: '远端地址',
            con: '定义允许访问本地IP地址的主机或网络。0.0.0.0/0 代表所有主机或网络'
          },
          {
            title: '到达端口',
            con: '输入外网访问路由器的对外端口号或端口号范围，合法值：1-65535'
          },
          {
            title: '映射到地址',
            con: '输入把数据转发到内网的设备的IP地址'
          },
          {
            title: '映射到端口',
            con: '输入把数据转发到内网的设备的端口号或端口号范围，合法值：1-65535'
          },
          {
            title: '协议',
            con: '根据应用从"TCP", "UDP", "Both"中选择协议'
          },
          {
            title: '描述',
            con: '输入对该条映射规则的描述'
          }
        ]
      },
      dmz: {
        title: 'DMZ',
        labeltitle: 'DMZ',
        enable: '启用',
        dmz: 'DMZ主机IP地址',
        src: '源IP地址',
        tip: [
          {
            title: 'DMZ',
            con: 'DMZ主机是除了被占用和转发的端口外，其他所有端口都对指定地址开放访问的内网主机。'
          },
          {
            title: '启用',
            con: '启用/禁用DMZ功能'
          },
          {
            title: 'DMZ主机IP地址',
            con: '输入内网DMZ主机的IP地址'
          },
          {
            title: '源IP地址',
            con: '设置可以和DMZ主机通话的源IP地址。0.0.0.0/0代表所有的地址都能与DMZ主机通话。'
          }
        ]
      },
      macip: {
        title: 'MAC绑定',
        labeltitle: 'MAC绑定列表',
        mac: 'MAC地址',
        ip: 'IP地址',
        desc: '说明',
        tip: [
          {
            title: 'MAC 绑定',
            con: '设置MAC绑定后，只有绑定列表里的主机能访问外网。'
          },
          {
            title: 'MAC 地址',
            con: '设置绑定的MAC地址'
          },
          {
            title: 'IP地址',
            con: '设置绑定的IP地址'
          },
          {
            title: '说明',
            con: '便于记录每条MAC-IP地址绑定规则的意义'
          }
        ]
      },
      "custom": {
        "title": "自定义规则",
        "rule": "规则",
        "desc": "描述",
        "tip": [
          {
            "title": "规则",
            "con": "制定防火墙规则。"
          },
          {
            "title": "描述",
            "con": "可输入规则描述。"
          }
        ]
      },
      spi: {
        title: 'SPI',
        labeltitle: 'SPI 防火墙',
        enable: '启用',
        spi_fierwall: "spi_fierwall",
        checkbox: {
          filter_proxy: "过滤Proxy",
          filter_cookies: "过滤Cookies",
          filter_active_x: 'ActiveX 过滤',
          filter_java: "Java Applets过滤",
          filter_multicast: '过滤组播包',
          filter_ident: '过滤IDENT认证协议',
          filter_snmp: '阻止广域网的SNMP请求',
          filter_wan_redirection: 'WAN的重定向过滤',
          filter_ping: '阻止来自WAN口的匿名请求'
        },
        tip: [
          {
            title: 'SPI 防火墙',
            con: ''
          },
          {
            title: '启用',
            con: '启用/禁用SPI 防火墙功能'
          },
          {
            title: '过滤Proxy',
            con: '该功能启用后，阻止包含“Host：”字符串的HTTP请求。'
          },
          {
            title: '过滤Cookies',
            con: '标识包含“Cookie：”字符串的HTTP请求并破坏cookie。且尝试阻止使用cookie。'
          },
          {
            title: 'ActiveX 过滤',
            con: '阻止包含以“.ocx”或“.cab”结尾的URL的HTTP请求。'
          },
          {
            title: 'Java Applets过滤',
            con: '阻止包含以“.js”或“.class”结尾的URL的HTTP请求。'
          },
          {
            title: '过滤组播包',
            con: '防止组播数据包到达LAN。'
          },
          {
            title: '过滤 IDENT认证协议',
            con: '启用该功能可以使113端口免于被自己的网络之外的其他设备进行扫描。'
          },
          {
            title: '阻止广域网的SNMP请求',
            con: '启用该功能可以阻止来自广域网的SNMP的请求。'
          },
          {
            title: 'WAN的重定向过滤',
            con: '防止LAN上的主机使用路由器的WAN地址联系LAN上的服务器（已使用端口重定向配置）'
          },
          {
            title: '阻止来自WAN口的匿名请求',
            con: '启用该功能，从而防止自己的网络遭受其他Internet用户的ping或者探测'
          }
        ]
      }
    },
    qos: {
      title: '流量控制',
      download: {
        title: '下行带宽控制',
        setting: '下行带宽',
        enable: '启用',
        ruletitle: '类别规则',
        rname: '名称',
        source: '源地址',
        sport: '源端口',
        dest: '目的地址',
        dport: '目的端口',
        protocol: '协议',
        any: 'ANY',
        tcp: 'TCP',
        udp: 'UDP',
        icmp: 'ICMP',
        gre: 'GRE',
        classtitle: '服务类别',
        cname: '名称',
        percent: '比例（%）',
        max: '最大带宽（kbps）',
        min: '最小带宽（kbps）',
        total: '总下行带宽',
        aname: '服务类别',
        defaultclass: '默认类别',
        tip: [
          {
            title: '启用',
            con: '开启/关闭'
          },
          {
            title: '默认类别',
            con: '从服务类别列表中选择默认类别'
          },
          {
            title: '总下行带宽',
            con: '路由器所连接网络的总下载带宽，单位：kbps。合法值：1-8000000'
          },
          {
            title: '服务类别',
            con: ''
          },
          {
            title: '名称',
            con: '用户自定义服务类别的名称。有效字符包括字母，数字或"_"'
          },
          {
            title: '比例（%）',
            con: '设置服务类别百分比。合法值：0-100'
          },
          {
            title: '最大带宽（kbps）',
            con: '当发生阻塞时，实际数据不能超过设置的最大带宽，单位：kbps。需小于总下行带宽'
          },
          {
            title: '最小带宽（kbps）',
            con: '该服务最小能保证的带宽，单位：kbps。需小于最大带宽'
          },
          {
            title: '类别规则',
            con: ''
          },
          {
            title: '名称',
            con: '用户自定义规则名称。有效字符包括字母，数字或"_"'
          },
          {
            title: '源地址',
            con: '流量控制的源地址（空代表any)'
          },
          {
            title: '源端口',
            con: '流量控制的源端口，合法值：0-65535。 (空代表any）'
          },
          {
            title: '目的地址',
            con: '流量控制的目的地址（空代表any)'
          },
          {
            title: '目的端口',
            con: '流量控制的目的端口对。合法值：0-65535。（空代表any)'
          },
          {
            title: '协议',
            con: '选择协议类型，用户可选择：ANY, TCP,UDP, ICMP,GRE'
          },
          {
            title: '服务类别',
            con: '设置该条规则的服务类别'
          }
        ]
      },
      upload: {
        title: '上行带宽控制',
        setting: '上行带宽',
        enable: '启用',
        ruletitle: '类别规则',
        rname: '名称',
        source: '源地址',
        sport: '源端口',
        dest: '目的地址',
        dport: '目的端口',
        protocol: '协议',
        any: 'ANY',
        tcp: 'TCP',
        udp: 'UDP',
        icmp: 'ICMP',
        gre: 'GRE',
        classtitle: '服务类别',
        cname: '名称',
        percent: '比例（%）',
        max: '最大带宽（kbps）',
        min: '最小带宽（kbps）',
        total: '总上行带宽',
        aname: '服务类别',
        defaultclass: '默认类别',
        tip: [
          {
            title: '启用',
            con: '开启/关闭'
          },
          {
            title: '默认类别',
            con: '从服务类别列表中选择默认类别'
          },
          {
            title: '总下行带宽',
            con: '路由器所连接网络的总上行带宽，单位：kbps。合法值：1-8000000'
          },
          {
            title: '服务类别',
            con: ''
          },
          {
            title: '名称',
            con: '用户自定义服务类别的名称。有效字符包括字母，数字或"_"'
          },
          {
            title: '比例（%）',
            con: '设置服务类别百分比。合法值：0-100'
          },
          {
            title: '最大带宽（kbps）',
            con: '当发生阻塞时，实际数据不能超过设置的最大带宽，单位：kbps。需小于总上行带宽'
          },
          {
            title: '最小带宽（kbps）',
            con: '该服务最小能保证的带宽，单位：kbps。需小于最大带宽'
          },
          {
            title: '类别规则',
            con: ''
          },
          {
            title: '名称',
            con: '用户自定义规则名称。有效字符包括字母，数字或"_"'
          },
          {
            title: '源地址',
            con: '流量控制的源地址（空代表any)'
          },
          {
            title: '源端口',
            con: '流量控制的源端口，合法值：0-65535。 (空代表any）'
          },
          {
            title: '目的地址',
            con: '流量控制的目的地址（空代表any)'
          },
          {
            title: '目的端口',
            con: '流量控制的目的端口对。合法值：0-65535。（空代表any)'
          },
          {
            title: '协议',
            con: '选择协议类型，用户可选择：ANY, TCP,UDP, ICMP,GRE'
          },
          {
            title: '服务类别',
            con: '设置该条规则的服务类别'
          }
        ]
      }
    },
    vpn: {
      title: 'VPN',
      dmvpn: {
        title: 'DMVPN',
        settings: 'DMVPN设置',
        enable: '启用',
        hubip: 'Hub地址',
        localip: '本地IP地址',
        hubgreip: 'GRE HUB IP地址',
        greip: 'GRE本地IP地址',
        gremask: 'GRE子网掩码',
        grekey: 'GRE密钥',
        negotiation: '协商模式',
        main: 'Main',
        aggress: 'Aggressive',
        encryption: '加密算法',
        encryption0: 'DES',
        encryption1: '3DES',
        encryption2: 'AES128',
        encryption3: 'AES192',
        encryption4: 'AES256',
        authentication: '认证算法',
        md5: 'MD5',
        sha1: 'SHA1',
        dhgroup: 'DH组',
        dhgroup0: 'MODP768-1',
        dhgroup1: 'MODP1024-2',
        dhgroup2: 'MODP1536-5',
        secrets: 'PSK密钥',
        localidtype: '本地ID类型',
        localidtype0: 'Default',
        localidtype1: 'ID',
        localidtype2: 'FQDN',
        localidtype3: 'User FQDN',
        localid: '本地ID',
        ikelifetime: 'IKE生存时间(秒)',
        saalgo: 'SA算法',
        saalgo0: 'DES-MD5',
        saalgo1: 'DES-SHA1',
        saalgo2: '3DES-MD5',
        saalgo3: '3DES-SHA1',
        saalgo4: 'AES128-MD5',
        saalgo5: 'AES128-SHA1',
        saalgo6: 'AES192-MD5',
        saalgo7: 'AES192-SHA1',
        saalgo8: 'AES256-MD5',
        saalgo9: 'AES256-SHA1',
        pfsgroup: 'PFS组',
        pfsgroup0: 'NULL',
        pfsgroup1: 'MODP768-1',
        pfsgroup2: 'MODP1024-2',
        pfsgroup3: 'MODP1536-5',
        lifetime: '生存时间(秒)',
        dpdinterval: 'DPD时间间隔(秒)',
        dpdtimeout: 'DPD超时时间(秒)',
        ciscosecret: 'Cisco密钥',
        nhrptime: 'NHRP保持时间(秒)',
        tip: [
          {
            title: 'DMVPN',
            con: '动态多点虚拟专用网（DMVPN）是基于Cisco IOS路由器，华为AR G3路由器和USG防火墙以及Unix类操作系统支持的虚拟专用网（VPN）的动态隧道形式'
          },
          {
            title: '启用',
            con: '启用/禁用DMVPN'
          },
          {
            title: 'Hub地址',
            con: 'DMVPN Hub(中心站点)的IP地址或者域名'
          },
          {
            title: '本地IP地址',
            con: 'DMVPN 本地隧道IP地址'
          },
          {
            title: 'GRE Hub IP 地址',
            con: 'GRE Hub隧道IP地址'
          },
          {
            title: 'GRE 本地IP地址',
            con: 'GRE 本地隧道IP地址'
          },
          {
            title: 'GRE 子网掩码',
            con: 'GRE 隧道子网掩码'
          },
          {
            title: 'GRE密钥',
            con: 'GRE隧道密钥'
          },
          {
            title: '协商模式',
            con: '从"Main" 和"Aggressive"中选择IKE协商模式。如果IPsec隧道一端的IP地址是自动获取的，必须选择"Aggressive"为IKE协商模式。在这种情况下，只要用户名和密码正确，就能建立SAs.'
          },
          {
            title: '加密算法',
            con: '从"DES","3DES","AES128""AES192""AES256"中选择加密算法应用在IKE协商中。DES:使用56位的DES加密算法。3DES: 使用168位的3DES加密算法。AES128:使用128位的AES加密算法。AES192:使用192位的AES加密算法。AES256:使用256位的AES加密算法'
          },
          {
            title: '认证算法',
            con: '从"MD5"和"SHA1"中选择认证算法应用在IKE协商中。'
          },
          {
            title: 'DH组',
            con: '从"MODP768_1" "MODP1024_2"和"MODP1536_5"选择来应用在IKF协商中。MODP768_1:使用768-bit Diffie-Hellman组。MODP1024_2:使用1024-bit Diffie-Hellman组。MODP1536_5:使用1536-bit Diffie-Hellman组。'
          },
          {
            title: 'PSK密钥',
            con: '输入预共享密钥'
          },
          {
            title: '本地ID 类型',
            con: '选择"Default","ID","FQDN"或"User FQDN"。"DEFAULT"代表"IP地址"。ID: 在IKE协商中把IP地址当作ID。FQDN:在IKE协商中把正式域名当作ID。如果选择这一选项，要把域名中@去掉后再输入，如test.user.com。User FQDN: 在IKE协商中把用户正式域名当作ID。如果选择这一选项，输入域名时要带上@，如test@user.com'
          },
          {
            title: 'IKE生存时间（秒）',
            con: '在IKE协商中设置生存时间。合法值：60-86400。在SA过期之前，IKE协商出新的SA。新的SA一建立，它会立即生效。旧的那一个过期后会立即清除。'
          },
          {
            title: 'SA算法',
            con: '可以选择"DES_MD5", "DES_SHA1","3DES_MD5","3DES_SHA1","AES128_MD5","AES128_SHA1","AES192_MD5", "AES192_SHA1","AES256_MD5"和"AES256_SHA1"中选择。注意：更高的安全性意味着更复杂的实现和更低的速率。DES能满足一般性需求。安全和机密性要求更高是则选 用3DES。'
          },
          {
            title: 'PFS组',
            con: '从"NULL","MODP768_1","MODP1024_2"和"MODP1536_5"中选择。NULL:禁用PFS组。MODP768_1:使用768-bit Diffie-Hellman组。MODP1024_2:使用1024-bit Diffie-Hellman组。MODP1536_5:使用1536-bit Diffie-Hellman组'
          },
          {
            title: '生存时间（秒）',
            con: '设置 IPSec SA 的生存周期。IPSec 协商建立 SA 时，采用本端设置的生存周期和对端的生存周期中较小的一个。'
          },
          {
            title: 'DPD时间间隔（秒）',
            con: '设置间隔时间。如果从对端接收不到IPsec保护包，过了该间隔时间后，DPD将会被触发。DPD：失效对等体检测。DPD会不定期地检测IKE的对端是否失效。本地终端接收到IPsec包时，DPD检测上一次从对端收到IPsec包的时间。如果时间超过DPD间隔时间，它将发送DPD hello包给对端。如果本地终端在DPD包回传时间接个内未接到DPD确认，它将重传DPD hello包。如果本地终端发送DPD hello包超过最大重传尝试次数，仍未收到DPD确认，就认为对端已经无效，将清除IKE SA和基于IKE SA的IPsec SAs.'
          },
          {
            title: 'DPD超时时间（秒）',
            con: '设置DPD（失效对等体检测）包的超时时间'
          },
          {
            title: 'Cisco 密钥',
            con: 'Cisco Nhrp密钥'
          },
          {
            title: 'NHRP保持时间（秒）',
            con: 'Nhrp协议的保持时间'
          }
        ]
      },
      ipsecserver: {
        title: 'IPsec 服务器',
        ipsectitle: 'IPsec 服务器设置',
        tbltitle: 'IPsec 服务器',
        enable: '启用',
        remoteip: 'IPsec网关地址',
        mode: 'IPsec模式',
        tunnel: '隧道',
        transport: '运输',
        protocol: 'IPsec协议',
        esp: 'ESP',
        ah: 'AH',
        localsubnet: '本地子网',
        localsubnetmask: '本地子网掩码',
        localidtype: '本地ID类型',
        "default": 'Default',
        id: 'ID',
        fqdn: 'FQDN',
        userfqdn: 'User FQDN',
        localid: '本地ID',
        remotesubnet: '远端子网',
        remotesubnetmask: '远端子网掩码',
        remoteidtype: '远端ID类型',
        remoteid: '远端ID',
        ikeparam: 'IKE参数',
        version: 'IKE版本',
        ikev1: 'IKEv1',
        ikev2: 'IKEv2',
        negotiationmode: '协商模式',
        main: 'Main',
        aggress: 'Aggress',
        encryalgo: '加密算法',
        encrydes: 'DES',
        encry3des: '3DES',
        encryaes128: 'AES128',
        encryaes192: 'AES192',
        encryaes256: 'AES256',
        authalgo: '认证算法',
        authmd5: 'MD5',
        authsha1: 'SHA1',
        authsha2256: 'SHA2-256',
        dhgroup: 'DH组',
        dhgroup0: 'MODP768-1',
        dhgroup1: 'MODP1024-2',
        dhgroup2: 'MODP1536-5',
        dhgroup3: 'MODP2048-14',
        dhgroup4: 'MODP3072-15',
        authtypelocal: '本地认证类型',
        authpsk: 'PSK',
        authca: 'CA',
        secretslocal: '本地密钥',
        authtyperemote: '远端认证类型',
        secretsremote: '远端密钥',
        xauth: 'XAUTH',
        xauthlisttitle: 'XAUTH列表',
        username: '用户名',
        password: '密码',
        psklist: 'PSK列表',
        pskselector: 'Selector',
        psk: 'PSK',
        ikelifttime: '生存时间(秒)',
        saparam: 'SA参数',
        saencryptalgo: 'SA加密算法',
        saencryptalgo1: 'DES',
        saencryptalgo2: '3DES',
        saencryptalgo3: 'AES128',
        saencryptalgo4: 'AES192',
        saencryptalgo5: 'AES256',
        saauthalgo: 'SA认证算法',
        saauthalgo1: 'MD5',
        saauthalgo2: 'SHA1',
        saauthalgo3: 'SHA2-256',
        saalgo: 'SA算法',
        saalgo0: 'DES-MD5',
        saalgo1: 'DES-SHA1',
        saalgo2: '3DES-MD5',
        saalgo3: '3DES-SHA1',
        saalgo4: 'AES128-MD5',
        saalgo5: 'AES128-SHA1',
        saalgo6: 'AES192-MD5',
        saalgo7: 'AES192-SHA1',
        saalgo8: 'AES256-MD5',
        saalgo9: 'AES256-SHA1',
        saalgo10: 'MD5',
        saalgo11: 'SHA1',
        sagroup: 'PFS组',
        sagroup0: 'NULL',
        sagroup1: 'MODP768-1',
        sagroup2: 'MODP1024-2',
        sagroup3: 'MODP1536-5',
        lifetime: '生存时间(秒)',
        dpdinterval: 'DPD时间间隔(秒)',
        dpdtimeout: 'DPD超时时间(秒)',
        advance: 'IPsec高级',
        comp: '支持压缩',
        margintime: '时间裕度(秒)',
        ipsecovervpn: '基于IPsec的VPN类型',
        ipsecovervpn0: '无',
        ipsecovervpn1: 'L2TP',
        ipsecovervpn2: 'GRE',
        vpntype: '隧道名称',
        vpntype1: 'GRE_Tunnel_1',
        vpntype2: 'GRE_Tunnel_2',
        vpntype3: 'GRE_Tunnel_3',
        vpntype4: 'L2TP_Tunnel_1',
        vpntype5: 'L2TP_Tunnel_2',
        vpntype6: 'L2TP_Tunnel_3',
        tip: [
          {
            title: 'IPsec 服务器',
            con: 'IPsec是IETF制定的一组开放的网络安全协议，在IP层通过数据来源认证、数据加密、数据完整性和抗重放功能来保证通信双方Internet 上传输数据的安全性。减少泄漏和被窃听的风险，保证数据的完整性和机密性，保障了用户业务传输的安全'
          },
          {
            title: '启用',
            con: '启用IPsec隧道，最大隧道数是3'
          },
          {
            title: 'IPsec模式',
            con: '从“隧道”和“运输”中选择。隧道：一般用于网关之间或终端到网关之间，网关作为身后主机的代理。运输：用于终端之间或终端和网关之间的通讯。如在工作站到路由器之间建立加密的Telnet连接'
          },
          {
            title: 'IPsec 协议',
            con: '用户可选择:ESP协议和AH认证头协议。AH认证头协议：提供数据源认证、数据完整性校验和报文防重放功能。AH协议定义了认证的应用方法，提供数据源认证和完整性保证。ESP：封装安全载荷协议。除提供AH认证头协议的所有功能之外，还可对IP报文净荷进行加密。ESP协议允许对IP报文净荷进行加密和认证、只加密或者只认证，ESP没有对IP头的内容进行保护。 '
          },
          {
            title: '本地子网',
            con: '输入IPsec保护的本地子网地址'
          },
          {
            title: '本地子网掩码',
            con: '输入IPsec保护的本地子网掩码'
          },
          {
            title: '本地ID 类型',
            con: '从“Default”，“ID”，“FQDN”和“User FQDN”中选择本地ID类型应用在IKE协商中。“Default”：代表“IP地址”。ID：在IKE协商中把IP地址当作ID。FQDN：在IKE协商中把正式域名当作ID。如果选择这一选项，要把域名中@去掉后再输入，如test.user.com。User FQDN：在IKE协商中把用户正式域名当作ID。如果选择这一选项，输入域名时要带上@，如test@user.com'
          },
          {
            title: '远端子网',
            con: '输入IPsec远端保护子网地址'
          },
          {
            title: '远端子网掩码',
            con: '输入IPsec远端保护子网的子网掩码'
          },
          {
            title: '远端ID类型',
            con: '从“Default”，“ID”，“FQDN”和“User FQDN”中选择远程ID类型应用在IKE协商中。“Default”：代表“IP地址”。ID：在IKE协商中把IP地址当作ID。FQDN：在IKE协商中把正式域名当作ID。如果选择这一选项，要把域名中@去掉后再输入，如test.user.com。User FQDN：在IKE协商中把用户正式域名当作ID。如果选择这一选项，输入域名时要带上@，如test@user.com'
          },
          {
            title: 'IKE参数',
            con: ''
          },
          {
            title: 'IKE版本',
            con: '设置IKE协议使用的版本号，支持IKEv1, IKEv2'
          },
          {
            title: '协商模式',
            con: '设置IKEv1的协商模式：主模式：主模式将密钥交换信息与身份认证信息相分离。这种分离保护了身份信息，从而提供了更高的安全性。野蛮模式：野蛮模式缺少身份认证，但可以满足某些特定的网络环境需求。如果无法预先知道发起者的地址、或者发起者的地址总在变化， 而双方都希望采用预共享密钥认证方法来创建IKE SA， 就可以用野蛮模式'
          },
          {
            title: '加密算法',
            con: '用户可选择：DES, 3DES, AES128, AES192, AES256。3DES：使用三个64bit的DES密钥对明文进行加密；DES:使用64bit的密钥对一个64bit的明文块进行加密；AES：使用128bit, 192bit或256bit密钥长度的AES算法对明文进行加密'
          },
          {
            title: '认证算法',
            con: '从"MD5"和"SHA1"中选择认证算法应用在IKE协商中。MD5：使用HMAC-SHA1；SHA1:使用HMAC-MD5'
          },
          {
            title: 'DH组',
            con: '从"MODP768_1" "MODP1024_2"和"MODP1536_5"选择来应用在IKF（网络密钥交换）协商中。MODP768_1:使用768-bit Diffie-Hellman组。MODP1024_2:使用1024-bit Diffie-Hellman组。MODP1536_5:使用1536-bit Diffie-Hellman组。'
          },
          {
            title: '本地认证类型',
            con: '从"PSK","CA"中选择，应用到IKE协商中。PSK: 预共享密钥；CA:认证机构'
          },
          {
            title: 'XAUTH List',
            con: ''
          },
          {
            title: '用户名',
            con: '输入XAUTH认证所需用户名。'
          },
          {
            title: '密码',
            con: '输入XAUTH认证所需密码'
          },
          {
            title: 'PSK List',
            con: ''
          },
          {
            title: '选择器',
            con: '输入进行PSK认证时对应的识别号。'
          },
          {
            title: '预共享秘钥',
            con: '输入预共享秘钥'
          },
          {
            title: '本地密钥',
            con: '输入预共享密钥'
          },
          {
            title: 'XAUTH',
            con: '启用后输入XAUTH用户名、密码'
          },
          {
            title: '生存时间（秒）',
            con: '在IKE协商中设置生存时间。合法值：60-86400。在SA过期之前，IKE协商出新的SA。新的SA一建产，它会立即生效。旧的那一个过期后会立即清除。'
          },
          {
            title: 'SA参数',
            con: ''
          },
          {
            title: 'SA算法',
            con: '可以选择"DES_MD5", "DES_SHA1","3DES_MD5","3DES_SHA1","AES128_MD5","AES128_SHA1","AES192_MD5", "AES192_SHA1","AES256_MD5"和"AES256_SHA1"中选择。注意：更高的安全性意味着更复杂的实现和更低的速率。DES能满足一般性需求。安全和机密性要求更高是则选 用3DES。'
          },
          {
            title: 'PFS组',
            con: '从"NULL","MODP768_1","MODP1024_2"和"MODP1536_5"中选择。NULL:禁用PFS组；MODP768_1:使用768-bit Diffie-Hellman组；MODP1024_2:使用1024-bit Diffie-Hellman组；MODP1536_5:使用1536-bit Diffie-Hellman组'
          },
          {
            title: '生存时间（秒）',
            con: '设置IPsec SA的生存时间。合法值：60-86400。注意：当协商建立IPsec SAs时，IKE将在本地设定生存时间和对端提出的生存之间选择较小的那一个'
          },
          {
            title: 'DPD时间间隔（秒）',
            con: '设置间隔时间。如果从对端接收不到IPsec保护包，过了该间隔时间后，DPD将会被触发。DPD：失效对等体检测。DPD会不定期地检测IKE的对端是否失效。本地终端接收到IPsec包时，DPD检测上一次从对端收到IPsec包的时间。如果时间超过DPD间隔时间，它将发送DPD hello包给对端。如果本地终端在DPD包回传时间间隔内未接到DPD确认，它将重传DPD hello包。如果本地终端发送DPD hello包超过最大重传尝试次数，仍未收到DPD确认，就认为对端已经无效，将清除IKE SA和基于IKE SA的IPsec SAs.'
          },
          {
            title: 'DPD超时时间（秒）',
            con: '设置DPD包的超时时间。合法值：10-86400'
          },
          {
            title: 'IPsec高级',
            con: ''
          },
          {
            title: '支持压缩',
            con: '点击启用后则会压缩IP数据包的头部'
          },
          {
            title: '时间裕度',
            con: '指定在连接到期或密钥通道到期之前多久应尝试开始协商替换'
          },
          {
            title: '基于IPsec的VPN 类型',
            con: '选择"无"、"GRE" 或"L2TP "。在这里可以选择开启VPN over IPsec功能'
          }
        ]
      },
      ipsec: {
        title: 'IPsec',
        ipsectitle: 'IPsec设置',
        tbltitle: 'IPsec',
        enable: '启用',
        remoteip: 'IPsec网关地址',
        mode: 'IPsec模式',
        tunnel: '隧道',
        transport: '运输',
        protocol: 'IPsec协议',
        esp: 'ESP',
        ah: 'AH',
        localsubnet: '本地子网',
        localsubnetmask: '本地子网掩码',
        localidtype: '本地ID类型',
        "default": 'Default',
        id: 'ID',
        fqdn: 'FQDN',
        userfqdn: 'User FQDN',
        localid: '本地ID',
        remotesubnet: '远端子网',
        remotesubnetmask: '远端子网掩码',
        remoteidtype: '远端ID类型',
        remoteid: '远端ID',
        ikeparam: 'IKE参数',
        version: 'IKE版本',
        ikev1: 'IKEv1',
        ikev2: 'IKEv2',
        negotiationmode: '协商模式',
        main: 'Main',
        aggress: 'Aggress',
        encryalgo: '加密算法',
        encrydes: 'DES',
        encry3des: '3DES',
        encryaes128: 'AES128',
        encryaes192: 'AES192',
        encryaes256: 'AES256',
        authalgo: '认证算法',
        authmd5: 'MD5',
        authsha1: 'SHA1',
        authsha2256: 'SHA2-256',
        dhgroup: 'DH组',
        dhgroup0: 'MODP768-1',
        dhgroup1: 'MODP1024-2',
        dhgroup2: 'MODP1536-5',
        dhgroup3: 'MODP2048-14',
        dhgroup4: 'MODP3072-15',
        authtypelocal: '本地认证类型',
        authpsk: 'PSK',
        authca: 'CA',
        secretslocal: '本地密钥',
        authtyperemote: '远端认证类型',
        secretsremote: '远端密钥',
        xauth: 'XAUTH',
        xauthuser: '用户名',
        xauthpsw: '密码',
        ikelifttime: '生存时间(秒)',
        saparam: 'SA参数',
        saencryptalgo: 'SA加密算法',
        saencryptalgo1: 'DES',
        saencryptalgo2: '3DES',
        saencryptalgo3: 'AES128',
        saencryptalgo4: 'AES192',
        saencryptalgo5: 'AES256',
        saauthalgo: 'SA认证算法',
        saauthalgo1: 'MD5',
        saauthalgo2: 'SHA1',
        saauthalgo3: 'SHA2-256',
        saalgo: 'SA算法',
        saalgo0: 'DES-MD5',
        saalgo1: 'DES-SHA1',
        saalgo2: '3DES-MD5',
        saalgo3: '3DES-SHA1',
        saalgo4: 'AES128-MD5',
        saalgo5: 'AES128-SHA1',
        saalgo6: 'AES192-MD5',
        saalgo7: 'AES192-SHA1',
        saalgo8: 'AES256-MD5',
        saalgo9: 'AES256-SHA1',
        saalgo10: 'MD5',
        saalgo11: 'SHA1',
        sagroup: 'PFS组',
        sagroup0: 'NULL',
        sagroup1: 'MODP768-1',
        sagroup2: 'MODP1024-2',
        sagroup3: 'MODP1536-5',
        lifetime: '生存时间(秒)',
        dpdinterval: 'DPD时间间隔(秒)',
        dpdtimeout: 'DPD超时时间(秒)',
        advance: 'IPsec高级',
        comp: '支持压缩',
        margintime: '时间裕度(秒)',
        ipsecovervpn: '基于IPsec的VPN类型',
        ipsecovervpn0: '无',
        ipsecovervpn1: 'L2TP',
        ipsecovervpn2: 'GRE',
        vpntype: '隧道名称',
        vpntype1: 'GRE_Tunnel_1',
        vpntype2: 'GRE_Tunnel_2',
        vpntype3: 'GRE_Tunnel_3',
        vpntype4: 'L2TP_Tunnel_1',
        vpntype5: 'L2TP_Tunnel_2',
        vpntype6: 'L2TP_Tunnel_3',
        expertoptions: '专家选项',
        tip: [
          {
            title: 'IPsec',
            con: 'IPsec是IETF制定的一组开放的网络安全协议，在IP层通过数据来源认证、数据加密、数据完整性和抗重放功能来保证通信双方Internet 上传输数据的安全性。减少泄漏和被窃听的风险，保证数据的完整性和机密性，保障了用户业务传输的安全'
          },
          {
            title: '启用',
            con: '启用IPsec隧道，最大隧道数是3'
          },
          {
            title: 'IPsec网关地址',
            con: '输入远端IPsec 服务器地址(IP/域名）'
          },
          {
            title: 'IPsec模式',
            con: '从“隧道”和“运输”中选择。隧道：一般用于网关之间或终端到网关之间，网关作为身后主机的代理。运输：用于终端之间或终端和网关之间的通讯。如在工作站到路由器之间建立加密的Telnet连接'
          },
          {
            title: 'IPsec 协议',
            con: '用户可选择:ESP协议和AH认证头协议。AH认证头协议：提供数据源认证、数据完整性校验和报文防重放功能。AH协议定义了认证的应用方法，提供数据源认证和完整性保证。ESP：封装安全载荷协议。除提供AH认证头协议的所有功能之外，还可对IP报文净荷进行加密。ESP协议允许对IP报文净荷进行加密和认证、只加密或者只认证，ESP没有对IP头的内容进行保护。 '
          },
          {
            title: '本地子网',
            con: '输入IPsec保护的本地子网地址'
          },
          {
            title: '本地子网掩码',
            con: '输入IPsec保护的本地子网掩码'
          },
          {
            title: '本地ID 类型',
            con: '从“Default”，“ID”，“FQDN”和“User FQDN”中选择本地ID类型应用在IKE协商中。“Default”：代表“IP地址”。ID：在IKE协商中把IP地址当作ID。FQDN：在IKE协商中把正式域名当作ID。如果选择这一选项，要把域名中@去掉后再输入，如test.user.com。User FQDN：在IKE协商中把用户正式域名当作ID。如果选择这一选项，输入域名时要带上@，如test@user.com'
          },
          {
            title: '远端子网',
            con: '输入IPsec远端保护子网地址'
          },
          {
            title: '远端子网掩码',
            con: '输入IPsec远端保护子网的子网掩码'
          },
          {
            title: '远端ID类型',
            con: '从“Default”，“ID”，“FQDN”和“User FQDN”中选择远程ID类型应用在IKE协商中。“Default”：代表“IP地址”。ID：在IKE协商中把IP地址当作ID。FQDN：在IKE协商中把正式域名当作ID。如果选择这一选项，要把域名中@去掉后再输入，如test.user.com。User FQDN：在IKE协商中把用户正式域名当作ID。如果选择这一选项，输入域名时要带上@，如test@user.com'
          },
          {
            title: 'IKE参数',
            con: ''
          },
          {
            title: 'IKE版本',
            con: '设置IKE协议使用的版本号，支持IKEv1, IKEv2'
          },
          {
            title: '协商模式',
            con: '设置IKEv1的协商模式：主模式：主模式将密钥交换信息与身份认证信息相分离。这种分离保护了身份信息，人而提供了更高的安全性。野蛮模式：野蛮模式缺少身份认证，但可以满足某些特定的网络环境需求。如果无法预先知道发起者的地址、或者发起者的地址总在变化， 而双方都希望采用预共享密钥认证方法来创建IKE SA， 就可以用野蛮模式'
          },
          {
            title: '加密算法',
            con: '用户可选择：DES, 3DES, AES128, AES192, AES256。3DES：使用三个64bit的DES密钥对明文进行加密；DES:使用64bit的密钥对一个64bit的明文块进行加密；AES：使用128bit, 192bit或256bit密钥长度的AES算法对明文进行加密'
          },
          {
            title: '认证算法',
            con: '从"MD5"和"SHA1"中选择认证算法应用在IKE协商中。MD5：使用HMAC-SHA1；SHA1:使用HMAC-MD5'
          },
          {
            title: 'DH组',
            con: '从"MODP768_1" "MODP1024_2"和"MODP1536_5"选择来应用在IKF（网络密钥交换）协商中。MODP768_1:使用768-bit Diffie-Hellman组。MODP1024_2:使用1024-bit Diffie-Hellman组。MODP1536_5:使用1536-bit Diffie-Hellman组。'
          },
          {
            title: '本地认证类型',
            con: '从"PSK","CA"中选择，应用到IKE协商中。PSK: 预共享密钥；CA:认证机构'
          },
          {
            title: '本地密钥',
            con: '输入预共享密钥'
          },
          {
            title: 'XAUTH',
            con: '启用后输入XAUTH用户名、密码'
          },
          {
            title: '生存时间（秒）',
            con: '在IKE协商中设置生存时间。合法值：60-86400。在SA过期之前，IKE协商出新的SA。新的SA一建产，它会立即生效。旧的那一个过期后会立即清除。'
          },
          {
            title: 'SA参数',
            con: ''
          },
          {
            title: 'SA算法',
            con: '可以选择"DES_MD5", "DES_SHA1","3DES_MD5","3DES_SHA1","AES128_MD5","AES128_SHA1","AES192_MD5", "AES192_SHA1","AES256_MD5"和"AES256_SHA1"中选择。注意：更高的安全性意味着更复杂的实现和更低的速率。DES能满足一般性需求。安全和机密性要求更高是则选 用3DES。'
          },
          {
            title: 'PFS组',
            con: '从"NULL","MODP768_1","MODP1024_2"和"MODP1536_5"中选择。NULL:禁用PFS组；MODP768_1:使用768-bit Diffie-Hellman组；MODP1024_2:使用1024-bit Diffie-Hellman组；MODP1536_5:使用1536-bit Diffie-Hellman组'
          },
          {
            title: '生存时间（秒）',
            con: '设置IPsec SA的生存时间。合法值：60-86400。注意：当协商建立IPsec SAs时，IKE将在本地设定生存时间和对端提出的生存之间选择较小的那一个'
          },
          {
            title: 'DPD时间间隔（秒）',
            con: '设置间隔时间。如果从对端接收不到IPsec保护包，过了该间隔时间后，DPD将会被触发。DPD：失效对等体检测。DPD会不定期地检测IKE的对端是否失效。本地终端接收到IPsec包时，DPD检测上一次从对端收到IPsec包的时间。如果时间超过DPD间隔时间，它将发送DPD hello包给对端。如果本地终端在DPD包回传时间接个内未接到DPD确认，它将重传DPD hello包。如果本地终端发送DPD hello包超过最大重传尝试次数，仍未收到DPD确认，就认为对端已经无效，将清除IKE SA和基于IKE SA的IPsec SAs.'
          },
          {
            title: 'DPD超时时间（秒）',
            con: '设置DPD包的超时时间。合法值：10-86400'
          },
          {
            title: 'IPsec高级',
            con: ''
          },
          {
            title: '支持压缩',
            con: '点击启用后则会压缩IP数据包的头部'
          },
          {
            title: '时间裕度',
            con: '指定在连接到期或密钥通道到期之前多久应尝试开始协商替换'
          },
          {
            title: '基于IPsec的VPN 类型',
            con: '选择"无"、"GRE" 或"L2TP "。在这里可以选择开启VPN over IPsec功能'
          }
        ]
      },
      gre: {
        title: 'GRE',
        gretitle: 'GRE设置',
        tbltitle: 'GRE',
        enable: '启用',
        localip: '本地IP地址',
        remoteip: '远端IP地址',
        localvip: '本地虚拟IP地址',
        localvmask: '子网掩码',
        remotevip: '对端虚拟IP地址',
        defaultroute: '全局流量转发',
        remotesubnet: '远端子网',
        remotemask: '远端子网掩码',
        mtu: '最大传输单元',
        key: '密钥',
        enablenat: '启用NAT',
        tip: [
          {
            title: 'GRE',
            con: 'GRE规定如何用一种网络协议去封装另一种网络协议的方法。GRE协议的主要用途有两个：企业内部协议封装和私有地址封装'
          },
          {
            title: '启用',
            con: '勾选后启用GRE功能'
          },
          {
            title: '远端IP地址',
            con: '输入GRE隧道的远端真实IP地址'
          },
          {
            title: '本地IP地址',
            con: '设置本地IP地址'
          },
          {
            title: '本地虚拟IP地址',
            con: '设置GRE隧道的本地隧道IP地址'
          },
          {
            title: '子网掩码',
            con: '设置本地子网掩码'
          },
          {
            title: '对端虚拟IP地址',
            con: '输入GRE隧道的远端隧道IP地址'
          },
          {
            title: '全局流量转发',
            con: '勾选后启用这个功能，所有数据流量都会通过GRE隧道发送'
          },
          {
            title: '远端子网',
            con: '输入GRE隧道的远端子网IP地址'
          },
          {
            title: '远端子网掩码',
            con: '输入GRE隧道的远端子网掩码'
          },
          {
            title: '最大传输单元',
            con: '最大传输单元。在给定的网络环境中可传输的数据包最大长度的标志符。合法值：64-1500'
          },
          {
            title: '密钥',
            con: '设置GRE隧道密钥'
          },
          {
            title: '启用NAT',
            con: '勾选后为GRE启用NAT穿越。在NAT环境中，必须启用这个选项'
          }
        ]
      },
      l2tp: {
        title: 'L2TP',
        l2tptitle: 'L2TP设置',
        tbltitle: 'L2TP',
        enable: '启用',
        remoteip: '远端IP地址',
        hostname: '隧道名称',
        user: '用户名',
        password: '密码',
        auth: '认证类型',
        auth0: '自动',
        auth1: 'PAP',
        auth2: 'CHAP',
        auth3: 'MS-CHAP V1',
        auth4: 'MS-CHAP V2',
        defaultroute: '全局流量转发',
        remotesubnet: '远端子网',
        remotemask: '远端子网掩码',
        enabletunnel: '启用隧道认证',
        key: '密钥',
        advance: '显示高级选项',
        localip: '本地IP地址',
        peerip: '对端IP地址',
        enablenat: '启用网络地址转换（NAT）',
        enablemppe: '启用MPPE',
        accomp: '地址/控制压缩',
        ccomp: '协议字段压缩',
        asyncmap: 'Asyncmap值',
        mru: '最大接收单元（MRU）',
        mtu: '最大传输单元（MTU）',
        interval: '链路检测间隔时间 (秒)',
        retry: '最大重连次数',
        opts: '专家选项',
        tip: [
          {
            title: 'L2TP',
            con: 'L2TP是一种工业标准的Internet隧道协议，功能大致和PPTP协议类似，比如同样可以对网络数据流进行加密'
          },
          {
            title: '启用',
            con: '勾选后启用L2TP功能'
          },
          {
            title: '远端IP地址',
            con: '输入L2TP服务器的公网IP地址或域名'
          },
          {
            title: '用户名',
            con: '输入L2TP服务器的提供的用户名'
          },
          {
            title: '密码',
            con: '输入L2TP服务器提供的密码'
          },
          {
            title: '认证类型',
            con: '从"自动","PAP","CHAP","MS-CHAPv1"和"MS-CHAPv2"中选择。L2TP客户端应该和L2TP服务器端选择的认证类型一致。当选择“自动”时，路由器会根据服务器的认证类型自动选择正确的认证类型。'
          },
          {
            title: '全局流量转发',
            con: '勾选启用后，所有数据流量都会通过L2TP隧道发送'
          },
          {
            title: '远端子网',
            con: '输入L2TP远端保护的子网地址'
          },
          {
            title: '远端子网掩码',
            con: '输入L2TP远端保护的子网的子网掩码'
          },
          {
            title: '密钥',
            con: '输入L2TP隧道密码'
          },
          {
            title: '显示高级选项',
            con: '勾选后显示L2TP客户端高级设置'
          },
          {
            title: '本地IP地址',
            con: '设置L2TP客户端的隧道IP地址。可以输入L2TP服务器分配的IP地址。不填意味着L2TP客户端将从L2TP服务器的IP地址池中自动获取IP地址'
          },
          {
            title: '对端IP地址',
            con: '输入L2TP服务器隧道IP地址'
          },
          {
            title: '启用网络地址转换（NAT)',
            con: '点击后启用L2TP的NAT穿越功能'
          },
          {
            title: '启用MPPE',
            con: '启用MPPE加密'
          },
          {
            title: '地址/控制压缩',
            con: '用于PPP初始化。一般保持默认'
          },
          {
            title: '协议字段压缩',
            con: '用于PPP初始化。一般保持默认'
          },
          {
            title: 'Asyncmap 值',
            con: 'PPP协议初始化字符串之一。合法值：0-ffffffff一般没必要改变这个值'
          },
          {
            title: '最大接收单元（MRU)',
            con: '最大接收单元。在给定的网络环境中可接收的数据包最大长度的标志符。合法值：64-1500'
          },
          {
            title: '最大传输单元（MTU）',
            con: '最大传输单元。在给定的网络环境中可传输的数据包最大长度的标志符。合法值：128-1500'
          },
          {
            title: '链路检测间隔时间（秒）',
            con: '为了检测隧道的链接，客户端和服务器周期性地给彼此发送PPP回应。如果在指定时间内，客户端或服务器接收不到对端PPP回应，它会重传PPP回应。如果超过最大重连次数，服务器或客户端还没从对端接收到答复，将会判定L2TP隧道断掉了，会尝试再次和对端建立连接。合法值：0-600'
          },
          {
            title: '最大重连次数',
            con: '指定L2TP链接检测失败最大的重试次数。合法值：0-10'
          },
          {
            title: '专家选项',
            con: '可以在此字段中输入一些其他PPP初始化的字符串。每个字符串用分号隔开'
          }
        ]
      },
      pptp: {
        title: 'PPTP',
        pptptitle: 'PPTP设置',
        tbltitle: 'PPTP',
        enable: '启用',
        remoteip: '远端IP地址',
        user: '用户名',
        password: '密码',
        auth: '认证类型',
        auth0: '自动',
        auth1: 'PAP',
        auth2: 'CHAP',
        auth3: 'MS-CHAP V1',
        auth4: 'MS-CHAP V2',
        remotesubnet: '远端子网',
        remotemask: '远端子网掩码',
        advance: '显示高级选项',
        localip: '本地IP地址',
        peerip: '对端IP地址',
        enablenat: '启用NAT',
        enablemppe: '启用MPPE',
        defaultroute: '全局流量转发',
        accomp: '地址/控制压缩',
        ccomp: '协议字段压缩',
        asyncmap: 'Asyncmap值',
        mru: '最大接收单元（MRU）',
        mtu: '最大传输单元（MTU）',
        interval: '链路检测间隔时间 (秒)',
        retry: '最大重连次数',
        opts: '专家选项',
        tip: [
          {
            title: 'PPTP',
            con: '该协议是在PPP协议的基础上开发的一种新的增强型安全协议，支持多协议虚拟专用网（VPN),可以通过密码身份验证协议(PAP),可扩展身份验证协议(EAP)等方法增强安全性'
          },
          {
            title: '启用',
            con: '启用PPTP客户端。最多可建立三个虚拟隧道'
          },
          {
            title: '远端IP地址',
            con: '输入PPTP服务器的公网IP或域名'
          },
          {
            title: '用户名',
            con: '输入PPTP服务器提供的用户名'
          },
          {
            title: '密码',
            con: '输入PPTP服务器提供的密码'
          },
          {
            title: '认证类型',
            con: '从"自动","PAP","CHAP","MS-CHAPv1"和"MS-CHAPv2"中选择。PPTP客户端应该 和PPTP服务器端选择的认证类型一致。选择“自动”时，路由器会根据服务器的认证类型自动选择正确的认证类型'
          },
          {
            title: '全局流量转发',
            con: '勾选后启用这个功能，所有数据流量都会通过PPTP隧道发送'
          },
          {
            title: '远端子网',
            con: '设置PPTP对端子网'
          },
          {
            title: '远端子网掩码',
            con: '输入PPTP对端的子网掩码'
          },
          {
            title: '显示高级选项',
            con: '点击后显示高级选项'
          },
          {
            title: '本地IP地址',
            con: '设置PPTP客户端的隧道IP地址。可以输入PPTP服务器分配的IP地址。不填意味着PPTP客户端将从PPTP服务器的IP地址池中自动获取IP地址'
          },
          {
            title: '对端IP地址',
            con: '输入PPTP服务器隧道IP地址'
          },
          {
            title: '启用NAT',
            con: '勾选后启用NAT穿越功能'
          },
          {
            title: '启用MPPE',
            con: '勾选后启用MPPE加密'
          },
          {
            title: '地址/控制压缩',
            con: '用于PPP初始化。一般保持默认'
          },
          {
            title: '协议字段压缩',
            con: '用于PPP初始化。一般保持默认'
          },
          {
            title: 'Asyncmap 值',
            con: 'PPP协议初始化字符串之一。一般没必要改变这个值'
          },
          {
            title: '最大接收单元（MRU)',
            con: '最大接收单元。在给定的网络环境中可接收的数据包最大长度的标志符。合法值：64-1500'
          },
          {
            title: '最大传输单元（MTU）',
            con: '最大传输单元。在给定的网络环境中可传输的数据包最大长度的标志符。合法值：128-1500'
          },
          {
            title: '链路检测间隔时间（秒）',
            con: '为了检测隧道的链接，客户端和服务器周期性地给彼此发送PPP回应。如果在指定时间内，客户端或服务器接收不到对端PPP回应，它会重传PPP回应。如果超过最大重连次数，服务器或客户端还没从对端接收到答复，将会判定PPTP隧道断掉了，会尝试再次和对端建立连接。合法值：0-600'
          },
          {
            title: '最大重连次数',
            con: '指定PPTP链接检测失败最大的重试次数。合法值：0-10'
          },
          {
            title: '专家选项',
            con: '可以在此字段中输入一些其他PPP初始化的字符串。每个字符串用分号隔开'
          }
        ]
      },
      client: {
        title: 'OpenVPN客户端',
        clienttitle: 'OpenVPN 客户端设置',
        openvpntitle: 'OpenVPN 客户端',
        enable: '启用',
        protocol: '协议',
        port: '端口',
        udp: 'UDP',
        tcpclient: 'TCP',
        remoteip: '远端地址',
        "interface": '网络接口',
        tun: 'tun',
        tap: 'tap',
        authentication: '认证类型',
        none: '无',
        preshared: '共享静态密钥',
        userpsw: '用户名/密码',
        cert: '单独客户端证书认证',
        usercert: '用户名/密码+证书认证',
        localip: '本地IP',
        remotevip: '远程IP',
        localmask: '子网掩码',
        username: '用户名',
        password: '密码',
        enablenat: '启用NAT',
        defaultroute: '全局流量转发',
        tlsauthen: '启用TLS认证',
        compress: '精简模式',
        lzo: 'LZO',
        pinterval: 'ping间隔（秒）',
        prestart: 'ping重试（秒）',
        cipher: '加密模式',
        bfcbc: 'BF-CBC',
        descbc: 'DES-CBC',
        desede: 'DES-EDE3-CBC',
        aes128: 'AES-128-CBC',
        aes192: 'AES-192-CBC',
        aes256: 'AES-256-CBC',
        mtu: '最大传输单元（MTU）',
        fragment: '最大帧长',
        loglevel: '日志信息级别',
        error: '错误',
        warning: '提示',
        notice: '注意',
        debug: '调试',
        expertoptions: '专家选项',
        remoteroute: '本地路由',
        remotesubnet: '子网',
        remotemask: '子网掩码',
        authmode: '认证模式',
        md5: 'MD5',
        sha1: 'SHA1',
        sha256: 'SHA256',
        sha512: 'SHA512',
        tlsauth: 'TLS Auth',
        tlscrypt: 'TLS Crypt',
        configmode: '配置方式',
        configmode1: '界面配置',
        configmode2: '文件配置',
        configfile: '配置文件',
        tip: [
          {
            title: '启用',
            con: '启用OpenVPN客户端，最多可建立3条隧道'
          },
          {
            title: '协议',
            con: '根据应用需求，从"UDP"和"TCP"中选择'
          },
          {
            title: '远端地址',
            con: '输入远端OpenVPN服务器IP地址或域名'
          },
          {
            title: '端口',
            con: '输入远端OpenVPN服务器的监听端口。合法值：1-65535'
          },
          {
            title: '网络接口',
            con: '从"tun"和"tap"这两种不同的OPENVPN设备接口中选择。Tun与tap的不同之处是:tun设备是网络层点到点的虚拟设备，tap是以太链路层的虚拟设备'
          },
          {
            title: '认证类型',
            con: '从“无”、“共享静态密钥”、“用户名/密码”、“单客户端证书认证”和“用户/密码+证书认证中选择'
          },
          {
            title: '本地IP',
            con: '设置OpenVPN隧道的本地隧道地址'
          },
          {
            title: '远程 IP',
            con: '输入OpenVPN隧道的远程隧道地址'
          },
          {
            title: '全局流量转发',
            con: '勾选后启用这个功能，所有数据流量都会通过OpenVPN隧道发送'
          },
          {
            title: '启用TLS认证',
            con: '勾选后启用TLS认证功能'
          },
          {
            title: '用户名',
            con: '输入OpenVPN服务器提供的用户名'
          },
          {
            title: '密码',
            con: '输入OpenVPN服务器提供的密码'
          },
          {
            title: '启用NAT',
            con: '勾选后启用NAT穿越的功能。在NAT环境中必须启用该功能'
          },
          {
            title: '精简模式',
            con: '选择"LZO"使用LZO压缩库来压缩数据流'
          },
          {
            title: 'Ping间隔（秒）',
            con: '设置ping时间间隔，以检查隧道是否断开。合法值：10-1800'
          },
          {
            title: 'Ping重试（秒）',
            con: '如果在这段时间内一直超时，将重新建立OpenVPN隧道。合法值：60-3600'
          },
          {
            title: '加密模式',
            con: '从"NONE","BF-CBC","DE-CBC","DES-EDE3-CBC","AES-128-CBC","AES-192-CBC"和"AES-256-CBC"中选择加密算法。和服务器匹配'
          },
          {
            title: '最大传输单元（MTU）',
            con: '最大传输单元。在给定的网络环境中可传输的数据包最大长度的标志符。合法值：128-1500'
          },
          {
            title: '最大帧长',
            con: '设置传输的最大帧长度。合法值：128-1500'
          },
          {
            title: '日志信息级别',
            con: '从低到高选择输出日志级别："错误","提示","注意","调试".级别越高输出的日志信息越多'
          },
          {
            title: '专家选项',
            con: '可以在此字段中输入一些其他PPP初始化的字符串。每个字符串用分号隔开'
          },
          {
            title: '本地路由',
            con: ''
          },
          {
            title: '子网',
            con: '设置本地路由子网'
          },
          {
            title: '子网掩码',
            con: '设置本地路由子网掩码'
          }
        ]
      },
      server: {
        title: 'OpenVPN服务器',
        serverlabel: 'OpenVPN服务器设置',
        enable: '启用',
        protocol: '协议',
        port: '端口',
        udp: 'UDP',
        tcpclient: 'TCP',
        listenip: '监听IP',
        "interface": '网络接口',
        tun: 'tun',
        tap: 'tap',
        authentication: '认证类型',
        none: '无',
        preshared: '共享静态密钥',
        userpsw: '用户名/密码',
        cert: '多客户端证书认证',
        usercert: '用户名/密码+证书认证',
        localip: '本地IP',
        remotevip: '远程IP',
        localmask: '子网掩码',
        clientip: '客户端子网',
        clientmask: '客户端子网掩码',
        renegotiation: '重新协商时间间隔（秒）',
        maxclient: '最大用户数',
        enablenat: '启用NAT',
        defaultroute: '全局流量转发',
        tlsauthen: '启用TLS认证',
        crl: '启用证书吊销列表',
        clienttoclient: '启用客户端到客户端',
        clientup: '启用多用户使用同一证书',
        compress: '精简模式',
        lzo: 'LZO',
        pinterval: 'ping间隔',
        prestart: 'ping重试',
        cipher: '加密模式',
        bfcbc: 'BF-CBC',
        descbc: 'DES-CBC',
        desede: 'DES-EDE3-CBC',
        aes128: 'AES-128-CBC',
        aes192: 'AES-192-CBC',
        aes256: 'AES-256-CBC',
        mtu: '最大传输单元（MTU）',
        fragment: '最大帧长',
        loglevel: '日志信息级别',
        error: '错误',
        warning: '提示',
        notice: '注意',
        debug: '调试',
        expertoptions: '专家选项',
        routetitle: '本地路由',
        remotesubnet: '子网',
        remotemask: '子网掩码',
        usertitle: '账号',
        useruser: '用户名',
        userpassword: '密码',
        name: '名称',
        authmode: '认证模式',
        md5: 'MD5',
        sha1: 'SHA1',
        sha256: 'SHA256',
        sha512: 'SHA512',
        tlsauth: 'TLS Auth',
        tlscrypt: 'TLS Crypt',
        configmode: '配置方式',
        configmode1: '界面配置',
        configmode2: '文件配置',
        configfile: '配置文件',
        tip: [
          {
            title: '启用',
            con: '勾选后启用OpenVPN服务器隧道'
          },
          {
            title: '协议',
            con: '根据应用需求，从"UDP"和"TCP"客户端中选择'
          },
          {
            title: '端口',
            con: '输入监听端口。合法值：1-65535'
          },
          {
            title: '监听IP',
            con: '可以输入移动广域网，以太广域网或以太局域网的IP地址。不填代表所有当前活跃的广域网链接、移动广域网或以太广域网'
          },
          {
            title: '网络接口',
            con: '从"tun"和"tap"这两种不同的OPENVPN设备接口中选择。Tun与tap的不同之处是:tun设备是网络层点到点的虚拟设备，tap是以太链路层的虚拟设备。'
          },
          {
            title: '认证类型',
            con: '从“无”、“共享静态密钥”、“用户名/密码”、“多客户端用户认证”和“用户/密码+证书认证”'
          },
          {
            title: '本地IP',
            con: 'OpenVPN的隧道的本地隧道地址'
          },
          {
            title: '远程IP',
            con: 'OpenVPN的隧道的对端隧道地址'
          },
          {
            title: '客户端子网',
            con: '客户端的本地子网IP地址'
          },
          {
            title: '客户端子网掩码',
            con: '客户端的本地子网掩码'
          },
          {
            title: '重新协商时间间隔（秒）',
            con: '重新协商时间间隔。合法值：0-86400'
          },
          {
            title: '最大用户数',
            con: '最大客户端数量。合法值：1-20'
          },
          {
            title: '启用证书吊销列表',
            con: '启用证书吊销列表'
          },
          {
            title: '启用客户端到客户端',
            con: '允许客户端之间互相访问'
          },
          {
            title: '启用多用户使用同一证书',
            con: '允许多个用户使用同一个证书'
          },
          {
            title: '启用NAT',
            con: '勾选后启用NAT穿越功能。在NAT环境中必须启用该功能'
          },
          {
            title: '精简模式',
            con: '选择"LZO"使用LZO压缩库来压缩数据流'
          },
          {
            title: 'ping间隔',
            con: '设置检查隧道是否断开的ping时间间隔。合法值：10-1800'
          },
          {
            title: 'Ping重试（秒）',
            con: '设置链路断开超时时间。合法值：60-3600'
          },
          {
            title: '加密模式',
            con: '从"NONE","BF-CBC","DES-CBC","DES-EDE3-CBC","AES-128-CBC","AES-192-CBC"和"AES-256-CBC"中选择加密算法'
          },
          {
            title: '最大传输单元（MTU）',
            con: '最大传输单元。在给定的网络环境中可传输的数据包最大长度的标志符。合法值：64-1500'
          },
          {
            title: '最大帧长',
            con: '设置传输的最大帧长度。合法值：64-1500'
          },
          {
            title: '日志信息级别',
            con: '从低到高选择输出日志级别：“错误”、“提示”、“注意”、“调试”。级别越高输出的日志信息越多'
          },
          {
            title: '专家选项',
            con: '可以在此字段中输入一些其他PPP初始化的字符串。每个字符串用分号隔开'
          },
          {
            title: '本地路由',
            con: ''
          },
          {
            title: '子网',
            con: 'OpenVPN服务器到客户端的路由，一般填写客户端实际通讯的子网'
          },
          {
            title: '子网掩码',
            con: 'OpenVPN服务器到客户端的路由的子网掩码，一般填写客户端实际通讯的子网掩码'
          },
          {
            title: '账号',
            con: ''
          },
          {
            title: '用户名',
            con: '设置OpenVPN客户端使用用户名、密码方式验证登陆'
          },
          {
            title: '密码',
            con: '设置OpenVPN客户端使用用户名、密码方式验证登陆'
          }
        ]
      },
      certifications: {
        title: '证书管理',
        servertitle: 'OpenVPN服务器',
        serverlabel: 'OpenVPN 服务器',
        serverca: 'CA证书',
        serverpublic: '证书',
        serverprivate: '私钥',
        serverdh: 'DH',
        serverta: 'TA',
        servercrl: '证书吊销列表',
        serverstatic: '预共享密钥',
        clienttitle: 'OpenVPN客户端',
        clientlabel: 'OpenVPN 客户端',
        clientca: 'CA证书',
        clientpublic: '证书',
        clientprivate: '私钥',
        clientdh: 'DH',
        clientta: 'TA',
        tlscrypt: 'TLS Crypt',
        clientstatic: '预共享密钥',
        clientpkcs: 'PKCS12',
        ipsectitle: 'IPsec',
        ipsecca: 'CA证书',
        ipsecpublic: '本地证书',
        ipsecpublicserver: '远端证书',
        ipsecprivate: '私钥',
        ipseccrl: '证书吊销列表',
        ipsecservertitle: 'IPsec服务器',
        local_crt: '客户端密钥',
        tip: [
          {
            title: '证书管理',
            con: '从电脑导入证书/密钥文件到路由器或导出证书/密钥文件到电脑'
          },
          {
            title: 'OpenVPN客户端',
            con: ''
          },
          {
            title: 'CA 证书',
            con: '导入/导出根证书文件'
          },
          {
            title: '公钥',
            con: '导入/导出公钥文件'
          },
          {
            title: '私钥',
            con: '导入/导出私钥文件'
          },
          {
            title: 'TA',
            con: '导入/导出TA密钥文件'
          },
          {
            title: '预共享密钥',
            con: '导入/导出预共享密钥文件'
          },
          {
            title: 'PKCS12',
            con: '导入/导出PKCS12证书文件'
          },
          {
            title: 'OpenVPN服务器',
            con: ''
          },
          {
            title: 'CA 证书',
            con: '导入/导出根证书文件'
          },
          {
            title: '公钥',
            con: '导入/导出公钥文件'
          },
          {
            title: '私钥',
            con: '导入/导出私钥文件'
          },
          {
            title: 'DH',
            con: '导入/导出DH秘钥交换文件'
          },
          {
            title: 'TA',
            con: '导入/导出TA密钥文件'
          },
          {
            title: '证书吊销列表',
            con: '导入/导出证书吊销列表'
          },
          {
            title: '预共享密钥',
            con: '导入/导出预共享密钥文件'
          },
          {
            title: 'IPsec',
            con: ''
          },
          {
            title: 'CA 证书',
            con: '导入/导出根证书文件'
          },
          {
            title: '客户端密钥',
            con: '导入/导出客户端密钥文件'
          },
          {
            title: '服务端密钥',
            con: '导入/导出服务端密钥证书'
          },
          {
            title: '私钥',
            con: '导入/导出私钥文件'
          },
          {
            title: '证书吊销列表',
            con: '导入/导出证书吊销列表'
          },
          {
            title: 'IPsec 服务器',
            con: ''
          },
          {
            title: 'CA证书',
            con: '导入/导出根证书文件'
          },
          {
            title: '客户端密钥',
            con: '导入/导出客户端密钥文件'
          },
          {
            title: '私钥',
            con: '导入/导出私钥文件'
          },
          {
            title: '证书吊销列表',
            con: '导入/导出证书吊销列表'
          }
        ]
      },
      wireguard: {
        title: 'WireGuard',
        tblTitle: 'WireGuard',
        enable: '启用',
        name: '接口名称',
        customPrivateKey: '自定义私钥',
        privateKey: '私钥',
        publicKey: '公钥',
        privateKeySameTip: '不同接口的私钥不能一致',
        ipAddressSameTip: '当前WireGuard接口与WireGuard_{}接口的IP地址不能完全一致',
        ipAddressSameSubnetTip: '当前WireGuard接口与WireGuard_{}接口的IP地址不能在同一个网段',
        address: 'IP地址',
        listenPort: '监听端口',
        port: '端口',
        dns: 'DNS',
        mtu: 'MTU',
        edit: '编辑',
        peersTable: 'Peer 表格',
        peerName: 'Peer 名称',
        allowedIps: '允许IP',
        endpoint: '端点地址',
        endport: '端点端口',
        keepalive: '保活间隔',
        psk: 'PSK',
        peerDeleteTip: '是否删除{}',
        routeEnable: '路由允许IP',
        peerAllowIpSameTip: '当前Peer的允许IP与WireGuard_{id}接口的{peerName}的允许IP存在冲突',
        ipAddressSpecialTip: '不能输入0.0.0.0/0',
        tip: [
          {
            title: 'WireGuard',
            con: '配置WireGuard接口可以启用路由器的WireGuard功能，最大支持设置三组WireGuard接口。',
          },
          {
            title: '启用',
            con: '启用后可使用WireGuard接口',
          },
          {
            title: '接口名称',
            con: '显示系统自动生成的WireGuard接口名称。',
          },
          {
            title: '自定义私钥',
            con: '开启自定义私钥时，可在输入框中进行私钥配置\n关闭自定义私钥时，显示系统通过内置算法自动生成的私钥。',
          },
          {
            title: '私钥',
            con: '开启自定义私钥后可以手动配置私钥，若有需求做私钥管理可以使用该配置。',
          },
          {
            title: '公钥',
            con: '当自定义私钥开启时，公钥将在输入私钥并保存配置后自动生成。当自定义私钥关闭时，公钥跟随系统出厂时自动生成。',
          },
          {
            title: 'IP地址',
            con: '配置该接口关联的IP地址',
          },
          {
            title: '监听端口',
            con: '配置WireGuard接口的监听端口。监听端口用于监听WireGuard数据包和作为对应WireGuard接口的数据转发端口。',
          },
          {
            title: 'DNS',
            con: '配置WireGuard接口的DNS服务器，当对端无公网IP时，需要搭建中转DNS服务器时使用。',
          },
          {
            title: 'MTU',
            con: '配置WireGuard接口的MTU值',
          },
          {
            title: 'Peer名称',
            con: '配置WireGuard VPN内的设备节点的名称，用于内部标识不同的设备节点。',
          },
          {
            title: '公钥',
            con: '配置该Peer的公钥用于通信时识别不同的peer。',
          },
          {
            title: '允许IP',
            con: '配置该Peer绑定的IP子网，格式为IP/子网，最多可以配8个子网。',
          },
          {
            title: '路由允许IP',
            con: '开启路由允许IP时，会为Allowed IP自动分配静态路由。关闭路由允许IP时，需要手动配置静态路由，否则数据无法正常发送。',
          },
          {
            title: '预配置密钥',
            con: '配置该Peer对应的预配置密钥',
          },
          {
            title: '端点地址',
            con: '配置该Peer关联的端点地址，可以是域名或者IP，若为IP，在收到该Peer数据包且端点地址存在调整时，会自动更新。',
          },
          {
            title: '端点端口',
            con: '配置该Peer关联的端点端口.',
          },
          {
            title: '保活间隔',
            con: '配置与该Peer的保活间隔，用于定期发送保活包以维持与该Peer的连接。',
          },
        ],
      },
      zerotier: {
        title: 'ZeroTier',
        labeltitle: 'ZeroTier客户端',
        labeltitle1: 'ZeroTier连接',
        name: '名称',
        networkid: 'NetworkID',
        status: '状态',
        enable: '启用',
        networkname: '网络名称',
        nodeid: 'NodeID',
        interfaceName: '接口名称',
        manageAddress: 'Allow Managed Addresses',
        ipAllocation: 'Allow Assignment of Global IPs',
        routeOverride: 'Allow Default Route Override',
        ipAddress: 'ZeroTier IP Address',
        deleteTip: '确认删除此条ZeroTier连接?',
        resetTip: '重新生成 Node ID 将重置所有 ZeroTier 网络连接，可能需要一段时间完成。',
        add:"添加ZeroTier连接",
        edit:"编辑ZeroTier连接",
        disabled: '未启用',
        connecting: '正在连接',
        connFailTip: '连接失败',
        connSuccessTip: '已连接',
        connGettingTip: '正在请求网络配置',
        connAuthTip: '需要进行身份验证',
        connAccessDeniedTip: '访问被拒绝，可能由于权限不足或其他安全原因',
        connNetworkNotFoundTip: '网络不存在',
        connPortErrorTip: '端口错误',
        connClientVersionOldTip: '客户端版本过旧，需更新到最新版本',
        connDisconnectTip: '断开连接',
        onlyHex16Tip: '仅允许输入16位十六进制字符串',
        networkiderror:"不允许连接重复的网络ID",
        refresh: '刷新',
        nodeidStatus: {
          generating: '更新中',
          generateFailed: '更新失败',
          generateSuccess: '更新成功',
        },
        tip:[
          {
            title: '名称',
            con: '自定义的网络ID连接名称，用于标识网络。'
          },
          {
            title: 'NetworkID',
            con: '标识设备可以加入的虚拟ZeroTier网络。'
          },
          {
            title: '状态',
            con: '设备与ZeroTier VPN服务器之间的连接状态。'
          },
          {
            title: '启用',
            con: '启用后，对应的ZeroTier连接将立即应用。'
          },
          {
            title: 'NodeID',
            con: 'ZeroTier地址，在设备上安装ZeroTier客户端首次启动时会自动创建。此ID作为ZeroTier网络中的唯一标识，用于进行网络管理、路由、通信和安全验证操作。'
          },
          {
            title: '接口名称',
            con: 'ZeroTier客户端的虚拟化网络接口名称，由网络ID程序自动生成。'
          },
          {
            title: 'Allow Managed Addresses',
            con: '允许或禁止ZeroTier控制器为设备分配IP地址和配置路由，以简化网络配置并提高网络管理的效率。启用时，设备将自动被分配虚拟IP地址以及推送路由信息。禁用时，需设置虚拟IP地址，且控制器推送的路由信息将不再生效。'
          },
          {
            title: 'ZeroTier IP Address',
            con: '当禁用Allow Managed时，需要配置该项作为设备的虚拟IP地址。'
          },
          {
            title: 'Allow Assignment of Global IPs',
            con: '允许或禁止使用ZeroTier控制器下发的公网IP地址。若ZeroTier下发公网IP地址，仅在启用状态下可用。'
          },
          {
            title: 'Allow Default Route Override',
            con: '允许或禁止设备在连接到ZeroTier网络时覆盖默认路由设置，以便更好地管理和优化网络流量。'
          },
        ]
      },
    },
    ippassthrough: {
      title: 'IP 穿透',
      enable: '启用',
      mode: '穿透模式',
      mac: 'MAC',
      tip: [
        {
          title: '启用',
          con: '启用 IP 穿透'
        },
        {
          title: '穿透模式',
          con: '设置穿透模式，可选择“DHCPS-Fixed”、“DHCPS-Dynamic”'
        },
        {
          title: 'MAC',
          con: '设置MAC地址'
        },
        {
          title: '保存',
          con: '配置生效，需要手动重启'
        }
      ]
    },
    routing: {
      title: '路由',
      routes: {
        title: '静态路由',
        labeltitle: '静态路由',
        dst: '目的网络',
        netmask: '子网掩码/前缀长度',
        ifn: '接口',
        gateway: '网关',
        distance: '距离',
        tip: [
          {
            title: '目的网络',
            con: '输入需要到达的目的IP地址'
          },
          {
            title: '子网掩码/前缀长度',
            con: '输入需要到达的目的地址的子网掩码/前缀长度'
          },
          {
            title: '接口',
            con: '数据到达目的网络使用的接口'
          },
          {
            title: '网关',
            con: '输入数据在到达目的地址前，需要经过的下一个路由器IP地址'
          },
          {
            title: '距离',
            con: '即优先权，数值越小优先级越高。合法值：1-255'
          }
        ]
      },
      rip: {
        title: 'RIP',
        riplabel: 'RIP设置',
        enable: '启用',
        update: '更新定时器',
        seconds: '秒',
        timeout: '超时定时器',
        garbage: '清除定时器',
        version: '版本',
        "default": '默认',
        originate: '缺省信息发布',
        metric: '缺省度量',
        rediconn: '重分发直连路由',
        redimetric: '重分发路由度量',
        redistatic: '重分发静态路由',
        redistaticc: '重分发路由度量',
        rediospd: '重分发OSPF路由',
        rediospf: '重分发路由度量',
        advance: '显示高级选项',
        dismgttitle: '距离/度量管理',
        dismobiletitle: '距离管理',
        metmgttitle: '度量管理',
        distance: '距离',
        disip: 'IP地址',
        dismask: '子网掩码',
        disacl: '访问列表名',
        metmetric: '重分发路由度量',
        metdir: '出/入过滤策略',
        metifn: '接口',
        metacl: '访问列表名',
        filterttitle: '路由过滤策略',
        fptype: '策略类型',
        fname: '策略名',
        fdir: '出/入过滤策略',
        finterface: '接口',
        psvtitle: '被动接口',
        psvifn: '被动接口',
        ifntitle: '接口',
        ifninterface: '接口',
        ifnsver: 'RIP发送版本',
        ifnrver: 'RIP接收版本',
        ifnsplit: '水平分割/毒性翻转',
        ifnauth: '认证方式',
        ifnauthkey: '密钥',
        ifnauthkeychain: '密钥链',
        neighbortitle: '邻居',
        neighborip: 'IP地址',
        networktitle: '网络',
        networkip: 'IP地址',
        networkmask: '子网掩码',
        tip: [
          {
            title: '启用',
            con: '启用/关闭RIP'
          },
          {
            title: '更新定时器',
            con: '定义了发送路由更新的时间间隔， 合法值：5-2147483647，单位：秒'
          },
          {
            title: '超时定时器',
            con: '定义了路由老化时间。如在老化时间内没有收到关于某条路由的更新报文，则该条路由在路由表中的度量值将会被设置为16.合法值：5-2147483647，单位：秒'
          },
          {
            title: '清除定时器',
            con: '定义一条路由从度量值变为16开始，直到它从路由表里被删除所经过的时间。在Garbage-Collect 时间内，RIP以16作为度量值向外发送这条路由的更新，如Garbage-Collect 超时，该路由仍没有得到更新，则该 路由将从路由表中被彻底删除 合法值：5-2147483647，单位：秒'
          },
          {
            title: '版本',
            con: 'RIP的版本号，用户可选择：默认，v1,v2'
          },
          {
            title: '缺省信息发布',
            con: '启用后将发布缺省信息'
          },
          {
            title: '缺省度量',
            con: '本路由器到达目的地的缺省开销。合法值：0-16'
          },
          {
            title: '重分发直连路由',
            con: '点选启用'
          },
          {
            title: '重分发路由度量',
            con: '启用重分发直连路由后，此项用于设置分发直连路由的路由度量。合法值：0-16'
          },
          {
            title: '重分发静态路由',
            con: '点选启用'
          },
          {
            title: '重分发路由度量',
            con: '启用分发静态路由后，此项用于设置分发静态路由的路由度量。合法值：0-16'
          },
          {
            title: '重分发OSPF路由',
            con: '点选启用'
          },
          {
            title: '重分发路由度量',
            con: '启用OSPF路由后，此项用于设置分发动态路由的路由度量。合法值：0-16'
          },
          {
            title: '显示高级选项',
            con: '勾选后显示高级选项'
          },
          {
            title: '距离/度量管理',
            con: ''
          },
          {
            title: '距离',
            con: '设置学习到的某条RIP路由的管理距离。合法值：1-255'
          },
          {
            title: 'IP地址',
            con: '需要设置的RIP路由的IP地址'
          },
          {
            title: '子网掩码',
            con: '需要设置的RIP路由的子网掩码'
          },
          {
            title: '访问列表名',
            con: '设置某条路由引用的访问策略'
          },
          {
            title: '重分发路由度量',
            con: '设置接口收到或发送路由的度量值。合法值：0-16'
          },
          {
            title: '出/入过滤策略',
            con: '用户可选择：in/out。in: 进入路由器的时候访问列表配置生效；Out: 出路由器的时候访问列表配置生效'
          },
          {
            title: '接口',
            con: '选择路由的接口'
          },
          {
            title: '访问列表名',
            con: '用户配置的路由策略的访问列表名称'
          },
          {
            title: '路由过滤策略',
            con: ''
          },
          {
            title: '策略类型',
            con: '用户可选择：access-list, prefix-list'
          },
          {
            title: '策略名',
            con: '用户配置的前缀列表名'
          },
          {
            title: '出/入过滤策略',
            con: '用户可选择：in, out'
          },
          {
            title: '接口',
            con: '用户可选择：cellular0,FE1,FE0'
          },
          {
            title: '被动接口',
            con: '接口只接收RIP报文，不发送RIP报文'
          },
          {
            title: '被动接口',
            con: '用户可选择 cellular0,FE1,FE0'
          },
          {
            title: '接口',
            con: ''
          },
          {
            title: '接口',
            con: '用户可选择：cellular0,FE1,FE0'
          },
          {
            title: 'RIP发送版本',
            con: '用户可选择：默认、v1、v2'
          },
          {
            title: 'RIP接收版本',
            con: '用户可选择：默认、v1、v2'
          },
          {
            title: '水平分割/毒性翻转',
            con: '用户可选择: enable, disable'
          },
          {
            title: '认证方式',
            con: '用户可选择：text, md5'
          },
          {
            title: '密钥',
            con: 'RIPV2报文交互时候使用的验证密钥'
          },
          {
            title: '密钥链',
            con: 'RIPV2报文交互时候使用的验证密钥链'
          },
          {
            title: '邻居',
            con: '配置邻居后，rip包将只发送到邻居路由器'
          },
          {
            title: 'IP地址',
            con: '手动配置的RIP邻居地址'
          },
          {
            title: '网络',
            con: ''
          },
          {
            title: 'IP地址',
            con: 'RIP需要发布出去接口的IP地址'
          },
          {
            title: '子网掩码',
            con: 'RIP需要发布出去接口的子网掩码'
          }
        ]
      },
      ospf: {
        title: 'OSPF',
        ospflabel: 'OSPF设置',
        enable: '启用',
        routerid: '路由ID',
        abrtype: 'ABR类型',
        rfccpt: 'RFC1583兼容性',
        opaque: 'OSPF可选LSA',
        spfdelay: 'SPF延时时间',
        msecond: '毫秒',
        spfholdtime: 'SPF初始化时间',
        spfmax: 'SPF最大时间',
        refbandwidth: '参考带宽',
        mbit: '兆比特',
        ifntitle: '接口',
        ifninterface: '接口',
        ifnhello: 'Hello 定时器（秒）',
        ifndead: 'Dead 定时器（秒）',
        ifnretr: '重传LSA延迟定时器（秒）',
        ifntrans: '传送LSA延迟定时器（秒）',
        interfaceadvance: '接口高级选项',
        ifnadvancetitle: '接口高级选项',
        ifntype: '网络',
        ifncost: '接口开销值',
        ifnpriority: '协议优先级',
        ifnauth: '认证方式',
        ifnkeyid: '密钥ID',
        ifnkey: '密钥',
        psvtitle: '被动接口',
        psvifn: '被动接口',
        networktitle: '网络',
        networkip: 'IP地址',
        networkmask: '子网掩码',
        networkareaid: '域ID',
        areatitle: '域',
        areaareaid: '域ID',
        areaarea: '域',
        areanosum: '禁止路由汇总',
        areaauth: '认证方式',
        areaadvance: '域高级选项',
        arearangetitle: '域地址汇总',
        arearangeip: 'IP地址',
        arearangemask: '子网掩码',
        arearangenotadv: '禁止域间路由信息',
        arearangecost: '接口开销值',
        areafiltertitle: '域过滤策略',
        areafiltertype: '路由过滤策略',
        areafilteracl: '访问列表名',
        areavlinktitle: '域间虚链路',
        areavlinkpeer: 'ABR地址',
        areavlinkauthtype: '认证方式',
        areavlinkkeyid: '密钥ID',
        areavlinkkey: '密钥',
        areavlinkhello: 'Hello定时器',
        areavlinkdead: 'Dead定时器',
        areavlinkretr: '重传LSA延迟定时器',
        areavlinktrans: '传送LSA延迟定时器',
        redistitle: '路由重分发',
        redisttype: '路由重分发类型',
        redistmetric: '指定重分发路由度量',
        redistmetrictype: '外部路由的类型',
        redistmap: '路由映射',
        redistadvance: '重分发高级选项',
        redistdefalways: '总是重分发默认路由',
        redistdefmetric: '默认路由重分发度量值',
        redistdeftype: '默认路由重分发度量类型',
        distmgttitle: '管理距离',
        distmgttype: '域类型',
        distmgtdist: '距离',
        neighbortitle: '邻居',
        neighborip: 'IP地址',
        neighborpriority: '优先级',
        neighborpoll: '间隔',
        tip: [
          {
            title: 'OSPF',
            con: 'OSPF开放最短路径优先协议是IETF组织开发的一个基于链路状态的内部网关协议'
          },
          {
            title: '启用',
            con: '启用/关闭OSPF'
          },
          {
            title: '路由ID',
            con: '始发LSA的路由器IP地址'
          },
          {
            title: 'ABR类型',
            con: '用户可选择：cisco, ibm, standard, shortcut'
          },
          {
            title: 'RFC1583兼容性',
            con: '启用/关闭'
          },
          {
            title: 'OSPF可选LSA',
            con: '启用/关闭。LSA：链路状态广播，是链接状态协议使用的一个分组，它包括有关邻居和本通道成本的信息。LSA被路由器接受用于维护它们的路由选择表'
          },
          {
            title: 'SPF 延时时间',
            con: '设置OSPF SPF 计算的延时时间。合法值：0-600000，单位：毫秒'
          },
          {
            title: 'SPF 初始化时间',
            con: '设置OSPF SPF 初始化时间。合法值：0-600000，单位：毫秒'
          },
          {
            title: 'SPF 最大时间',
            con: '设置OSPF SPF 最大时间。合法值：0-600000，单位：毫秒'
          },
          {
            title: '参考带宽',
            con: '合法值：1-4294967，单位：兆比特'
          },
          {
            title: '接口',
            con: ''
          },
          {
            title: '接口',
            con: '需要配置OSPF参数的接口，用户可选择cellular0,FE0'
          },
          {
            title: 'Hello 定时器（秒）',
            con: '发送Hello 报文的时间间隔。如果相邻两台路由器的Hello间隔时间不同，则不能建立邻居关系。合法值：1-65535'
          },
          {
            title: 'Dead 定时器（秒）',
            con: '失效时间。如果在此时间内未收到邻居发来的Hello报文，则认为邻居失效。如果相邻两台路由器的失效时间不同，则不能建立邻居关系。合法值：1-65535'
          },
          {
            title: '重传LSA延迟定时器（秒）',
            con: '路由器向它的邻居通告一条LSA后，需要对方进行确认。若在重传间隔时间内没有收到对方的确认报文，就会向邻居重传这条LSA。合法值：3-65535'
          },
          {
            title: '传送LSA延迟定时器（秒）',
            con: 'OSPF报文在链路上传送时也需要花费时间，所以LSA的老化时间（age）在传送之前要增加一定的延迟时间，在低速链路上需要对该项配置进行重点考虑。合法值：1-65535'
          },
          {
            title: '接口高级选项',
            con: ''
          },
          {
            title: '接口',
            con: '选择接口'
          },
          {
            title: '网络',
            con: '用户可选择：point-to point, broadcast, non-broadcast, point-to-multipoint'
          },
          {
            title: '接口开销值',
            con: '设置接口运行OSPF时的开销值。缺省情况下，OSPF会依据接口的带宽自动计算开销值。合法值：1-65535'
          },
          {
            title: '协议优先级',
            con: '配置路由器接口的OSPF优先级。合法值：0-255'
          },
          {
            title: '认证方式',
            con: '设置OSPF区域所使用的认证模式。如果选择Simple认证模式，则还需要配置简单认证密码以及对该密码再进行一次确认。如果选择MD5认证模式，则还需要配置MD5键值和密码以及对该 密码再进行一次确认。'
          },
          {
            title: '密钥ID',
            con: '只在选择MD5认证模式时生效，合法值：1-255'
          },
          {
            title: '密钥',
            con: 'OSPF报文交互时的验证密钥'
          },
          {
            title: '被动接口',
            con: '开启被动接口后，接口只接收不发送OSPF报文'
          },
          {
            title: '被动接口',
            con: '用户可选择: cellular0, FE0, FE1.'
          },
          {
            title: '网络',
            con: ''
          },
          {
            title: 'IP地址',
            con: '本地网络的IP地址'
          },
          {
            title: '子网掩码',
            con: '本地网络的子网掩码'
          },
          {
            title: '域ID',
            con: '始发LSA的路由器所在的区域ID'
          },
          {
            title: '域',
            con: ''
          },
          {
            title: '域ID',
            con: '设置OSPF区域的ID号（值为IP格式）'
          },
          {
            title: '域',
            con: '设置OSPF区域为Stub或NSSA区域。骨干区域（区域ID为0.0.0.0）不能被设置为Stub 或NSSA区域'
          },
          {
            title: '禁止路由汇总',
            con: '路由汇总是把一组路由汇聚为一个单个的路由广播。路由汇聚的最终结果和最明显的好处是缩小网络上的路由表的尺寸'
          },
          {
            title: '认证方式',
            con: '用户可选择：simple, md5'
          },
          {
            title: '域地址汇总',
            con: ''
          },
          {
            title: '域ID',
            con: '接口运行OSPF时所属的区域ID号'
          },
          {
            title: 'IP地址',
            con: '设置接口所在网段IP地址'
          },
          {
            title: '子网掩码',
            con: '设置接口所在网段子网掩码'
          },
          {
            title: '禁止域间路由信息',
            con: '禁止OSPF域内路由信息在不同域之间传播'
          },
          {
            title: '接口开销值',
            con: '合法值：0-16777215'
          },
          {
            title: '域过滤策略',
            con: ''
          },
          {
            title: '域ID',
            con: '选择过滤策略应用的OSPF域号'
          },
          {
            title: '路由过滤策略',
            con: '用户可选择：import, export, filter-in, filter-out'
          },
          {
            title: '访问列表名',
            con: '根据配置的访问列表名（在“路由过滤”页面配置）来控制域的路由过滤。只有在配置的访问列表里的路由才生效'
          },
          {
            title: '域间虚链路',
            con: ''
          },
          {
            title: '域ID',
            con: '设置OSPF区域的ID号'
          },
          {
            title: 'ABR地址',
            con: '连接多外区域的路由器是ABR, 配置ABR与此域连接的接口地址'
          },
          {
            title: '认证方式',
            con: '用户可选择 simple, md5'
          },
          {
            title: '密钥ID',
            con: '只在选择MD5认证模式时生效，合法值：1-15'
          },
          {
            title: '密钥',
            con: 'OSPF 报文交换时的验证密钥'
          },
          {
            title: 'Hello 定时器',
            con: '设置接口发送Hello报文的时间间隔。合法值：1-65535'
          },
          {
            title: 'Dead 定时器',
            con: '发送Hello 报文的超时时间，合法值：1-65535'
          },
          {
            title: '重传LSA延迟定时器',
            con: '当LSA传输失败后重新发送LSA的时间，合法值：1-65535'
          },
          {
            title: '传送LSA延迟定时器',
            con: 'LSA发送时的延时时间，合法值：1-65535'
          },
          {
            title: '路由重分发',
            con: ''
          },
          {
            title: '路由重分发类型',
            con: '用户可选择：connected, static, rip'
          },
          {
            title: '指定重分发路由度量',
            con: '设备发送重分发路由时指定的度量值。合法值： 0-16777214'
          },
          {
            title: '外部路由的类型',
            con: '设置引入的外部路由的路由类型。其中， Type1外部路由表示此类路由的可信度较高。Type2 外部路由表示此类路由的可信度较低。'
          },
          {
            title: '路由映射',
            con: '主要用于管理重发布的时候的路由'
          },
          {
            title: '重分发高级选项',
            con: ''
          },
          {
            title: '总是重分发默认路由',
            con: '设备启动后发送重分发默认路由'
          },
          {
            title: '默认路由重分发度量值',
            con: '发送重分发默认路由的度量值。合法值：0-16777214'
          },
          {
            title: '默认路由重分发度量类型',
            con: '用户可选择0,1,2'
          },
          {
            title: '管理距离',
            con: ''
          },
          {
            title: '域类型',
            con: '用户可选择intra-area,inter-area, external'
          },
          {
            title: '距离',
            con: '设置域学习的OSPF路由距离。合法值：1-255'
          }
        ]
      },
      filter: {
        title: '路由过滤',
        labeltitle: '访问控制列表',
        aclname: '访问列表名',
        acltype: '行动',
        aclany: '任意匹配',
        aclip: 'IP地址',
        aclmask: '子网掩码',
        prefixtitle: '前缀列表',
        prefixname: '前缀列表名',
        prefixseq: '序号',
        prefixtype: '行动',
        prefixany: '任意匹配',
        prefixip: 'IP地址',
        prefixmask: '子网掩码',
        prefixge: '大于前缀长度',
        prefixle: '小于前缀长度',
        tip: [
          {
            title: '访问控制列表',
            con: ''
          },
          {
            title: '访问列表名',
            con: '用户自定义名称，字母或下划线开头，只允许字母、数字、下划线'
          },
          {
            title: '行动',
            con: '可选permit 和deny'
          },
          {
            title: '任意匹配',
            con: '不需要再配IP地址和子网掩码'
          },
          {
            title: 'IP地址',
            con: '用户自定义'
          },
          {
            title: '子网掩码',
            con: '用户自定义'
          },
          {
            title: '前缀列表',
            con: ''
          },
          {
            title: '前缀列表名',
            con: '用户自定义名称，字母或下划线开头，只允许字母、数字、下划线'
          },
          {
            title: '序号',
            con: '一个前缀列表名可以配置多个规则，一个规则对应一个序号。合法值：1-4294967295'
          },
          {
            title: '行动',
            con: '可选permit 和deny'
          },
          {
            title: '任意匹配',
            con: '不需要再配IP地址、子网掩码、大于前缀长度、小于前缀长度'
          },
          {
            title: 'IP地址',
            con: '用户自定义'
          },
          {
            title: '子网掩码',
            con: '用户自定义'
          },
          {
            title: '大于前缀长度',
            con: '填写子网掩码的网络标示位长度，限制IP段的最小IP地址。合法值：0-32'
          },
          {
            title: '小于前缀长度',
            con: '填写子网掩码的网络标示位长度，限制IP段的最大IP地址。合法值：0-32'
          }
        ]
      }
    },
    vrrp: {
      "title": "VRRP",
      "labeltitle": "VRRP设置",
      "statustitle": "VRRP状态",
      "status": "状态",
      "enable": "启用",
      "interface": "接口",
      "routeid": "虚拟路由器ID",
      "virtualip": "虚拟IP地址",
      "priority": "优先级",
      "advertise": "通告间隔(秒)",
      "preemption": "抢占模式",
      "trackid": "Track标识",
      "error1": "端口异常",
      "icmp_period": "Ping间隔",
      "icmp_interval": "Ping重试间隔",
      "icmp_timeout": "Ping超时",
      "icmp_times": "最大重试次数",
      "dest_main": "目的地址(IPv4)",
      "dest_second": "备选目的地址(IPv4)",
      tip: [
        {
          "title": "禁用",
          "con": "VRRP功能禁用状态。"
        },
        {
          "title": "备份",
          "con": "作为备份路由器。"
        },
        {
          "title": "主路由",
          "con": "作为主路由器。"
        },
        {
          "title": "VRRP",
          "con": "VRRP将多台路由设备形成一台虚拟路由器，其中一台设备作为主路由器承担路由功能，其它为备份路由器，当主路由器的下一跳失败时，VRRP会选出一台备份路由器成为主路由器以承担路由功能。"
        },
        {
          "title": "启用",
          "con": "启用/关闭。"
        },
        {
          "title": "接口",
          "con": "设置虚拟路由器的接口。"
        },
        {
          "title": "虚拟路由器ID",
          "con": "用户自定义虚拟路由器ID，合法值：1-255"
        },
        {
          "title": "虚拟IP地址",
          "con": "设置虚拟路由器IP地址。"
        },
        {
          "title": "优先级",
          "con": "VRRP优先级的取值范围为1至254（数值越大表明优先级越高），优先级越高的设备，越有可能成为主路由器。"
        },
        {
          "title": "通告间隔（秒）",
          "con": "虚拟IP组内路由器之间的心跳报文发送时间间隔，合法值：1-255"
        },
        {
          "title": "抢占模式",
          "con": "允许优先级高的备份路由器抢占替代优先级低的主路由器成为新的主路由器。"
        },
        {
          "title": "Track标识",
          "con": "跟踪探测，选择定义过的Track标识或为空。"
        },
        {
          "title": "Ping间隔",
          "con": "路由器每隔一个Ping间隔对目的地址进行Ping探测。"
        },
        {
          "title": "Ping重试间隔",
          "con": "设置 Ping 的重试间隔时间，当 Ping 失败后，路由器每隔一个 Ping 重试间隔再重新 Ping。"
        },
        {
          "title": "Ping超时",
          "con": "发送Ping命令后等待应答的超时时间。"
        },
        {
          "title": "最大重试次数",
          "con": "连续Ping失败并达到最大重试次数，判定此次Ping探测连接失败。"
        }
      ]
    },
    ddns: {
      title: 'DDNS',
      ddns: {
        title: '动态域名',
        basetitle: '动态域名',
        name: '名称',
        "interface": '接口',
        servicetype: '服务类型',
        enable: '启用',
        username: '用户名',
        userid: '账号索引',
        password: '密码',
        server: '服务器',
        path: '服务器路径',
        hostname: '主机名',
        advance: '高级选项',
        advtitle: '高级选项',
        provider: '服务提供商',
        checkipserver: 'IP跟踪服务器',
        checkippath: 'IP跟踪服务器路径',
        checkipssl: '检测SSL',
        checkipcmd: 'IP检测命令',
        usehttps: '使用HTTPS',
        wildcard: '域名通配',
        appendmyip: '添加IP',
        other: '其他选项',
        othertitle: '其他选项',
        period: 'IP检测周期（秒）',
        verifyaddr: '地址核查',
        fakeaddr: '地址冒充',
        allowipv6: '允许IPv6',
        fupdate: '强制更新（秒）',
        securessl: '安全核查',
        capath: 'CA证书路径',
        ddns_status: 'DDNS 状态',
      },
      tip: [
        {
          title: 'DDNS',
          con: 'DDNS是将用户的动态IP地址映射到一个固定的域名解析服务上，用户每次连接网络的时候客户端程序就会通过信息传递把该主机的动态IP地址传送给位于服务商主机上的服务器程序，服务器程序负责提供DNS服务并实现动态域名解析。'
        },
        {
          title: '动态域名',
          con: ''
        },
        {
          title: '启用',
          con: '勾选后启用DDNS'
        },
        {
          title: '名称',
          con: '用户自定义DDNS的名称'
        },
        {
          title: '服务类型',
          con: '选择提供动态域名的服务商'
        },
        {
          title: '用户名',
          con: '输入申请注册动态域名的用户名'
        },
        {
          title: '账号索引',
          con: '输入自定义DDNS服务器的账号索引。'
        },
        {
          title: '密码',
          con: '输入申请注册动态域名的密码'
        },
        {
          title: '服务器',
          con: '输入自定义的DDNS服务器名称。'
        },
        {
          title: '服务器路径',
          con: '默认情况下主机名会添加到服务器路径。'
        },
        {
          title: '主机名',
          con: '输入申请的主机名'
        },
        {
          title: '添加IP',
          con: '添加当前IP到DDNS服务器更新路径。'
        }
      ]
    }
  },
  system: {
    title: '系统',
    setting: {
      title: '常规',
      general: {
        title: '常规',
        systemlabel: '系统',
        hostname: '主机名',
        timeout: '网页登录超时时间（秒）',
        accesslabel: '访问服务',
        service: '服务',
        enable: '本地访问',
        port: '端口号',
        http: 'HTTP',
        https: 'HTTPS',
        telnet: 'TELNET',
        ssh: 'SSH',
        certlabel: 'HTTPS证书',
        certificate: '证书',
        key: '密钥',
        remote: '远程访问',
        passwordencry: '明文密码加密',
        tip: [
          {
            title: '主机名',
            con: '用户可自定义路由器主机名称,以字母开头,只允许字母，数字，"-"或"_"。'
          },
          {
            title: '网页登录超时时间（秒）',
            con: '超时后需要重新登陆网页。合法值：100-3600。'
          },
          {
            title: 'HTTPS 证书',
            con: '可以导入HTTPS证书'
          },
          {
            title: '证书',
            con: '单击“浏览”从电脑中选择证书文件，再单击“导入”从电脑中导入文件到路由器；单击“导出”从路由器导出文件到电脑；单击“删除”从路由器删除文件'
          },
          {
            title: '密钥',
            con: '单击“浏览”从电脑中选择密钥文件，再单击“导入”从电脑中导入文件到路由器；单击“导出”从路由器导出文件到电脑；单击“删除”从路由器删除文件'
          },
          {
            title: '明文密码加密',
            con: '启用后设备在WEB上配置的所有带密码的参数都会以加密的方式显示，提高密码的安全性。'
          }
        ]
      },
      time: {
        title: '系统时间',
        systemlabel: '系统时间设置',
        currenttime: '当前时间',
        timezone: '时区',
        synctype: '同步类型',
        syncCellular: '从蜂窝运营商同步',
        syncCellularTip: '注：从蜂窝运营商同步的方式只有在使用蜂窝网络时才会生效。',
        "syncgps": "从GPS同步",
        "ntpserveraddress": "首选NTP服务器",
        "ntpserveraddress_secondary": "备选NTP服务器",
        syncbrowser: '从浏览器同步',
        syncmanully: '手动设置',
        syncntp: '从NTP服务器同步',
        browsertime: '浏览器时间',
        date: '日期',
        time: '时间',
        ntpserver: 'NTP服务器',
        ntpserverenable: '启用NTP服务器',
        tipsettimezone: '请设置时区',
        gpsEnableTip1: '请先',
        gpsEnable: '启用GPS',
        gpsEnableTip2: '功能',
        timezoneTip: '修改时区需重启设备后生效',
        tip: [
          {
            title: '当前时间',
            con: '显示路由器的当前时间'
          },
          {
            title: '时区',
            con: '选择本地时区，如“8 china（beijing）”'
          },
          {
            title: '同步类型',
            con: '选择时间同步类型'
          },
          {
            title: '从浏览器同步',
            con: '从浏览器同步时间'
          },
          {
            title: '手动设置',
            con: '手动设置系统时间为任意期望值'
          },
          {
            title: '从NTP服务器同步',
            con: '从NTP服务器同步时间来对网络内所有具有时钟的设备进行时钟同步'
          },
          {
            title: '从蜂窝运营商同步',
            con: '使用蜂窝网络进行驻网时，可以选择从蜂窝运营商同步的方式同步系统时间。'
          },
          {
            title: '浏览器时间',
            con: '显示浏览器的当前时间'
          },
          {
            visible: function() {
              return _.get(YS, ['UI', '_menu', '_pn', 'gps']);
            },
            tips: [{
              "title": "从GPS同步",
              "con": "同步GPS时间。"
            }]
          },
          {
            "title": "首选NTP服务器",
            "con": "输入首选NTP服务器的IP地址或者域名。"
          },
          {
            "title": "备选NTP服务器",
            "con": "输入备用NTP服务器的IP地址或者域名。"
          },
          {
            title: 'NTP服务器地址',
            con: '设置NTP 服务器地址（域名/IP）'
          },
          {
            title: '启用NTP服务器',
            con: '启用/禁用NTP服务器功能，勾选后，网络中的NTP客户端即可与路由器在时间上实现同步'
          }
        ]
      },
      email: {
        "title": "邮箱",
        "smtptitle": "SMTP",
        "settinglabel": "SMTP客户端设置",
        "enable": "启用",
        "emailaddress": "发件人邮箱地址",
        "username": "用户名",
        "password": "密码",
        "smtpserver": "SMTP服务器地址",
        "port": "端口号",
        "enabletls": "加密方式",
        "recipientlabel": "收件人",
        "recipients": "邮箱地址",
        "test": "测试",
        "testfail1": "请检查邮箱账号密码是否正确",
        "testfail2": "网络无法连接",
        "testfail3": "请检查SMTP服务器配置是否正确",
        "testfail4": "未知错误",
        "savechange": "请先保存配置",
        "testsuccess": "测试邮件已发出",
        "deleteerror": "请先在邮箱组 {} 内删除该号码",
        emailtitle: '邮箱列表',
        email: '收件人邮箱地址',
        testEmailSetting: '测试邮箱设置',
        testEmailSettingTip: '请先填写收件人邮箱地址',
        testEmailTip: '请填写正确的邮箱地址',
        description: '描述',
        emailgrouptitle: '邮箱群组',
        gid: '组别ID',
        labelist: '列表',
        labelselected: '选中的邮箱地址',
        stmpdisabled: 'SMTP未启用',
        tip: [
          {
            "title": "SMTP",
            "con": "SMTP功能支持将事件推送以电子邮件的方式发送到指定的收件人。"
          },
          {
            "title": "用户名",
            "con": "SMTP在进行身份验证时，使用用户名和密码进行校验，若用户名未配置，则使用发件人邮箱地址和密码进行身份校验。"
          },
          {
            "title": "启用",
            "con": "启用/禁用SMTP客户端功能。"
          },
          {
            "title": "邮箱地址",
            "con": "输入发件人的邮件账号。"
          },
          {
            "title": "密码",
            "con": "输入发件人的邮箱密码。"
          },
          {
            "title": "SMTP服务器地址",
            "con": "输入SMTP服务器域名。"
          },
          {
            "title": "端口号",
            "con": "输入SMTP服务器端口。合法值：1-65535"
          },
          {
            "title": "加密方式",
            "con": "选择加密方式。可选项为：None，TLS/SSL,STARTTLS。其中默认选项为STARTTLS。<br><br>选择None：不加密。在端口25上登录服务器。<br><br>选择STARTTLS：STARTTLS是一种把已经存在的一条不安全的链接, 用SSL/TLS的加密方法, 把这条不安全的连接升级成安全的连接.在端口587上登录服务器。默认登录端口为587 <br><br>TLS/SSL：SSL和TLS都提供了加密2台计算机(如服务器和客户端)之间通信的办法. TLS是SSL的继任者, 所以除非提到具体协议的版本,TLS和SSL这2个词是可以混用的, 在大多数情况下的意思相近.默认登录端口为465"
          },
          {
            "title": "邮箱",
            "con": "最多可添加15个邮箱地址。"
          },
          {
            "title": "邮箱列表",
            "con": "输入邮箱地址。"
          },
          {
            "title": "描述",
            "con": "对邮箱添加描述。"
          },
          {
            "title": "组别ID",
            "con": "设置邮箱群组编号。合法值：1-100"
          },
          {
            "title": "描述",
            "con": "对邮箱群组添加描述。"
          },
          {
            "title": "列表",
            "con": "显示已添加的邮箱地址。"
          },
          {
            "title": "选中的邮箱地址",
            "con": "显示已选中的邮箱地址。"
          }
        ]
      },
      storage: {
        title: '存储',
        tfcardlabel: 'Micro SD',
        state: '状态',
        total: '容量(可用容量/总容量)',
        // used : '已用容量',
        // available : '可用容量',
        // percent : 'Usage',
        kb: 'KB',
        format: '格式化',
        ssdlabel: 'SSD',
        formatmsg: '格式化硬盘将会清除全部数据，是否继续？',
        tip: [
          {
            title: '容量(可用容量/总容量)',
            con: 'Micro SD卡或SSD的总容量'
          },
          {
            title: '格式化',
            con: '格式化Micro SD卡或SSD'
          },
          {
            title: '未插入',
            con: '未插入Micro SD卡或SSD'
          },
          {
            title: '不可用',
            con: 'Micro SD卡或SSD不可用'
          },
          {
            title: '可用',
            con: 'Micro SD卡或SSD可用'
          },
          {
            title: '格式化中',
            con: '正在格式化Micro SD卡或SSD'
          }
        ]
      }
    },
    "contact": {
      "title": "电话 & 短信",
      "phone": {
        "title": "电话",
        "phonetitle": "电话本",
        "number": "电话号码",
        "description": "描述",
        "phonegrouptitle": "电话群组",
        "gid": "组别ID",
        "labelist": "列表",
        "labelselected": "选中的电话号码",
        "deleteerror": "请先在号码组 {} 内删除该号码",
        "tip": [
          {
            "title": "电话本",
            "con": "最多可添加15个电话号码。"
          },
          {
            "title": "电话号码",
            "con": "输入电话号码。注意：部分国家要求采用国际格式填写电话号码才能正常收发短信，如“+8613859200000”。"
          },
          {
            "title": "描述",
            "con": "对电话号码添加描述。"
          },
          {
            "title": "组别ID",
            "con": "设置电话群组编号。合法值：1-100"
          },
          {
            "title": "描述",
            "con": "对电话群组添加描述。"
          },
          {
            "title": "列表",
            "con": "显示已添加的电话本。"
          },
          {
            "title": "选中的电话号码",
            "con": "显示已选中的电话号码。"
          }
        ]
      },
      "sms": {
        "title": "短信",
        "sendSms": "发送短信",
        "destination": "接收方号码",
        "content": "内容",
        "inbox": "短信接收记录",
        "startDate": "开始时间",
        "endDate": "结束时间",
        "from": "发送方号码",
        "time": "时间",
        "outBox": "短信发送记录",
        "to": "接收方号码",
        "status": "状态",
        "smstitle": "常规设置",
        "smsmode": "短信模式",
        "sendSuccess": "已提交至发送队列",
        "sendFailed": "发送失败",
        "smsenable": "短信远程控制",
        "smsauthtype": "认证类型",
        "smsphone": "电话号码",
        "smsphonepsw": "密码+电话号码",
        "smsauthpsw": "密码",
        "smsphonegroup": "电话组",
        "clearAll": "清除全部记录",
        "clearAllTip": "您是否想要清空所有记录？",
        "confirm": "确认",
        "tip": [
          {
            "title": "接收方号码",
            "con": "请输入接收短信的手机号。"
          },
          {
            "title": "内容",
            "con": "请输入接收短信的手机号。"
          },
          {
            "title": "开始时间",
            "con": "请选择历史记录要查询的开始时间。"
          },
          {
            "title": "结束时间",
            "con": "请选择历史记录要查询的结束时间。"
          },
          {
            "title": "发送方号码",
            "con": "例如，输入123456，点击搜索，则可以查看该号码发送的短信历史记录。"
          },
          {
            "title": "接收方号码",
            "con": "例如，输入123456，点击搜索，则可以查看发送给该号码的短信历史记录。"
          }
        ]
      }
    },
    battery: {
      title: '电源管理',
      standby: {
        title: '待机模式',
        label: '待机设置',
        enable: '启用',
        actionLabel: '待机前动作',
        duration: '持续时间（毫秒）',
        tip: [
          {
            title: "待机模式",
            con: "在待机模式下，路由器基本上是断电的。cpu只能监视内部中断（定时唤醒）和外部中断事件(DI、串口、蜂窝、以太网唤醒），以确定何时为路由器供电并使其退出待机模式。按下重置按钮可使路由器退出待机模式。"
          },
          {
            title: "启用",
            con: "启用/禁用待机模式。"
          },
          {
            title: "待机前动作",
            con: "设置路由器在进入待机模式之前的动作，启用后，路由器先执行动作再进入待机模式。"
          },
          {
            title: "短信",
            con: "勾选启用进入待机前触发SMS告警。"
          },
          {
            title: "电话分组",
            con: "设置接收SMS告警信息的电话号码。"
          },
          {
            title: "短信内容",
            con: "设置SMS告警的内容"
          },
          {
            title: "邮件",
            con: "勾选启用进入待机前触发邮件告警。"
          },
          {
            title: "邮件分组",
            con: "设置接收邮件告警信息的邮箱。"
          },
          {
            title: "邮件内容",
            con: "设置邮件告警的内容。"
          },
          {
            title: "DO",
            con: "勾选启用进入待机前触发DO输出状态。"
          },
          {
            title: "模式",
            con: "用户可选择“高电平”，“低电平”，和“脉冲”"
          },
          {
            title: "持续时间(*10毫秒)",
            con: "定义维持高/低电平状态的持续时间。"
          },
          {
            title: "初始状态",
            con: "设置脉冲模式启用时DO的初始状态。"
          },
          {
            title: "高电平持续时间（*10毫秒）",
            con: "定义维持脉冲高电平的时间。"
          },
          {
            title: "低电平持续时间（*10毫秒）",
            con: "定义维持脉冲低电平的时间。"
          },
          {
            title: "脉冲个数",
            con: "定义形成完整脉冲的个数。"
          },
          {
            title: "唤醒设置",
            con: "设置路由器进入待机模式时的唤醒触发条件，至少选择一种。"
          },
          {
            title: "时间表唤醒",
            con: "启用时，路由器处于待机模式时将被时间表周期唤醒。"
          },
          {
            title: "重复模式",
            con: "设置时间表唤醒的重复模式。"
          },
          {
            title: "重复周期",
            con: "设置时间表唤醒的重复周期。"
          },
          {
            title: "唤醒时间",
            con: "设置路由器唤醒的时间段，处于这个时间段，路由器将被唤醒正常工作。"
          },
          {
            title: "DI唤醒",
            con: "启用时，当路由器处于待机模式接收到DI，则路由器唤醒从待机模式进入工作模式。"
          },
          {
            title: "唤醒DI模式",
            con: "设置触发路由器从待机模式被唤醒的DI模式。"
          },
          {
            title: "唤醒DI持续时间",
            con: "设置触发路由器从待机模式被唤醒的DI持续时间。"
          },
          {
            title: "再次待机触发类型",
            con: "设置DI触发路由器唤醒后，路由器再次进入待机模式的触发类型。选择【DI】，当收到与【唤醒DI模式】相反的DI值且满足待机DI持续时间，则触发路由器立即进入待机模式。选择【时间】，到达DI唤醒持续时间后，则触发路由器再次进入待机模式。"
          },
          {
            title: "待机DI持续时间",
            con: "设置路由器被DI唤醒后再次进入待机模式的DI持续时间。"
          },
          {
            title: "DI唤醒持续时间",
            con: "设置路由器从待机模式被DI触发唤醒进入工作模式后，持续多长时间再进入待机模式。"
          },
          {
            title: "蜂窝唤醒",
            con: "启用时，当路由器处于待机模式，蜂窝收到数据，则路由器唤醒从待机模式进入工作模式。支持电话唤醒和短信唤醒。"
          },
          {
            title: "拨号组别",
            con: "选择用于蜂窝电话唤醒的电话组别。用户通过Web页面“系统 > 电话&短信 > 电话”来设置电话群组。"
          },
          {
            title: "短信组别",
            con: "选择用于蜂窝短信唤醒的短信组别。用户通过Web页面“系统 > 电话&短信 > 电话”来设置短信群组"
          },
          {
            title: "短信内容",
            con: "填写唤醒的短信内容"
          },
          {
            title: "蜂窝唤醒持续时间",
            con: "设置路由器从待机模式被蜂窝触发唤醒进入工作模式后，持续多长时间再进入待机模式。"
          },
          {
            title: "以太网唤醒",
            con: "启用时，当路由器处于待机模式，以太网接口收到特殊唤醒帧（wakeonlan），则路由器唤醒进入工作模式。"
          },
          {
            title: "以太网唤醒持续时间",
            con: "设置路由器从待机模式被以太网触发唤醒进入工作模式后，持续多长时间再进入待机模式。"
          },
          {
            title: "串口唤醒",
            con: "启用时，当路由器处于待机模式，串口接口收到数据，则路由器唤醒进入工作模式。(注意：串口设备需要先发送1字节长度的唤醒数据再发送正常数据。)"
          },
          {
            title: "串口唤醒持续时间",
            con: "设置路由器从待机模式被串口触发唤醒进入工作模式后，持续多长时间再进入待机模式。"
          },
          {
            title: "唤醒后动作",
            con: "设置路由器处于待机模式时被唤醒后执行的动作。"
          },
          {
            title: "短信",
            con: "勾选启用路由器唤醒后触发SMS告警。"
          },
          {
            title: "邮件",
            con: "勾选启用路由器唤醒后触发邮件告警。"
          },
          {
            title: "DO",
            con: "勾选启用路由器唤醒后触发DO输出状态。"
          },
        ]
      },
      wakeup: {
        title: '唤醒设置',
        timemode: '时间表唤醒',
        repeatmode: '重复模式',
        hourly: '小时',
        daily: '天',
        hour: '小时',
        hours: '小时',
        repeatperiod: '重复周期',
        everyday: '每天',
        monday: '周一',
        tuesday: '周二',
        wednesday: '周三',
        thursday: '周四',
        friday: '周五',
        saturday: '周六',
        sunday: '周日',
        time: '唤醒时间',
        atleastone: '请至少选择一种唤醒触发条件',
        di: {
          title: 'DI唤醒',
          level: '唤醒DI模式',
          high: '高电平',
          low: '低电平',
          duration: '唤醒DI持续时间（秒）',
          interval: '时间间隔需大等于1分钟',
          type: '再次待机触发类型',
          time: '时间',
          di: 'DI',
          standbytime: '待机DI持续时间(毫秒)',
          wakeupTime: 'DI唤醒持续时间（分）',
        },
        cellular: {
          title: '蜂窝唤醒',
          duration: '蜂窝唤醒持续时间(分)',
          callgroup: '拨号组别',
          smsgroup: '短信组别',
          smstext: '短信内容',
        },
        ethernet: {
          title: '以太网唤醒',
          duration: '以太网唤醒持续时间(分)',
        },
        serial: {
          title: '串口唤醒',
          duration: '串口唤醒持续时间(分)',
        },
        action: '唤醒后动作',
      },
      iodi: "工业-I/O-数字输入",
      serial: '串口',
      ethernet: '以太网',
      powerdi: '电源管理-DI唤醒',
      powerserial: '电源管理-串口',
      powerethernet: '电源管理-以太网',
    },
    user: {
      title: '用户管理',
      security: {
        title: '账户',
        labeltitle: '修改账户信息',
        username: '用户名',
        oldpassword: '旧密码',
        newpassword: '新密码',
        confirmpsw: '再次输入新密码',
        tip: [
          {
            title: '用户名',
            con: '输入用户的新用户名。有效字符包括a-z, 0-9, "_", "-"，首字需为字母或"_"。'
          },
          {
            title: '旧密码',
            con: '输入用户的旧密码'
          },
          {
            title: '新密码',
            con: '输入用户的新密码'
          },
          {
            title: '再次输入新密码',
            con: '再一次输入新密码以确认'
          }
        ]
      },
      permission: {
        title: '用户管理',
        labeltitle: '用户列表',
        username: '用户名',
        password: '密码',
        permission: '权限',
        role0: '只读',
        role1: '读写',
        tip: [
          {
            title: '用户管理',
            con: '创建或修改或删除普通用户账户，最大普通用户数为5'
          },
          {
            title: '用户名',
            con: '输入普通用户的用户名。有效字符包括a-z, 0-9, "_", "-"，首字需为字母或"_"。'
          },
          {
            title: '密码',
            con: '设置密码'
          },
          {
            title: '权限',
            con: '设置用户权限，可选“读写用户”或“只读用户”。读写用户：这个级别的用户可以查看和配置路由器。只读用户：这个级别的用户只能查看路由器。'
          },
          {
            title: '操作',
            con: '添加/删除用户账户。'
          }
        ]
      }
    },
    aaa: {
      title: 'AAA',
      radius: {
        title: 'Radius',
        radiustitle: 'Radius设置',
        enable: '启用',
        serverip: '服务器IP地址',
        port: '端口',
        password: '认证密钥',
        tip: [
          {
            title: 'AAA',
            con: 'AAA 访问控制是用来控制允许何种人访问服务器，以及一旦他们能够访问该服务器，允许他们使用何种服务的方法'
          },
          {
            title: '启用',
            con: '启用/禁用Radius'
          },
          {
            title: '服务器IP地址',
            con: '填写Radius 服务器的地址（域名/IP）'
          },
          {
            title: '端口',
            con: '填写Radius 服务器的服务端口号。合法值：1-65535'
          },
          {
            title: '认证密钥',
            con: '与 Radius 服务器建立连接时候需要验证的认证密钥。只有认证密钥一致才能与 Radius 服务器建立连接'
          }
        ]
      },
      tacacs: {
        title: 'Tacacs+',
        tacacstitle: 'Tacacs+设置',
        enable: '启用',
        serverip: '服务器IP地址',
        port: '端口',
        password: '认证密钥',
        tip: [
          {
            title: '启用',
            con: '启用/禁用Tacacs+'
          },
          {
            title: '服务器IP地址',
            con: '填写Tacacs+服务器地址（域名/IP)'
          },
          {
            title: '端口',
            con: '填写Tacacs+ 服务器的服务端口号 。合法值：1-65535'
          },
          {
            title: '认证密钥',
            con: '与 Tacacs+ 服务器建立连接时候需要验证的认证密钥。只有认证密钥一致才能与 Tacacs+ 服务器建立连接'
          }
        ]
      },
      ldap: {
        title: 'LDAP',
        ldaptitle: 'LDAP设置',
        enable: '启用',
        serverip: '服务器IP地址',
        port: '端口',
        basedn: '基准DN',
        security: '安全',
        none: 'None',
        tls: 'StartTLS',
        ssl: 'SSL',
        username: '用户名',
        password: '密码',
        tip: [
          {
            title: '启用',
            con: '启用/禁用LDAP'
          },
          {
            title: '服务器IP地址',
            con: '填写LDAP服务器地址（域名/IP）'
          },
          {
            title: '端口',
            con: '填写LDAP服务器的服务端口号。合法值：1-65535'
          },
          {
            title: '基准DN',
            con: 'LDAP 目录树的最顶部'
          },
          {
            title: '安全',
            con: '选择加密方式，共3种选择：None、StartTLS 和 SSL。'
          },
          {
            title: '用户名',
            con: '访问服务器的用户名'
          },
          {
            title: '密码',
            con: '访问服务器的密码'
          }
        ]
      },
      authentication: {
        title: '认证',
        authtitle: '认证设置',
        servics: '服务',
        column1: '1',
        column2: '2',
        column3: '3',
        none: 'None',
        local: 'Local',
        radius: 'Radius',
        tacacs: 'Tacacs+',
        ldap: 'LDAP',
        tip: [
          {
            title: '认证',
            con: '支持以下认证方式：不认证(none)、本地认证(local)、远端认证。当同时配置了radius,tacacs+和local时，优先级顺序遵循：1>2>3'
          },
          {
            title: 'Console',
            con: '选择Console访问的认证方式'
          },
          {
            title: 'Web',
            con: '选择Web访问的认证方式'
          },
          {
            title: 'Telnet',
            con: '选择Telnet访问的认证方式'
          },
          {
            title: 'SSH',
            con: '选择SSH访问的认证方式'
          }
        ]
      }
    },
    remote: {
      title: '设备管理',
      provision: {
        title: '自动配置',
        enable: '启用',
        status: '状态',
        disabled: '未启用',
        connFailTip: '连接失败',
        getFailTip: '获取失败',
        gettingTip: '获取配置中',
        configured: '已配置',
        connecting: '正在连接',
        tip: [
          {
            title: '启用',
            con: '启用时，设备在上电后网络正常的情况下，会自动连接到RPS服务器并获取配置文件并更新本地配置。禁用时，设备将不再连接到RPS服务器获取配置。'
          },
          {
            title: '状态',
            con: '设备和RPS服务器之间的连接以及获取配置文件的状态。'
          }
        ]
      },
      management: {
        title: '设备管理',
        titlelabel: '设备管理',
        enable: '启用',
        downloadFail: '下载证书失败',
        disconnect: '未连接',
        connected: '已连接',
        connecting: '正在连接',
        notEnabled: '未启用',
        platType: '平台类型',
        developmentPlatform: 'Milesight Development Platform',
        devicehubv1: 'DeviceHub',
        devicehubv2: 'DeviceHub 2.0',
        serverip: '服务器地址',
        status: '状态',
        activesrv: '服务器地址',
        cloudurl: '设备管理服务器地址',
        method: '激活方式',
        method0: '通过授权码',
        method1: '通过账户名',
        authcode: '授权码',
        username: '账户名',
        password: '密码',
        disconnected: '断开连接',
        discon: '断开连接',
        disconmsg: '您确定要断开连接？',
        loading: '请稍候……',
        connect: '连接',
        errorunactive: '激活失败',
        errorinvalidid: '激活失败，平台账户名或密码错误。',
        errormaximim: '激活失败，账户添加设备已达最大限制数量。',
        errorbinded: '激活失败，本台设备已被其他帐户激活。',
        errorinvalidsnmac: '激活失败，设备信息和设备管理服务器的信息不一致。',
        errortimeout: '激活超时，请检查网络是否正常。',
        stunenable: '启用STUN',
        stunurl: 'STUN服务器',
        tip: [
          {
            title: '状态',
            con: '显示路由器和设备管理平台的连接状态。'
          },
          {
            title: '断开连接',
            con: '点击该按钮使设备和设备管理平台的连接断开。'
          },
          {
            title: '服务器地址',
            con: '设备管理服务器的地址（IP或域名）。'
          },
          // {
          //     title : '设备管理服务器地址',
          //     con : '填写设备管理服务器的URL地址，如：http://220.82.63.79:8080/acs.'
          // },
          {
            title: '激活方式',
            con: '选择设备与云管理平台的连接方式,可选“通过授权码”和“通过ID”。'
          },
          {
            title: '授权码',
            con: '填写由设备管理平台生成的授权码。'
          },
          {
            title: 'ID/密码',
            con: '填写已注册的云管理账户（Email）和密码。'
          }
        ]
      },
      urvpn : {
        title : 'Milesight VPN',
        titlelabel : 'Milesight VPN 设置',
        server : '服务器',
        port : '端口',
        authcode : '授权码',
        devicename : '设备名称',
        statustitlelabel : 'Milesight VPN 状态',
        status : '状态',
        localip : '本地IP',
        remoteip : '远程IP',
        duration : '连接时长',
        disconnect : '断开连接',
        discon : '断开连接',
        disconmsg : '您确定要断开连接？',
        loading : '请稍候……',
        connect : '连接',
        tip:[
          {
            title: '服务器',
            con: '输入Milesight VPN的IP地址或者域名。'
          },
          {
            title: '端口',
            con: '输入HTTPS端口号'
          },
          {
            title: '授权码',
            con: '输入由Milesight VPN产生的授权码。'
          },
          {
            title: '设备名称',
            con: '输入设备名称'
          },
          {
            title: 'Milesight VPN 状态',
            con: '显示路由器和Milesight VPN的连接状态。'
          },
          {
            title: '本地IP',
            con: '显示路由器的虚拟IP地址。'
          },
          {
            title: '远程IP',
            con: '显示Milesight VPN的虚拟IP地址。'
          },
          {
            title: '连接时长',
            con: '显示路由器和Milesight VPN的连接时长。'
          }
        ]
      }
    },
    events: {
      title: '事件',
      events: {
        title: '事件',
        ack: '标记为已读',
        status: '状态',
        type: '类型',
        time: '时间',
        message: '消息',
        ackall: '全部标为已读',
        deleteall: '删除全部',
        alert: '当事件记录数目达到9000条后系统会自动删除最早的2000条。现记录数已达7000条，请删除无用的记录以免因系统自动删除而丢失数据。',
        tip: [
          {
            title: '标记为已读',
            con: '把选中的事件告警标记为已读'
          },
          {
            title: '删除',
            con: '删除选中的事件告警'
          },
          {
            title: '全部标为已读',
            con: '把全部事件告警标记为已读'
          },
          {
            title: '删除所有',
            con: '删除全部事件告警'
          },
          {
            title: '状态',
            con: '显示需告警信息的阅读状态'
          },
          {
            title: '类型',
            con: '显示需告警的事件类型'
          },
          {
            title: '时间',
            con: '显示告警的时间'
          },
          {
            title: '消息',
            con: '显示告警的内容'
          },
          {
            title: '未读',
            con: '该事件告警为未读状态'
          },
          {
            title: '已读',
            con: '该事件为已读状态'
          }
        ]
      },
      settings: {
        title: '事件设置',
        settingslabel: '事件设置',
        enable: '启用',
        events: '事件',
        record: '记录',
        email: '邮件',
        sms: '短信',
        settingemail: '邮件设置',
        settingsms: '短信设置',
        phonelist: '电话群组',
        emaillist: '邮件群组',
        snmp: 'SNMP',
        mqtt: 'MQTT',
        topic: '主题',
        flag: '保留标志',
        qos: 'QoS',
        tip: [
          {
            title: '启用',
            con: '勾选启用事件告警'
          },
          {
            title: '电话群组',
            con: '选择接收短信告警的电话群组'
          },
          {
            title: '邮件群组',
            con: '选择接收邮件告警的邮件群组'
          },
          {
            title: '事件',
            con: '告警事件的名称'
          },
          {
            title: '记录',
            con: '勾选后将在“事件”页面记录事件发生的时间和内容'
          },
          {
            title: '邮件',
            con: '勾选后将事件告警以邮件的形式发送给指定的收件人'
          },
          {
            title: '邮件设置',
            con: '点击后，将跳转至“SMTP”设置页面，以便用户设置发件人及收件人信息'
          },
          {
            title: '短信',
            con: '勾选后将事件告警以短信的形式发送给指定的电话号码'
          },
          {
            title: '短信设置',
            con: '点击后，将跳转至“系统”>“常规”>“电话”设置页面，以便用户设置电话群组'
          },
          {
            title: 'SNMP',
            con: '勾选后事件告警以SNMP的trap的形式发送到指定的服务器'
          },
          {
            title: 'WAN口连接成功',
            con: 'WAN口已经连接到网络'
          },
          {
            title: 'WAN口连接断开',
            con: 'WAN口与网络断开'
          },
          {
            title: 'VPN上线',
            con: 'VPN已连接上'
          },
          {
            title: 'VPN掉线',
            con: 'VPN断开连接'
          },
          {
            title: '链路切换',
            con: '路由器用来上网的接口发生切换'
          },
          {
            title: '信号质量差',
            con: '蜂窝的信号强度低'
          },
          {
            title: '蜂窝网络上线',
            con: '蜂窝网络已拨号成功'
          },
          {
            title: '蜂窝网络掉线',
            con: '蜂窝网络掉线'
          },
          {
            title: '蜂窝统计数据清除',
            con: '主SIM卡使用的流量记录清零'
          },
          {
            title: '蜂窝网流量临近阈值',
            con: '主SIM卡使用流量即将超过阈值'
          },
          {
            title: '蜂窝网流量超出阈值',
            con: '主SIM卡使用流量超出阈值'
          },
          {
            visible: function() {
              return _.get(YS, ['UI', '_menu', '_pn', 'wifi']);
            },
            tips: [
              {
                title: 'WLAN（作为接入点）有客户端接入',
                con: '有客户端成功连接到WLAN (AP)。'
              },
              {
                title: 'WLAN（作为接入点）有客户端断开',
                con: '有客户端与WLAN (AP) 断开连接。'
              },
              {
                title: 'WLAN（作为客户端）连接成功',
                con: 'WLAN（作为客户端）成功连接到接入点.'
              },
              {
                title: 'WLAN（作为客户端）连接断开',
                con: 'WLAN（作为客户端）与接入点断开连接'
              }
            ]
          }
        ]
      }
    }
  },
  industrial: {
    title: '服务',
    io: {
      title: 'I/O',
      di: {
        title: '数字输入',
        dilabel1: '数字输入设置',
        dilabel2: '数字输入2设置',
        enable: '启用',
        level: '模式',
        high: '高电平',
        low: '低电平',
        counter: '计数器',
        action: '动作',
        sms: '短信',
        email: '邮件',
        do1: 'DO',
        do2: 'DO',
        duration: '持续时间(毫秒)',
        second: '毫秒',
        condition: '触发条件',
        counterl: '触发计数值',
        ltoh: '低->高',
        htol: '高->低',
        cellularup: '触发蜂窝网络连接',
        phone: '电话分组',
        content: '短信内容',
        email1: '邮件群组',
        emailGroup: '邮件分组',
        emailContent: '邮箱内容',
        tip: [
          {
            title: '启用',
            con: '启用/禁用数字输入'
          },
          {
            title: '模式',
            con: '用户可选择“高电平”，“低电平”，和“计数器”'
          },
          {
            title: '高电平',
            con: '数字输入状态为高电平'
          },
          {
            title: '低电平',
            con: '数字输入状态为低电平'
          },
          {
            title: '持续时间（毫秒）',
            con: '定义维持高/低电平状态的时间。合法值：1-10000'
          },
          {
            title: '计数器',
            con: '数字输入为计数器'
          },
          {
            title: '触发条件',
            con: '仅在当数字输入在计数器模式时下可用。用户可选择“低->高”，和“高->低”'
          },
          {
            title: '低->高',
            con: '当数字输入的状态由低电平变为高电平时，计数器值增加1'
          },
          {
            title: '高->低',
            con: '当数字输入的状态由高电平变为低电平时，计数器值增加1'
          },
          {
            title: '触发计数值',
            con: '在计数器模式下，输入1-100。当计数器数值达到设定的触发值时，系统就会作出相应的动作，并且计数器将重新计数'
          },
          {
            title: '动作',
            con: '选择当数字输入口满足预设模式的触发条件或时间后作出的动作'
          },
          {
            title: '短信',
            con: '勾选启用DI触发SMS告警'
          },
          {
            title: '邮件',
            con: '勾选启用DI触发邮件告警'
          },
          {
            title: 'DO',
            con: '勾选启用DI触发控制DO输出状态'
          },
          {
            title: '触发蜂窝网络连接',
            con: '勾选启用触发蜂窝网络连接'
          },
          {
            title: '电话号码',
            con: '设置接收SMS告警信息的电话号码'
          },
          {
            title: '短信内容',
            con: '设置SMS告警的内容'
          }
        ]
      },
      "do": {
        title: '数字输出',
        dolabel1: '数字输出设置',
        dolabel2: '数字输出设置',
        enable: '启用',
        level: '模式',
        high: '高电平',
        low: '低电平',
        pulse: '脉冲',
        action: '报警源',
        di1: 'DI1',
        di2: 'DI2',
        disconcel: '蜂窝断开',
        duration: '持续时间(*10毫秒)',
        second: '毫秒',
        initstatus: '初始状态',
        durationhigh: '高电平持续时间（*10毫秒）',
        durationlow: '低电平持续时间（*10毫秒）',
        amountpulse: '脉冲个数',
        custom: '自定义',
        phone: '电话组',
        tip: [
          {
            title: '启用',
            con: '启用/禁用数字输出'
          },
          {
            title: '模式',
            con: '用户可选择“高电平”，“低电平”，和“脉冲”'
          },
          {
            title: '高电平',
            con: '数字输出为高电平'
          },
          {
            title: '低电平',
            con: '数字输出为低电平'
          },
          {
            title: '脉冲',
            con: '数字输出为脉冲'
          },
          {
            title: '持续时间（*10毫秒）',
            con: '定义维持高/低电平状态的持续时间。合法值：1-10000'
          },
          {
            title: '初始状态',
            con: '设置自定义模式启用时DO的初始状态。路由器重启后DO的状态。'
          },
          {
            title: '高电平持续时间（*10毫秒）',
            con: '定义维持脉冲高电平的时间。合法值：1-10000'
          },
          {
            title: '低电平持续时间（*10毫秒）',
            con: '定义维持脉冲低电平的时间。合法值：1-10000'
          },
          {
            title: '脉冲个数',
            con: '定义形成完整脉冲的个数。合法值：1-100'
          },
          {
            title: '电话组',
            con: '请选择有配置I/O权限的电话组，用户可点击号码组跳转到相关页面设置号码。'
          }
        ]
      }
    },
    serialport: {
      title: '串口',
      serial1: {
        title: '串口1',
        title1: '串口',
        serial1label: '串口设置',
        enable: '启用',
        serialtype: '串口类型',
        baudrate: '波特率',
        databits: '数据位',
        stopbits: '停止位',
        parity: '校验位',
        flowcontrol: '软件流控',
        dtulabel: 'DTU模式',
        protocol: 'DTU协议',
        transparent: '透明传输',
        modbus: 'Modbus',
        lcoalport: '本地端口号',
        tcpprotocol: '协议',
        hbinterval: '保活间隔',
        hbretries: '保活重试次数',
        fragmentlength: '串口分帧长度',
        fragmentinterval: '串口分帧间隔',
        reconnect: '重连间隔',
        serverlisttitle: '目的IP地址',
        serverip: '服务器地址',
        serverport: '服务器端口',
        bytes: '字节',
        second: '秒',
        msecond: '毫秒',
        tcpserver: 'TCP服务器',
        tcpserverport: '监听端口',
        serverstatus: '状态',
        content: '注册包内容',
        minlimit1: '请至少添加一个目的IP地址',
        gps: 'GPS',
        ursalink: '指定协议',
        hbintervals: '心跳间隔',
        id: 'ID',
        serialmode: '串口模式',
        error1: '保存失败，请先关闭GPS功能',
        modbusclient: 'Modbus Client',
        modbusserver: 'Modbus Server',
        error3: '保存失败，请先关闭Modbus Client功能',
        error4: '保存失败 请先关闭Modbus Rtu功能',
        udpserver: 'UDP服务器',
        iec: '101 转 104',
        asdu101: '101 ASDU地址长度',
        asdu104: '104 ASDU地址长度',
        cot101: '101 COT长度',
        cot104: '104 COT长度',
        ioa101: '101 IOA长度',
        ioa104: '104 IOA长度',
        linkmode101: '101 规约模式',
        linkAddressLength101: '101 链路地址长度',
        linkAddress101: '101 链路地址',
        balanceMode: '平衡式',
        unbalanceMode: '非平衡式',
        serialDebug: 'Debug',
        "max_num_tcp": "最大TCP客户端数目",
        "conn_timeout": "连接超时时间",
        "read_interval": "读取间隔",
        "response_time": "响应超时时间",
        "retries": "最大重试次数",
        mqtt: 'MQTT',
        mqttconnect: 'MQTT连接',
        type: '类型',
        uplink: '上行',
        downlink: '下行',
        mqtttopic: '主题',
        remainflag: '保留标志',
        tip: [
          {
            title: '串口设置',
            con: '根据与路由器相连的终端设备的串口参数设置路由器串口的参数，实现路由器与终端设备的正常通信'
          },
          {
            title: '启用',
            con: '启用/禁用串口功能'
          },
          {
            title: '串口类型',
            con: '串口1类型为RS232；串口2类型为RS485'
          },
          {
            title: '波特率',
            con: '选择串口波特率，它表示每秒钟传送的符号的个数。范围：300-230400'
          },
          {
            title: '数据位',
            con: '选择串口数据位。用户可选择"7"和"8"'
          },
          {
            title: '停止位',
            con: '用于表示单个包的最后一位。用户可选择"1"和”2".'
          },
          {
            title: '校验位',
            con: '在串口通信中的检错方式，支持“None”, “Odd”, “Even”'
          },
          {
            title: '软件流控',
            con: '流控可以使数据接收设备在不能接收数据时通知数据发送设备，使其停止发送'
          },
          {
            title: '串口模式',
            con: '选择串口的工作模式，可选“DTU模式”、“Modbus Client”、“Modbus Server”、“GPS”'
          },
          {
            title: 'DTU模式',
            con: '选择该模式，串口可以和远端服务器或客户端进行通信。'
          },
          {
            title: 'GPS',
            con: '选择该模式，同时在“工业 > GPS > GPS串口转发”页面选择相应的串口类型后可以将GPS信息转发到该串口。',
            51: {}
          },
          {
            title: 'DTU协议',
            con: 'DTU协议可选“透明传输”，“Modbus”，“TCP服务器”，“UDP服务器”或“MQTT”'
          },
          {
            title: '透明传输',
            con: '选择该协议，则设备作为客户端'
          },
          {
            title: 'Modbus',
            con: '选择该协议，则设备作为TCP服务器，且具备Modbus网桥功能，可实现Modbus RTU和Modbus TCP之间的转换'
          },
          {
            title: 'TCP服务器',
            con: '选择该协议，则设备作为TCP服务器'
          },
          {
            title: '协议',
            con: '可选“TCP”或“UDP”协议'
          },
          {
            title: 'UDP 服务器',
            con: '选择该协议，则设备作为TCP服务器'
          },
          {
            title: '监听端口',
            con: '设置路由器作为UDP服务器时使用的监听端口'
          },
          {
            title: '保活间隔（秒）',
            con: 'TCP客户端和TCP服务器建立连接后，定期发送 TCP心跳报文的时间间隔，合法值：1-3600，单位：秒。默认:75秒'
          },
          {
            title: '保活重试次数',
            con: '当TCP心跳超时后，设备重新发送 TCP 心跳，达到设置的心跳重试次数后，重新建立 TCP 连接。合法值：1-16'
          },
          {
            title: '串口分帧长度',
            con: '当串口发送数据时，设置的一帧数据的大小。当达到后开始发送。合法值：1-1024，单位：字节'
          },
          {
            title: '串口分帧间隔',
            con: '实际串口数据会被排列在缓冲区，当这个区域的数据达到指定的间隔时间时，系统就会把数据发送到外网。合法值：10-65535，单位：毫秒。注意：即使未达到间隔时间，当实际串口数据大小达到指定的串口分帧长度时，数据也会被发送至外网'
          },
          {
            title: '重连间隔',
            con: '连接失败后设备重连服务器的时间间隔。合法值：10-60，单位：秒'
          },
          {
            title: '指定协议',
            con: '通过指定协议，设备可以与TCP2COM软件对接'
          },
          {
            title: '心跳间隔',
            con: '启用指定协议后，设备向服务器定期发送心跳报文的时间间隔'
          },
          {
            title: 'ID',
            con: '用户自定义设备标识符作为设备的唯一标识。不允许空格，最大长度为63个字符'
          },
          {
            title: '注册包内容',
            con: '用户自定义设备登录到服务器的注册包内容。'
          },
          {
            title: '目的IP地址',
            con: ''
          },
          {
            "title": "最大TCP客户端数目",
            "con": "当路由器为TCP服务器时，最大可允许连接的TCP客户端数量。"
          },
          {
            "title": "连接超时时间",
            "con": "若连接超时时间内，TCP服务端未收到来自从设备的任何数据，TCP连接将会断开。"
          },
          {
            "title": "读取间隔",
            "con": "设置执行远程通道读操作的周期时间间隔。当一个周期结束时，设备会等待一段时间，才重新开始新的读操作周期。当读取间隔设置为0时，表示读取全部指令后设备将立即重新开始新的读操作周期。"
          },
          {
            "title": "响应超时时间",
            "con": "设置设备等待执行一个读指令后的最大响应时间。如果超过最大响应时间后，设备都没有获取到指令的响应，就认为此指令读超时。"
          },
          {
            "title": "最大重试次数",
            "con": "设置读取失败时后的最大重试次数。"
          },
          {
            title: '服务器地址',
            con: '填写TCP或UDP服务器地址（IP/域名）'
          },
          {
            title: '服务器端口',
            con: '填写TCP或UDP服务器端口。合法值：1-65535。'
          },
          {
            title: '状态',
            con: '显示设备和服务器的连接状态'
          },
          {
            title: '操作',
            con: '添加或删除服务器设置。'
          },
          {
            title: '本地端口号',
            con: '设置路由器监听的端口。合法值：1-65535。'
          },
          {
            title: '监听端口',
            con: '设置路由器监听的端口。合法值：1-65535。'
          },
          {
            title: 'MQTT连接',
            con: '选择转发串口数据的MQTT连接，选择“所有”表示转发到所有已添加的MQTT连接。'
          },
          {
            title: '主题',
            con: '设置路由器发布消息的主题。'
          },
          {
            title: '保留标志',
            con: '启用/禁用MQTT的保留标志。'
          },
          {
            title: 'QoS',
            con: '配置转发串口数据消息的QoS等级。'
          },
        ]
      },
      serial2: {
        title: '串口2',
        serial2label: '串口设置',
        enable: '启用',
        serialtype: '串口类型',
        baudrate: '波特率',
        databits: '数据位',
        stopbits: '停止位',
        parity: '校验位',
        flowcontrol: '软件流控',
        dtulabel: 'DTU模式',
        protocol: 'DTU协议',
        transparent: '透明传输',
        modbus: 'Modbus',
        lcoalport: '本地端口号',
        tcpprotocol: '协议',
        hbinterval: '保活间隔',
        hbretries: '保活重试次数',
        fragmentlength: '串口分帧长度',
        fragmentinterval: '串口分帧间隔',
        reconnect: '重连间隔',
        serverlisttitle: '目的IP地址',
        serverip: '服务器地址',
        serverport: '服务器端口',
        bytes: '字节',
        second: '秒',
        msecond: '毫秒',
        tcpserver: 'TCP服务器',
        tcpserverport: '监听端口',
        serverstatus: '状态',
        content: '注册包内容',
        minlimit1: '请至少添加一个目的IP地址',
        gps: 'GPS',
        ursalink: '指定协议',
        hbintervals: '心跳间隔',
        id: 'ID',
        serialmode: '串口模式',
        error1: '保存失败，请先关闭GPS功能',
        modbusclient: 'Modbus Client',
        modbusserver: 'Modbus Server',
        error3: '保存失败，请先关闭Modbus Client功能',
        error4: '保存失败 请先关闭Modbus Rtu功能',
        udpserver: 'UDP服务器',
        tip: [
          {
            title: '串口设置',
            con: '根据与路由器相连的终端设备的串口参数设置路由器串口的参数，实现路由器与终端设备的正常通信'
          },
          {
            title: '启用',
            con: '启用/禁用串口功能'
          },
          {
            title: '串口类型',
            con: '串口1类型为RS232；串口2类型为RS485'
          },
          {
            title: '波特率',
            con: '选择串口波特率，它表示每秒钟传送的符号的个数。范围：300-230400'
          },
          {
            title: '数据位',
            con: '选择串口数据位。用户可选择"7"和"8"'
          },
          {
            title: '停止位',
            con: '用于表示单个包的最后一位。用户可选择"1"和”2".'
          },
          {
            title: '校验位',
            con: '在串口通信中的检错方式，支持“None”, “Odd”, “Even”'
          },
          {
            title: '软件流控',
            con: '流控可以使数据接收设备在不能接收数据时通知数据发送设备，使其停止发送'
          },
          {
            title: '串口模式',
            con: '选择串口的工作模式，可选“DTU模式”、“Modbus Client”、“Modbus Server”、“GPS”'
          },
          {
            title: 'DTU模式',
            con: '选择该模式，串口可以和远端服务器或客户端进行通信。'
          },
          {
            title: 'GPS',
            con: '选择该模式，同时在“工业 > GPS > GPS串口转发”页面选择相应的串口类型后可以将GPS信息转发到该串口。',
            51: {}
          },
          {
            title: 'DTU协议',
            con: 'DTU协议可选“透明传输”，“Modbus”，“TCP服务器”，“UDP服务器”或“MQTT”'
          },
          {
            title: '透明传输',
            con: '选择该协议，则设备作为客户端'
          },
          {
            title: 'Modbus',
            con: '选择该协议，则设备作为TCP服务器，且具备Modbus网桥功能，可实现Modbus RTU和Modbus TCP之间的转换'
          },
          {
            title: 'TCP服务器',
            con: '选择该协议，则设备作为TCP服务器'
          },
          {
            title: '协议',
            con: '可选“TCP”或“UDP”协议'
          },
          {
            title: 'UDP 服务器',
            con: '选择该协议，则设备作为TCP服务器'
          },
          {
            title: '监听端口',
            con: '设置路由器作为UDP服务器时使用的监听端口'
          },
          {
            title: '保活间隔（秒）',
            con: 'TCP客户端和TCP服务器建立连接后，定期发送 TCP心跳报文的时间间隔，合法值：1-3600，单位：秒。默认:75秒'
          },
          {
            title: '保活重试次数',
            con: '当TCP心跳超时后，设备重新发送 TCP 心跳，达到设置的心跳重试次数后，重新建立 TCP 连接。合法值：1-16'
          },
          {
            title: '串口分帧长度',
            con: '当串口发送数据时，设置的一帧数据的大小。当达到后开始发送。合法值：1-1024，单位：字节'
          },
          {
            title: '串口分帧间隔',
            con: '实际串口数据会被排列在缓冲区，当这个区域的数据达到指定的间隔时间时，系统就会把数据发送到外网。合法值：10-65535，单位：毫秒。注意：即使未达到间隔时间，当实际串口数据大小达到指定的串口分帧长度时，数据也会被发送至外网'
          },
          {
            title: '重连间隔',
            con: '连接失败后设备重连服务器的时间间隔。合法值：10-60，单位：秒'
          },
          {
            title: '指定协议',
            con: '通过指定协议，设备可以与TCP2COM软件对接'
          },
          {
            title: '心跳间隔',
            con: '启用指定协议后，设备向服务器定期发送心跳报文的时间间隔'
          },
          {
            title: 'ID',
            con: '用户自定义设备标识符作为设备的唯一标识。不允许空格，最大长度为63个字符'
          },
          {
            title: '注册包内容',
            con: '用户自定义设备登录到服务器的注册包内容。'
          },
          {
            title: '目的IP地址',
            con: ''
          },
          {
            "title": "最大TCP客户端数目",
            "con": "当路由器为TCP服务器时，最大可允许连接的TCP客户端数量。"
          },
          {
            "title": "连接超时时间",
            "con": "若连接超时时间内，TCP服务端未收到来自从设备的任何数据，TCP连接将会断开。"
          },
          {
            "title": "读取间隔",
            "con": "设置执行远程通道读操作的周期时间间隔。当一个周期结束时，设备会等待一段时间，才重新开始新的读操作周期。当读取间隔设置为0时，表示读取全部指令后设备将立即重新开始新的读操作周期。"
          },
          {
            "title": "响应超时时间",
            "con": "设置设备等待执行一个读指令后的最大响应时间。如果超过最大响应时间后，设备都没有获取到指令的响应，就认为此指令读超时。"
          },
          {
            "title": "最大重试次数",
            "con": "设置读取失败时后的最大重试次数。"
          },
          {
            title: '服务器地址',
            con: '填写TCP或UDP服务器地址（IP/域名）'
          },
          {
            title: '服务器端口',
            con: '填写TCP或UDP服务器端口。合法值：1-65535。'
          },
          {
            title: '状态',
            con: '显示设备和服务器的连接状态'
          },
          {
            title: '操作',
            con: '添加或删除服务器设置。'
          },
          {
            title: '本地端口号',
            con: '设置路由器监听的端口。合法值：1-65535。'
          },
          {
            title: '监听端口',
            con: '设置路由器监听的端口。合法值：1-65535。'
          },
          {
            title: 'MQTT连接',
            con: '选择转发串口数据的MQTT连接，选择“所有”表示转发到所有已添加的MQTT连接。'
          },
          {
            title: '主题',
            con: '设置路由器发布消息的主题。'
          },
          {
            title: '保留标志',
            con: '启用/禁用MQTT的保留标志。'
          },
          {
            title: 'QoS',
            con: '配置转发串口数据消息的QoS等级。'
          },
        ]
      }
    },
    gps: {
      title: 'GPS',
      gps: {
        title: 'GPS',
        enable: '启用',
        notdisabled: '请先禁用GPS IP转发和GPS串口转发功能。',
        mqtttip: '请先禁用GPS MQTT转发',
        debug: '调试',
        tip: []
      },
      ipforwarding: {
        title: 'GPS IP转发',
        gpsiptitle: 'GPS IP转发',
        enable: '启用',
        type: '类型',
        type1: '客户端',
        type2: '服务器端',
        protocol: '协议',
        protocol1: 'TCP协议',
        protocol2: 'UDP协议',
        hbinterval: '心跳间隔',
        hbretries: '心跳重试次数',
        second: '秒',
        times: 'times',
        localport: '本地端口号',
        reconnect: '重连间隔',
        trapinterval: '上报信息间隔',
        rmc: '包含RMC',
        gsa: '包含GSA',
        gga: '包含GGA',
        gsv: '包含GSV',
        prefixcontent: '消息前缀',
        suffixcontent: '消息后缀',
        serverlisttitle: '目的IP地址',
        serverip: '服务器地址',
        serverport: '服务器端口',
        serverstatus: '状态',
        error2: '请至少选择一个',
        notenable: '请先启用GPS功能',
        tip: [
          {
            title: '启用',
            con: '启用后GPS信息将会通过网络被转发到客户端或指定的服务器。'
          },
          {
            title: '类型',
            con: '选择设备连接类型，可选“客户端”和“服务器端”。'
          },
          {
            title: '协议',
            con: '选择数据传输协议，可选“TCP协议”和“UDP协议”。'
          },
          {
            title: '心跳间隔',
            con: "设备和服务器/客户端建立连接后，定期向服务器/客户端发送心跳报文的时间间隔。合法值：1-3600，单位：秒。默认：75秒。"
          },
          {
            title: '心跳重试次数',
            con: "当心跳超时后，设备重新发送心跳报文，达到设置的心跳重试次数后，重新建立连接。合法值：1-16。默认：9次。"
          },
          {
            title: '端口',
            con: '设置路由器监听的端口。合法值：1-65535。'
          },
          {
            title: '重连间隔',
            con: '连接失败后设备重连服务器的时间间隔。合法值：10-60，单位：秒。默认：10秒。'
          },
          {
            title: '上报信息间隔',
            con: "上报GPS信息的时间间隔。合法值：1-65535，单位：秒。默认：30秒。"
          },
          {
            title: '包含RMC',
            con: '上报的GPS信息是否包含RMC。'
          },
          {
            title: '包含GSA',
            con: '上报的GPS信息是否包含GSA。'
          },
          {
            title: '包含GGA',
            con: '上报的GPS信息是否包含GGA。'
          },
          {
            title: '包含GSV',
            con: '上报的GPS信息是否包含GSV。'
          },
          {
            title: '消息前缀',
            con: '定义上报的GPS信息的前缀。'
          },
          {
            title: '消息后缀',
            con: '定义上报的GPS信息的后缀。'
          },
          {
            title: '目的IP地址',
            con: ''
          },
          {
            title: '服务器地址',
            con: '填写接收GPS信息的服务器地址（IP/域名）。'
          },
          {
            title: '服务器端口',
            con: '填写接收GPS信息的服务器端口。合法值：1-65535。'
          },
          {
            title: '状态',
            con: '显示设备和服务器的连接状态。'
          }
        ]
      },
      serial: {
        title: 'GPS串口转发',
        gpstitle: 'GPS串口转发',
        enable: '启用',
        serial: '串口类型',
        rmc: '包含RMC',
        gsa: '包含GSA',
        gga: '包含GGA',
        gsv: '包含GSV',
        trap: '上报间隔',
        error1: '保存失败，请先配置串口为GPS模式',
        error2: '请至少选择一个',
        notenable: '请先启用GPS功能',
        tip: [
          {
            title: '启用',
            con: '启用后GPS信息将会被转发到指定串口。'
          },
          {
            title: '串口类型',
            con: '选择接收GPS信息的串口，可选“Serial 1" 和 "Serial 2"。',
            51: {
              title: '串口类型',
              con: '选择接收GPS信息的串口，可选“Serial"。'
            }
          },
          {
            title: '上报间隔',
            con: '转发GPS信息的时间间隔。合法值：1-60，单位：秒。默认：30秒。'
          },
          {
            title: '包含RMC',
            con: '上报的GPS信息是否包含RMC。'
          },
          {
            title: '包含GSA',
            con: '上报的GPS信息是否包含GSA。'
          },
          {
            title: '包含GGA',
            con: '上报的GPS信息是否包含GGA。'
          },
          {
            title: '包含GSV',
            con: '上报的GPS信息是否包含GSV。'
          }
        ]
      },
      mqtt: {
        title: 'GPS MQTT转发',
        reportinterval: '上报间隔',
        tip: [
          {
            title: '启用',
            con: '启用后GPS信息将会通过MQTT协议被转发。'
          },
          {
            title: '上报间隔',
            con: '上报GPS信息的时间间隔。合法值：1-65535，单位：秒。默认：30秒。'
          },
          {
            title: '包含RMC',
            con: '上报的GPS信息是否包含RMC。'
          },
          {
            title: '包含GSA',
            con: '上报的GPS信息是否包含GSA。'
          },
          {
            title: '包含GGA',
            con: '上报的GPS信息是否包含GGA。'
          },
          {
            title: '包含GSV',
            con: '上报的GPS信息是否包含GSV。'
          },
          {
            title: 'MQTT连接',
            con: '选择转发GPS数据的MQTT连接，选择“所有”表示转发到所有已添加的MQTT连接。'
          },
          {
            title: '主题',
            con: '设置路由器发布消息的主题。'
          },
          {
            title: '保留标志',
            con: '启用/禁用MQTT的保留标志。'
          },
          {
            title: 'QoS',
            con: '配置转发串口数据消息的QoS等级。'
          },
        ]
      }
    },
    modbus: {
      title: 'Modbus Server',
      modbustcp: {
        title: 'Modbus TCP',
        modbustcplabel: 'Modbus TCP',
        enable: '启用',
        localport: '端口',
        di1address: '数字输入地址',
        di2address: '数字输入2地址',
        do1address: '数字输出地址',
        do2address: '数字输出2地址',
        dierror: '数字输入1地址和数字输入2地址不能相同',
        doerror: '数字输出1地址和数字输出2地址不能相同',
        tip: [
          {
            title: '启用',
            con: '启用/禁用Modbus TCP功能。'
          },
          {
            title: '端口',
            con: '设置路由器监听的端口。合法值：1-65535。'
          },
          {
            title: '数字输入1地址',
            con: '用户自定义数字输入1地址，合法值：0-255。默认：0。'
          },
          {
            title: '数字输入2地址',
            con: '用户自定义数字输入2地址，合法值：0-255。默认：1。'
          },
          {
            title: '数字输出1地址',
            con: '用户自定义数字输出1地址，合法值：0-255。默认：0。'
          },
          {
            title: '数字输出2地址',
            con: '用户自定义数字输出2地址，合法值：0-255。默认：1。'
          }
        ]
      },
      modbusrtu: {
        title: 'Modbus RTU',
        modbusrtulabel: 'Modbus RTU',
        enable: '启用',
        serialmode: '串口模式',
        slaveid: 'Server ID',
        reconnectinterval: '重连时间',
        di1address: '数字输入地址',
        di2address: '数字输入地址',
        do1address: '数字输出地址',
        do2address: '数字输出2地址',
        serverlisttitle: '服务列表',
        serverip: 'IP地址',
        serverport: '端口',
        serverstatus: '状态',
        serial1: 'serial 1',
        serial2: 'serial 2',
        serial: 'serial',
        dierror: '数字输入1地址和数字输入2地址不能相同',
        doerror: '数字输出1地址和数字输出2地址不能相同',
        modeerror: '串口模式未选择Modbus Server',
        tip: [
          {
            title: '启用',
            con: '启用/禁用Modbus RTU'
          },
          {
            title: '串口',
            con: '选择对应的串口。可选项为Serial1，Serial2'
          },
          {
            title: '从站ID',
            con: '路由器作为从站，用户自定义Server ID，合法值：1-247。默认：1。'
          },
          {
            title: '数字输入1地址',
            con: '用户自定义数字输入1地址，合法值：0-255。默认：0。'
          },
          {
            title: '数字输入2地址',
            con: '用户自定义数字输入2地址，合法值：0-255。默认：1。'
          },
          {
            title: '数字输出1地址',
            con: '用户自定义数字输出1地址，合法值：0-255。默认：0。'
          },
          {
            title: '数字输出2地址',
            con: '用户自定义数字输出2地址，合法值：0-255。默认：1。'
          }
        ]
      },
      modbusrtuovertcp: {
        title: 'Modbus RTU Over TCP',
        modbusrtulabel: 'Modbus RTU Over TCP',
        enable: '启用',
        slaveid: 'Server ID',
        reconnectinterval: '重连时间',
        di1address: '数字输入地址',
        di2address: '数字输入2地址',
        do1address: '数字输出地址',
        do2address: '数字输出2地址',
        serverlisttitle: '服务器列表',
        serverip: 'IP地址',
        serverport: '端口',
        serverstatus: '状态',
        deviceid: '设备名称',
        dierror: '数字输入1地址和数字输入2地址不能相同',
        doerror: '数字输出1地址和数字输出2地址不能相同',
        tip: [
          {
            title: '启用',
            con: '启用/禁用Modbus RTU over TCP功能'
          },
          {
            title: '从站ID',
            con: '路由器作为从站，用户自定义Server ID，合法值：1-247。默认：1。'
          },
          {
            title: '设备ID',
            con: '设置设备ID。服务器会获取此项标识给服务器，便于服务器管理多台设备。默认：1.'
          },
          {
            title: '重连间隔',
            con: '当设备与服务器连接失败或连接中断时，两次尝试连接的间隔时间。默认值10s。'
          },
          {
            title: '数字输入1地址',
            con: '用户自定义数字输入1地址，合法值：0-255。默认：0。'
          },
          {
            title: '数字输入2地址',
            con: '用户自定义数字输入2地址，合法值：0-255。默认：1。'
          },
          {
            title: '数字输出1地址',
            con: '用户自定义数字输出1地址，合法值：0-255。默认：0。'
          },
          {
            title: '数字输出2地址',
            con: '用户自定义数字输出2地址，合法值：0-255。默认：1。'
          },
          {
            title: '服务器列表',
            con: ''
          },
          {
            title: 'IP地址',
            con: '输入要连接的服务器的IP地址'
          },
          {
            title: '端口',
            con: '输入要连接的服务器端口号。合法值：0-65535'
          },
          {
            title: '状态',
            con: '显示设备和服务器的连接状态。'
          }
        ]
      }
    },
    modbusclient: {
      title: 'Modbus Client',
      modbusclient: {
        title: 'Modbus Client',
        mastertitle: 'Modbus Client设置',
        enable: '启用',
        readinterval: '读取间隔',
        interval: '间隔时间命令',
        maxretries: '最大重试次数',
        maxresponsetime: '最大响应时间',
        msecond: '毫秒',
        second: '秒',
        error1: '保存失败，请先配置串口为Modbus Client模式',
        channel: '通道',
        read: '读',
        result: '结果',
        tip: [
          {
            title: '启用',
            con: '启用/禁用Modbus Client功能。'
          },
          {
            title: '读取间隔',
            con: '设置执行远程通道读操作的周期时间间隔。当一个周期结束时，设备会等待一段时间，才重新开始新的读操作周期。当读取间隔设置为0时，表示读取全部指令后设备将立即重新开始新的读操作周期。合法值：0-604800, \n默认：0'
          },
          {
            title: '最大重试次数',
            con: '读取失败时，最大重试次数。合法值：0-5，默认：3。'
          },
          {
            title: '最大响应时间',
            con: '设置设备等待执行一个读指令后的最大响应时间。如果超过最大响应时间后，设备都没有获取到指令的响应，就认为此指令读超时。合法值：10-1000，默认：500。'
          },
          {
            title: '间隔时间命令',
            con: '每个指令之间的执行间隔。合法值：10-1000，默认：50。'
          },
          {
            title: '通道',
            con: '选择一个可读取的远程通道。'
          },
          {
            title: '结果',
            con: '从远程通道读取到的数值。'
          }
        ]
      },
      channel: {
        title: '通道',
        channeltitle: '通道设置',
        linktype: '链路类型',
        instructionlabel: '通道设置',
        name: '名称',
        slaveid: 'Server ID',
        address: '地址',
        number: '数目',
        cmd: '指令类型',
        byteorder: '字节顺序',
        ip: 'IP地址',
        port: '端口',
        symbol: '有符号',
        deminal: '小数位',
        alarmlabel: '告警设置',
        condition: '条件',
        ge: '大于(>)',
        le: '小于(<)',
        range: '范围',
        true: 'TRUE',
        false: 'FALSE',
        limit: '阀值',
        limitmin: '最小阀值',
        limitmax: '最大阀值',
        alarmaction: '告警方式',
        sms: '短信',
        email: '邮箱',
        emailgroup: '邮箱群组',
        phone: '电话群组',
        normalcontent: '正常告警内容',
        abnormalcontent: '异常告警内容',
        calarm: '连续警告',
        cmd1: '线圈',
        cmd2: '离散',
        cmd3: '保持寄存器 (INT16)',
        cmd4: '输入寄存器 (INT16)',
        cmd5: '保持寄存器 (INT32)',
        cmd6: '保持寄存器 (Float)',
        normalcon: '提示: $YEAR/$MON/$DAY $TIME，从通道$NAME的地址$ADDRESS 读取到正常数据$VALUE。(异常范围是$CONDITION)',
        abnormalcon: '提示: $YEAR/$MON/$DAY $TIME，从通道$NAME的地址$ADDRESS 读取到异常数据$VALUE。(异常范围是$CONDITION)',
        error1: '保存失败，请先配置串口为Modbus Client模式',
        error2: '保存失败，请先关闭Modbus Client功能',
        transpondlabel: 'TCP转发',
        channeltitle1: '名称',
        transpondip: 'IP',
        transpondport: '端口',
        allchannel: '所有',
        mqtttranspond: 'MQTT转发',
        mqttname: '名称',
        mqtttopic: '主题',
        mqttconnect: 'MQTT连接',
        flag: '保留标志',
        tip: [
          {
            title: '通道设置',
            con: ''
          },
          {
            title: '名称',
            con: '用于标识远程通道,该字段不能为空.'
          },
          {
            title: 'Server ID',
            con: '设置Modbus Server地址。'
          },
          {
            title: '地址',
            con: '执行读取指令时要读取的起始地址'
          },
          {
            title: '数目',
            con: '读取指令的数目'
          },
          {
            title: '指令类型',
            con: '读指令，可以选择线圈, 离散,保持寄存器 (INT16), 输入寄存器 (INT16), 保持寄存器 (INT32), 保持寄存器(Float)'
          },
          {
            title: '链路类型',
            con: '选择TCP'
          },
          {
            title: 'IP地址',
            con: '远端Modbus设备IP地址'
          },
          {
            title: '端口',
            con: '远端Modbus设备端口'
          },
          {
            title: '有符号',
            con: '用于标识此信道值是有符号，默认值：无符号'
          },
          {
            title: '小数位',
            con: '用于指示小数点在读取到的远程通道的值的位置。例如：读取到此远程通道的值为1234，且小数位等于2，那么实际的值为12.34。'
          },
          {
            title: '告警设置',
            con: ''
          },
          {
            title: '名称',
            con: '用于标识远程通道,与指令名称一致'
          },
          {
            title: '条件',
            con: '触发告警的条件'
          },
          {
            title: '最小阀值',
            con: '设置触发告警的最小值。当实际接收值小于该设定值时，触发告警。'
          },
          {
            title: '最大阀值',
            con: '设置触发告警的最大值。当实际接收值大于该设定值时，触发告警。'
          },
          {
            title: '告警方式',
            con: '选择告警方式，如短信，邮件。'
          },
          {
            title: '短信',
            con: '通过发送短信到指定号码告警'
          },
          {
            title: '电话群组',
            con: '选择接收告警的电话群组。'
          },
          {
            title: '邮箱群组',
            con: '选择接受告警的邮箱群组。'
          },
          {
            title: '正常告警内容',
            con: '实际接收值由原来的超过设定的阀值重新恢复到正常值时，路由器将自动消除异常告警，并通过SMS的形式，将设定的正常告警内容发送到指定电话群组。'
          },
          {
            title: '异常告警内容',
            con: '实际接收值超过设定的阀值时，路由器将自动触发告警，并通过SMS的形式，将设定的异常告警内容发送到指定电话群组。'
          },
          {
            title: '连续警告',
            con: '开启此功能后，相同的告警会不断地上报。即，发生多少次告警，路由器就会上报多少次。若不开启此功能，多次相同的告警只会上报一次'
          },
          {
            title: 'TCP转发',
            con: ''
          },
          {
            title: '名称',
            con: 'Modbus Client 通道名称'
          },
          {
            title: '服务器 IP',
            con: '要转发到的服务器的IP地址。'
          },
          {
            title: '端口',
            con: '远端服务器接收数据的端口。'
          },
          {
            title: 'MQTT连接',
            con: '选择转发Modbus数据的MQTT连接，选择“所有”表示转发到所有已添加的MQTT连接。'
          },
          {
            title: '主题',
            con: '设置路由器发布消息的主题。'
          },
          {
            title: '保留标志',
            con: '启用/禁用MQTT的保留标志。'
          },
          {
            title: 'QoS',
            con: '配置转发串口数据消息的QoS等级。'
          },
        ]
      }
    },
    bluetooth: {
      title: '蓝牙',
      general: {
        title: '基础设置',
        generallabel: '基础设置',
        enable: '启用',
        mode: '模式',
        blelabel: 'Intervals Setting',
        kalive: 'Keep Alive Interval',
        statinterval: 'Stat Interval',
        pushtimeout: 'Push Timeout',
        second: 's',
        msecond: 'ms',
        tip: [
          {
            title: '启用',
            con: '启用蓝牙功能'
          },
          {
            title: '模式',
            con: '选择要启用的蓝牙的模式'
          }
        ]
      },
      device: {
        title: '设备',
        availablelabel: '可获取设备',
        scan: '扫描',
        name: '名称',
        mac: 'MAC地址',
        code: '配对码',
        description: '描述',
        connect: '连接',
        pair: '配对',
        selectedlabel: '已选择设备',
        disconnect: '断开连接',
        fail: '失败',
        success: '成功',
        tip: [
          {
            title: '扫描',
            con: '点击开始扫描附近可获取蓝牙设备'
          },
          {
            title: '添加',
            con: '点击手动添加蓝牙设备'
          },
          {
            title: 'MAC地址',
            con: '显示设备的MAC地址'
          },
          {
            title: '连接',
            con: '点击开始连接该设备'
          },
          {
            title: '配对码',
            con: '输入与该设备连接所需的配对码'
          },
          {
            title: '描述',
            con: '输入对该设备的描述'
          },
          {
            title: '配对',
            con: '点击开始配对'
          },
          {
            title: '取消',
            con: '点击取消配对'
          }
        ]
      }
    },
    mqtt: {
      title: 'MQTT',
      status: {
        title: 'MQTT',
        connect: '连接',
        index: '序号',
        name: '名称',
        address: '地址',
        status: '状态',
        general: '常规',
        connected: '已连接',
        connectfail: '连接失败',
        disabled: '未启用',
        enable: '启用',
        serveraddress: 'MQTT服务器地址',
        serverport: 'MQTT服务器端口',
        clinentid: '客户端ID',
        timeout: '连接超时时间(秒)',
        aliveinterval: '保活间隔(秒)',
        autoreconnect: '自动重连',
        reconnectinterval: '重连周期',
        clearsession: '清除会话',
        usercredentials: '用户凭证',
        username: '用户名',
        password: '密码',
        tls: 'TLS',
        mode: '模式',
        certself: '自签名证书',
        cacert: 'CA认证服务器证书',
        rootcert: '根证书',
        clientcert: '客户端证书',
        clientkey: '客户端密钥',
        willmessage: '遗嘱消息',
        willmessagetopic: '遗嘱消息主题',
        qos: '遗嘱消息QoS',
        reservedsign: '遗嘱消息保留标志',
        willmessagepayload: '遗嘱消息',
        requestTopic: '请求主题',
        datatype: '数据类型',
        topic: '主题',
        retainflag: '保留标志',
        systemtopic: '系统状态发布主题',
        reportinterval: '上报周期(秒)',
        samename: 'MQTT连接名称重复！',
        publishname: {
          0: 'System Info',
          1: 'System Status',
          2: 'Cellular',
          3: 'Ethernet',
          4: 'GPS',
        },
        tip: [
          {
            title: '状态',
            con: '显示当前MQTT的连接状态。'
          },
          {
            title: '名称',
            con: 'MQTT连接的名称，在Modbus、GPS、串口等页面中，需要使用该名称来选择转发的MQTT连接。'
          },
          {
            title: '启用',
            con: '启用/禁用MQTT连接。'
          },
          {
            title: 'MQTT服务器地址',
            con: 'MQTT服务器的IP地址或URL'
          },
          {
            title: 'MQTT服务器端口',
            con: 'MQTT服务器提供服务的端口号'
          },
          {
            title: '客户端ID',
            con: '该ID是客户端对服务器的唯一标识。它必须在所有连接到同一台服务器的客户端中是唯一的，是处理QoS级别1和2的消息时的关键信息。'
          },
          {
            title: '连接超时时间',
            con: '当超过该时间，客户端仍然连接不上服务端，客户端将不再尝试连接。 合法值：1-65535，单位：秒。默认：30秒'
          },
          {
            title: '保活间隔',
            con: '当客户端和服务器建立连接后，客户端将定期发送心跳报文给服务器的时间间隔。合法值：1-65535，单位：秒。默认：60秒'
          },
          {
            title: '自动重连',
            con: '启用时，当连接断开，路由器将周期性尝试自动重连。'
          },
          {
            title: '清除会话',
            con: '启用/禁用清除会话。启用时，连接将创建一个临时会话，在客户端断开时，会自动销毁。禁用时，连接将创建一个持久会话，在客户端断开连接时，会话仍然保持并保存离线消息，直到会话超时注销。'
          },
          {
            title: '用户凭证',
            con: '当选择用户凭证作为验证方式时，需要输入验证所需的用户名和密码。'
          },
          {
            title: 'CA认证服务器证书',
            con: '使用设备自带的CA认证的根证书进行验证。'
          },
          {
            title: '自签名证书',
            con: '选择该模式后，用户需要自己上传证书和秘钥进行验证。'
          },
          {
            title: '根证书',
            con: '导入认证所需的根证书。'
          },
          {
            title: '客户端证书',
            con: '导入认证所需的客户端证书。'
          },
          {
            title: '客户端密钥',
            con: '导入认证所需的客户端秘钥。'
          },
          {
            title: '遗嘱消息',
            con: 'MQTT的遗嘱消息会在MQTT客户端异常断开连接时自动发送，通常用于向其他设备或者代理服务器发送设备的状态信息或告知设备的下线状态。'
          },
          {
            title: '数据类型',
            con: '显示通过MQTT进行发送的数据类型。'
          },
          {
            title: '主题',
            con: '路由器进行订阅或发布的MQTT主题。'
          },
          {
            title: '上报周期',
            con: '系统信息通过MQTT消息进行上报的周期。合法值：1-65535，单位：秒。默认：空'
          },
          {
            title: '保留标志',
            con: '启用/禁用MQTT消息的保留标志。启用时，当客户端发布一条消息时，这条消息将被保留在代理服务器上，以便后续订阅该主题的客户端能够接收到该消息。'
          },
          {
            title: 'QoS',
            con: 'QoS 0：最多一次的传输 QoS 1：至少一次的传输，直到收到service的puback，可能导致多次重发。 Qos 2： 只有一次的传输。会确保每个消息都只被接收到的一次，是最安全也是最慢的服务等级。'
          },
        ]
      }
    },
    snmp: {
      title: 'SNMP',
      snmp: {
        title: 'SNMP',
        systemlabel: 'SNMP设置',
        enable: '启用',
        port: '端口',
        snmpversion: '版本',
        snmpv1: 'SNMPv1',
        snmpv2: 'SNMPv2',
        snmpv3: 'SNMPv3',
        location: '本地信息',
        contact: '联系信息',
        tip: [
          {
            title: 'SNMP设置',
            con: '网络管理员可以利用 SNMP 远程管理和配置其下属设备，并对这些设备进行实时监控。'
          },
          {
            title: '启用',
            con: '启用/禁用SNMP功能'
          },
          {
            title: '端口',
            con: '设置SNMP监听端口，合法值：1-65535，默认为161'
          },
          {
            title: '版本',
            con: '选择SNMP版本，支持SNMPv1, SNMPv2, SNMPv3'
          },
          {
            title: '本地信息',
            con: '填写本地位置地址'
          },
          {
            title: '联系信息',
            con: '填写联系信息'
          }
        ]
      },
      view: {
        title: 'MIB视图',
        labeltitle: '视图列表',
        viewname: '视图名',
        viewtype: '视图过滤',
        included: '包含',
        excluded: '排除',
        viewoid: '对象标识符',
        tip: [
          {
            title: '视图名',
            con: '设置MIB视图名称'
          },
          {
            title: '视图过滤',
            con: '用户可选择“包含”和“排除”'
          },
          {
            title: '对象标识符',
            con: '输入对象标识符'
          },
          {
            title: '包含',
            con: '可查询指定MIB节点以内的所有节点'
          },
          {
            title: '排除',
            con: '可查询除指定MIB节点以外的所有节点'
          }
        ]
      },
      vacm: {
        title: 'VACM',
        labeltitle: 'SNMPv1&v2 用户列表',
        community: '共同体',
        permission: '读写权限',
        read: '只读',
        readwrite: '读写',
        mibview: '视图',
        network: '网络',
        v3grouptitle: 'SNMPv3用户组',
        groupname: '组名',
        securitylevel: '安全级别',
        noauth: '无鉴别/无加密',
        authnopriv: '鉴别/无加密',
        authpriv: '鉴别/加密',
        greadview: '只读视图',
        greadwriteview: '读写视图',
        ginfoview: '通知视图',
        v3usertitle: 'SNMPv3用户列表',
        username: '用户名',
        auth: '认证模式',
        none: '无',
        sha: 'SHA',
        md5: 'MD5',
        authpsw: '认证密码',
        encryption: '加密模式',
        aes: 'AES',
        des: 'DES',
        encrypsw: '加密密码',
        tip: [
          {
            title: 'SNMPv1&v2用户列表',
            con: ''
          },
          {
            title: '共同体',
            con: '设置共同体名称'
          },
          {
            title: '读写权限',
            con: '用户可选择“只读”和“读写”'
          },
          {
            title: '视图',
            con: '从MIB视图列表中选择一个要设置权限的MIB视图'
          },
          {
            title: '网络',
            con: '访问MIB视图的外部网络的IP地址及位数'
          },
          {
            title: '读写',
            con: '指定的MIB节点的用户权限为读写'
          },
          {
            title: '只读',
            con: '指定的MIB节点的用户权限为只读'
          },
          {
            title: 'SNMPv3 用户组',
            con: ''
          },
          {
            title: '组名',
            con: '设置用户组名称'
          },
          {
            title: '安全级别',
            con: '选择该组的安全级别，用户可选“无鉴别/无加密”，“鉴别/无加密”，“鉴别/加密”'
          },
          {
            title: '只读视图',
            con: '从MIB视图列表中选择一个要设置为只读权限的MIB视图'
          },
          {
            title: '读写视图',
            con: '从MIB视图列表中选择一个要设置为读写权限的MIB视图'
          },
          {
            title: '通知视图',
            con: '从MIB视图列表中选择一个要设置为通知视图的名称'
          },
          {
            title: 'SNMPv3用户列表',
            con: ''
          },
          {
            title: '用户名',
            con: '设置用户名称'
          },
          {
            title: '组名',
            con: '从用户群组中选择一个要配置的用户组'
          },
          {
            title: '认证模式',
            con: '用户可选择“MD5”，“SHA”和“无”'
          },
          {
            title: '认证密码',
            con: '只有认证模式不为“无”时，才需要输入密码'
          },
          {
            title: '加密模式',
            con: '选择加密模式，用户可选择：“AES", "DES”和“无"'
          },
          {
            title: '加密密码',
            con: '只有加密模式不为“无”加密模式密码才需要输入密码'
          }
        ]
      },
      trap: {
        title: 'Trap',
        traplabel: 'SNMP Trap',
        enable: '启用',
        snmpversion: 'SNMP版本',
        snmpv1: 'SNMPv1',
        snmpv2: 'SNMPv2',
        snmpv3: 'SNMPv3',
        address: '服务器地址',
        port: '端口',
        name: '名字',
        securitylevel: '权限模式',
        security0: '无鉴别/无加密',
        security1: '鉴别/无加密',
        security2: '鉴别/加密',
        authtype: '认证加密',
        auth0: 'MD5',
        auth1: 'SHA',
        authpsw: '密码',
        encrytype: 'Priv加密',
        encry0: 'AES',
        encry1: 'DES',
        encrypsw: '密码',
        tip: [
          {
            title: '启用',
            con: '启用/禁用SNMP Trap功能'
          },
          {
            title: 'SNMP 版本',
            con: '选择SNMP版本，支持SNMPv1, SNMPv2, SNMPv3'
          },
          {
            title: '服务器地址',
            con: '填写管理站(NMS)的IP地址或域名'
          },
          {
            title: '端口',
            con: '填写端口号。合法值：1-65535。默认端口为162'
          },
          {
            title: '名字',
            con: '版本 v1 或 v2c 时填写相应的团体名，版本为 v3 时填写相应的用户名'
          },
          {
            title: '权限模式',
            con: '可选“无鉴别/无加密”、“鉴别/无加密”、“鉴别/加密”'
          }
        ]
      },
      mib: {
        title: 'MIB',
        miblabel: 'MIB文件下载',
        mibfile: 'MIB文件',
        tip: [
          {
            title: 'MIB 文件下载',
            con: '提供获取MIB文件的接口并下载到电脑'
          },
          {
            title: 'MIB 文件',
            con: '选择需要的MIB文件'
          },
          {
            title: '下载',
            con: '点击“下载”以下载选中的MIB文件到电脑上'
          }
        ]
      }
    },
    tr069: {
      title: 'TR-069',
      tr069: {
        title: 'TR-069',
        enable: '启用',
        status: '状态',
        informtime: '最后通知时间',
        acssetting: 'ACS设置',
        acsusername: 'ACS用户名',
        acspassword: 'ACS密码',
        cpesetting: 'CPE设置',
        cpeusername: 'CPE用户名',
        cpepassword: 'CPE密码',
        informenable: '启用周期性通知',
        informinterval: '周期性通知间隔(秒)',
        tip: [
          {
            title: '启用',
            con: '启用/禁用TR-069功能。'
          },
          {
            title: '最后通知时间',
            con: '显示最后一次发送通知消息的时间。'
          },
          {
            title: 'URL',
            con: 'ACS的URL地址。'
          },
          {
            title: 'ACS用户名',
            con: 'CPE向ACS发起连接请求时，ACS对CPE进行认证的用户名。'
          },
          {
            title: 'ACS密码',
            con: 'CPE向ACS发起连接请求时，ACS对CPE进行认证的密码。'
          },
          {
            title: '启用周期性通知',
            con: '启用/禁用周期性通知。'
          },
          {
            title: '周期性通知间隔',
            con: 'CPE向ACS服务器周期性自动上报信息的时间间隔。设置的时间应小于对端ACS的超时时间，若设置的过长可能导致CPE无法正常连接至ACS或连接状态刷新错误。合法值：5-86400，单位：秒。默认值：300秒'
          },
          {
            title: 'CPE用户名',
            con: 'ACS向CPE发起连接请求时，CPE对ACS进行认证的用户名。'
          },
          {
            title: 'CPE密码',
            con: 'ACS向CPE发起连接请求时，CPE对ACS进行认证的密码。'
          }
        ]
      }
    }
  },
  maintenance: {
    title: '维护',
    tools: {
      title: '工具',
      ping: {
        title: 'PING探测',
        pinglabel: 'PING探测',
        host: '主机',
        ping: 'Ping',
        stop: '停止',
        tip: [
          {
            title: 'PING探测',
            con: '提供从路由器 Ping 外网的功能'
          },
          {
            title: '主机',
            con: '需要 Ping 探测的目的主机地址'
          }
        ]
      },
      traceroute: {
        title: '路由探测',
        traceroutelabel: '路由探测',
        host: '主机',
        traceroute: 'Trace',
        stop: '停止',
        tip: [
          {
            title: '路由探测',
            con: '用于检测网络的路由故障'
          },
          {
            title: '主机',
            con: '需要探测的目的主机地址'
          }
        ]
      },
      tcpdump: {
        title: '网络抓包工具',
        tcpdumplabel: '网络抓包工具',
        interface: '网口',
        ip: 'IP地址',
        port: '端口',
        advanced: '高级',
        startbtn: '开始',
        stopbtn: '结束',
        downloadbtn: '下载',
        stoptip: '请及时下载pcap文件，重启时将被清除。',
        advancedtip: '请在该文本框内设置抓包网口、IP地址、端口等其他规则。例如：-i any host 192.168.1.1 and 443。',
        tip: [
          {
            title: '网络抓包工具',
            con: ''
          },
          {
            title: '网口',
            con: '选择要进行抓包动作的网口。下拉框选项有：ANY/LAN/WAN/Cellular/br-lan1/gre0/gretap0/Looplack./WLAN2/tepl0/tunl0/WLAN1（默认为ANY）。'
          },
          {
            title: 'IP地址',
            con: '设置要进行抓包的IP地址。'
          },
          {
            title: '端口',
            con: '设置要进行抓包的端口号。'
          },
          {
            title: '高级',
            con: '设置抓包的规则，格式为tcpdump的参数'
          },
        ]
      },
      qxdmlog: {
        title: 'Qxdmlog',
        stoptip: '请及时下载文件，重启时将被清除。'
      }
    },
    debug: {
      title: '调试',
      "cellular": {
        "title": "蜂窝AT调试",
        "label": "蜂窝调试",
        "command": "命令",
        "checklatest": "查看最新的（行）",
        "result": "结果",
        "downloadTip": "请及时下载log文件，刷新或重启后日志将被清除。",
        "sendSuccess": "发送成功",
        "tip": [
          {
            "title": "命令",
            "con": "输入您要发送给蜂窝模块的AT命令。"
          },
          {
            "title": "查看最新的（行）",
            "con": "指定可查看的最新结果行数。"
          },
          {
            "title": "结果",
            "con": "显示蜂窝模块回应的结果 。"
          }
        ]
      },
      "firewall": {
        "title": "防火墙",
        "label": "防火墙调试",
        "command": "命令",
        "result": "结果",
        "tip": [
          {
            "title": "命令",
            "con": "输入您要发送给防火墙模块的命令。"
          },
          {
            "title": "结果",
            "con": "显示防火墙模块回应的结果 。"
          }
        ]
      }
    },
    log: {
      title: '日志',
      system: {
        title: '系统日志',
        systemlabel: '下载',
        downloadfile: '日志文件',
        loglabel: '日志',
        line: '查看最新的(行)',
        all: '全部',
        clear: '清除日志',
        tip: [
          {
            title: '系统日志',
            con: '系统日志包含了网络和设备的大量信息，包括运行状态、配置变化等'
          },
          {
            title: '下载',
            con: '可以完成日志文件的下载'
          },
          {
            title: '查看最新的（行）',
            con: '可查看最新指定行数的系统日志'
          },
          {
            title: '清除日志',
            con: '可清除当前系统日志信息'
          }
        ]
      },
      "download": {
        "title": "系统日志下载",
        "label": "下载",
        "alldownload": "一键下载",
        "filename": "文件名",
        "filesize": "文件大小/KB",
        "createtime": "创建时间",
        "operation": "操作",
        "tip": [
          {
            "title": "一键下载",
            "con": "下载所有日志文件。"
          }
        ]
      },
      settings: {
        title: '系统日志设置',
        settingslabel: '远程日志服务器',
        remoteenable: '启用',
        remotehost: '系统日志服务器地址',
        remoteport: '端口',
        consolelabel: '串口输出日志',
        consolenable: '启用',
        logfilelabel: '本地存储日志',
        storage: '存储位置',
        size: '大小',
        level: '日志严重等级',
        level1: '紧急',
        level2: '警报',
        level3: '严重',
        level4: '错误',
        level5: '警告',
        level6: '通知',
        level7: '信息',
        level8: '调试',
        error1: 'TF卡异常',
        local: '本地',
        microSD: 'Micro SD',
        ssd: '固态硬盘',
        tip: [
          {
            title: '远程日志服务器',
            con: '设置远程日志服务器，路由器将会把所有的系统日志上传到远程日志服务器'
          },
          {
            title: '启用',
            con: '启用/禁用远程日志功能'
          },
          {
            title: '系统日志服务器地址',
            con: '填写远程日志服务器地址（IP/域名）'
          },
          {
            title: '端口',
            con: '填写远程日志服务器端口'
          },
          // {
          //     title : '串口输出日志',
          //     con : '可以设置将系统日志输出到串口'
          // },
          // {
          //     title : '启用',
          //     con : '启用/禁用串口日志功能'
          // },
          {
            title: '存储位置',
            con: '可将日志文件存储在内存或TF卡'
          },
          {
            title: '大小',
            con: '设置本地存储日志文件的大小'
          },
          {
            title: '日志严重等级',
            con: '日志严重等级列表遵循标准的Syslog协议'
          }
        ]
      }
    },
    upgrade: {
      title: '升级',
      upgrade: {
        title: '升级',
        upgradelabel : '升级',
        curfirmware : '固件版本',
        upfile : '升级文件',
        loading : '设备开始升级，将自动重启',
        loading1 : '重置中，请不要断电',
        importtip : '导入固件中，请不要操作网页',
        withreset : '恢复到出厂设置',
        error : '非法文件',
        error2 : '空间不足，请清除数据',
        error3 : '未知错误',
        tip : [
          {
            title : '升级',
            con : '在软件升级的过程中，请不要在Web上进行任何操作，否则将导致软件升级中断，甚至系统丢失。'
          },
          {
            title : '固件版本',
            con : '显示当前的固件版本'
          },
          {
            title : '恢复到出厂设置',
            con : '若勾选了这个选项，升级后路由器会恢复到出厂设置'
          },
          {
            title : '升级文件',
            con : '点击“浏览”选择需要升级的固件文件，再点击“升级”进行固件升级'
          }
        ]
      }
    },
    backup: {
      title: '备份还原',
      backup: {
        title: '备份还原',
        restorelabel: '导入配置文件',
        configfile: '配置文件',
        backuplabel: '备份配置文件',
        resetlabel: '恢复出厂设置',
        backup: '备份',
        reset: '重置',
        resetmsg: '该操作将会使路由器丢失所有配置，您确定要重置设备到出厂设置？',
        loading: '重置中，请不要断电',
        tip: [
          {
            title: '导入配置文件',
            con: '可以导入想要的参数配置文件'
          },
          {
            title: '配置文件',
            con: '点击“浏览”从电脑选择将要导入到路由器的配置文件。点击“导入”把选中的配置文件导入到路由器'
          },
          {
            title: '备份配置文件',
            con: '可以把配置参数备份成文件'
          },
          {
            title: '备份',
            con: '点击“备份”把当前配置文件备份到电脑'
          },
          {
            title: '恢复出厂设置',
            con: '可以使路由器恢复出厂设置'
          },
          {
            title: '重置',
            con: '点击“Reset”使路由器恢复出厂设置。恢复出厂后，设备会重启'
          }
        ]
      }
    },
    reboot: {
      title: '重启',
      reboot: {
        "title": "重启",
        "reboot_title": "重启设备",
        "labeltitle": "定时重启",
        "enable": "启用",
        "servs": "定时任务",
        "frequency": "频率",
        "cycles": "周期",
        "day": "日",
        "hours": "时",
        "minutes": "分",
        "everyday": "每天",
        "everyweek": "每周",
        "everymonth": "每月",
        "btn": "立即重启",
        rebootmsg: '您确定要重启设备？',
        reboot: '重启',
        loading: '重启中，请稍后……',
        tip: [
          {
            "title": "定时任务",
            "con": "用户可以自定义任务计划，如定时重启设备。"
          },
          {
            "title": "定时任务",
            "con": "选择定时任务的类型。"
          },
          {
            "title": "重启",
            "con": "定时重启路由器。"
          },
          {
            "title": "频率",
            "con": "选择指定任务需执行的频率。"
          },
          {
            "title": "每天",
            "con": "每天执行一次任务。"
          },
          {
            "title": "时/分",
            "con": "选择执行任务的时间点。"
          }
        ]
      }
    }
  },
  app: {
    title: 'APP',
    python: {
      title: 'Python',
      status: {
        title: 'Python',
        pythonlabel: 'Python',
        appstate: 'AppManager运行状态',
        sdkversion: 'SDK版本',
        sdkpath: 'SDK路径',
        availstorage: '可用存储',
        upfile: '上传SDK',
        install: '安装',
        uninstall: '卸载',
        runingstate: '查看',
        loading: '安装中，请稍后……',
        error1: '非法文件',
        error2: '固件版本不匹配',
        error3: '错误的SDK文件',
        error4: '未知错误',
        versionmatch: 'SDK与当前固件版本不匹配，请更新PythonSDK',
        tip: [
          {
            title: 'Python',
            con: '使用该功能需要安装TF卡或SSD。如果在已安装SDK的情况下要安装新的SDK,必须先卸载旧版本的SDK。'
          },
          {
            title: 'AppManager运行状态',
            con: '显示AppManager运行状态，即" "Uninstalled", "Running" 或"Stopped"'
          },
          {
            title: 'SDK版本',
            con: '显示安装的SDK版本'
          },
          {
            title: 'SDK路径',
            con: '显示SDK的安装路径'
          },
          {
            title: '可用存储',
            con: '选择可用存储来安装SDK，如Micro SD或SSD。'
          },
          {
            title: '上传SDK',
            con: '上传SDK包并安装'
          },
          {
            title: '卸载',
            con: '卸载SDK'
          },
          {
            title: '查看',
            con: '查看AppManager管理的应用程序的运行状态并管理'
          }
        ]
      },
      manager: {
        title: 'AppManager配置',
        managerlabel: 'AppManager',
        enable: '启用',
        configlabel: 'App管理',
        id: 'ID',
        command: 'App命令',
        log_size: '日志文件大小(MB)',
        appinfolabel: 'App信息',
        name: 'App名称',
        appversion: 'App版本',
        sdkversion: 'SDK版本',
        sdkuninstall: '卸载',
        accountinfolabel: 'App账号信息',
        username: '用户名',
        oldpsw: '旧密码',
        newpsw: '新密码',
        confirmpsw: '确认密码',
        tip: [
          {
            title: '启用',
            con: '勾选启用Python AppManager后，才能在"Python"页面上点击“查看”按钮来查看AppManagerApp管理的应用程序的运行状态'
          },
          {
            title: 'ID',
            con: '显示导入的App编号'
          },
          {
            title: 'App命令',
            con: '显示导入的App名称'
          },
          {
            title: '日志文件大小(MB)',
            con: '用户自定义日志文件大小，合法值：1-50'
          },
          {
            title: '卸载',
            con: '卸载APP'
          },
          {
            title: 'App名称',
            con: '显示导入的App名称'
          },
          {
            title: 'App版本',
            con: '显示导入的App版本'
          },
          {
            title: 'SDK版本',
            con: '显示导入的App所基于的SDK版本'
          },
          {
            title: 'App账号信息',
            con: '修改密码后需要重新启用appmanage'
          },
          {
            title: '用户名',
            con: '输入用户名，默认为Pyapp（不可更改）'
          },
          {
            title: '旧密码',
            con: '输入旧密码'
          },
          {
            title: '输入新密码',
            con: '输入新密码。限制长度：8-24'
          },
          {
            title: '确认新密码',
            con: '输入新密码。限制长度：8-24'
          },
        ]
      },
      app: {
        title: 'Python APP',
        pythonlabel: '导入App包',
        app: 'App包',
        configlabel: '导入App配置文件',
        install: 'App名称',
        config: 'App配置文件',
        debuglabel: 'Debug脚本',
        debugfile: 'Debug脚本',
        debugtype: 'Debug文件',
        importtip: 'Python将会在导入App包时停止运行并在导入成功后重启。确认导入？',
        confirm: '确认',
        tip: [
          {
            title: 'App包',
            con: '选择Python App包并导入'
          },
          {
            title: 'App名称',
            con: '选择要导入配置的App'
          },
          {
            title: 'App配置文件',
            con: '选择配置文件并导入'
          },
          {
            title: 'Debug文件',
            con: '导出脚本文件'
          },
          {
            title: 'Debug脚本',
            con: '选择需要调试的Python脚本并导入'
          }
        ]
      }
    }
  },
  language: {
    language: '语言',
    en: 'English',
    'zh-cn': '中文'
  },
  tip: {
    datatype: {
      integer: '只允许填写数字',
      digital: '只允许填写数字',
      dialcode: '只能输入 * 和 0-9.',
      int16: '请输入16位无符号整型数',
      'int16_symbol': '请输入16位整型数',
      int32: '请输入32位无符号整型数',
      'int32_symbol': '请输入32位整型数',
      'float_symbol': '请输入浮点数',
      float: '只允许填写数字或"."',
      string: '只允许填写字符或"."',
      string1: '只允许填写数字，"+"，"-"或"."',
      string2: '只允许填写数字或字母',
      character: '只允许填写字母',
      ipv4: '无效的IPv4地址',
      ipv4_1: '无效的IPv4地址',
      ipv6: '无效的IPv6地址',
      ipv6withmask: '请输入有效的IPv6地址及前缀长度，如：2400:3200::1/64 ',
      'ipv4|ipv6': '无效的IP地址',
      multiipv4: '多IP地址，格式为：x.x.x.x or x.x.x.x x.x.x.x or x.x.x.x,x.x.x.x.',
      intipv4: '请输入IP地址（如：192.168.1.1）或者数字',
      domain: '请输入域名',
      ipdomain: '请输入IP地址或域名',
      lusername: '只允许小写字母，数字，"-"或"_"，首字需为字母或"_"',
      husername: '只允许字母，数字，"-"或"_"，首字需为字母',
      username: '只允许字母，数字或"_"，首字需为字母或"_"',
      name: '只允许字母，数字或"_"',
      password: '只允许字母，数字或"_"',
      noblank: '不允许输入空格或者问号',
      charnoblank: '首字需为字母，空格符不可用',
      email: '邮件格式如：support@user.com',
      emailcontent: "不允许输入 !/#;[]\\\"=<>'^%{}I ",
      oid: '只允许使用数字和"."，格式应为x.x.x……',
      bits: '只允许使用数字，"."和"/"，格式应为x.x.x.x / x',
      mac: '请输入有效的MAC地址，格式应为x:x:x:x:x:x',
      ipmask: '请输入有效的ip或ipmask，格式应为x.x.x.x或x.x.x.x / x',
      mask: '请输入有效的掩码，如255.255.255.0',
      "anti-mask": '请输入有效的反掩码，如0.0.0.255',
      'ipv4|v6_mask': '请输入有效的子网掩码或前缀长度',
      port: '请输入有效的端口或端口范围，如1025或1020-1025',
      dquote: '不能为双引号',
      squote: '不能为单引号',
      phone: '只允许使用数字，"+" 和"-"',
      phone1: '只允许使用数字和"+"',
      smspassword: '只允许填写字母，数字，"@"，"#"或"_"',
      privateip: '无效的IP地址.',
      nozero_blank: '不允许输入 0 或 空格',
      nospecialstring: '不允许输入&\\"$\'`|',
      command: '不允许输入;；&',
      nospecialcharacters: '只允许输入英文、数字、!#%*+,-./:<>@[]^_{}~',
      mqttname: '只允许字母，数字，"-"或"_"',
      ddns_username: '0-9, 大小写字母和[]!^:/<>_.~-@%',
      ddns_userid: '0-9, 大小写字母和[]^_@%',
      special_ascii: '数字、英文大小写、ASCII码除空格、\';\'、\'(\'外的其他字符',
      asciiSpace: '数字、英文大小写、ASCII码除\';\'、\'(\'外的其他字符',
      radiusKey: '支持输入1-127位的数字、英文大小写、ASCII码除了空格、逗号、单引号、分号、左括号以外的其他字符',
      mqtt_password: '只允许输入英文、数字、空格、%=&._/!#*+,-:<>@[]^_{}~',
      backet: '不允许输入括号'
    },
    empty: '该字段必填',
    param: '参数无效',
    save_fail: '保存失败，请重试',
    same_topic: '相同连接下主题不能一致',
    save_success: '保存成功',
    upload_fail: '上传失败，请重试',
    upload_error: '上传失败',
    upload_filetype_error: '文件格式不正确',
    delete_error: '删除失败',
    valuelimit: '请输入有效值，限制范围：',
    lengthlimit: '该数据超出长度限制范围',
    adduptomax: '最大添加数量为',
    notsamepsw: '新密码与确认密码不一致',
    lock: '用户名或密码输错达5次，请稍后重试：',
    wrongpsw: '密码错误，请重试',
    applying: '应用中',
    applyfail: '应用失败，请重试',
    applysucess: '应用成功',
    applyreboot: '应用成功，请重启生效，是否立即重启？',
    testemailfail: '邮件测试失败',
    testemailsucs: '邮件测试成功',
    samevalue: '该数值已存在',
    nodelete: "删除失败，该群组名正被引用",
    vacm_delete_error: '该用户在Trap中被使用',
    notsamenetwork: '起始地址和结束地址不在同一个网段',
    starttoend: '起始地址大于结束地址',
    betweenip: '非法IP地址！该IP地址应在IP池外',
    notinvalidnetwork: '非法IP地址！该IP地址应与起始地址/结束地址在同一个网段',
    relaydisabled: '请先禁用DHCP中继功能',
    serverdisabled: '请先禁用DHCP服务器功能',
    usenoedit: "非法操作，该群组名正被引用",
    notvalidpercent: '百分比总和需为100',
    totalbw: '该值需小于总下载带宽',
    aclnotdelete: "非法操作，该ID正被引用",
    tools: '工具被使用中！ 请稍后再试',
    notminlimit: '请至少添加一条数据',
    atleadtoneaction: '请至少选择一个“动作”',
    timeoutless: '该超时值需小于探测间隔时间',
    rebootvalid: '请重启生效',
    gevalue: '字符掩码二进制1长度必须小于"大于前缀长度"',
    levalue: '"小于前缀长度"必须大于等于"大于前缀长度"',
    namenotused: '该用户名无法使用',
    sameport: '保存失败，端口已被占用。',
    minbw: '最小带宽需小于最大带宽',
    backupsame: '主接口和备份接口不能相同',
    nodeletetmp: '删除失败，该数据正被引用',
    limitchannel: '最大阀值需大于最小阀值',
    atleastone: '请至少选择一个',
    configerror: '配置有参数错误。请检查配置。',
    interfaceerror: '端口异常',
    trap_save_error: 'SNMP和SNMP Trap中所选SNMP版本不一致。',
    trap_save_error2: '保存失败，该用户不存在。',
    change_ip_tip: '连接断开，您的IP地址已更改。<br/> 请使用正确的IP地址重新登录。',
    connect_fail_tip: '连接断开，您的网络异常或者IP地址已更改。<br/> 请尝试刷新页面或者用正确的IP地址重新登录。',
    mqttsame: 'MQTT转发规则重复',
    emptyImportTip: '请导入配置文件',
    uplinkOver: '上行主题不能超过10条!',
    downlinkOver: '下行主题不能超过10条!',
    upDownlinkSame: '同样的连接，只允许一个上行或下行',
    mqttTopicSame: '相同连接下主题不能一致',
    lengthLimitOnly: '仅允许输入字符长度为{}的内容',
    nameSame: '名称不能相同',
    onlyString: '只允许填写',
    number: '数字',
    letter: '大小写字母',
    ipMaskFormat: '需要输入形式为x.x.x.x/xx',
    noInput: '不允许输入',
    space: '空格',
    enableSuccess: '启用成功',
    enableFailed: '启用失败',
    disableSuccess: '禁用成功',
    disableFailed: '禁用失败',
  },
  error: {
    "-1": '保存失败，请先配置串口为GPS模式',
    "0": '保存成功'
  },
  code: {
    'undefined': "未知错误：$",
    '10000000': '保存成功',
    '10000001': '未知错误:{}',
    '10000002': '参数{}无效, 原因:{}',
    '10000003': 'I/O错误',
    '10000004': '内存不足',
    '10000005': 'ip地址{}冲突',
    '10000006': '接口名称{}不可用',
    '10000007': '端口{}已被占用',
    '10000008': '用户名{}已被占用',
    '10000009': '密码错误',
    '10000010': '错误代码:$',
    '10000011': '错误代码:$',
    '10000012': '错误代码:$',
    '10000013': '无效IP地址{}',
    '10000014': '接口{}不存在',
    '10000015': '请先配置串口为{}模式',
    '10000016': '请先关闭{}功能',
    '10000017': '网络无法连接',
    '10000018': '非法文件',
    '10000019': '空间不足，请清除数据',
    '10000020': '操作超时',
    '10000021': 'IP地址{}与网关{}必须同网段',
    '10000022': '{}正在引用此号码组，请先取消引用方可删除',
    '10000023': '{}正在引用此邮箱群组，请先取消引用方可删除',
    '10000024': '{}正在引用此SLA，请先取消引用方可删除',
    '10000025': '{}正在引用此TRACK，请先取消引用方可删除',
    '10000026': '文件格式不正确',
    '10000027': '请先开启{}功能',
    '10000028': '启用待机模式，点击【应用】10min后路由器将进入待机模式',
    '10000029': '请先删除已绑定的MQTT转发规则',

    '30201001': '激活设备，授权码错误。',
    '30201002': '激活失败，账户名或密码错误。',
    '30201003': '激活失败，DeviceHub可允许连接设备数量已经达到最大值。',
    '30201004': '激活失败，本台设备已被其他账户激活。',
    '30201005': '激活失败，设备信息和设备管理服务器的信息不一致。',
    '30201006': '激活失败，网络异常。',
    '30201007': '激活失败，未知错误。',

    '30301001': '请检查邮箱账号密码是否正确',
    '30301002': '请检查SMTP服务器配置是否正确',
    '30301003': '测试邮件已发出',
    '30301004': '端口设置错误',

    '40401001': '请先配置DI并开启',

    '50101001': '高级选项存在语法错误',

    '50201001' : '请确认是否强制升级',
    '50201002' : '升级镜像不可用，设备将重启',

    '60101001' : '固件版本不匹配',
    '60102001': '密码修改成功，请重启appmanager'
  },
  operation: {
    operation: '操作',
    all: '全部',
    add: '添加',
    apply: '应用',
    "delete": '删除',
    save: '保存',
    saveapply: '保存&应用',
    "import": '导入',
    "export": '导出',
    brower: '浏览',
    rebootnow: '立即重启',
    later: '稍后重启',
    reapply: '应用',
    cancel: '取消',
    download: '下载',
    gotext :  'Go to:  ',
    gobtn :  'GO',
    pagerstring :  '当前 {current_page}/{max_page}',
    confirm : '保存',
    concel : '取消',
    yes : '是',
    no : '否',
    ok : '确认',
    send: '发送',
    search: '搜索',
    expand: '展开',
    collapse: '收起',
  },
  template: {
    status: {
      0: '未读',
      1: '已读',
      2 : '断开',
      3 : '已连接',
      4: '在线',
      5: '离线',
      10 : '上线',
      11 : '下线',
      20 : '下线',
      21 : '上线',
      22 : 'standby',
      30 : '运行',
      31 : '禁用',
      32 : '未连接',
      33 : '已连接',
      34 : '错误',
      40 : '禁用',
      41 : '启用',
      50 : '无GPS模块',
      51 : '未启用',
      52 : '信号弱',
      53 : '正常',
      99 : '禁用',
      100 : '备份',
      101 : '主路由',
      200 : '未连接',
      201 : '已连接',
      202 : '正在连接',
      203 : '正在断开',
      300 : '未连接',
      301 : '正在连接',
      302 : '已连接',
      303 : '连接失败。（网络异常。）',
      304 : '连接失败。（授权码错误。）',
      305 : '连接失败。（Milesight VPN可允许连接设备数量已经达到最大值）',
      306 : '连接失败。（未知错误）',
      400 : '正在连接',
      401 : '连接失败：需要进行身份验证',
      402 : '连接失败：访问被拒绝，可能由于权限不足或其他安全原因',
      403 : '连接失败：网络不存在',
      404 : '连接失败：端口错误',
      405 : '连接失败：客户端版本过旧，需要更新到最新版本'
    },
    eventid: {
      4001: 'Memory Low',
      4002: 'Digital Input High',
      4003: '蜂窝网络上线',
      4004: '蜂窝网络掉线',
      4005: 'WAN 连接成功',
      4006: 'WAN 连接失败',
      4007: 'VPN上线',
      4008: 'VPN掉线',
      4009: '数字输入1',
      4010: '数字输入1',
      4011: '数字输入2',
      4012: '数字输入2',
      4013: '收到短信',
      4014: '发送短信失败',
      4015: '数字输出1',
      4016: '数字输出1',
      4017: '数字输出2',
      4018: '数字输出2',
      4019: '系统启动',
      4020: '系统重启',
      4021: '系统时间更新',
      4022: '蜂窝统计数据清除',
      4023: '蜂窝网流量临近阀值',
      4024: '蜂窝网流量超出阀值',
      4025: '信号质量差',
      4026: '链路切换',
      4027: 'WLAN（作为接入点）有客户端接入',
      4028: 'WLAN（作为接入点）有客户端断开',
      4029: 'WLAN（作为客户端）连接成功',
      4030: 'WLAN（作为客户端）连接断开',
      4031: 'WLAN2成功启用（作为接入点）',
      4032: 'WLAN2停止运行（作为接入点）',
      4033: 'WLAN2成功启用（作为客户端）',
      4034: 'WLAN2停止运行（作为客户端）',
      4099: 'TEST',
      4041: '路由器进入待机',
      4042: '路由器唤醒',
      4043: '接入UPS外部电源供电',
      4044: '接入UPS内置电池供电',
      4045: 'UPS电量低(20%)',
      4046: 'UPS充电异常',
      4047: '断开UPS',
    },
    action: {
      1: '允许',
      2: '拒绝'
    },
    protocol: {
      0: 'ip',
      1: 'icmp',
      6: 'tcp',
      17: 'udp'
    },
    type: {
      "-1": '禁用',
      0: '静态IP地址',
      1: 'DHCP客户端',
      2: 'PPPOE',
      3: 'DHCPv6 客户端'
    },
    register: {
      0: 'Unregisted',
      1: 'Registed'
    },
    auth: {
      0: 'WEP',
      1: 'WPA-PSK/WPA2-PSK'
    },
    encry: {
      0: 'AES'
    },
    state: {
      0: '未插入',
      1: '不可用',
      2: '可用',
      3: '格式化中'
    },
    "ip_status": {
      "-2": '-',
      "-1": '',
      0: '断开',
      1: '连接'
    },
    "broadcast_ssid": {
      "-2": '-',
      "-1": '',
      0: '禁用',
      1: '启用'
    },
    stp: {
      '-1': '-',
      0: '禁用',
      1: '启用'
    },
    enabled: {
      0: '禁用',
      1: '启用',
      2: '启用失败'
    },
    "cellular_status": {
      1: "No SIM Card",
      2: "SIM Card Error",
      3: "Dial Number Required",
      4: "Pin Error",
      5: "Pin Required",
      6: "PUK Required",
      7: "SMS Center Number Required",
      8: "USSD Send Failed",
      9: "No Signal",
      10: "Ringing",
      11: "SMS Send Failed",
      12: "Ready",
      13: "Down"
    },
    conn_status: {
      1: '已连接',
      2: '连接失败',
      3: '未启用',
      4: '-'
    },
    connect_state: {
      0: '未连接',
      1: '已连接',
    }
  },
  other: {
    setting: '修改密码',
    logout: '退出',
    logouttip: '是否确定退出?',
    pswchange1: '为了您的设备安全，请及时',
    pswchange2: '修改默认密码',
    pswchange3: '!',
    upgradetitle : "提示",
    upgradecon1 : "抱歉，升级失败：空间不足，请清除数据。",
    upgradecon2 : "抱歉，升级失败：镜像文件不可用。",
    upgradecon3 : "抱歉，升级失败：未知错误。",
    upgradecon0 : "是否现在就重新升级？",
    footercheck : "不再提醒"
  },
  week: [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ],
  weekshort: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日" ],
  weekmin: [ "日", "一", "二", "三", "四", "五", "六", "日" ],
  months: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  monthsshort: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
  today: '今天',
  meridiem: [ "上午", "下午" ],
  mobile: {
    detail: '详细信息',
    savetitle: '提示',
    savefail: '保存失败',
    savebtn: '确认',
    deletetitle: '操作确认',
    deletemsg: '确认删除？',
    deletecancel: '取消',
    deleteconfirm: '确认',
    tipheader: '提示',
    tipfooter: '确认',
    setting: '设置'
  },
  time: {
    hour: '小时',
    minute: '分钟',
    second: '秒'
  }
};

export default language_class;
