// 引入 Axios 库
const axios = require("axios");

let host = "";
if (typeof window !== "undefined") {
  host = window.location.origin;
}

const [url, setUrl] = useState("");
const [target, setTarget] = useState("clash");

const convertedUrl = `${host}/api/convert?url=${encodeURIComponent(
  url
)}&target=${target}`;

let urlHost = "";
try {
  urlHost = new URL(url).hostname;
} catch (error) {
  // Ignore
}

// 异步函数来生成 YAML 内容
async function generateYAMLContent(url) {
  const yamlContent = `
  mixed-port: 7890
  allow-lan: true
  mode: Rule
  log-level: info
  ipv6: false
  
  dns:
    enable: true
    listen: 127.0.0.1:5335
    default-nameserver: [180.184.1.1, 119.29.29.29, 223.5.5.5]
    ipv6: false
    use-hosts: true
    enhanced-mode: fake-ip
    fake-ip-filter: ["*.n.n.srv.nintendo.net", +.stun.playstation.net, xbox.*.*.microsoft.com, "*.msftncsi.com", "*.msftconnecttest.com", WORKGROUP, "*.lan", stun.*.*.*, stun.*.*, time.windows.com, time.nist.gov, time.apple.com, time.asia.apple.com, "*.ntp.org.cn", "*.openwrt.pool.ntp.org", time1.cloud.tencent.com, time.ustc.edu.cn, pool.ntp.org, ntp.ubuntu.com, "*.*.xboxlive.com", speedtest.cros.wr.pvp.net]
    nameserver: [tls://223.5.5.5:853, https://223.6.6.6/dns-query, https://120.53.53.53/dns-query]
    nameserver-policy: {+.tmall.com: 223.5.5.5, +.taobao.com: 223.5.5.5, +.alicdn.com: 223.5.5.5, +.aliyun.com: 223.5.5.5, +.alipay.com: 223.5.5.5, +.alibaba.com: 223.5.5.5, +.qq.com: 119.29.29.29, +.tencent.com: 119.29.29.29, +.weixin.com: 119.29.29.29, +.qpic.cn: 119.29.29.29, +.jd.com: 119.29.29.29, +.bilibili.com: 119.29.29.29, +.hdslb.com: 119.29.29.29, +.163.com: 119.29.29.29, +.126.com: 119.29.29.29, +.126.net: 119.29.29.29, +.127.net: 119.29.29.29, +.netease.com: 119.29.29.29, +.baidu.com: 223.5.5.5, +.bdstatic.com: 223.5.5.5, +.bilivideo.+: 119.29.29.29, +.iqiyi.com: 119.29.29.29, +.douyinvod.com: 180.184.1.1, +.douyin.com: 180.184.1.1, +.douyincdn.com: 180.184.1.1, +.douyinpic.com: 180.184.1.1, +.feishu.cn: 180.184.1.1}
    fallback: [https://101.101.101.101/dns-query, https://public.dns.iij.jp/dns-query, https://208.67.220.220/dns-query]
    fallback-filter: {geoip: true, ipcidr: [240.0.0.0/4, 0.0.0.0/32, 223.75.236.241/32, 182.43.124.6/32, 106.74.25.198/32, 183.192.65.101/32], domain: [+.google.cn, +.paoluz.com, +.paoluz.link, +.paoluz.xyz, +.sodacity-funk.xyz, +.nloli.xyz, +.bianyuan.xyz, +.happynothings031.xyz, +.jsdelivr.net, +.proton.me]}
  
  proxy-providers:
    ${urlHost || "provider1"}:
      type: http
      url: ${convertedUrl}
      interval: 3600
      path: ./${urlHost || "provider1"}.yaml
      health-check:
        enable: true
        interval: 600
        # lazy: true
        url: http://www.gstatic.com/generate_204
  
  proxy-groups:
    - name: 🚀 节点选择
      type: select
      proxies:
        - ♻️ 自动选择
        - 🔰 香港
        - 🔰 美国
        - 🔰 日本
        - 🔰 英国
        - 🕳 全球直连
  
  
    - name: ♻️ 自动选择
      type: url-test
      url: http://www.gstatic.com/generate_204
      interval: 1800
      tolerance: 80
      use:
        - ${urlHost || "provider1"}
      
    - name: 🚀 所有节点
      type: select
      url: http://www.gstatic.com/generate_204
      interval: 3600
      use:
        - ${urlHost || "provider1"}
  
    - name: 🔰 香港
      type: url-test
      use:
        - ${urlHost || "provider1"}
      tolerance: 50
      url: http://www.gstatic.com/generate_204    
      interval: 300
      # disable-udp: true    #是否关闭UDP
      filter: 香港
  
    - name: 🔰 美国
      type: url-test
      use:
        - ${urlHost || "provider1"}
      tolerance: 50
      url: http://www.gstatic.com/generate_204    
      interval: 300
      # disable-udp: true    #是否关闭UDP
      filter: 美国
  
    - name: 🔰 日本
      type: url-test
      use:
        - ${urlHost || "provider1"}
      tolerance: 50
      url: http://www.gstatic.com/generate_204    
      interval: 300
      # disable-udp: true    #是否关闭UDP
      filter: 日本
  
    - name: 🔰 英国
      type: url-test
      use:
        - ${urlHost || "provider1"}
      tolerance: 50
      url: http://www.gstatic.com/generate_204    
      interval: 300
      # disable-udp: true    #是否关闭UDP
      filter: 英国
  
    - name: 🔰 台湾
      type: url-test
      use:
        - ${urlHost || "provider1"}
      tolerance: 50
      url: http://www.gstatic.com/generate_204    
      interval: 300
      # disable-udp: true    #是否关闭UDP
      filter: 台湾
  
    - name: 🕳 全球直连
      type: select
      proxies:
        - DIRECT
  
    - name: 🍎 苹果服务
      type: select
      proxies:
        - 🕳 全球直连
        - 🚀 节点选择
  
    - name: Ⓜ️ OneDrive
      type: select
      proxies:
        - 🕳 全球直连
        - 🚀 节点选择
  
    - name: Ⓜ️ 微软服务
      type: select
      proxies:
        - 🕳 全球直连
        - 🚀 节点选择
  
    - name: 📱 电报信息
      type: select
      proxies:
        - 🔰 香港
        - 🚀 节点选择
      use:
        - ${urlHost || "provider1"}
  
    - name: 🎮 游戏服务
      type: select
      proxies:
        - 🕳 全球直连
        - 🚀 节点选择
      use:
        - ${urlHost || "provider1"}
  
    - name: 💰 PayPal
      type: select
      proxies:
        - 🕳 全球直连
      use:
        - ${urlHost || "provider1"}
  
    - name: 📽 国外媒体
      type: select
      proxies:
        - 🚀 节点选择
        - 🕳 全球直连
      use:
        - ${urlHost || "provider1"}
  
    - name: 🆎 AdBlock
      type: select
      proxies:
        - REJECT
        - 🕳 全球直连
        - 🚀 节点选择
  
    - name: 📡 故障转移
      type: fallback         #通过httping URL 当没有ping值时 按顺序自动切换下一个节点
      proxies: # 按顺序优先级填写
        - 🔰 香港
        - 🔰 美国
        - 🔰 台湾
      url: 'http://www.youtube.com/generate_204'
      interval: 300
  
    - name: 📹 YouTube Premium
      type: select
      use:
        - ${urlHost || "provider1"}
      proxies:
        - 🚀 节点选择
  
    - name: 🐟 漏网之鱼
      type: select
      proxies:
        - 🚀 节点选择
        - 🕳 全球直连
  
  # 规则地址
  rule-providers:
    LocalAreaNetwork: # Provider 名称
      type: http
      behavior: classical # domain, ipcidr or classical (premium core only)
      path: ./rule_provider/LocalAreaNetwork.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Lan/Lan.yaml
      interval: 86400
  
    UnBan:
      type: http
      behavior: classical
      path: ./rule_provider/UnBan.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Direct/Direct.yaml
      interval: 86400
  
    NTP-Service:
      type: http
      behavior: classical
      path: ./rule_provider/NTP-Service.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/NTPService/NTPService.yaml
      interval: 86400
      
    youtube:
      type: http
      behavior: classical
      path: ./rule_provider/youtube.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/YouTube/YouTube.yaml
      interval: 86400
      
    youtubemusic:
      type: http
      behavior: classical
      path: ./rule_provider/youtubemusic.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/YouTubeMusic/YouTubeMusic.yaml
      interval: 86400
      
    PayPal:
      type: http
      behavior: classical
      path: ./rule_provider/PayPal.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/PayPal/PayPal.yaml
      interval: 86400
  
    zhihu:
      type: http
      behavior: classical
      path: ./rule_provider/zhihu.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/ZhihuAds/ZhihuAds.yaml
      interval: 86400
  
    Advertising:
      type: http
      behavior: classical
      path: ./rule_provider/Advertising.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Advertising/Advertising_Classical.yaml
      interval: 86400
      
    OneDrive:
      type: http
      behavior: classical
      path: ./rule_provider/OneDrive.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/OneDrive/OneDrive.yaml
      interval: 86400
  
    Microsoft:
      type: http
      behavior: classical
      path: ./rule_provider/Microsoft.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Microsoft/Microsoft.yaml
      interval: 86400
      
    Apple:
      type: http
      behavior: classical
      path: ./rule_provider/Apple.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Apple/Apple.yaml
      interval: 86400
  
    Telegram:
      type: http
      behavior: classical
      path: ./rule_provider/Telegram.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Telegram/Telegram.yaml
      interval: 86400
      
    GlobalMedia:
      type: http
      behavior: classical
      path: ./rule_provider/GlobalMedia.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/GlobalMedia/GlobalMedia_Classical.yaml
      interval: 86400
      
    PrivateTracker:
      type: http
      behavior: classical
      path: ./rule_provider/PrivateTracker.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/PrivateTracker/PrivateTracker.yaml
      interval: 86400
      
    Game:
      type: http
      behavior: classical
      path: ./rule_provider/Game.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Game/Game.yaml
      interval: 86400
      
    PROXY:
      type: http
      behavior: classical
      path: ./rule_provider/PROXY.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Proxy/Proxy_Classical.yaml
      interval: 86400
      
    CloudCN:
      type: http
      behavior: classical
      path: ./rule_provider/CloudCN.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Cloud/CloudCN/CloudCN.yaml
      interval: 86400
      
    ChinaMax:
      type: http
      behavior: classical
      path: ./rule_provider/ChinaMax.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/ChinaMax/ChinaMax_Classical.yaml
      interval: 86400
  
    OpenAI:
      type: http
      behavior: classical
      path: ./rule_provider/OpenAI.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/OpenAI/OpenAI.yaml
      interval: 86400
  
    Figma:
      type: http
      behavior: classical
      path: ./rule_provider/Figma.yaml
      url: http://gitlab.entertang.work/clash/ios_scripts_rule/-/raw/master/rule/Clash/Figma/Figma.yaml
      interval: 86400
  
  # 规则
  rules:
    - PROCESS-NAME,v2ray,DIRECT
    - PROCESS-NAME,xray,DIRECT
    - PROCESS-NAME,naive,DIRECT
    - PROCESS-NAME,trojan,DIRECT
    - PROCESS-NAME,trojan-go,DIRECT
    - PROCESS-NAME,ss-local,DIRECT
    - PROCESS-NAME,privoxy,DIRECT
    - PROCESS-NAME,leaf,DIRECT
    - PROCESS-NAME,v2ray.exe,DIRECT
    - PROCESS-NAME,xray.exe,DIRECT
    - PROCESS-NAME,naive.exe,DIRECT
    - PROCESS-NAME,trojan.exe,DIRECT
    - PROCESS-NAME,trojan-go.exe,DIRECT
    - PROCESS-NAME,ss-local.exe,DIRECT
    - PROCESS-NAME,privoxy.exe,DIRECT
    - PROCESS-NAME,leaf.exe,DIRECT
    - PROCESS-NAME,Surge,DIRECT
    - PROCESS-NAME,Surge 2,DIRECT
    - PROCESS-NAME,Surge 3,DIRECT
    - PROCESS-NAME,Surge 4,DIRECT
    - PROCESS-NAME,Surge%202,DIRECT
    - PROCESS-NAME,Surge%203,DIRECT
    - PROCESS-NAME,Surge%204,DIRECT
    - PROCESS-NAME,Thunder,DIRECT
    - PROCESS-NAME,DownloadService,DIRECT
    - PROCESS-NAME,qBittorrent,DIRECT
    - PROCESS-NAME,Transmission,DIRECT
    - PROCESS-NAME,fdm,DIRECT
    - PROCESS-NAME,aria2c,DIRECT
    - PROCESS-NAME,Folx,DIRECT
    - PROCESS-NAME,NetTransport,DIRECT
    - PROCESS-NAME,uTorrent,DIRECT
    - PROCESS-NAME,WebTorrent,DIRECT
    - PROCESS-NAME,aria2c.exe,DIRECT
    - PROCESS-NAME,BitComet.exe,DIRECT
    - PROCESS-NAME,fdm.exe,DIRECT
    - PROCESS-NAME,NetTransport.exe,DIRECT
    - PROCESS-NAME,qbittorrent.exe,DIRECT
    - PROCESS-NAME,Thunder.exe,DIRECT
    - PROCESS-NAME,ThunderVIP.exe,DIRECT
    - PROCESS-NAME,transmission-daemon.exe,DIRECT
    - PROCESS-NAME,transmission-qt.exe,DIRECT
    - PROCESS-NAME,uTorrent.exe,DIRECT
    - PROCESS-NAME,WebTorrent.exe,DIRECT
    - DOMAIN,clash.razord.top,DIRECT
    - DOMAIN,yacd.haishan.me,DIRECT
    # 这些是自定义规则，想要的可以继续加
    - DOMAIN-SUFFIX,tongji.baidu.com,DIRECT
    - DOMAIN-SUFFIX,click.simba.taobao.com,DIRECT
    #  - DOMAIN-SUFFIX,freenom.com,🚀 节点选择
    #  - DOMAIN-SUFFIX,line.games,🎮 游戏服务
    #  - DOMAIN-SUFFIX,gameguard.co.kr,🎮 游戏服务
    # 下面的规则是通过上面的rule-provider来确定的
    # - RULE-SET,AAA-daili,🚀 节点选择
    - RULE-SET,LocalAreaNetwork,🕳 全球直连
    - RULE-SET,UnBan,🕳 全球直连
    - RULE-SET,NTP-Service,🕳 全球直连
    - RULE-SET,PayPal,💰 PayPal
    - RULE-SET,OpenAI,🔰 美国
    - RULE-SET,Figma,🕳 全球直连
    - RULE-SET,zhihu,🆎 AdBlock
    - RULE-SET,Advertising,🆎 AdBlock
    - RULE-SET,youtube,📹 YouTube Premium
    - RULE-SET,youtubemusic,📹 YouTube Premium
    - RULE-SET,OneDrive,Ⓜ️ OneDrive
    - RULE-SET,Microsoft,Ⓜ️ 微软服务
    - RULE-SET,Apple,🍎 苹果服务
    - RULE-SET,Telegram,📱 电报信息
    - RULE-SET,GlobalMedia,📽 国外媒体
    - RULE-SET,PrivateTracker,🕳 全球直连
    - RULE-SET,Game,🎮 游戏服务
    - RULE-SET,CloudCN,🕳 全球直连
    - RULE-SET,ChinaMax,🕳 全球直连
    - RULE-SET,PROXY,🚀 节点选择
    - GEOIP,CN,DIRECT
    - MATCH,🐟 漏网之鱼
  `;

  return yamlContent;
}

// 处理 GET 请求
async function handleGETRequest() {
  const urlParam = new URLSearchParams(window.location.search);
  const url = urlParam.get("url");

  if (url) {
    try {
      const yamlContent = await generateYAMLContent(url);
      if (yamlContent) {
        console.log(yamlContent); // 输出 YAML 内容到控制台
        return yamlContent;
      }
    } catch (error) {
      console.error("生成 YAML 内容失败：", error);
    }
  } else {
    console.error("未提供有效 URL 参数");
  }

  return null;
}

// 调用处理 GET 请求的函数
handleGETRequest();

// 如果需要将生成的 YAML 内容返回给前端，你可以使用服务器端的响应机制