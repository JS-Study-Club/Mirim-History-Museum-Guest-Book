import './finish.css';
import StepIndicator from '../stepIndicator/StepIndicator';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Finish = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(30);
    
    useEffect(() => {
            const timer = setInterval(() => {
              setCountdown((prev) => prev - 1);
            }, 1000);
    
            const timeout = setTimeout(() => {
              navigate("/");
            }, 30000);
    
            return () => {
              clearInterval(timer);
              clearTimeout(timeout);
            };
        }, [navigate]);

    return(
        <div className='container'>
            <div className='check'>
                <img src='/done.png' alt='완료 체크 아이콘'></img>
            </div>
            <p className='desc1'>갤러리에 성공적으로<br/>게시되었습니다!</p>
            <p className='desc2'>오른쪽 갤러리를 확인해주세요</p>
            <img className='qrcode'></img>
            <p className='desc3'>QR을 찍고 방문록을 다운받으세요</p>
            <p className='after302'>{countdown}초 뒤 메인화면으로 이동합니다</p>
            <StepIndicator currentStep={4} />

        </div>

    );

};
export default Finish;