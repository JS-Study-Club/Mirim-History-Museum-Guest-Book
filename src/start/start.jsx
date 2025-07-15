import './start.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Start = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/design');
    };

    const today = new Date();
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

    const hours24 = today.getHours();
    const minutes = String(today.getMinutes()).padStart(2, "0");

    const hours12 = String(hours24 % 12 || 12).padStart(2, "0");
    const ampm = hours24 < 12 ? "AM" : "PM";
    const formattedTime = `${hours12}:${minutes} ${ampm}`;

    const colors = ['rgba(218, 255, 210, 0.8)', 'rgba(218, 255, 210, 0.3)'];
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

return (
    <div className='startBg' onClick={handleClick}>
        <div className='datetime'>
            <p className='dateMessage'>
                Date
                <span className='dateValue'>{formattedDate}</span>
            </p>
            <p className='timeMessage'>
                Time
                <span className='timeValue'>{formattedTime}</span>
            </p>

        </div>
        <div className='welcomeMessage'>
            <p className='welcomeMessageEn'>Welcome to<br/>Mirim High School</p>
            <p className='welcomeMessageKo'>미림역사박물관에 오신 걸 환영합니다.</p>
        </div>
        <div className='click'>
            <div className='clickIcon'></div>
            <p className='clickText' style={{ color: colors[colorIndex] }}>Click</p>
            <p className='clickText'>화면을 터치하여 방문록 작성하기</p>
        </div>
        
    </div>
  );
};

export default Start;
