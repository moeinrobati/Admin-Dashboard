"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- MATRIX TEXT DECODER COMPONENT (Pure React Version for Canvas Preview) ---
const MatrixText = ({
  text = "HelloWorld!",
  className,
  initialDelay = 200,
  letterAnimationDuration = 600, // افزایش زمان انیمیشن برای خوانایی بیشتر
  letterInterval = 80,          // افزایش فاصله بین رندر حروف برای ملایم‌تر شدن سرعت
  isDarkMode = true,             // دریافت وضعیت تم برای بالانس رنگی متون فعال ماتریکسی
}) => {
  const [letters, setLetters] = useState(() =>
    text.split("").map((char) => ({
      char,
      isSpace: char === " ",
      isMatrix: false,
    }))
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomChar = useCallback(() => (Math.random() > 0.5 ? "1" : "0"), []);

  const animateLetter = useCallback((index) => {
    if (index >= text.length) return;
    requestAnimationFrame(() => {
      setLetters((prev) => {
        const newLetters = [...prev];
        if (newLetters[index] && !newLetters[index].isSpace) {
          newLetters[index] = {
            ...newLetters[index],
            char: getRandomChar(),
            isMatrix: true,
          };
        }
        return newLetters;
      });

      setTimeout(() => {
        setLetters((prev) => {
          const newLetters = [...prev];
          if (newLetters[index]) {
            newLetters[index] = {
              ...newLetters[index],
              char: text[index],
              isMatrix: false,
            };
          }
          return newLetters;
        });
      }, letterAnimationDuration);
    });
  }, [getRandomChar, text, letterAnimationDuration]);

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    let currentIndex = 0;
    const animate = () => {
      if (currentIndex >= text.length) {
        setIsAnimating(false);
        return;
      }
      animateLetter(currentIndex);
      currentIndex++;
      setTimeout(animate, letterInterval);
    };
    animate();
  }, [animateLetter, text, isAnimating, letterInterval]);

  useEffect(() => {
    setLetters(
      text.split("").map((char) => ({
        char,
        isSpace: char === " ",
        isMatrix: false,
      }))
    );
    const timer = setTimeout(startAnimation, initialDelay);
    return () => clearTimeout(timer);
  }, [text, startAnimation, initialDelay]);

  return (
    <span className={`inline-flex flex-wrap items-center justify-start ${className}`} aria-label="Matrix text animation">
      {letters.map((letter, index) => {
        // بالانس رنگ ماتریکس برای جلوگیری از ناخوانایی در تم روشن
        const matrixColorClass = letter.isMatrix
          ? isDarkMode
            ? "text-emerald-400 scale-105 font-bold [text-shadow:0_0_8px_rgba(16,185,129,0.6)]"
            : "text-emerald-700 scale-105 font-bold [text-shadow:0_0_4px_rgba(5,150,105,0.2)]"
          : "text-inherit scale-100 font-normal";

        return (
          <span
            key={`${index}-${letter.char}`}
            className={`font-mono inline-block transition-all duration-150 ${matrixColorClass}`}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {letter.isSpace ? "\u00A0" : letter.char}
          </span>
        );
      })}
    </span>
  );
};

const translations = {
  en: {
    dashboard: "Main Dashboard",
    analytics: "Charts & Stats 📊",
    logs: "Recent Logs 📑",
    monitor: "System Monitor 💻",
    settings: "Glass Settings 🛠️",
    totalUsers: "Total Users",
    newUsersToday: "New Users Today",
    totalRequests: "Requests & Orders",
    overallStats: "Overall Income",
    chartsSection: "Analytical Charts",
    userGrowth: "User Growth Chart",
    dailyActivity: "Daily Activity Chart",
    visitsChart: "Visits & System Usage",
    recentActivities: "Recent Activities",
    lastRegistered: "Latest Registered Users",
    lastOperations: "Last Performed Operations",
    lastErrors: "Last Errors & Warnings",
    systemStatus: "System & Server Status",
    serverStatus: "Server Status",
    cpuRam: "CPU & RAM Utilization",
    storage: "Storage Space",
    database: "Database Status",
    quickActions: "Quick Controls",
    addUser: "Add User",
    createItem: "Create New Item",
    sendNotification: "Send Alert",
    viewReports: "View Reports",
    activeGlow: "Active Glow Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    designedBy: "Designed & Powered by Moein",
    searchPlaceholder: "Search systems...",
    statusHealthy: "Healthy & Online",
    statusWarning: "Normal",
    sidebarTitle: "Moein Workspace",
    sidebarSubtitle: "Elite Frontend Architecture",
    toastUserAdded: "A new user was successfully added!",
    toastItemCreated: "New system item generated!",
    toastNotificationSent: "Alert broadcasted to all active sessions!",
    toastReportReady: "System performance report downloaded successfully!",
    notif1: "Database backup completed successfully",
    notif2: "New node spawned at Cluster-A",
    notif3: "API Latency spike resolved",
    timeMin: "2m ago",
    timeHour: "1h ago",
    timeHours: "3h ago",
    modalTitle: "Enlist New User",
    modalDesc: "Register a profile directly to the active system database.",
    lblFullName: "Full Name",
    lblEmail: "Email Address",
    lblRole: "System Role",
    btnSubmit: "Add Now",
    btnCancel: "Cancel",
    days: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  fa: {
    dashboard: "داشبورد اصلی",
    analytics: "نمودارها و آمار 📊",
    logs: "گزارشات و رویدادها 📑",
    monitor: "وضعیت سیستم 💻",
    settings: "تنظیمات شیشه 🛠️",
    totalUsers: "تعداد کل کاربران",
    newUsersToday: "کاربران جدید امروز",
    totalRequests: "تعداد درخواست‌ها یا سفارش‌ها",
    overallStats: "درآمد یا آمار کلی",
    chartsSection: "بخش آمار و چارت‌ها",
    userGrowth: "نمودار رشد کاربران",
    dailyActivity: "نمودار فعالیت روزانه",
    visitsChart: "نمودار بازدیدها یا استفاده از سیستم",
    recentActivities: "فعالیت‌های اخیر",
    lastRegistered: "آخرین کاربران ثبت‌نام‌شده",
    lastOperations: "آخرین عملیات انجام‌شده",
    lastErrors: "آخرین خطاها یا هشدارها",
    systemStatus: "وضعیت سیستم و سرور",
    serverStatus: "وضعیت سرور",
    cpuRam: "میزان مصرف CPU و RAM",
    storage: "فضای ذخیره‌سازی",
    database: "وضعیت دیتابیس",
    quickActions: "اقدامات سریع",
    addUser: "افزودن کاربر",
    createItem: "ایجاد آیتم جدید",
    sendNotification: "ارسال اعلان",
    viewReports: "مشاهده گزارش‌ها",
    activeGlow: "تم نوری فعال",
    lightMode: "حالت روشن",
    darkMode: "حالت تاریک",
    designedBy: "طراحی و قدرت گرفته از معین",
    searchPlaceholder: "جستجو در سیستم...",
    statusHealthy: "سالم و آنلاین",
    statusWarning: "نرمال",
    sidebarTitle: "دفتر کار معین",
    sidebarSubtitle: "معماری مدرن فرانت‌اند",
    toastUserAdded: "کاربر جدید با موفقیت به سیستم اضافه شد!",
    toastItemCreated: "آیتم سیستمی جدید ساخته شد!",
    toastNotificationSent: "اعلان به تمام سشن‌های فعال ارسال شد!",
    toastReportReady: "گزارش عملکرد سیستم با موفقیت دانلود شد!",
    notif1: "پشتیبان‌گیری از دیتابیس با موفقیت انجام شد",
    notif2: "سرور فرعی جدید در کلاستر-A راه‌اندازی شد",
    notif3: "مشکل تأخیر زمانی در پاسخ‌دهی API برطرف شد",
    timeMin: "۲ دقیقه قبل",
    timeHour: "۱ ساعت قبل",
    timeHours: "۳ ساعت قبل",
    modalTitle: "ثبت کاربر جدید",
    modalDesc: "مشخصات کاربر جدید را وارد کنید تا مستقیماً به استیت زنده اضافه شود.",
    lblFullName: "نام کامل",
    lblEmail: "آدرس ایمیل",
    lblRole: "نقش سیستمی",
    btnSubmit: "ثبت درجا",
    btnCancel: "انصراف",
    days: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه']
  }
};

export default function App() {
  // ۱. زبان پیش‌فرض پروژه: انگلیسی با سوئیچر فارسی
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  // ۲. ناوبری و تب‌های فعال
  const [activeTab, setActiveTab] = useState('Dashboard');

  // ۳. تم‌های درخشان نوری (Glow Theme Accents)
  const [glowColor, setGlowColor] = useState('indigo'); // indigo, rose, emerald, violet

  // ۴. تنظیمات تعاملی شیشه‌ای برای پورتفولیو
  const [glassBlur, setGlassBlur] = useState('backdrop-blur-xl');
  const [glassBorder, setGlassBorder] = useState('border');
  const [glassOpacity, setGlassOpacity] = useState('bg-white/[0.03]');

  // ۵. تم تاریک (پیش‌فرض روشن با توجه به درخواست شما تغییر پیدا می‌کند اما روی Dark سوئیچ می‌شود)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // ۶. سیستم هشدار و توست‌های سفارشی (به جای alert)
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // ۷. دیتای پویای شبیه‌ساز سخت‌افزار (CPU, RAM) برای القای حس زنده بودن به کارفرما
  const [sysMetrics, setSysMetrics] = useState({ cpu: 42, ram: 58, disk: '68%', dbConn: 98 });
  useEffect(() => {
    const interval = setInterval(() => {
      setSysMetrics(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * (55 - 28) + 28),
        ram: Math.floor(Math.random() * (64 - 54) + 54),
        dbConn: Math.floor(Math.random() * (100 - 97) + 97)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ۸. مدیریت باز شدن مودال ثبت کاربر جدید
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Operator');

  // ۹. لیست کاربران ثبت‌نامی اخیر (با قابلیت تعامل زنده)
  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: 'پارسا رضایی', email: 'parsa@test.com', time: '۱۰ دقیقه قبل', initial: 'P' },
    { id: 2, name: 'سارا احمدی', email: 'sara@code.io', time: '۲ ساعت قبل', initial: 'S' },
    { id: 3, name: 'امیر قاسمی', email: 'amir@data.com', time: '۵ ساعت قبل', initial: 'A' },
  ]);

  // ۱۰. لیست عملیات و خطاها (پویا و ترجمه پذیر)
  const [notifications, setNotifications] = useState([
    { id: 1, key: 'notif1', timeKey: 'timeMin', unread: true },
    { id: 2, key: 'notif2', timeKey: 'timeHour', unread: true },
    { id: 3, key: 'notif3', timeKey: 'timeHours', unread: false }
  ]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  // ۱۱. مدیریت زمان زنده و ثانیه‌شمار سیستم
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(lang === 'fa' ? 'fa-IR' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, [lang]);

  // ۱۲. مبدل زنده ارقام بین فارسی و انگلیسی
  const fNum = (val) => {
    if (val === undefined || val === null) return '';
    const str = val.toString();
    if (lang === 'en') return str;
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
  };

  // افکت جابجایی موس برای شناور ساختن هاله‌های نوری پشت قالب شیشه‌ای
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 40 - 20,
        y: (e.clientY / window.innerHeight) * 40 - 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // تنظیم هاله‌های نوری بر اساس روشن یا تاریک بودن تم برای جلوگیری از تیرگی و تداخل رنگی کثیف در پس‌زمینه
  const getGlowStyles = () => {
    if (isDarkMode) {
      switch (glowColor) {
        case 'rose': return 'from-rose-500/20 via-pink-500/10 to-transparent';
        case 'emerald': return 'from-emerald-500/20 via-teal-500/10 to-transparent';
        case 'violet': return 'from-violet-500/20 via-purple-500/10 to-transparent';
        default: return 'from-indigo-500/20 via-blue-500/10 to-transparent';
      }
    } else {
      switch (glowColor) {
        case 'rose': return 'from-rose-300/40 via-pink-200/20 to-transparent';
        case 'emerald': return 'from-emerald-300/40 via-teal-200/20 to-transparent';
        case 'violet': return 'from-violet-300/40 via-purple-200/20 to-transparent';
        default: return 'from-indigo-300/40 via-blue-200/20 to-transparent';
      }
    }
  };

  const getAccentBgClass = () => {
    switch (glowColor) {
      case 'rose': return 'bg-rose-500';
      case 'emerald': return 'bg-emerald-500';
      case 'violet': return 'bg-violet-500';
      default: return 'bg-indigo-500';
    }
  };

  const getAccentTextClass = () => {
    switch (glowColor) {
      case 'rose': return isDarkMode ? 'text-rose-400' : 'text-rose-600';
      case 'emerald': return isDarkMode ? 'text-emerald-400' : 'text-emerald-600';
      case 'violet': return isDarkMode ? 'text-violet-400' : 'text-violet-600';
      default: return isDarkMode ? 'text-indigo-400' : 'text-indigo-600';
    }
  };

  const getAccentBorderClass = () => {
    switch (glowColor) {
      case 'rose': return isDarkMode ? 'border-rose-500/30 text-rose-400' : 'border-rose-300 text-rose-600';
      case 'emerald': return isDarkMode ? 'border-emerald-500/30 text-emerald-400' : 'border-emerald-300 text-emerald-600';
      case 'violet': return isDarkMode ? 'border-violet-500/30 text-violet-400' : 'border-violet-300 text-violet-600';
      default: return isDarkMode ? 'border-indigo-500/30 text-indigo-400' : 'border-indigo-300 text-indigo-600';
    }
  };

  // اضافه کردن کاربر از مودال به لیست پورتفولیو
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser = {
      id: Date.now(),
      name: newUserName,
      email: newUserEmail,
      time: lang === 'fa' ? 'همین الان' : 'Just now',
      initial: newUserName.charAt(0).toUpperCase()
    };

    setRecentUsers([newUser, ...recentUsers]);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
    triggerToast(t.toastUserAdded);
  };

  // دریافت آیکون‌های Inline برای ناوبری تمیز سایدبار
  const getSidebarIcon = (name) => {
    const cls = "w-5 h-5";
    switch(name) {
      case 'Dashboard':
        return (
          <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
          </svg>
        );
      case 'Analytics':
        return (
          <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'Logs':
        return (
          <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'Monitor':
        return (
          <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2-2V7a2 2 0 002-2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'Settings':
        return (
          <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      dir={lang === 'fa' ? 'rtl' : 'ltr'} 
      className={`min-h-screen w-full relative overflow-hidden transition-colors duration-500 font-sans flex items-center justify-center p-2 sm:p-6 ${
        isDarkMode ? 'bg-[#0a0e17] text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* هاله‌های نوری شناور در پس‌زمینه */}
      <div 
        className={`absolute rounded-full blur-[140px] transition-all duration-700 pointer-events-none bg-gradient-to-br ${getGlowStyles()}`}
        style={{
          width: '650px',
          height: '650px',
          top: `calc(15% + ${mousePos.y}px)`,
          left: `calc(20% + ${mousePos.x}px)`,
        }}
      />
      <div 
        className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[120px] bottom-10 right-10 pointer-events-none transition-transform duration-1000"
        style={{
          transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px)`
        }}
      />

      {/* کانتینر شیشه‌ای اصلی با استایل‌های تعادل‌یافته برای حالت روشن */}
      <div className={`w-full max-w-7xl h-[90vh] min-h-[720px] rounded-3xl transition-all duration-300 flex overflow-hidden relative z-10 ${glassBorder} ${glassBlur} ${glassOpacity} ${
        isDarkMode 
          ? 'border-white/10 bg-white/[0.03] shadow-2xl shadow-black/60' 
          : 'border-slate-200/80 bg-white/70 shadow-2xl shadow-slate-200'
      }`}>
        
        {/* سایدبار ناوبری مارک‌دار Moein Workspace */}
        <aside className={`w-20 md:w-64 border-e ${
          isDarkMode ? 'border-white/10 bg-white/[0.01]' : 'border-slate-200 bg-slate-100/50'
        } flex flex-col justify-between py-10 px-3 md:px-4 transition-all duration-300`}>
          <div>
            {/* ناوبری تفکیک شده جدید با آیکون‌های Inline */}
            <nav className="space-y-2">
              {[
                { name: 'Dashboard', label: t.dashboard },
                { name: 'Analytics', label: t.analytics },
                { name: 'Logs', label: t.logs },
                { name: 'Monitor', label: t.monitor },
                { name: 'Settings', label: t.settings }
              ].map((item) => {
                const isActive = activeTab === item.name;
                const activeColorClass = isActive
                  ? isDarkMode
                    ? `bg-white/10 text-white font-semibold border-s-4 ${getAccentBorderClass()}`
                    : `bg-slate-200/80 text-slate-900 font-semibold border-s-4 ${getAccentBorderClass()}`
                  : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/40';

                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center gap-4 py-3 px-3 md:px-4 rounded-xl transition-all duration-300 group justify-center md:justify-start ${activeColorClass}`}
                  >
                    <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-105' : ''}`}>
                      {getSidebarIcon(item.name)}
                    </div>
                    <span className="text-sm hidden md:block">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* امضا و وضعیت کاری در پایین سایدبار */}
          <div className="hidden md:block">
            <div className={`p-4 rounded-2xl border ${
              isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-slate-200/60 bg-white/60 shadow-xs'
            } backdrop-blur-md`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></div>
                <span className="text-xs text-indigo-400 font-bold">{t.sidebarSubtitle}</span>
              </div>
              <h4 className={`font-bold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{t.sidebarTitle}</h4>
            </div>
          </div>
        </aside>

        {/* کادر اصلی صفحات */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          
          {/* هدر کنترلی و سوئیچرهای هدر */}
          <header className={`w-full py-4 px-6 border-b ${
            isDarkMode ? 'border-white/10' : 'border-slate-200'
          } flex items-center justify-between transition-all duration-300`}>
            
            <div>
              <h2 className={`font-bold text-sm hidden sm:block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {lang === 'fa' ? 'پنل آماری یکپارچه معین' : 'Moein Unified Panel'}
              </h2>
            </div>

            {/* ماژول‌های تغییرات استایل و زبان */}
            <div className="flex items-center gap-4 relative">
              
              {/* سوئیچر زبان */}
              <button
                onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border shadow-sm transition-all duration-300 flex items-center gap-2 ${
                  isDarkMode 
                    ? 'border-white/10 hover:bg-white/10 text-white bg-white/5' 
                    : 'border-slate-300 hover:bg-slate-100 text-slate-800 bg-white'
                }`}
              >
                <span>🌐</span>
                <span>{lang === 'en' ? 'فارسی' : 'English'}</span>
              </button>

              {/* تغییردهنده طیف تم نوری */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hidden sm:flex">
                {['indigo', 'rose', 'emerald', 'violet'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setGlowColor(color)}
                    className={`w-4 h-4 rounded-full transition-transform duration-200 hover:scale-125 ${
                      color === 'indigo' ? 'bg-indigo-500' :
                      color === 'rose' ? 'bg-rose-500' :
                      color === 'emerald' ? 'bg-emerald-500' : 'bg-violet-500'
                    } ${glowColor === color ? 'ring-2 ring-white scale-110' : ''}`}
                    title={`${t.activeGlow}: ${color}`}
                  />
                ))}
              </div>

              {/* سوئیچر دارک مود */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-xl border transition-all duration-300 ${
                  isDarkMode ? 'border-white/10 hover:bg-white/10 text-yellow-400' : 'border-slate-300 hover:bg-slate-100 text-slate-600'
                }`}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* اعلان‌های هدر */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className={`p-2 rounded-xl border transition-all ${
                    isDarkMode ? 'border-white/10 hover:bg-white/10' : 'border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {fNum(notifications.filter(n => n.unread).length)}
                  </span>
                )}

                {/* دراپ‌دان اصلاح‌شده و متعادل با کنتراست بالا */}
                {showNotifDropdown && (
                  <div className={`absolute ${lang === 'fa' ? 'left-0' : 'right-0'} mt-3 w-80 rounded-2xl border p-4 shadow-2xl z-50 text-start backdrop-blur-xl ${
                    isDarkMode 
                      ? 'border-white/10 bg-[#0f172a]/95 text-white shadow-black/80' 
                      : 'border-slate-200 bg-white/98 text-slate-800 shadow-slate-300'
                  }`}>
                    <div className={`flex items-center justify-between pb-2 mb-2 border-b ${
                      isDarkMode ? 'border-white/10' : 'border-slate-100'
                    }`}>
                      <span className="font-bold text-xs">{lang === 'fa' ? 'آخرین گزارشات فنی سرور' : 'System Server Logs'}</span>
                      <button onClick={() => setShowNotifDropdown(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className={`p-2.5 rounded-xl transition-colors text-xs text-start ${
                          isDarkMode 
                            ? 'hover:bg-white/5 bg-white/[0.01]' 
                            : 'hover:bg-slate-50 bg-slate-50/50 border border-slate-100'
                        }`}>
                          <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{t[n.key]}</p>
                          <span className={`text-[10px] block mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t[n.timeKey]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-[1px] h-8 bg-white/10 hidden sm:block"></div>

              {/* نمایه Moein */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20">
                  <MoeinAvatar />
                </div>
                <div className="text-start hidden sm:block">
                  <h5 className="text-xs font-semibold">{lang === 'fa' ? 'معین' : 'Moein'}</h5>
                  <p className="text-[10px] opacity-50">{lang === 'fa' ? 'مدیر فرانت‌اند' : 'Frontend Lead'}</p>
                </div>
              </div>
            </div>
          </header>

          {/* بدنه محتوایی تب‌های تفکیک شده */}
          <div className="p-6 flex-1 space-y-6">
            
            {/* صفحه ۱: داشبورد اصلی (خلاصه وضعیت + اقدامات سریع) */}
            {activeTab === 'Dashboard' && (
              <div className="space-y-6 animate-fadeIn">
                {/* بخش اول: بالای صفحه - تعداد و آمارهای اساسی چهارگانه */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* کل کاربران */}
                  <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] text-start ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/[0.02]' 
                      : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                  }`}>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.totalUsers}</span>
                    <h3 className={`text-3xl font-bold tracking-tight mt-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      {fNum("1,280")} <span className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'نفر' : 'Users'}</span>
                    </h3>
                    <div className="flex items-center text-[10px] text-emerald-500 font-semibold mt-2">
                      <span>▲ {fNum(12)}٪ {lang === 'fa' ? 'نسبت به ماه گذشته' : 'vs last month'}</span>
                    </div>
                  </div>

                  {/* کاربران جدید امروز */}
                  <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] text-start ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/[0.02]' 
                      : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                  }`}>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.newUsersToday}</span>
                    <h3 className={`text-3xl font-bold tracking-tight mt-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      {fNum(recentUsers.length + 15)} <span className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'کاربر' : 'Users'}</span>
                    </h3>
                    <div className="flex items-center text-[10px] text-emerald-500 font-semibold mt-2">
                      <span>▲ {fNum(24)}٪ {lang === 'fa' ? 'نسبت به دیروز' : 'vs yesterday'}</span>
                    </div>
                  </div>

                  {/* تعداد درخواست‌ها یا سفارش‌ها */}
                  <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] text-start ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/[0.02]' 
                      : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                  }`}>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.totalRequests}</span>
                    <h3 className={`text-3xl font-bold tracking-tight mt-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      {fNum(342)} <span className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'تسک' : 'Tasks'}</span>
                    </h3>
                    <div className="flex items-center text-[10px] text-amber-500 font-semibold mt-2">
                      <span>▼ {fNum(5)}٪ {lang === 'fa' ? 'تأخیر سرور کلاینت' : 'Client latency'}</span>
                    </div>
                  </div>

                  {/* درآمد یا آمار کلی */}
                  <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] text-start ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/[0.02]' 
                      : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                  }`}>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.overallStats}</span>
                    <h3 className={`text-3xl font-bold tracking-tight mt-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      {fNum("4,500")} <span className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'دلار' : 'USD'}</span>
                    </h3>
                    <div className="flex items-center text-[10px] text-emerald-500 font-semibold mt-2">
                      <span>▲ {fNum(8)}٪ {lang === 'fa' ? 'ارتقا درگاه پرداخت' : 'Gateway upgrade'}</span>
                    </div>
                  </div>

                </div>

                {/* بخش اقدامات سریع همراه با تقویم مدیریتی زنده */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* دکمه‌های کنترلی سریع */}
                  <div className={`lg:col-span-2 p-6 rounded-2xl border text-start space-y-4 ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/[0.02]' 
                      : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                  }`}>
                    <h4 className="font-bold text-base">{t.quickActions}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setShowAddUserModal(true)} 
                        className={`p-5 rounded-xl transition-all text-center group flex flex-col items-center justify-center gap-2 ${
                          isDarkMode 
                            ? 'bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-indigo-500/30' 
                            : 'bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 shadow-xs'
                        }`}
                      >
                        <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <span className={`text-xs font-bold block transition-colors ${isDarkMode ? 'group-hover:text-indigo-400' : 'text-slate-700 group-hover:text-indigo-600'}`}>{t.addUser}</span>
                      </button>
                      <button 
                        onClick={() => triggerToast(t.toastItemCreated)} 
                        className={`p-5 rounded-xl transition-all text-center group flex flex-col items-center justify-center gap-2 ${
                          isDarkMode 
                            ? 'bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-rose-500/30' 
                            : 'bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 shadow-xs'
                        }`}
                      >
                        <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <span className={`text-xs font-bold block transition-colors ${isDarkMode ? 'group-hover:text-rose-400' : 'text-slate-700 group-hover:text-rose-600'}`}>{t.createItem}</span>
                      </button>
                      <button 
                        onClick={() => triggerToast(t.toastNotificationSent)} 
                        className={`p-5 rounded-xl transition-all text-center group flex flex-col items-center justify-center gap-2 ${
                          isDarkMode 
                            ? 'bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-emerald-500/30' 
                            : 'bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 shadow-xs'
                        }`}
                      >
                        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <span className={`text-xs font-bold block transition-colors ${isDarkMode ? 'group-hover:text-emerald-400' : 'text-slate-700 group-hover:text-emerald-600'}`}>{t.sendNotification}</span>
                      </button>
                      <button 
                        onClick={() => triggerToast(t.toastReportReady)} 
                        className={`p-5 rounded-xl transition-all text-center group flex flex-col items-center justify-center gap-2 ${
                          isDarkMode 
                            ? 'bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-violet-500/30' 
                            : 'bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 shadow-xs'
                        }`}
                      >
                        <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-500 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 12v-6m-9 6h18a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className={`text-xs font-bold block transition-colors ${isDarkMode ? 'group-hover:text-violet-400' : 'text-slate-700 group-hover:text-violet-600'}`}>{t.viewReports}</span>
                      </button>
                    </div>
                  </div>

                  {/* تقویم هوشمند شیشه‌ای با ساعت زنده */}
                  <div className={`p-6 rounded-2xl border text-start flex flex-col justify-between ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/[0.02]' 
                      : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className={`font-bold text-sm flex items-center gap-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                          <span>📅</span> 
                          {lang === 'fa' ? 'رویدادها و زمان' : 'Events & Time'}
                        </h4>
                        
                        {/* ساعت لایو ثانیه‌شمار با افکت واید مینی‌مال */}
                        <div className={`text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-lg border shadow-xs ${
                          isDarkMode ? 'bg-white/5 border-white/10 text-indigo-400' : 'bg-slate-100 border-slate-200 text-indigo-600'
                        }`}>
                          {time ? time : (lang === 'fa' ? '--:--:--' : '00:00:00')}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3 px-1">
                        <span className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {lang === 'fa' ? 'وضعیت سیستم: پایدار' : 'System: Stable'}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          isDarkMode ? 'bg-white/5 border-white/15 text-purple-400' : 'bg-slate-100 border-slate-200 text-purple-600'
                        }`}>
                          {lang === 'fa' ? 'ژوئن ۲۰۲۶' : 'June 2026'}
                        </span>
                      </div>

                      {/* روزهای هفته */}
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-500 mb-2">
                        {lang === 'fa' 
                          ? ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'] 
                          : ['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                      </div>

                      {/* ارقام تقویم */}
                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        <div className="p-1.5 opacity-0">{fNum(0)}</div>
                        {Array.from({ length: 30 }, (_, i) => {
                          const day = i + 1;
                          const isToday = day === 10;
                          return (
                            <div 
                              key={day} 
                              className={`p-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                                isToday 
                                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 font-bold scale-110' 
                                  : isDarkMode 
                                    ? 'hover:bg-white/5 text-slate-300' 
                                    : 'hover:bg-slate-100 text-slate-700'
                              }`}
                            >
                              {fNum(day)}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className={`mt-4 pt-3 border-t flex items-center gap-2 text-[10px] ${
                      isDarkMode ? 'border-white/5 text-slate-400' : 'border-slate-200 text-slate-500'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>
                        {lang === 'fa' ? 'امروز: توسعه دیزاین سیستم پورتفولیو' : 'Today: Core Portfolio UI Refactor'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* صفحه ۲: نمودارها و آمار (Analytics) */}
            {activeTab === 'Analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                
                {/* ۱. نمودار رشد کاربران */}
                <div className={`p-5 rounded-2xl border text-start flex flex-col justify-between ${
                  isDarkMode 
                    ? 'border-white/10 bg-white/[0.02]' 
                    : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                }`}>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t.userGrowth}</h4>
                    <p className={`text-[10px] mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'آمار کلی کاربران ثبت‌نامی هفتگی' : 'Weekly user registration stats'}</p>
                  </div>
                  <div className="h-40 w-full relative flex items-end justify-between pt-6 px-1">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                      <div className="border-b border-dashed border-white w-full h-[1px]"></div>
                      <div className="border-b border-dashed border-white w-full h-[1px]"></div>
                    </div>
                    {[30, 45, 40, 60, 75, 80, 95].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <span className={`text-[9px] opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{fNum(val)}k</span>
                        <div 
                          className={`w-4/5 rounded-t transition-all duration-500 ${
                            idx === 6 
                              ? getAccentBgClass() 
                              : isDarkMode 
                                ? 'bg-white/10 group-hover:bg-white/20' 
                                : 'bg-slate-200 group-hover:bg-slate-300'
                          }`}
                          style={{ height: `${val}%` }}
                        />
                        <span className={`text-[9px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.days[idx]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ۲. نمودار فعالیت روزانه */}
                <div className={`p-5 rounded-2xl border text-start flex flex-col justify-between ${
                  isDarkMode 
                    ? 'border-white/10 bg-white/[0.02]' 
                    : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                }`}>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t.dailyActivity}</h4>
                    <p className={`text-[10px] mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'فشار و حجم تراکنش روی هسته سرور' : 'CPU Load & server core activity'}</p>
                  </div>
                  <div className="h-40 w-full relative pt-4">
                    <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#818cf8" stopOpacity={isDarkMode ? 0.3 : 0.15}/>
                          <stop offset="100%" stopColor="#818cf8" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,100 Q40,30 80,70 T160,20 T240,60 T300,10 L300,120 L0,120 Z" 
                        fill="url(#areaGrad)" 
                      />
                      <path 
                        d="M0,100 Q40,30 80,70 T160,20 T240,60 T300,10" 
                        fill="none" 
                        stroke={isDarkMode ? "#818cf8" : "#4f46e5"} 
                        strokeWidth="3" 
                      />
                    </svg>
                    <div className={`flex justify-between text-[9px] mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>{lang === 'fa' ? 'شروع روز' : 'Start'}</span>
                      <span>{lang === 'fa' ? 'پایان روز' : 'End'}</span>
                    </div>
                  </div>
                </div>

                {/* ۳. نمودار بازدیدها */}
                <div className={`p-5 rounded-2xl border text-start flex flex-col justify-between ${
                  isDarkMode 
                    ? 'border-white/10 bg-white/[0.02]' 
                    : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                }`}>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t.visitsChart}</h4>
                    <p className={`text-[10px] mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'ترافیک ورودی کاربران موبایل و دسکتاپ' : 'Incoming traffic sources'}</p>
                  </div>
                  <div className="h-40 w-full flex items-center justify-around">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="3" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke={isDarkMode ? "#ec4899" : "#db2777"} strokeWidth="3" strokeDasharray="100" strokeDashoffset="30" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke={isDarkMode ? "#818cf8" : "#4f46e5"} strokeWidth="3" strokeDasharray="100" strokeDashoffset="70" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-xs">
                        <span className={isDarkMode ? 'text-white' : 'text-slate-800'}>{fNum(70)}٪</span>
                        <span className={`text-[8px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'موبایل' : 'Mobile'}</span>
                      </div>
                    </div>
                    <div className={`space-y-1.5 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-indigo-500 block"></span>
                        <span>{lang === 'fa' ? `دسکتاپ (${fNum(30)}٪)` : `Desktop (${fNum(30)}%)`}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-pink-500 block"></span>
                        <span>{lang === 'fa' ? `موبایل (${fNum(70)}٪)` : `Mobile (${fNum(70)}%)`}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* صفحه ۳: گزارشات و رویدادها (System Logs) */}
            {activeTab === 'Logs' && (
              <div className={`p-6 rounded-2xl border text-start space-y-6 animate-fadeIn ${
                isDarkMode 
                  ? 'border-white/10 bg-white/[0.02]' 
                  : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
              }`}>
                <div>
                  <h4 className="font-bold text-lg">{t.recentActivities}</h4>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'گزارش و ردیابی لحظه‌ای رویدادهای هسته فرانت‌اند و بک‌هند' : 'Real-time logs from both frontend and backend nodes'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* آخرین کاربران ثبت‌نام‌شده */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-xs text-indigo-500 border-b border-white/5 pb-2">{t.lastRegistered}</h5>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {recentUsers.map((user) => (
                        <div key={user.id} className={`flex items-center gap-2 p-2.5 rounded-xl transition-all border ${
                          isDarkMode 
                            ? 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5' 
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                        }`}>
                          <div className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center text-white ${getAccentBgClass()}`}>
                            {user.initial}
                          </div>
                          <div className="text-xs text-start">
                            <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{user.name}</p>
                            <span className={`block text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{user.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* آخرین عملیات انجام‌شده */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-xs text-emerald-600 border-b border-white/5 pb-2">{t.lastOperations}</h5>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {[
                        { text: lang === 'fa' ? 'بروزرسانی ماژول کلاینت' : 'Client Module Update', time: lang === 'fa' ? `۵ دقیقه قبل` : '5m ago' },
                        { text: lang === 'fa' ? 'تولید خودکار گواهی SSL' : 'SSL Cert Generated', time: lang === 'fa' ? `۱۲ دقیقه قبل` : '12m ago' },
                        { text: lang === 'fa' ? 'تایید اتصالات گیت‌هاب' : 'GitHub Hooks Verified', time: lang === 'fa' ? `۳ ساعت قبل` : '3h ago' },
                      ].map((op, idx) => (
                        <div key={idx} className={`p-3 rounded-xl text-xs space-y-1 text-start border ${
                          isDarkMode 
                            ? 'bg-white/[0.02] border-white/5' 
                            : 'bg-slate-50 border-slate-200'
                        }`}>
                          <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{op.text}</p>
                          <span className={`text-[10px] block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{op.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* آخرین خطاها یا هشدارها */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-xs text-rose-600 border-b border-white/5 pb-2">{t.lastErrors}</h5>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {[
                        { msg: lang === 'fa' ? 'تایم‌اوت در کوئری پایگاه داده' : 'Database Query Timeout', code: lang === 'fa' ? `۵۰۴ درگاه` : 'Error 504' },
                        { msg: lang === 'fa' ? 'سرریز موقت حافظه کش رم' : 'Cache Overflow Risk', code: lang === 'fa' ? `۴۰۳ ظرفیت رم` : 'Warning 403' },
                      ].map((err, idx) => (
                        <div key={idx} className={`p-3 rounded-xl border text-xs space-y-1 text-start ${
                          isDarkMode 
                            ? 'bg-rose-500/5 border-rose-500/10' 
                            : 'bg-rose-50/50 border-rose-200'
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-rose-600 text-[10px]">{err.code}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                          </div>
                          <p className={`leading-relaxed text-[10px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{err.msg}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* صفحه ۴: وضعیت سرور و منابع سخت‌افزاری (System Monitor) */}
            {activeTab === 'Monitor' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                
                {/* وضعیت مانیتورینگ سخت‌افزار */}
                <div className={`p-6 rounded-2xl border text-start space-y-4 ${
                  isDarkMode 
                    ? 'border-white/10 bg-white/[0.02]' 
                    : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                }`}>
                  <h4 className="font-bold text-base">{t.systemStatus}</h4>
                  
                  <div className="space-y-4 text-sm">
                    
                    {/* وضعیت سرور */}
                    <div className={`flex justify-between items-center pb-2 border-b ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
                      <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{t.serverStatus}</span>
                      <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-600 font-bold">{t.statusHealthy}</span>
                    </div>

                    {/* میزان مصرف CPU و RAM */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>CPU {fNum(sysMetrics.cpu)}٪</span>
                        <span>RAM {fNum(sysMetrics.ram)}٪</span>
                      </div>
                      <div className={`h-2 w-full rounded-full overflow-hidden flex ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                        <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${sysMetrics.cpu}%` }}></div>
                        <div className="h-full bg-pink-500 transition-all duration-1000" style={{ width: `${sysMetrics.ram}%` }}></div>
                      </div>
                    </div>

                    {/* فضای ذخیره‌سازی */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>{t.storage}</span>
                        <span>{fNum(sysMetrics.disk)}</span>
                      </div>
                      <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                        <div className="h-full bg-emerald-500" style={{ width: sysMetrics.disk }}></div>
                      </div>
                    </div>

                    {/* وضعیت دیتابیس */}
                    <div className={`flex justify-between items-center pt-2 border-t text-xs font-semibold ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
                      <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{t.database}</span>
                      <span className="font-bold text-emerald-600">{fNum(sysMetrics.dbConn)}٪ {t.statusHealthy}</span>
                    </div>

                  </div>
                </div>

                {/* وضعیت اتصالات و نودهای شبکه */}
                <div className={`p-6 rounded-2xl border text-start space-y-4 ${
                  isDarkMode 
                    ? 'border-white/10 bg-white/[0.02]' 
                    : 'border-slate-200 bg-white/70 backdrop-blur-md shadow-xs'
                }`}>
                  <h4 className="font-bold text-base">{lang === 'fa' ? 'اتصالات و کلاسترها' : 'Cluster Connections'}</h4>
                  <div className="space-y-4">
                    {[
                      { node: "Node-A (Tehran)", ping: "15ms", load: "34%" },
                      { node: "Node-B (Frankfurt)", ping: "85ms", load: "52%" },
                      { node: "Node-C (Singapore)", ping: "140ms", load: "12%" }
                    ].map((n, i) => (
                      <div key={i} className={`flex justify-between items-center p-3 rounded-xl border text-xs ${
                        isDarkMode 
                          ? 'bg-white/[0.02] border-white/5' 
                          : 'bg-slate-50 border-slate-200 shadow-xxs'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{n.node}</span>
                        </div>
                        <div className={`flex gap-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          <span>Ping: {fNum(n.ping)}</span>
                          <span>Load: {fNum(n.load)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* صفحه ۵: تنظیمات شبیه‌ساز شیشه‌ای (Glass Settings) */}
            {activeTab === 'Settings' && (
              <div className={`p-8 rounded-3xl border text-start space-y-8 animate-fadeIn ${
                isDarkMode 
                  ? 'border-white/10 bg-white/[0.02]' 
                  : 'border-slate-200 bg-white/70 backdrop-blur-md'
              }`}>
                <div>
                  <h3 className="text-xl font-bold pb-2">{lang === 'fa' ? 'تنظیمات شبیه‌ساز شیشه (CSS Engine)' : 'Live Glass Engine (CSS Settings)'}</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'fa' ? 'تغییرات زیر را اعمال کنید و تغییرات را به صورت زنده روی کل پنل و داشبورد معین تماشا کنید!' : 'Modify parameters below and witness visual changes instantly on Moein Workspace.'}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* تنظیم مات بودن */}
                  <div className={`space-y-4 p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className="font-semibold text-sm">{lang === 'fa' ? 'میزان مات بودن پشت‌زمینه (Backdrop Blur)' : 'Backdrop Blur Intensity'}</h4>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'backdrop-blur-sm', label: lang === 'fa' ? 'مات خفیف (Blur SM)' : 'Blur SM' },
                        { id: 'backdrop-blur-md', label: lang === 'fa' ? 'مات متوسط (Blur MD)' : 'Blur MD' },
                        { id: 'backdrop-blur-lg', label: lang === 'fa' ? 'مات قوی (Blur LG)' : 'Blur LG' },
                        { id: 'backdrop-blur-xl', label: lang === 'fa' ? 'مات شیشه‌ای اپل (Blur XL)' : 'Blur XL' }
                      ].map((item) => (
                        <button 
                          key={item.id} 
                          onClick={() => setGlassBlur(item.id)} 
                          className={`px-4 py-2 rounded-xl text-start text-xs transition-all border ${
                            glassBlur === item.id 
                              ? `${getAccentBgClass()} text-white font-bold border-transparent`
                              : isDarkMode 
                                ? 'bg-white/5 hover:bg-white/10 border-white/5' 
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* تنظیم حاشیه‌ها */}
                  <div className={`space-y-4 p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className="font-semibold text-sm">{lang === 'fa' ? 'ضخامت حاشیه درخشان (Border Styling)' : 'Border Style'}</h4>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'border-none', label: lang === 'fa' ? 'بدون حاشیه (Flat)' : 'No Border (Flat)' },
                        { id: 'border', label: lang === 'fa' ? 'حاشیه استاندارد (۱ پیکسل)' : 'Standard (1px)' },
                        { id: 'border-2', label: lang === 'fa' ? 'حاشیه ضخیم کارتونی (۲ پیکسل)' : 'Thick (2px)' }
                      ].map((item) => (
                        <button 
                          key={item.id} 
                          onClick={() => setGlassBorder(item.id)} 
                          className={`px-4 py-2 rounded-xl text-start text-xs transition-all border ${
                            glassBorder === item.id 
                              ? `${getAccentBgClass()} text-white font-bold border-transparent`
                              : isDarkMode 
                                ? 'bg-white/5 hover:bg-white/10 border-white/5' 
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* تنظیم میزان روشنایی/تیرگی شیشه */}
                  <div className={`space-y-4 p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className="font-semibold text-sm">{lang === 'fa' ? 'غلظت شیشه (Glass Opacity)' : 'Glass Material Weight'}</h4>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'bg-white/[0.01]', label: lang === 'fa' ? 'بسیار شفاف (۱٪ غلظت)' : 'Crystal Clear (1%)' },
                        { id: 'bg-white/[0.04]', label: lang === 'fa' ? 'پیش‌فرض (۴٪ غلظت)' : 'Standard weight (4%)' },
                        { id: 'bg-white/[0.09]', label: lang === 'fa' ? 'شیشه سنگین (۹٪ غلظت)' : 'Heavy opacity (9%)' }
                      ].map((item) => (
                        <button 
                          key={item.id} 
                          onClick={() => setGlassOpacity(item.id)} 
                          className={`px-4 py-2 rounded-xl text-start text-xs transition-all border ${
                            glassOpacity === item.id 
                              ? `${getAccentBgClass()} text-white font-bold border-transparent`
                              : isDarkMode 
                                ? 'bg-white/5 hover:bg-white/10 border-white/5' 
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* فوتر مدرن با برند معین */}
          <footer className={`py-4 px-6 border-t text-center text-xs text-slate-500 ${
            isDarkMode ? 'border-white/5' : 'border-slate-200'
          }`}>
            {t.designedBy}
          </footer>

        </main>

      </div>

      {/* مودال ثبت کاربر جدید */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl border p-6 text-start relative ${glassBlur} ${glassOpacity} ${
            isDarkMode ? 'border-white/10 bg-slate-900/90 text-white' : 'border-slate-200 bg-white text-slate-800 shadow-2xl'
          }`}>
            
            {/* دکمه بستن با اولویت بالای کلیک (z-index) */}
            <button 
              onClick={() => setShowAddUserModal(false)}
              className={`absolute top-4 left-4 p-1.5 rounded-lg transition-colors z-20 ${
                isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* تیتر مودال با افکت ماتریکس زنده و حروف‌چینی بومی */}
            <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
              <MatrixText text={t.modalTitle} initialDelay={100} letterAnimationDuration={500} letterInterval={60} isDarkMode={isDarkMode} />
            </h3>
            <p className={`text-xs mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.modalDesc}</p>

            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.lblFullName}</label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'fa' ? 'مثال: آرمان مرادی' : 'e.g. Arman Moradi'}
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className={`w-full p-2.5 text-sm rounded-xl border outline-none ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/[0.03] text-white focus:border-indigo-500' 
                      : 'border-slate-300 bg-slate-50 text-slate-800 focus:border-indigo-500 shadow-xxs'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.lblEmail}</label>
                <input
                  type="email"
                  required
                  placeholder="arman@company.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className={`w-full p-2.5 text-sm rounded-xl border outline-none ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/[0.03] text-white focus:border-indigo-500' 
                      : 'border-slate-300 bg-slate-50 text-slate-800 focus:border-indigo-500 shadow-xxs'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.lblRole}</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className={`w-full p-2.5 text-sm rounded-xl border outline-none ${
                    isDarkMode 
                      ? 'border-white/10 bg-[#121824] text-slate-300 focus:border-indigo-500' 
                      : 'border-slate-300 bg-slate-50 text-slate-800 focus:border-indigo-500'
                  }`}
                >
                  <option value="Operator">{lang === 'fa' ? 'اپراتور' : 'Operator'}</option>
                  <option value="Administrator">{lang === 'fa' ? 'ادمین کل' : 'Administrator'}</option>
                  <option value="QA Lead">{lang === 'fa' ? 'تست کیفیت' : 'QA Lead'}</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs text-white transition-all ${getAccentBgClass()}`}
                >
                  {t.btnSubmit}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className={`flex-1 py-2.5 rounded-xl border font-bold text-xs ${
                    isDarkMode 
                      ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  }`}
                >
                  {t.btnCancel}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* سیستم توست شیشه‌ای با افکت رمزگشایی دیجیتال ماتریکس */}
      {showToast && (
        <div className={`fixed bottom-6 ${lang === 'fa' ? 'left-6' : 'right-6'} p-4 rounded-2xl shadow-2xl border flex items-center gap-3 z-50 animate-bounce ${glassBlur} ${glassOpacity} ${
          isDarkMode ? 'border-emerald-500/30 bg-slate-900/90 text-white' : 'border-emerald-500/20 bg-white text-slate-800'
        }`}>
          <span className="text-emerald-400 text-xl">✓</span>
          <span className={`text-xs font-mono font-semibold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
            <MatrixText text={toastMessage} initialDelay={50} letterAnimationDuration={500} letterInterval={50} isDarkMode={isDarkMode} />
          </span>
        </div>
      )}

    </div>
  );
}

// کامپوننت آواتار با عکس واقعی معین
function MoeinAvatar() {
  return (
    <div className="w-full h-full rounded-full p-[1.5px] bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
      <img 
        src="https://uploads.onecompiler.io/44rbvj9gq/44rbtjk82/Gemini_Generated_Image_od7t7mod7t7mod7t.png" 
        alt="Moein Avatar" 
        className="w-full h-full object-cover rounded-full bg-slate-900"
        loading="lazy"
      />
    </div>
  );
}