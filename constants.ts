import React from 'react';

// Using React.createElement for icons to avoid JSX in .ts file
// Icons now default to currentColor or specific theme colors
export const Icons = {
  Cross: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "w-16 h-16 text-amber-500" 
  }, React.createElement("path", {
    fillRule: "evenodd",
    d: "M12 2.25a.75.75 0 01.75.75v8.25h8.25a.75.75 0 010 1.5H12.75v8.25a.75.75 0 01-1.5 0V12.75H3a.75.75 0 010-1.5h8.25V3a.75.75 0 01.75-.75z",
    clipRule: "evenodd"
  })),
  Home: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
  })),
  Calendar: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
  })),
  Heart: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
  })),
  HeartSolid: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    d: "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.11 2.25 12.031 2.25 8.25c0-3.418 2.654-6 6-6 1.777 0 3.327.818 4.373 2.112A6.002 6.002 0 0115.75 2.25c3.346 0 6 2.582 6 6 0 3.781-2.438 6.86-5.739 9.259a25.18 25.18 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
  })),
  User: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
  })),
  Sparkles: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, 
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    }),
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
    }),
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
    })
  ),
  Send: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "w-5 h-5"
  }, React.createElement("path", {
    d: "M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
  })),
  HandRaised: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575V12a1.5 1.5 0 003 1.5h6.375a1.5 1.5 0 013 1.5v6a1.5 1.5 0 01-3 1.5H9a1.5 1.5 0 01-1.5-1.5V6.825a1.575 1.575 0 013.15 0v-1.5"
  })),
  ChatBubble: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
  })),
  Plus: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4.5v15m7.5-7.5h-15"
  })),
  Bank: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
  })),
  Copy: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5"
  })),
  Bell: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
  })),
  ChevronLeft: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5L8.25 12l7.5-7.5"
  })),
  ChevronRight: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    stroke: "currentColor",
    className: "w-5 h-5 text-slate-300"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 4.5l7.5 7.5-7.5 7.5"
  })),
  Edit: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
  })),
  Settings: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.581-.495.644-.869l.214-1.281z"
  }), React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  })),
  Shield: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
  })),
  HelpCircle: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
  })),
  LogOut: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
  })),
  Quote: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    className: "w-5 h-5"
  }, React.createElement("path", {
    fillRule: "evenodd",
    d: "M4.5 9.75a6 6 0 016-6h.003c.905.002 1.62.776 1.558 1.678-.06 1.045-.58 2.053-1.42 2.766a3.003 3.003 0 00-1.141 2.285v1.271a2.25 2.25 0 002.25 2.25H12a2.25 2.25 0 012.25 2.25v3a2.25 2.25 0 01-2.25 2.25H10.5a6 6 0 01-6-6v-3.75zm9.75 0a6 6 0 016-6h.003c.905.002 1.62.776 1.558 1.678-.06 1.045-.58 2.053-1.42 2.766a3.003 3.003 0 00-1.141 2.285v1.271a2.25 2.25 0 002.25 2.25H21.75a2.25 2.25 0 012.25 2.25v3a2.25 2.25 0 01-2.25 2.25H20.25a6 6 0 01-6-6v-3.75z",
    clipRule: "evenodd"
  })),
  Clock: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-4 h-4"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
  })),
  MapPin: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-4 h-4"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
  }), React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
  })),
  Play: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    className: "w-8 h-8"
  }, React.createElement("path", {
    fillRule: "evenodd",
    d: "M4.5 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z",
    clipRule: "evenodd"
  })),
  Book: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
  })),
  Smile: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm6.75 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z"
  })),
  Star: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "w-6 h-6"
  }, React.createElement("path", {
    fillRule: "evenodd",
    d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
    clipRule: "evenodd"
  })),
};

export const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Sunday Worship Service',
    date: 'Sun, Oct 29',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    category: 'Worship',
    description: 'Join us for a powerful time of worship and the Word. Kids ministry available.',
    imageUrl: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: '2',
    title: 'Youth Night',
    date: 'Wed, Nov 1',
    time: '7:00 PM',
    location: 'Youth Hall',
    category: 'Youth',
    description: 'High energy games, worship, and small groups for grades 6-12.',
    imageUrl: 'https://picsum.photos/400/200?random=2'
  },
  {
    id: '3',
    title: 'Community Outreach',
    date: 'Sat, Nov 4',
    time: '9:00 AM',
    location: 'City Park',
    category: 'Outreach',
    description: 'Serving our city by cleaning up the park and handing out water.',
    imageUrl: 'https://picsum.photos/400/200?random=3'
  },
  {
    id: '4',
    title: 'Marriage Seminar',
    date: 'Fri, Nov 10',
    time: '6:30 PM',
    location: 'Fellowship Hall',
    category: 'Family',
    description: 'Strengthen your bond. Dinner and childcare provided.',
    imageUrl: 'https://picsum.photos/400/200?random=4'
  }
];

export const MOCK_PRAYERS = [
  {
    id: '1',
    userName: 'Jessica M.',
    userInitial: 'J',
    content: 'Please pray for my mother who is undergoing surgery tomorrow. We are believing for a successful procedure and quick recovery.',
    timestamp: '2h ago',
    prayedCount: 12,
    commentCount: 3,
    isPrayed: false,
    category: 'Healing',
    comments: [
      {
        id: 'c1',
        userName: 'Pastor David',
        text: 'Standing in faith with you, Jessica! By His stripes she is healed.',
        timestamp: '1h ago'
      }
    ]
  },
  {
    id: '2',
    userName: 'Mark T.',
    userInitial: 'M',
    content: 'Praying for guidance in my career. Need clarity on the next steps to take.',
    timestamp: '5h ago',
    prayedCount: 8,
    commentCount: 1,
    isPrayed: true,
    category: 'Guidance',
    comments: []
  },
  {
    id: '3',
    userName: 'Sarah L.',
    userInitial: 'S',
    content: 'Praise report! My son came back to the Lord this Sunday!',
    timestamp: '1d ago',
    prayedCount: 24,
    commentCount: 5,
    isPrayed: false,
    category: 'Family',
    comments: []
  }
];

export const MOCK_NOTIFICATIONS = [
  { id: '2', title: 'Someone prayed for you', time: '5 hours ago', isRead: false, type: 'prayer' },
  { id: '3', title: 'Youth Night starts in 1h', time: 'Oct 30', isRead: true, type: 'event' },
];

export const MOCK_TESTIMONIES = [
  {
    id: '1',
    userName: 'David Chen',
    userInitial: 'D',
    timestamp: '2 days ago',
    content: 'I was struggling with anxiety for years, but after the prayer meeting last week, I felt a peace I cannot explain. God is good!',
    likes: 45
  },
  {
    id: '2',
    userName: 'Rachel Green',
    userInitial: 'R',
    timestamp: '1 week ago',
    content: 'God provided financially when I didn\'t know how I would pay my rent. He is truly Jehovah Jireh!',
    likes: 32
  }
];

export const MOCK_BOOKS = [
  {
    id: '1',
    title: 'The Pilgrim\'s Progress',
    author: 'John Bunyan',
    coverUrl: 'https://picsum.photos/300/450?random=101',
    description: 'A Christian allegory written by John Bunyan. It is regarded as one of the most significant works of religious English literature.',
    content: `Chapter 1: The City of Destruction

As I walked through the wilderness of this world, I lighted on a certain place where was a Den, and I laid me down in that place to sleep: and, as I slept, I dreamed a dream. I dreamed, and behold, I saw a man clothed with rags, standing in a certain place, with his face from his own house, a book in his hand, and a great burden upon his back. I looked, and saw him open the book and read therein; and, as he read, he wept, and trembled; and not being able longer to contain, he brake out with a lamentable cry, saying, "What shall I do?"

In this plight, therefore, he went home and refrained himself as long as he could, that his wife and children should not perceive his distress; but he could not be silent long, because that his trouble increased. Wherefore at length he brake his mind to his wife and children; and thus he began to talk to them: "O my dear wife," said he, "and you the children of my bowels, I, your dear friend, am in myself undone by reason of a burden that lieth hard upon me; moreover, I am for certain informed that this our city will be burned with fire from heaven, in which fearful overthrow, both myself, with thee my wife, and you my sweet babes, shall miserably come to ruin, except (the which yet I see not) some way of escape can be found, whereby we may be delivered."`
  },
  {
    id: '2',
    title: 'Mere Christianity',
    author: 'C.S. Lewis',
    coverUrl: 'https://picsum.photos/300/450?random=102',
    description: 'Adapted from a series of BBC radio talks made between 1942 and 1944, C.S. Lewis explores the common ground upon which all of those of Christian faith stand.',
    content: `Book 1: Right and Wrong as a Clue to the Meaning of the Universe

Everyone has heard people quarrelling. Sometimes it sounds funny and sometimes it sounds merely unpleasant; but however it sounds, I believe we can learn something very important from listening to the kind of things they say. They say things like this: "How'd you like it if anyone did the same to you?"—"That's my seat, I was there first"—"Leave him alone, he isn't doing you any harm"—"Why should you shove in first?"—"Give me a bit of your orange, I gave you a bit of mine"—"Come on, you promised." People say things like that every day, educated people as well as uneducated, and children as well as grown-ups.

Now what interests me about all these remarks is that the man who makes them is not merely saying that the other man's behaviour does not happen to please him. He is appealing to some kind of standard of behaviour which he expects the other man to know about.`
  },
  {
    id: '3',
    title: 'The Purpose Driven Life',
    author: 'Rick Warren',
    coverUrl: 'https://picsum.photos/300/450?random=103',
    description: 'A devotional book which offers a 40-day personal spiritual journey and presents what Warren says are God\'s five purposes for human life on Earth.',
    content: `Day 1: It Starts with God

It’s not about you.

The purpose of your life is far greater than your own personal fulfillment, your peace of mind, or even your wildest dreams and ambitions. If you want to know why you were placed on this planet, you must begin with God. You were born by his purpose and for his purpose.`
  }
];