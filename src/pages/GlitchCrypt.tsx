
"use client"

import { useState, useEffect, useRef } from "react"

export default function GlitchCryptPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isEncrypting, setIsEncrypting] = useState(true)
  const [key, setKey] = useState("")
  const [showInstructions, setShowInstructions] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isGlitching, setIsGlitching] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Add custom styles
    const style = document.createElement("style")
    style.innerHTML = `
      /* GLITCH CRYPT STYLING */
      body {
        background-color: #000;
        color: #0f0;
        font-family: 'Courier New', monospace;
        cursor: none;
        overflow-x: hidden;
      }
      
      .glitch-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #0f0;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: width 0.2s, height 0.2s;
      }
      
      .glitch-cursor::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        background-color: #0f0;
        border-radius: 50%;
      }
      
      .glitch-cursor.active {
        width: 15px;
        height: 15px;
        background-color: rgba(0, 255, 0, 0.2);
      }
      
      .terminal-border {
        border: 3px solid #0f0;
        box-shadow: 0 0 10px #0f0, inset 0 0 10px #0f0;
      }
      
      .glitch-btn {
        background: #000;
        color: #0f0;
        border: 2px solid #0f0;
        padding: 10px 20px;
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
        letter-spacing: 2px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s;
        box-shadow: 0 0 5px #0f0;
      }
      
      .glitch-btn:hover {
        background: #0f0;
        color: #000;
        box-shadow: 0 0 15px #0f0;
      }
      
      .glitch-btn:active {
        transform: scale(0.95);
      }
      
      .glitch-btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.4), transparent);
        transition: all 0.6s;
      }
      
      .glitch-btn:hover::before {
        left: 100%;
      }
      
      @keyframes textGlitch {
        0% {
          transform: translate(0);
          clip-path: inset(0 0 0 0);
        }
        2% {
          clip-path: inset(10% 0 80% 0);
          transform: translate(-2px, 2px);
        }
        4% {
          clip-path: inset(30% 0 50% 0);
          transform: translate(2px, -2px);
        }
        6% {
          clip-path: inset(50% 0 30% 0);
          transform: translate(-2px, 2px);
        }
        8% {
          clip-path: inset(80% 0 10% 0);
          transform: translate(2px, -2px);
        }
        10% {
          clip-path: inset(0 0 0 0);
          transform: translate(0);
        }
        100% {
          transform: translate(0);
          clip-path: inset(0 0 0 0);
        }
      }
      
      .text-glitch {
        position: relative;
      }
      
      .text-glitch::before,
      .text-glitch::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      
      .text-glitch::before {
        color: #f00;
        animation: textGlitch 3s infinite linear alternate-reverse;
      }
      
      .text-glitch::after {
        color: #0ff;
        animation: textGlitch 2s infinite linear alternate-reverse;
      }
      
      .scanlines {
        position: relative;
        overflow: hidden;
      }
      
      .scanlines::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          transparent 50%,
          rgba(0, 255, 0, 0.05) 50%
        );
        background-size: 100% 4px;
        pointer-events: none;
        z-index: 9998;
      }
      
      @keyframes flicker {
        0% { opacity: 1; }
        5% { opacity: 0.7; }
        10% { opacity: 1; }
        15% { opacity: 0.8; }
        20% { opacity: 1; }
        50% { opacity: 1; }
        55% { opacity: 0.9; }
        60% { opacity: 1; }
        75% { opacity: 0.8; }
        80% { opacity: 1; }
        100% { opacity: 1; }
      }
      
      .flicker {
        animation: flicker 5s infinite;
      }
      
      .help-panel {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        width: 80%;
        max-width: 700px;
        background: black;
        border: 3px solid #0f0;
        box-shadow: 0 0 20px #0f0;
        padding: 20px;
        max-height: 80vh;
        overflow-y: auto;
      }
      
      .overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 99;
      }
      
      .glitch-effect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9997;
        background: radial-gradient(circle, transparent 90%, rgba(0, 255, 0, 0.1) 100%);
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .glitch-effect.active {
        opacity: 1;
      }
      
      .matrix-rain {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
      }
      
      .matrix-digit {
        position: absolute;
        color: rgba(0, 255, 0, 0.5);
        font-family: monospace;
        font-size: 14px;
        animation: matrix-fall linear infinite;
      }
      
      @keyframes matrix-fall {
        from { transform: translateY(-100px); }
        to { transform: translateY(calc(100vh + 20px)); }
      }
    `
    document.head.appendChild(style)

    // Initialize matrix rain effect
    const createMatrixRain = () => {
      const container = document.getElementById("matrixRain")
      if (!container) return

      const characters = "01"

      for (let i = 0; i < 100; i++) {
        const digit = document.createElement("div")
        digit.className = "matrix-digit"
        digit.textContent = characters.charAt(Math.floor(Math.random() * characters.length))
        digit.style.left = `${Math.random() * 100}%`
        digit.style.animationDuration = `${5 + Math.random() * 10}s`
        digit.style.animationDelay = `${Math.random() * 5}s`
        container.appendChild(digit)
      }
    }

    // Track cursor position
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })

      // Random glitch effect
      if (Math.random() < 0.01 && !glitchTimeoutRef.current) {
        setIsGlitching(true)
        glitchTimeoutRef.current = setTimeout(() => {
          setIsGlitching(false)
          glitchTimeoutRef.current = null
        }, 200)
      }
    }

    // Handle mouse down/up for cursor effect
    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("active")
      }
    }

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("active")
      }
    }

    // Initialize
    createMatrixRain()
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Add back button
    const backButton = document.createElement("div")
    backButton.className = "fixed top-4 left-4 z-50"
    backButton.innerHTML = `
      <a href="/" class="glitch-btn px-4 py-2 bg-black text-green-500 font-bold border-2 border-green-500 hover:bg-green-500 hover:text-black">
        ← BACK
      </a>
    `
    document.body.appendChild(backButton)

    return () => {
      // Cleanup
      document.head.removeChild(style)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.removeChild(backButton)
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current)
      }
    }
  }, [])

  // Update cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${cursorPosition.x}px`
      cursorRef.current.style.top = `${cursorPosition.y}px`
    }
  }, [cursorPosition])

  // Show help panel
  const showHelp = () => {
    const helpOverlay = document.getElementById("helpOverlay")
    const helpPanel = document.getElementById("helpPanel")
    if (helpOverlay && helpPanel) {
      helpOverlay.style.display = "block"
      helpPanel.style.display = "block"
    }
    setShowInstructions(true)
  }

  // Close help panel
  const dismissInstructions = () => {
    const helpOverlay = document.getElementById("helpOverlay")
    const helpPanel = document.getElementById("helpPanel")
    if (helpOverlay && helpPanel) {
      helpOverlay.style.display = "none"
      helpPanel.style.display = "none"
    }
    setShowInstructions(false)
  }

  // Handle encryption
  const handleEncrypt = async () => {
    if (!inputText || !key) return

    try {
      // Convert key to a usable format
      const encoder = new TextEncoder()
      const keyData = encoder.encode(key)
      const hashBuffer = await crypto.subtle.digest("SHA-256", keyData)
      const hashArray = Array.from(new Uint8Array(hashBuffer))

      // Simple XOR encryption with the key hash
      const inputBytes = encoder.encode(inputText)
      const encrypted = new Uint8Array(inputBytes.length)

      for (let i = 0; i < inputBytes.length; i++) {
        encrypted[i] = inputBytes[i] ^ hashArray[i % hashArray.length]
      }

      // Convert to Base64 for display
      const base64 = btoa(String.fromCharCode(...encrypted))
      setOutputText(base64)

      // Glitch effect
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 500)
    } catch (error) {
      console.error("Encryption error:", error)
      setOutputText("ERROR: Encryption failed")
    }
  }

  // Handle decryption
  const handleDecrypt = async () => {
    if (!inputText || !key) return

    try {
      // Convert key to a usable format
      const encoder = new TextEncoder()
      const keyData = encoder.encode(key)
      const hashBuffer = await crypto.subtle.digest("SHA-256", keyData)
      const hashArray = Array.from(new Uint8Array(hashBuffer))

      // Decode Base64 input
      let encryptedBytes
      try {
        const binaryString = atob(inputText)
        encryptedBytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          encryptedBytes[i] = binaryString.charCodeAt(i)
        }
      } catch (e) {
        setOutputText("ERROR: Invalid Base64 input")
        return
      }

      // XOR decrypt
      const decrypted = new Uint8Array(encryptedBytes.length)
      for (let i = 0; i < encryptedBytes.length; i++) {
        decrypted[i] = encryptedBytes[i] ^ hashArray[i % hashArray.length]
      }

      // Convert back to text
      const decoder = new TextDecoder()
      setOutputText(decoder.decode(decrypted))

      // Glitch effect
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 500)
    } catch (error) {
      console.error("Decryption error:", error)
      setOutputText("ERROR: Decryption failed")
    }
  }

  return (
    <div className="scanlines min-h-screen">
      {/* Custom cursor */}
      <div ref={cursorRef} className="glitch-cursor"></div>

      {/* Matrix rain effect */}
      <div id="matrixRain" className="matrix-rain"></div>

      {/* Glitch effect overlay */}
      <div className={`glitch-effect ${isGlitching ? "active" : ""}`}></div>

      {/* Help overlay */}
      <div id="helpOverlay" className="overlay"></div>
      <div id="helpPanel" className="help-panel">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-500">GLITCH CRYPT MANUAL</h2>
          <button onClick={dismissInstructions} className="glitch-btn px-4 py-2">
            X
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-2">PURPOSE</h3>
            <p className="mb-2">
              Glitch Crypt is a secure encryption/decryption tool that uses XOR cipher with SHA-256 key hashing.
            </p>
            <p>
              This tool allows you to encrypt sensitive messages that can only be decrypted by someone with the same
              key.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-400 mb-2">INSTRUCTIONS</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Enter your message in the input field</li>
              <li>Enter a strong encryption key (password)</li>
              <li>Choose to encrypt or decrypt the message</li>
              <li>Copy the result from the output field</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-400 mb-2">SECURITY NOTES</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your data never leaves your browser</li>
              <li>Use a strong, unique key that you can remember</li>
              <li>The same key must be used for encryption and decryption</li>
              <li>Encrypted output is in Base64 format</li>
            </ul>
          </div>

          <div className="text-center">
            <button onClick={dismissInstructions} className="glitch-btn px-8 py-3">
              UNDERSTOOD
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8 terminal-border p-6 bg-black relative">
          <h1 className="text-5xl font-bold text-green-500 mb-2 flicker" data-text="GLITCH CRYPT">
            GLITCH CRYPT
          </h1>
          <p className="text-xl">SECURE ENCRYPTION PROTOCOL</p>
        </header>

        {/* Main interface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Input */}
          <div className="terminal-border bg-black p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-500">INPUT:</h2>
            <textarea
              className="w-full h-40 bg-black border-2 border-green-500 p-4 text-green-500 focus:outline-none focus:border-green-300 focus:shadow-outline-green"
              placeholder="Enter text to encrypt/decrypt..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>

            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2 text-green-500">ENCRYPTION KEY:</h3>
              <input
                type="password"
                className="w-full bg-black border-2 border-green-500 p-4 text-green-500 focus:outline-none focus:border-green-300"
                placeholder="Enter encryption key..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                className={`glitch-btn flex-1 ${isEncrypting ? "bg-green-900 bg-opacity-30" : ""}`}
                onClick={() => setIsEncrypting(true)}
              >
                ENCRYPT
              </button>
              <button
                className={`glitch-btn flex-1 ${!isEncrypting ? "bg-green-900 bg-opacity-30" : ""}`}
                onClick={() => setIsEncrypting(false)}
              >
                DECRYPT
              </button>
            </div>
          </div>

          {/* Right column - Output */}
          <div className="terminal-border bg-black p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-500">OUTPUT:</h2>
            <textarea
              className="w-full h-40 bg-black border-2 border-green-500 p-4 text-green-500 focus:outline-none focus:border-green-300"
              placeholder="Result will appear here..."
              value={outputText}
              readOnly
            ></textarea>

            <div className="mt-6 flex space-x-4">
              <button className="glitch-btn flex-1" onClick={isEncrypting ? handleEncrypt : handleDecrypt}>
                {isEncrypting ? "EXECUTE ENCRYPTION" : "EXECUTE DECRYPTION"}
              </button>
              <button
                className="glitch-btn flex-1"
                onClick={() => {
                  if (outputText) {
                    navigator.clipboard.writeText(outputText)
                  }
                }}
                disabled={!outputText}
              >
                COPY OUTPUT
              </button>
            </div>
          </div>
        </div>

        {/* Help button */}
        <div className="text-center mt-8">
          <button onClick={showHelp} className="glitch-btn px-8 py-4">
            SHOW INSTRUCTIONS
          </button>
        </div>
      </div>
    </div>
  )
}
