import './finish.css';
import StepIndicator from '../stepIndicator/StepIndicator';
import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';


const Finish = () => {

    const hasFired = useRef(false); // 중복 실행 방지

    const checkRef = useRef();

    useEffect(() => {
    if (!hasFired.current) {
        hasFired.current = true;

        const rect = checkRef.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const originX = x / window.innerWidth;
        const originY = y / window.innerHeight;

        confetti({
        particleCount: 300,
        angle: 90,
        spread: 100,
        startVelocity: 50,
        origin: { x: originX, y: originY },
        gravity: 1.0,
        scalar: 1.8 // 입자 크기

        });
    }
    }, []);



    return(
        <div className='container'>
            <div className='check' ref={checkRef}>
                <img src='/done.png' alt='완료 체크 아이콘'></img>
            </div>
            <p className='desc1'>갤러리에 성공적으로<br/>게시되었습니다!</p>
            <p className='desc2'>오른쪽 갤러리를 확인해주세요</p>
            <img className='qrcode'></img>
            <p className='desc3'>QR을 찍고 방문록을 다운받으세요</p>

            <StepIndicator currentStep={4} />

        </div>

    );

};
export default Finish;