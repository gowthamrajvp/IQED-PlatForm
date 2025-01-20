import { useEffect, useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DynamicBackground } from "../../Common";
import {
  WhiteBackgroundSVG,
  YellowBackgroundSVG,
  BlueBackgroundSVG,
} from "../../assets/SVG";
import { Toaster } from "react-hot-toast";
// import { SocketProvider } from "../../Socket/SocketContext";

const RootLayout = () => {
  const location = useLocation();
  const backgroundImage = (() => {
    const backgroundMap = {
      "/": BlueBackgroundSVG,
      "/match": YellowBackgroundSVG,
      "/iqquiz/result": YellowBackgroundSVG,
    };
    console.log(location.pathname.toLowerCase());
  
    const path = location.pathname.toLowerCase();
    if (path.startsWith("/iqquiz") || path.startsWith("/quiz") || path.startsWith("/match")) {
      return YellowBackgroundSVG;
    }
    if (path.endsWith("/result")) {
      return YellowBackgroundSVG;
    }
    return backgroundMap[path] || WhiteBackgroundSVG;
  })();
  

  return (
    <DynamicBackground
      sx={{ backgroundImage: `url(${backgroundImage})` }}
      className="Root-BackGround"

    >
      <Outlet />
      {/* <SocketProvider>
       
      </SocketProvider>  */}
      <Toaster position="top-center" reverseOrder={false} />
    </DynamicBackground>
  );
};

export default RootLayout;
