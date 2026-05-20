"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  AlertTriangle, 
  MapPin, 
  Filter, 
  UploadCloud, 
  CheckCircle, 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  Trash2, 
  Plus, 
  Search, 
  Calendar,
  Layers
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

// 定义缺陷类型
type DefectType = "crack" | "pothole" | "flooding" | "signage";
// 严重等级
type Severity = "low" | "medium" | "high" | "critical";

interface Defect {
  id: string;
  type: DefectType;
  severity: Severity;
  x: number; // 0 - 100 比例
  y: number; // 0 - 100 比例
  address: string;
  reportedAt: string;
  reporter: string;
  description: string;
  imageUrl?: string;
}

// 模拟初始缺陷数据
const INITIAL_DEFECTS: Defect[] = [
  {
    id: "DEF-001",
    type: "crack",
    severity: "medium",
    x: 35,
    y: 42,
    address: "中山东路 180 号附近",
    reportedAt: "2026-05-18",
    reporter: "AI 巡检车-03 号",
    description: "发现横向反射裂缝，裂缝宽度约 1.5cm，深度约 3cm，长度 2.4 米，急需灌缝处理。",
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400"
  },
  {
    id: "DEF-002",
    type: "pothole",
    severity: "critical",
    x: 62,
    y: 28,
    address: "延安西路与华山路交汇口",
    reportedAt: "2026-05-19",
    reporter: "市政物联网传感器-B8",
    description: "严重路面破损形成深度坑洼，直径达 45cm，深达 8cm，存在明显爆胎与车辆受损隐患！",
    imageUrl: "https://images.unsplash.com/photo-1599740831464-54fd4e2b78d2?q=80&w=400"
  },
  {
    id: "DEF-003",
    type: "flooding",
    severity: "high",
    x: 48,
    y: 65,
    address: "世纪大道东方明珠下沉广场旁",
    reportedAt: "2026-05-20",
    reporter: "城市积水监测点-09",
    description: "排水孔堵塞导致局部积水，水深约 12cm，水浸面积 15 平方米，影响非机动车道正常通行。",
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=400"
  },
  {
    id: "DEF-004",
    type: "signage",
    severity: "low",
    x: 20,
    y: 75,
    address: "南京东路 345 号人行道",
    reportedAt: "2026-05-20",
    reporter: "人工巡检-李明",
    description: "单向禁止通行标志指示牌倾斜约 15 度，反光膜轻微磨损褪色，但不影响视认度。",
    imageUrl: "https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=400"
  },
  {
    id: "DEF-005",
    type: "crack",
    severity: "high",
    x: 78,
    y: 58,
    address: "淮海中路环贸路段",
    reportedAt: "2026-05-19",
    reporter: "AI 巡检车-01 号",
    description: "纵向网状龟裂严重，总长度达 5 米，并出现块状剥落迹象，需铣刨后进行局部沥青摊铺。",
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400"
  }
];

export default function RoadwatchUI() {
  const [defects, setDefects] = useState<Defect[]>(INITIAL_DEFECTS);
  const [selectedDefect, setSelectedDefect] = useState<Defect | null>(INITIAL_DEFECTS[1]);
  
  // 多维过滤状态
  const [filterType, setFilterType] = useState<DefectType | "all">("all");
  const [filterSeverity, setFilterSeverity] = useState<Severity | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Canvas 引用
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // 模拟缺陷上传与标记状态
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [mockPreviewUrl, setMockPreviewUrl] = useState<string | null>(null);

  // 过滤后的缺陷列表
  const filteredDefects = useMemo(() => {
    return defects.filter(defect => {
      const matchesType = filterType === "all" || defect.type === filterType;
      const matchesSeverity = filterSeverity === "all" || defect.severity === filterSeverity;
      const matchesSearch = defect.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            defect.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            defect.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSeverity && matchesSearch;
    });
  }, [defects, filterType, filterSeverity, searchTerm]);

  // 严重度颜色映射
  const severityColors: Record<Severity, { bg: string, text: string, border: string, pulseColor: string, hex: string }> = {
    low: { 
      bg: "bg-blue-500/10", 
      text: "text-blue-400", 
      border: "border-blue-500/20", 
      pulseColor: "rgba(59, 130, 246, 0.4)",
      hex: "#3b82f6" 
    },
    medium: { 
      bg: "bg-yellow-500/10", 
      text: "text-yellow-400", 
      border: "border-yellow-500/20", 
      pulseColor: "rgba(234, 179, 8, 0.4)",
      hex: "#eab308" 
    },
    high: { 
      bg: "bg-orange-500/10", 
      text: "text-orange-400", 
      border: "border-orange-500/20", 
      pulseColor: "rgba(249, 115, 22, 0.4)",
      hex: "#f97316" 
    },
    critical: { 
      bg: "bg-red-500/10", 
      text: "text-red-400", 
      border: "border-red-500/20", 
      pulseColor: "rgba(239, 68, 68, 0.5)",
      hex: "#ef4444" 
    }
  };

  // 缺陷类型翻译映射
  const defectTypeLabels: Record<DefectType, string> = {
    crack: "路面裂缝",
    pothole: "破损坑洼",
    flooding: "积水沉陷",
    signage: "交通标牌缺陷"
  };

  const defectTypeColors: Record<DefectType, string> = {
    crack: "#06b6d4",
    pothole: "#f97316",
    flooding: "#3b82f6",
    signage: "#a855f7"
  };

  // Recharts 饼图统计数据
  const pieData = useMemo(() => {
    const counts: Record<DefectType, number> = { crack: 0, pothole: 0, flooding: 0, signage: 0 };
    filteredDefects.forEach(d => {
      counts[d.type] += 1;
    });
    return Object.keys(counts).map(key => ({
      name: defectTypeLabels[key as DefectType],
      value: counts[key as DefectType],
      color: defectTypeColors[key as DefectType]
    })).filter(item => item.value > 0);
  }, [filteredDefects]);

  // Recharts 面积图（模拟时间趋势）
  const areaData = [
    { name: "5-15", crack: 2, pothole: 1, flooding: 0 },
    { name: "5-16", crack: 4, pothole: 2, flooding: 1 },
    { name: "5-17", crack: 3, pothole: 1, flooding: 2 },
    { name: "5-18", crack: 5, pothole: 3, flooding: 1 },
    { name: "5-19", crack: 6, pothole: 4, flooding: 2 },
    { name: "5-20", crack: 8, pothole: 5, flooding: 3 }
  ];

  // 动画控制：用于 Canvas 自绘地图
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let pulseProgress = 0;

    // 随机的巡检车辆粒子
    const vehicles = [
      { route: [[20, 20], [80, 20], [80, 80], [20, 80]], speed: 0.005, progress: 0.1, color: "#10b981" },
      { route: [[10, 50], [90, 50]], speed: 0.008, progress: 0.5, color: "#06b6d4" },
      { route: [[50, 10], [50, 90]], speed: 0.006, progress: 0.8, color: "#f59e0b" }
    ];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 核心绘制循环
    const render = () => {
      pulseProgress = (pulseProgress + 0.02) % 1;
      
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      const viewW = width / window.devicePixelRatio;
      const viewH = height / window.devicePixelRatio;

      // 1. 绘制科幻格栅背景
      ctx.strokeStyle = "rgba(99, 102, 241, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < viewW; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, viewH);
        ctx.stroke();
      }
      for (let y = 0; y < viewH; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(viewW, y);
        ctx.stroke();
      }

      // 2. 绘制未来感发光路网 (Road Network)
      ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(99, 102, 241, 0.3)";
      ctx.lineWidth = 4;
      
      // 主干道横向
      ctx.beginPath();
      ctx.moveTo(30, 20); ctx.lineTo(viewW - 30, 20);
      ctx.moveTo(30, 50); ctx.lineTo(viewW - 30, 50);
      ctx.moveTo(30, 80); ctx.lineTo(viewW - 30, 80);
      ctx.stroke();

      // 主干道纵向
      ctx.beginPath();
      ctx.moveTo(20, 30); ctx.lineTo(20, viewH - 30);
      ctx.moveTo(50, 10); ctx.lineTo(50, viewH - 10);
      ctx.moveTo(80, 30); ctx.lineTo(80, viewH - 30);
      ctx.stroke();

      // 清除阴影属性以提高性能
      ctx.shadowBlur = 0;

      // 3. 绘制车流粒子 (Inspection Vehicles)
      vehicles.forEach(vehicle => {
        vehicle.progress = (vehicle.progress + vehicle.speed) % 1;
        const p = vehicle.progress;
        
        let startPt = [0, 0];
        let endPt = [0, 0];
        
        if (vehicle.route.length === 2) {
          // 直线往返
          startPt = vehicle.route[0];
          endPt = vehicle.route[1];
          const x = (startPt[0] + (endPt[0] - startPt[0]) * p) * viewW / 100;
          const y = (startPt[1] + (endPt[1] - startPt[1]) * p) * viewH / 100;
          
          ctx.fillStyle = vehicle.color;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // 环线路线
          const totalPoints = vehicle.route.length;
          const routeIndex = Math.floor(p * totalPoints);
          const nextIndex = (routeIndex + 1) % totalPoints;
          const subProgress = (p * totalPoints) % 1;
          
          startPt = vehicle.route[routeIndex];
          endPt = vehicle.route[nextIndex];
          
          const x = (startPt[0] + (endPt[0] - startPt[0]) * subProgress) * viewW / 100;
          const y = (startPt[1] + (endPt[1] - startPt[1]) * subProgress) * viewH / 100;
          
          ctx.fillStyle = vehicle.color;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. 绘制所有缺陷的脉冲警报定位器
      filteredDefects.forEach(defect => {
        const x = (defect.x / 100) * viewW;
        const y = (defect.y / 100) * viewH;
        const isSelected = selectedDefect?.id === defect.id;
        const info = severityColors[defect.severity];

        // 绘制扩散波纹动效
        ctx.fillStyle = info.pulseColor;
        ctx.beginPath();
        const maxRadius = isSelected ? 35 : 22;
        const radius = pulseProgress * maxRadius;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.globalAlpha = 1 - pulseProgress;
        ctx.fill();
        ctx.globalAlpha = 1;

        // 绘制实体定位圆心
        ctx.fillStyle = info.hex;
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 8 : 5, 0, Math.PI * 2);
        ctx.fill();

        // 选中的缺陷绘制高科技准星
        if (isSelected) {
          ctx.strokeStyle = info.hex;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.stroke();

          // 画十字辅助线
          ctx.beginPath();
          ctx.moveTo(x - 20, y); ctx.lineTo(x + 20, y);
          ctx.moveTo(x, y - 20); ctx.lineTo(x, y + 20);
          ctx.stroke();

          // 悬浮文字指示
          ctx.font = "bold 11px system-ui";
          ctx.fillStyle = "#ffffff";
          const labelText = `${defect.id} [${defectTypeLabels[defect.type]}]`;
          const textW = ctx.measureText(labelText).width;
          
          // 气泡底框
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.strokeStyle = info.hex;
          ctx.lineWidth = 1;
          const bubbleW = textW + 16;
          const bubbleH = 22;
          const bubbleX = Math.min(viewW - bubbleW - 10, Math.max(10, x - bubbleW / 2));
          const bubbleY = y - 42;
          
          ctx.beginPath();
          ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 4);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.fillText(labelText, bubbleX + 8, bubbleY + 15);
        }
      });

      // 缩放复原
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [filteredDefects, selectedDefect]);

  // 处理 Canvas 上的缺陷点点击检测
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const viewW = rect.width;
    const viewH = rect.height;

    // 寻找距离点击位置最近的缺陷标记
    let minDistance = 30; // 交互容差 px
    let foundDefect: Defect | null = null;

    filteredDefects.forEach(defect => {
      const markerX = (defect.x / 100) * viewW;
      const markerY = (defect.y / 100) * viewH;
      const dist = Math.hypot(clickX - markerX, clickY - markerY);
      
      if (dist < minDistance) {
        minDistance = dist;
        foundDefect = defect;
      }
    });

    if (foundDefect) {
      setSelectedDefect(foundDefect);
    } else {
      // 没点中标记则支持在点击位置快捷标记新增 (如果是双击也可以，这里单击提示或创建模拟)
      const mappedX = Math.round((clickX / viewW) * 100);
      const mappedY = Math.round((clickY / viewH) * 100);
      
      // 创建模拟快速标注
      const newDefectId = `DEF-00${defects.length + 1}`;
      const newDefect: Defect = {
        id: newDefectId,
        type: "crack",
        severity: "medium",
        x: mappedX,
        y: mappedY,
        address: `智能探针自动标定路段 (${mappedX}%, ${mappedY}%)`,
        reportedAt: new Date().toISOString().split('T')[0],
        reporter: "屏幕触控快速标注",
        description: "由运营中心管理员通过大屏地图定位进行快速缺陷登记。缺陷细节有待巡检车二次实测核实。"
      };
      
      setDefects(prev => [...prev, newDefect]);
      setSelectedDefect(newDefect);
    }
  };

  // 模拟缺陷照片处理与上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    // 模拟文件读取与上传进度
    const reader = new FileReader();
    reader.onload = () => {
      setMockPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          
          // 自动在路网随机位置生成一个新的缺陷
          const randType: DefectType = ["crack", "pothole", "flooding", "signage"][Math.floor(Math.random() * 4)] as DefectType;
          const randSeverity: Severity = ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)] as Severity;
          const randomX = 15 + Math.floor(Math.random() * 70); // 避开边缘
          const randomY = 15 + Math.floor(Math.random() * 70);
          
          const newDefectId = `DEF-M${Math.floor(100 + Math.random() * 900)}`;
          const newDefect: Defect = {
            id: newDefectId,
            type: randType,
            severity: randSeverity,
            x: randomX,
            y: randomY,
            address: `多维探针感知路段 - 中山中路路口附近`,
            reportedAt: new Date().toISOString().split('T')[0],
            reporter: "移动端 GPS 媒体申报",
            description: `管理员模拟上传媒体缺陷。系统内置的 GPS 元数据自动解译坐标：[x:${randomX}%, y:${randomY}%]。画面通过神经网络分析，评定类型为：${defectTypeLabels[randType]}，严重性判定为：${randSeverity}。`,
            imageUrl: reader.result as string
          };

          setDefects(prev => [newDefect, ...prev]);
          setSelectedDefect(newDefect);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  // 删除缺陷记录
  const handleDeleteDefect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDefects(prev => prev.filter(d => d.id !== id));
    if (selectedDefect?.id === id) {
      setSelectedDefect(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 pt-24">
      {/* 1. 顶部高端控制大屏标题 */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Activity className="h-6 w-6 animate-pulse" />
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
              Roadwatch UI
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Live Active
            </span>
          </div>
          <p className="mt-1.5 text-sm text-slate-400 max-w-xl">
            智能基础设施与地理空间缺陷数据中枢。基于神经网络探针与巡检系统，实现全周期路网病害的自动发现、地理标定和多维闭环跟踪。
          </p>
        </div>

        {/* 核心指标统计卡片 */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-3 rounded-xl min-w-[120px] shadow-lg">
            <div className="text-xs text-slate-400">病害总量</div>
            <div className="text-2xl font-bold font-mono text-indigo-400 mt-0.5">{defects.length} <span className="text-xs font-normal text-slate-500">处</span></div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-3 rounded-xl min-w-[120px] shadow-lg">
            <div className="text-xs text-slate-400">灾难级 (Critical)</div>
            <div className="text-2xl font-bold font-mono text-red-500 mt-0.5">
              {defects.filter(d => d.severity === "critical").length} <span className="text-xs font-normal text-slate-500">处</span>
            </div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-3 rounded-xl min-w-[120px] shadow-lg">
            <div className="text-xs text-slate-400">今日新增</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
              {defects.filter(d => d.reportedAt === "2026-05-20").length} <span className="text-xs font-normal text-slate-500">处</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 主三栏大布局结构 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 左侧：智能地理空间交互式大屏 Canvas 地图 (占用 8 栏) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col h-[520px]">
            {/* 地图悬浮图层说明 */}
            <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg">
              <Layers className="h-4 w-4 text-indigo-400" />
              <span className="font-medium text-slate-300">交互式 Canvas 动态发光路网图层</span>
              <span className="text-slate-500">| 单击地图空白处可进行定位标记</span>
            </div>

            {/* 地图右上角图例 */}
            <div className="absolute top-4 right-4 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3 rounded-xl text-[11px] grid grid-cols-2 gap-2 shadow-lg">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-slate-400">灾难级 (Critical)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="text-slate-400">重度 (High)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="text-slate-400">中度 (Medium)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-slate-400">轻微 (Low)</span>
              </div>
            </div>

            {/* 核心 Canvas 画布 */}
            <div className="flex-1 w-full relative bg-[#090d16] cursor-crosshair">
              <canvas 
                ref={canvasRef} 
                onClick={handleCanvasClick}
                className="w-full h-full block"
              />
            </div>

            {/* 底部信息栏 */}
            <div className="bg-slate-950/90 border-t border-slate-800/80 px-5 py-3 text-xs flex justify-between items-center text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>城市路网探针心跳正常 (Inspection Probe: Online)</span>
              </div>
              <div>
                <span>缩放率: 100% | 视窗像素: Autoscale</span>
              </div>
            </div>
          </div>

          {/* 表格筛选面板 + 缺陷列表 (占用左侧下方) */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-200">
                <Filter className="h-5 w-5 text-indigo-400" />
                多维缺陷数据过滤中心
              </h2>
              {/* 搜索框 */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="搜索缺陷ID、路名、病害描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-sm focus:outline-none focus:border-indigo-500 text-slate-200 transition-colors"
                />
              </div>
            </div>

            {/* 过滤器按钮组 */}
            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-slate-800/60">
              {/* 类型过滤 */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-400 font-medium">缺陷类型</span>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => setFilterType("all")}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${filterType === "all" ? "bg-indigo-500 text-white border-indigo-400" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"}`}
                  >
                    全部
                  </button>
                  {Object.entries(defectTypeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setFilterType(key as DefectType)}
                      className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${filterType === key ? "bg-indigo-500 text-white border-indigo-400" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 严重度过滤 */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-400 font-medium">严重程度</span>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => setFilterSeverity("all")}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${filterSeverity === "all" ? "bg-indigo-500 text-white border-indigo-400" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"}`}
                  >
                    全部
                  </button>
                  <button 
                    onClick={() => setFilterSeverity("low")}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${filterSeverity === "low" ? "bg-blue-500/20 text-blue-400 border-blue-500/40" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"}`}
                  >
                    轻微
                  </button>
                  <button 
                    onClick={() => setFilterSeverity("medium")}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${filterSeverity === "medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"}`}
                  >
                    中度
                  </button>
                  <button 
                    onClick={() => setFilterSeverity("high")}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${filterSeverity === "high" ? "bg-orange-500/20 text-orange-400 border-orange-500/40" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"}`}
                  >
                    重度
                  </button>
                  <button 
                    onClick={() => setFilterSeverity("critical")}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${filterSeverity === "critical" ? "bg-red-500/20 text-red-400 border-red-500/40" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"}`}
                  >
                    灾难级
                  </button>
                </div>
              </div>
            </div>

            {/* 缺陷列表明细表格 */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-800/80 text-xs font-semibold text-slate-400 tracking-wider">
                    <th className="pb-3 pl-2">编号</th>
                    <th className="pb-3">病害类型</th>
                    <th className="pb-3">严重性</th>
                    <th className="pb-3">详细地址</th>
                    <th className="pb-3">上报日期</th>
                    <th className="pb-3">采集源</th>
                    <th className="pb-3 text-right pr-2">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-sm">
                  {filteredDefects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        未匹配到符合当前过滤条件的缺陷数据。
                      </td>
                    </tr>
                  ) : (
                    filteredDefects.map(defect => {
                      const isSelected = selectedDefect?.id === defect.id;
                      const sevInfo = severityColors[defect.severity];
                      return (
                        <tr 
                          key={defect.id}
                          onClick={() => setSelectedDefect(defect)}
                          className={`hover:bg-slate-800/30 cursor-pointer transition-colors ${isSelected ? "bg-indigo-500/10 border-l-2 border-indigo-500" : ""}`}
                        >
                          <td className="py-3.5 pl-2 font-mono font-bold text-indigo-400">{defect.id}</td>
                          <td className="py-3.5">
                            <span className="flex items-center gap-1.5 font-medium">
                              <span 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: defectTypeColors[defect.type] }}
                              ></span>
                              {defectTypeLabels[defect.type]}
                            </span>
                          </td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${sevInfo.bg} ${sevInfo.text} ${sevInfo.border}`}>
                              {defect.severity.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3.5 text-slate-300 max-w-[200px] truncate">{defect.address}</td>
                          <td className="py-3.5 font-mono text-xs text-slate-400">{defect.reportedAt}</td>
                          <td className="py-3.5 text-xs text-slate-400">{defect.reporter}</td>
                          <td className="py-3.5 text-right pr-2">
                            <button
                              onClick={(e) => handleDeleteDefect(defect.id, e)}
                              className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                              title="删除记录"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 右侧：单点精细报告详情、图表、上传模块 (占用 4 栏) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* A. 选中项详情诊断面板 (高科技玻璃感) */}
          <div className="bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full"></div>
            
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-200">
              <ShieldAlert className="h-5 w-5 text-indigo-400" />
              精细化病害现场详情
            </h2>

            {selectedDefect ? (
              <div className="flex flex-col gap-4 animate-fade-in">
                {/* 缺陷图层照片预览 */}
                {selectedDefect.imageUrl ? (
                  <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative group">
                    <img 
                      src={selectedDefect.imageUrl} 
                      alt="病害现场" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-sm border border-slate-800/80 px-2 py-0.5 rounded text-[10px] font-mono text-indigo-300">
                      CCTV / UAV Real Photo
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-44 rounded-xl border border-slate-800 border-dashed flex flex-col items-center justify-center bg-slate-950/40 text-slate-500 gap-2">
                    <MapPin className="h-8 w-8 text-slate-600" />
                    <span className="text-xs text-slate-400 font-medium">无现场实景媒体图档</span>
                    <span className="text-[10px] text-slate-600">仅包含大屏手动地理点位标定</span>
                  </div>
                )}

                {/* 核心指标元数据 */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3.5 border border-slate-850 rounded-xl">
                  <div>
                    <span className="text-slate-500 block">病害编号</span>
                    <span className="font-mono font-bold text-indigo-400 mt-0.5 block">{selectedDefect.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">严重度级别</span>
                    <span className={`font-semibold mt-0.5 block ${severityColors[selectedDefect.severity].text}`}>
                      {selectedDefect.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-span-2 border-t border-slate-800/60 pt-2 mt-2">
                    <span className="text-slate-500 block">标定坐标系 (GPS Offset)</span>
                    <span className="font-mono text-slate-300 mt-0.5 block">X: {selectedDefect.x}% , Y: {selectedDefect.y}%</span>
                  </div>
                </div>

                {/* 地点与采集信息 */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-500">地理物理地址</div>
                      <div className="text-sm text-slate-200 font-medium">{selectedDefect.address}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Calendar className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-500">采集时间与上报源</div>
                      <div className="text-sm text-slate-200 font-medium">
                        {selectedDefect.reportedAt} <span className="text-xs text-slate-500">({selectedDefect.reporter})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 智能分析建议书 */}
                <div className="border-t border-slate-800/60 pt-4">
                  <span className="text-xs text-indigo-400 font-bold block mb-1">系统诊断分析与养护建议</span>
                  <p className="text-xs text-slate-400 leading-relaxed bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10">
                    {selectedDefect.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-2 border border-slate-800/60 border-dashed rounded-xl bg-slate-950/20">
                <AlertTriangle className="h-8 w-8 text-slate-700 animate-bounce" />
                <span className="text-xs">请在大屏地图或缺陷明细表</span>
                <span className="text-[11px] text-slate-600">选中具体的病害点查看现场图纸</span>
              </div>
            )}
          </div>

          {/* B. 数据驾驶舱可视化图表面板 */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-200">
              <TrendingUp className="h-5 w-5 text-indigo-400" />
              病害数据驾驶舱
            </h2>

            <div className="flex flex-col gap-6">
              {/* Pie Chart */}
              <div>
                <span className="text-xs text-slate-400 font-medium block mb-2">已匹配缺陷类型比重</span>
                <div className="h-[150px] w-full flex items-center justify-center">
                  {pieData.length === 0 ? (
                    <span className="text-xs text-slate-600">暂无数据</span>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={55}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "11px" }}
                          itemStyle={{ color: "#f8fafc" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {/* 自制图例列表 */}
                  <div className="flex flex-col gap-1 text-[11px] text-slate-400 pl-4 border-l border-slate-800/60 max-w-[150px]">
                    {pieData.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                        <span>{item.name}: {item.value} 处</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Area Chart */}
              <div className="border-t border-slate-800/60 pt-4">
                <span className="text-xs text-slate-400 font-medium block mb-2">近期巡检新增趋势分析</span>
                <div className="h-[140px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={areaData}
                      margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorCrack" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPothole" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#64748b" fontSize={9} />
                      <YAxis stroke="#64748b" fontSize={9} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "11px" }}
                        itemStyle={{ color: "#f8fafc" }}
                      />
                      <Area type="monotone" dataKey="crack" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCrack)" strokeWidth={1.5} name="裂缝" />
                      <Area type="monotone" dataKey="pothole" stroke="#f97316" fillOpacity={1} fill="url(#colorPothole)" strokeWidth={1.5} name="坑洼" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* C. GPS 媒体传感器模拟申报上传端 (高技术亮点) */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-200">
              <UploadCloud className="h-5 w-5 text-indigo-400" />
              多维感知图片上传中心
            </h2>
            
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              支持上传巡检车或市民申报的路面缺陷照片。系统将自动解析元数据中的 GPS 坐标并投影到 Canvas 发光路网中。
            </p>

            <div className="flex flex-col gap-4">
              {/* 隐藏的文件输入框 */}
              <input
                type="file"
                id="defect-file-upload"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
              
              {/* 模拟的拖拽虚线框 */}
              <label 
                htmlFor="defect-file-upload"
                className={`w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${isUploading ? "border-indigo-500 bg-indigo-500/5 cursor-wait" : "border-slate-800 hover:border-indigo-500 hover:bg-indigo-500/5"}`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
                    <span className="text-xs text-indigo-400 font-mono">神经网络分析中 {uploadProgress}%</span>
                  </div>
                ) : uploadSuccess ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-400">
                    <CheckCircle className="h-8 w-8" />
                    <span className="text-xs font-semibold">缺陷标定并映射入网成功！</span>
                    <span className="text-[10px] text-slate-500">GPS 坐标已自动反查挂载</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400 text-center px-4">
                    <UploadCloud className="h-8 w-8 text-slate-600 hover:text-indigo-400 transition-colors" />
                    <span className="text-xs font-medium">点击或将缺陷现场照片拖拽至此</span>
                    <span className="text-[10px] text-slate-600">智能算法将提取定位元数据</span>
                  </div>
                )}
              </label>

              {/* 上传后的迷你缩略图预览 */}
              {mockPreviewUrl && uploadSuccess && (
                <div className="flex items-center gap-3 bg-slate-950/60 p-2.5 border border-slate-850 rounded-xl">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-800 shrink-0">
                    <img src={mockPreviewUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-200 truncate">感知图像上传完成</div>
                    <div className="text-[10px] text-slate-500 font-mono">AI-Assisted Pavement Diagnosis</div>
                  </div>
                  <button 
                    onClick={() => {
                      setMockPreviewUrl(null);
                      setUploadSuccess(false);
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    重置
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
