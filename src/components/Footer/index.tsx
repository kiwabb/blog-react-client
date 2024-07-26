import React from "react";
import "./index.less"

interface FooterProps {
  id: string;
  key: string;
  isMobile: boolean;
  showFooter?: boolean;
}

const Footer:React.FC<FooterProps> = ({showFooter=true}) => {
  return (
    <div className="myFooter-wrap">
      <div className="myFooter">
        <div className="footer-title">云想衣裳花想容，春风拂槛露华浓。</div>
        <div className="icp">本网站由 <a href="https://jackmouse.cn" target="_blank">JackMouse</a> 强力支持</div>
      </div>
    </div>
  )
}

export default Footer;