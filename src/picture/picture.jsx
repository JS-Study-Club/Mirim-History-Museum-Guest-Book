import './picture.css';
import StepIndicator from '../stepIndicator/StepIndicator';

const Picture = () => {

    return (
        <div className='container'>
            <div className="header">
                <p className="headerEn">Look at the camera</p>
                <p className="headerKo">좌측의 카메라를 바라봐주세요!</p>
            </div>
            <StepIndicator currentStep={2} />
        </div>
        
    );
};

export default Picture;