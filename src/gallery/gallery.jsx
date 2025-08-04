import './gallery.css';
import React, { useState } from 'react';

const repeatedImages = Array.from({ length: 10 });

const Gallery = () => {
    const [clickedIdx, setClickedIdx] = useState(null);
    const [paused, setPaused] = useState(false);

    const handlePhotoClick = (idx) => {
        setClickedIdx(idx);
        setPaused(true);
        setTimeout(() => {
            setClickedIdx(null);
            setPaused(false);
        }, 3000);
    };

    return (
        <div className='g-container'>
            <div className='g-header'>
                <p className='header-text'>Mirim Gallery</p>
                <hr className='header-line'/>
            </div>
            <div className="photo-scroller">
                {[0, 1].map((row) => (
                    <div
                        className={`row ${row === 0 ? 'left' : 'right'}${paused ? ' paused' : ''}`}
                        key={row}
                    >
                        {[...repeatedImages, ...repeatedImages].map((_, idx) => {
                            // 전체 인덱스 계산 (행마다 이미지 수가 같으므로)
                            const globalIdx = row * repeatedImages.length * 2 + idx;
                            return (
                                <img
                                    key={globalIdx}
                                    src="/example.png"
                                    alt="example"
                                    className={`photo${clickedIdx === globalIdx ? ' enlarged' : ''}`}
                                    onClick={() => handlePhotoClick(globalIdx)}
                                    style={clickedIdx === globalIdx ? { zIndex: 10 } : {}}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className='g-bottom'>
                <div className='bottom-text'>
                    <p className='bottom-text1'>#Mirim History</p>
                    <p className='bottom-text2'>#Memories</p>
                    <p className='bottom-text3'>#Gallery</p>
                </div>
                <p className='bottom-title'>Photos</p>
            </div>
        </div>
    );
};

export default Gallery;