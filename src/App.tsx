import { useEffect, useRef, useState } from 'react'
import photoboothImg from './assets/1.png'
import japMp3 from './assets/jap.mp3'
import heartBtnImg from './assets/heart.png'
import img1 from './assets/album/1.jpg'
import img2 from './assets/album/2.jpg'
import img3 from './assets/album/3.jpg'
import img4 from './assets/album/4.jpg'
import img5 from './assets/album/5.jpg'
// @ts-ignore
import img6 from './assets/album/6.jpg'
import img7 from './assets/album/7.jpg'
import './App.css'

const photos = [img1, img2, img3, img4, img5, img6, img7]

function Letter({ isVisible }: { isVisible: boolean }) {
  const fullText = `Jujur, aku nggak tau harus mulai dari mana.
Tapi kalau ada satu hal yang aku yakinin — itu kamu, Reva.

Kamu yang selalu ceria padahal hari-hari aku kadang nggak se-cerah itu. Kamu yang manjanya bikin aku senyum sendiri. Kamu yang tanpa sadar selalu berhasil bikin aku pengen jadi versi terbaik dari diri aku — bukan buat siapa-siapa, tapi buat bisa layak ada di sisi kamu.

Makasih udah nerima aku apa adanya, Reva. Dengan semua kekurangan yang bahkan kadang aku sendiri nggak suka.

Jarak emang nggak pernah gampang. Tapi tiap ngobrol sama kamu, rasanya jauh itu jadi nggak ada artinya.

Jadi... mau nggak, Revana Visma Ayu, resmi jadi milik aku?
Biar ke depannya kita bisa happy bareng — beneran, bukan cuma di chat.

Oh iya — ini baru Part 1.
Nanti kalau kita ketemu, aku bakal nembak kamu lagi.
Langsung. Face to face.
Jadi siapin jawaban terbaik kamu ya nanti`
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[index])
        setIndex(index + 1)
      }, 65)
      return () => clearTimeout(timeout)
    }
  }, [index, isVisible, fullText])

  return (
    <div className={`letter-container ${isVisible ? 'revealed' : ''}`}>
      <div className="letter-paper">
        <div className="letter-header">
          <div className="letter-tape"></div>
          <h1 className="letter-title">Revana Visma Ayu</h1>
          <div className="letter-divider">
            <span className="divider-diamond"></span>
          </div>
          <p className="letter-date">11 Mei 2026</p>
        </div>

        <div className="letter-body">
          <h2 className="letter-salutation">Dear Reva,</h2>
          <div className="letter-text">
            {displayedText}
            <span className="typing-cursor">|</span>
          </div>
        </div>

        <div className="letter-footer">
          <span className="scroll-hint">▼ SCROLL ▼</span>
        </div>
      </div>
    </div>
  )
}

function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        <div className="thumbnails-panel">
          <div className="thumbnails-scroll" ref={thumbnailsRef}>
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`thumbnail ${index === selectedPhoto ? 'active' : ''}`}
                onClick={() => setSelectedPhoto(index)}
              >
                <img src={photo} alt={`Photo ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="preview-panel">
          <img src={photos[selectedPhoto]} alt={`Preview ${selectedPhoto + 1}`} className="preview-image" />
        </div>
      </div>
    </div>
  )
}

function EndSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`end-section ${revealed ? 'revealed' : ''}`} ref={ref}>
      <div className="flowers-row">
        <span className="flower f1">🌸</span>
        <span className="flower f2">🌺</span>
        <span className="flower f3">🌼</span>
        <span className="flower f4">🌸</span>
        <span className="flower f5">🌷</span>
        <span className="flower f6">🌺</span>
        <span className="flower f7">🌸</span>
      </div>
      <p className="end-text">semoga suka sama bunga nya, btw love u 🤍</p>
    </div>
  )
}

function App() {
  const frameRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showOverlay, setShowOverlay] = useState(true)
  const [startLetter, setStartLetter] = useState(false)

  const handleStart = () => {
    setShowOverlay(false)
    window.scrollTo(0, 0)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e))
    }
    setTimeout(() => setStartLetter(true), 1500)
  }

  useEffect(() => {
    if (showOverlay) return
    const frame = frameRef.current
    if (!frame) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      frame.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.03)`
    }
    const handleMouseLeave = () => {
      frame.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
    }
    frame.addEventListener('mousemove', handleMouseMove)
    frame.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      frame.removeEventListener('mousemove', handleMouseMove)
      frame.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className={`page ${showOverlay ? 'locked' : ''}`}>
      <audio ref={audioRef} src={japMp3} loop preload="auto" />

      {showOverlay && (
        <div className="overlay">
          <button className="heart-button" onClick={handleStart}>
            <img src={heartBtnImg} alt="Click to start" />
          </button>
        </div>
      )}

      <div className={`frame-wrapper ${!showOverlay ? 'revealed' : ''}`} ref={frameRef}>
        <div className="photo-frame">
          <img
            src={photoboothImg}
            alt="Our photobooth moments"
            className="photo-img"
            draggable={false}
          />
        </div>
      </div>

      <Letter isVisible={startLetter} />
      <PhotoGallery />
      <EndSection />
    </div>
  )
}

export default App
