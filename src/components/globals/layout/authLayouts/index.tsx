import { Image } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import configHomeData from "~/api/config-home";
import { _format } from "~/utils";

export const AuthLayout: React.FC<{}> = ({ children }) => {
  const [bg, setBg] = useState("");
  const [logo, setLogo] = useState("");

  useQuery(["homeConfig"], () => {
    configHomeData.get().then((res) => {
      // console.log("AuthLayout res: ", res.data.Data);
      setBg(res?.Data?.BackgroundAuth);
      setLogo(_format.handleRemoveSpace(res.Data?.LogoIMG));
    });
  });

  return (
    <div
      className="authContainer"
      style={{ backgroundImage: `url(${bg ?? "/background.jpg"})` }}
    >
      <div className="form">
        <div className="logo">
          <Image
            src={logo ?? "/logo-removebg.png"}
            alt="logo"
            width={"100%"}
            height={"auto"}
            preview={false}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
