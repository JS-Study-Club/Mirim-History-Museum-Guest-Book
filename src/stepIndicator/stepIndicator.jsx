import './StepIndicator.css';
import React from 'react';

const StepIndicator = ({ currentStep }) => {
  const steps = ['프레임 선택', '사진 촬영', '방명록 작성', '완료'];

  return (
    <div className="step-container">
      <div className="circles-container">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={index}>
            <div className="steps-wrapper">
              <div className={`circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                {stepNumber}
              </div>
              <p className={`label ${isActive ? 'active-label' : ''}`}>{label}</p>
            </div>

              {index !== steps.length - 1 && (
                <div className={`line ${stepNumber < currentStep ? 'completed-line' : ''}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="labels-container">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          
          return (
            <div key={index} className="label-wrapper">
              {/* <p className={`label ${isActive ? 'active-label' : ''}`}>{label}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;