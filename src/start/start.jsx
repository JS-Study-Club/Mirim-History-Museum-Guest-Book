import './start.css';
import {useState} from 'react-router-dom';

const Start = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/next'); // 이동할 경로
    };

    const today = new Date();
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

    const hours24 = today.getHours();
    const minutes = String(today.getMinutes()).padStart(2, "0");

    const hours12 = String(hours24 % 12 || 12).padStart(2, "0");
    const ampm = hours24 < 12 ? "AM" : "PM";
    const formattedTime = `${hours12}:${minutes} ${ampm}`;

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
            <p className='clickText'>Click</p>
            <p className='clickText'>화면을 터치하여 방문록 작성하기</p>
        </div>
        
    </div>
  );
};

export default Start;
