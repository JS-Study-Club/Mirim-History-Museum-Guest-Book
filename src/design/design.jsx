import './design.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from '../stepIndicator/StepIndicator';

const Design = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/picture');
    };

    const [countdown, setCountdown] = useState(15); 
    useEffect(() => {
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
    
        const timeout = setTimeout(() => {
          navigate("/");
        }, 15000);
    
        return () => {
          clearInterval(timer);
          clearTimeout(timeout);
        };
      }, [navigate]);

return (
    <div className='container'>
         <div className="header">
            <p className="headerEn">Choose Frame</p>
            <p className="headerKo">프레임을 선택해주세요</p>
        </div>
        <div className='frame'></div>
        <div className='frames'>
            <div className='frame1'></div>
            <div className='frame2'></div>
            <div className='frame3'></div>
            <div className='frame4'></div>
            <div className='frame5'></div>
            <div className='frame6'></div>
        </div>
        <button className='nextbutton' onClick={handleClick}>다음</button>
        <p className='after15'>{countdown}초 뒤 메인화면으로 이동합니다</p>
        <StepIndicator currentStep={1} />

    </div>
);
}
export default Design ;
