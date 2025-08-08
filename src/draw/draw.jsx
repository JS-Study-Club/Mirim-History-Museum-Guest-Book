import './draw.css';
import StepIndicator from '../stepIndicator/StepIndicator';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useRef, useState } from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';

const Draw = () => {
  const navigate = useNavigate();
  const { selectedFrame } = useAppContext();

  const location = useLocation();
  const image = location.state?.image;

  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [undoCount, setUndoCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const getFrameImage = (frameNumber) => {
    return `/frame${frameNumber}.png`;
  };

  const frameImageSrc = selectedFrame ? getFrameImage(selectedFrame) : null;

  const handleRedoClick = () => {
    if (canRedo) {
      canvasRef.current?.redo();
      setUndoCount(undoCount - 1);
      updateButtonStates(strokeCount, undoCount - 1);
    }
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handleUndoClick = () => {
    if (canUndo) {
      canvasRef.current?.undo();
      setUndoCount(undoCount + 1);
      updateButtonStates(strokeCount, undoCount + 1);
    }
  };

  const handleStroke = () => {
    const newStrokeCount = strokeCount + 1;
    setStrokeCount(newStrokeCount);
    setUndoCount(0);
    updateButtonStates(newStrokeCount, 0);
  };

  const updateButtonStates = (strokes, undos) => {
    setCanUndo(strokes > 0 && undos < strokes);
    setCanRedo(undos > 0);
  };

  // 이미지를 로드하는 Promise 함수
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // CORS 문제 방지
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // 모든 레이어를 합성하는 함수
  const combineAllLayers = async () => {
    try {
      // 캔버스 생성
      const combinedCanvas = document.createElement('canvas');
      const ctx = combinedCanvas.getContext('2d');
      
      // 원본 이미지의 크기를 기준으로 캔버스 크기 설정
      const photoImg = await loadImage(image);
      combinedCanvas.width = photoImg.width;
      combinedCanvas.height = photoImg.height;

      // 1. 배경 사진 그리기
      ctx.drawImage(photoImg, 0, 0, combinedCanvas.width, combinedCanvas.height);

      // 2. 프레임 그리기 (선택된 경우)
      if (frameImageSrc) {
        const frameImg = await loadImage(frameImageSrc);
        ctx.drawImage(frameImg, 0, 0, combinedCanvas.width, combinedCanvas.height);
      }

      // 3. 그림 그리기 (ReactSketchCanvas에서 export)
      const drawingDataUrl = await canvasRef.current?.exportImage('png');
      if (drawingDataUrl) {
        const drawingImg = await loadImage(drawingDataUrl);
        ctx.drawImage(drawingImg, 0, 0, combinedCanvas.width, combinedCanvas.height);
      }

      // 합성된 이미지를 DataURL로 변환
      return combinedCanvas.toDataURL('image/png');
    } catch (error) {
      console.error('이미지 합성 중 오류 발생:', error);
      throw error;
    }
  };

  // 백엔드에 이미지 업로드
  const uploadImageToBackend = async (dataUrl) => {
    try {
      console.log('1. 이미지 업로드 시작');
      console.log('2. DataURL 길이:', dataUrl.length);
      
      // DataURL을 Blob으로 변환
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      console.log('3. Blob 생성 완료, 크기:', blob.size);

      // FormData 생성
      const formData = new FormData();
      formData.append('img', blob, 'combined_image.png');
      console.log('4. FormData 생성 완료');

      // 백엔드로 POST 요청
      console.log('5. 백엔드로 요청 보내는 중...');
      const uploadResponse = await fetch('http://localhost:3000/storage', {
        method: 'POST',
        body: formData,
      });

      console.log('6. 응답 상태:', uploadResponse.status);
      console.log('7. 응답 헤더:', uploadResponse.headers);

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('8. 에러 응답:', errorText);
        throw new Error(`이미지 업로드 실패: ${uploadResponse.status} - ${errorText}`);
      }

      const result = await uploadResponse.json();
      console.log('9. 업로드 성공:', result);
      return result;
    } catch (error) {
      console.error('백엔드 업로드 중 오류 발생:', error);
      throw error;
    }
  };

  const handleDoneClick = async () => {
    if (isUploading) return; // 중복 업로드 방지

    try {
      setIsUploading(true);
      console.log('handleDoneClick 시작');
      console.log('image:', image);
      console.log('frameImageSrc:', frameImageSrc);

      // 모든 레이어 합성
      console.log('이미지 합성 시작...');
      const combinedImageDataUrl = await combineAllLayers();
      console.log('이미지 합성 완료');

      // 백엔드에 업로드
      console.log('백엔드 업로드 시작...');
      const uploadResult = await uploadImageToBackend(combinedImageDataUrl);
      
      console.log('업로드 성공:', uploadResult);

      // 성공 후 다음 페이지로 이동 (업로드된 이미지 정보를 함께 전달)
      navigate('/finish', { 
        state: { 
          uploadedImage: uploadResult.imgUrl,
          fileName: uploadResult.fileName
        } 
      });

    } catch (error) {
      console.error('상세 에러 정보:', error);
      alert(`이미지 저장에 실패했습니다. 에러: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <p className="headerEn">Visitor's book</p>
        <p className="headerKo">방문록을 작성해주세요</p>
      </div>

      {image ? (
        <div className="preview-wrap">
          <img src={image} alt="Captured" className="preview-image" />
          {frameImageSrc && (
            <img src={frameImageSrc} alt="Frame" className="frame-overlay" />
          )}
          <div className="canvas-wrapper">
            <ReactSketchCanvas
              ref={canvasRef}
              strokeWidth={4}
              strokeColor='black'
              canvasColor="transparent"
              onStroke={handleStroke}
            />
          </div>
        </div>
      ) : (
        <p>사진이 없습니다.</p>
      )}

      <div className="tools">
        <button 
          onClick={handleUndoClick} 
          className={canUndo ? "undo-button active" : "undo-button"}
          disabled={!canUndo}
        >
            <img src="/undoIcon.svg" alt="undo" className="tool-icon" />
        </button>
        <button
          onClick={handlePenClick}
          className={eraseMode ? 'tool-button' : 'tool-button active'}
        >
            <img src="/pencilIcon.svg" alt="펜" className="tool-icon" />
        </button>
        <button
          onClick={handleEraserClick}
          className={eraseMode ? 'tool-button active' : 'tool-button'}
        >
            <img src="/eraserIcon.svg" alt="지우개" className="tool-icon" />
        </button>
        <button 
          onClick={handleRedoClick} 
          className={canRedo ? "redo-button active" : "redo-button"}
          disabled={!canRedo}
        >
            <img src="/redoIcon.svg" alt="redo" className="tool-icon" />
        </button>
      </div>

      <button 
        className="done-button" 
        onClick={handleDoneClick}
        disabled={isUploading}
      >
        {isUploading ? '저장 중...' : '완료'}
      </button>

      <StepIndicator currentStep={3} />
    </div>
  );
};

export default Draw;