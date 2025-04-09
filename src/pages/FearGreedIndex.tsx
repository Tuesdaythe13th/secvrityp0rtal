import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChartLine,
  faLock,
  faExclamationTriangle,
  faCoins,
  faChartBar,
  faCaretDown,
  faCaretUp,
  faDatabase,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons"

export default function FearGreedIndex() {
  const gaugeNeedleRef = useRef<HTMLDivElement>(null)
  const radialProgressRef = useRef<HTMLDivElement>(null)
  const radialValueRef = useRef<HTMLSpanElement>(null)
  const radialSentimentRef = useRef<HTMLSpanElement>(null)
  const updateTimeRef = useRef<HTMLSpanElement>(null)
  const timestampRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Update gauge needle position
    const updateGauge = (value: number) => {
      if (
        !gaugeNeedleRef.current ||
        !radialProgressRef.current ||
        !radialValueRef.current ||
        !radialSentimentRef.current
      )
        return

      // Map 0-100 to 0-100% of gauge width
      const position = value
      gaugeNeedleRef.current.style.left = `${position}%`

      // Update radial progress
      radialProgressRef.current.style.setProperty("--value", value.toString())
      radialValueRef.current.textContent = value.toString()

      // Update sentiment text
      let sentiment = ""
      let colorClass = ""

      if (value < 25) {
        sentiment = "Extreme Fear"
        colorClass = "text-red-600"
      } else if (value < 45) {
        sentiment = "Fear"
        colorClass = "text-red-600"
      } else if (value < 55) {
        sentiment = "Neutral"
        colorClass = "text-yellow-600"
      } else if (value < 75) {
        sentiment = "Greed"
        colorClass = "text-yellow-600"
      } else {
        sentiment = "Extreme Greed"
        colorClass = "text-green-600"
      }

      radialSentimentRef.current.textContent = sentiment
      radialProgressRef.current.className = `radial-progress font-bold ${colorClass} border-4 border-black`
    }

    // Initialize with default value
    updateGauge(29)

    // Update timestamp initially
    const updateTimestamp = () => {
      if (!updateTimeRef.current || !timestampRef.current) return

      const now = new Date()
      updateTimeRef.current.textContent =
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        }) + " UTC"

      timestampRef.current.textContent = now.toISOString()
    }

    updateTimestamp()

    // Simulate live updates every 30 seconds
    const intervalId = setInterval(() => {
      updateTimestamp()

      // Random small fluctuation (for demo purposes)
      if (radialProgressRef.current) {
        const currentValue = Number.parseInt(radialProgressRef.current.style.getPropertyValue("--value") || "29")
        const fluctuation = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
        const newValue = Math.min(Math.max(currentValue + fluctuation, 0), 100)
        updateGauge(newValue)
      }
    }, 30000)

    // Chart time period buttons
    const buttons = document.querySelectorAll(".time-period-btn")
    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        buttons.forEach((b) => {
          if (b === this) {
            b.classList.add("bg-black", "text-white")
            b.classList.remove("bg-white", "text-black")
          } else {
            b.classList.remove("bg-black", "text-white")
            b.classList.add("bg-white", "text-black")
          }
        })
      })
    })

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Back Button */}
        <Link to="/" className="back-button mb-4 inline-block">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          BACK TO DASHBOARD
        </Link>
        
        {/* Title Block */}
        <motion.header 
          className="brutal-border bg-white mb-8 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-b-2 border-black pb-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-black uppercase monospace">CRYPTO FEAR & GREED INDEX</h1>
            <p className="text-gray-700 monospace text-sm mt-2">
              Real-time market sentiment analysis | Updated: <span ref={updateTimeRef}>03:14:47 UTC</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-black text-white px-3 py-1">
              <FontAwesomeIcon icon={faChartLine} />
              <span className="monospace text-sm font-bold">LIVE DATA</span>
            </div>
            <div className="flex items-center gap-2 bg-black text-white px-3 py-1">
              <FontAwesomeIcon icon={faLock} />
              <span className="monospace text-sm font-bold">SECURE API</span>
            </div>
            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span className="monospace text-sm font-bold">MARKET IN FEAR</span>
            </div>
          </div>
        </motion.header>

        {/* Main Index Display */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 monospace">Current Index</h2>
          
          {/* Gauge */}
          <div className="gauge-container mb-4">
            <div className="gauge-needle" ref={gaugeNeedleRef}></div>
          </div>
          
          {/* Radial Progress */}
          <div className="flex flex-col items-center">
            <div className="radial-progress font-bold text-red-600 border-4 border-black" ref={radialProgressRef}>
              <span className="text-4xl">
                <span ref={radialValueRef}>29</span>
                <span className="text-sm">%</span>
              </span>
            </div>
            <span className="text-lg mt-2 monospace" ref={radialSentimentRef}>Fear</span>
          </div>
        </section>

        {/* Historical Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 monospace">Historical Data</h2>
          
          {/* Time Period Buttons */}
          <div className="flex gap-2 mb-4">
            <button className="time-period-btn bg-black text-white px-4 py-2 rounded-md monospace">1D</button>
            <button className="time-period-btn bg-white text-black px-4 py-2 rounded-md monospace">1W</button>
            <button className="time-period-btn bg-white text-black px-4 py-2 rounded-md monospace">1M</button>
            <button className="time-period-btn bg-white text-black px-4 py-2 rounded-md monospace">3M</button>
            <button className="time-period-btn bg-white text-black px-4 py-2 rounded-md monospace">6M</button>
            <button className="time-period-btn bg-white text-black px-4 py-2 rounded-md monospace">1Y</button>
            <button className="time-period-btn bg-white text-black px-4 py-2 rounded-md monospace">ALL</button>
          </div>
          
          {/* Data Table (Placeholder) */}
          <div className="border border-gray-400 rounded-md p-4">
            <p className="text-gray-600 monospace">Historical data will be displayed here.</p>
          </div>
        </section>

        {/* Data Visualization */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 monospace">Data Visualization</h2>
          
          {/* Chart (Placeholder) */}
          <div className="border border-gray-400 rounded-md p-4">
            <p className="text-gray-600 monospace">Chart visualization will be displayed here.</p>
          </div>
        </section>

        {/* About & API */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 monospace">About the Index</h2>
          
          <p className="text-gray-700 mb-4 monospace">
            The Fear & Greed Index is a contrarian indicator that gauges market sentiment.
            It ranges from 0 (Extreme Fear) to 100 (Extreme Greed).
          </p>
          
          <h3 className="text-xl font-bold mb-2 monospace">API Access</h3>
          <p className="text-gray-700 monospace">
            Access real-time and historical data via our secure API.
          </p>
          <button className="bg-black text-white px-4 py-2 rounded-md mt-2 monospace">
            GET API KEY
          </button>
        </section>

        {/* Status Footer */}
        <footer className="text-center text-gray-500 text-sm monospace">
          <p>
            Updated: <span ref={updateTimeRef}>03:14:47 UTC</span> | Timestamp: <span ref={timestampRef}>2024-08-02T03:14:47.000Z</span>
          </p>
          <p>
            Data provided by alternative.me | <FontAwesomeIcon icon={faDatabase} className="mr-1" /> Secure Data Pipeline
          </p>
        </footer>
      </div>
    </div>
  )
}
