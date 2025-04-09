import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function FearGreedIndex() {
  const gaugeNeedleRef = useRef<HTMLDivElement>(null);
  const radialProgressRef = useRef<HTMLDivElement>(null);
  const radialValueRef = useRef<HTMLSpanElement>(null);
  const radialSentimentRef = useRef<HTMLSpanElement>(null);
  const updateTimeRef = useRef<HTMLSpanElement>(null);
  const timestampRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Update gauge needle position
    const updateGauge = (value: number) => {
      if (
        !gaugeNeedleRef.current ||
        !radialProgressRef.current ||
        !radialValueRef.current ||
        !radialSentimentRef.current
      )
        return;

      // Map 0-100 to 0-100% of gauge width
      const position = value;
      gaugeNeedleRef.current.style.left = `${position}%`;

      // Update radial progress
      radialProgressRef.current.style.setProperty("--value", value.toString());
      radialValueRef.current.textContent = value.toString();

      // Update sentiment text
      let sentiment = "";
      let colorClass = "";

      if (value < 25) {
        sentiment = "Extreme Fear";
        colorClass = "text-red-600";
      } else if (value < 45) {
        sentiment = "Fear";
        colorClass = "text-red-600";
      } else if (value < 55) {
        sentiment = "Neutral";
        colorClass = "text-yellow-600";
      } else if (value < 75) {
        sentiment = "Greed";
        colorClass = "text-yellow-600";
      } else {
        sentiment = "Extreme Greed";
        colorClass = "text-green-600";
      }

      radialSentimentRef.current.textContent = sentiment;
      radialProgressRef.current.className = `radial-progress font-bold ${colorClass} border-4 border-black`;
    };

    // Initialize with default value
    updateGauge(29);

    // Update timestamp initially
    const updateTimestamp = () => {
      if (!updateTimeRef.current || !timestampRef.current) return;

      const now = new Date();
      updateTimeRef.current.textContent =
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        }) + " UTC";

      timestampRef.current.textContent = now.toISOString();
    };

    updateTimestamp();

    // Simulate live updates every 30 seconds
    const intervalId = setInterval(() => {
      updateTimestamp();

      // Random small fluctuation (for demo purposes)
      if (radialProgressRef.current) {
        const currentValue = Number.parseInt(radialProgressRef.current.style.getPropertyValue("--value") || "29");
        const fluctuation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newValue = Math.min(Math.max(currentValue + fluctuation, 0), 100);
        updateGauge(newValue);
      }
    }, 30000);

    // Chart time period buttons
    const buttons = document.querySelectorAll(".time-period-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        buttons.forEach((b) => {
          if (b === this) {
            b.classList.add("bg-black", "text-white");
            b.classList.remove("bg-white", "text-black");
          } else {
            b.classList.remove("bg-black", "text-white");
            b.classList.add("bg-white", "text-black");
          }
        });
      });
    });

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Link to="/" className="back-button inline-block">
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
        </motion.div>

        {/* Title Block */}
        <motion.header 
          className="brutal-border bg-white mb-8 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="border-b-2 border-black pb-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-black uppercase monospace">CRYPTO FEAR & GREED INDEX</h1>
            <p className="text-gray-700 monospace text-sm mt-2">
              Real-time market sentiment analysis | Updated: <span ref={updateTimeRef}>03:14:47 UTC</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-black text-white px-3 py-1">
              <span className="monospace text-sm font-bold">LIVE DATA</span>
            </div>
            <div className="flex items-center gap-2 bg-black text-white px-3 py-1">
              <span className="monospace text-sm font-bold">SECURE API</span>
            </div>
            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1">
              <span className="monospace text-sm font-bold">MARKET IN FEAR</span>
            </div>
          </div>
        </motion.header>

        {/* Main Index Display */}
        <motion.div 
          className="brutal-border bg-white mb-6 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Radial Gauge */}
            <div className="flex flex-col items-center">
              <div
                ref={radialProgressRef}
                className="radial-progress font-bold text-red-600 border-4 border-black"
                style={{ "--value": 29, "--size": "12rem", "--thickness": "1.5rem" } as React.CSSProperties}
              >
                <span ref={radialValueRef} className="text-4xl block">
                  29
                </span>
                <span ref={radialSentimentRef} className="block text-lg uppercase">
                  Fear
                </span>
              </div>
            </div>

            {/* Gauge Visualization */}
            <div className="col-span-2">
              <h3 className="monospace font-bold text-xl mb-4 uppercase">Market Sentiment Indicator</h3>
              <div className="gauge-container brutal-border-thin mb-4">
                <div ref={gaugeNeedleRef} className="gauge-needle"></div>
              </div>
              <div className="flex justify-between text-xs monospace font-bold">
                <span className="text-red-600">
                  0<br />
                  Extreme Fear
                </span>
                <span className="text-yellow-600">
                  25
                  <br />
                  Fear
                </span>
                <span className="text-yellow-600">
                  50
                  <br />
                  Neutral
                </span>
                <span className="text-yellow-600">
                  75
                  <br />
                  Greed
                </span>
                <span className="text-green-600">
                  100
                  <br />
                  Extreme Greed
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Historical Data */}
        <motion.div 
          className="brutal-border bg-white mb-6 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="monospace font-bold text-2xl mb-4 uppercase border-b-2 border-black pb-2">
            Historical Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 brutal-border-thin">
              <h3 className="monospace font-bold mb-2">Yesterday</h3>
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-bold monospace text-xl">24</span>
                <span className="bg-red-600 text-white px-2 py-1 monospace text-sm font-bold">Fear</span>
              </div>
            </div>

            <div className="p-4 brutal-border-thin">
              <h3 className="monospace font-bold mb-2">Last Week</h3>
              <div className="flex items-center justify-between">
                <span className="text-yellow-600 font-bold monospace text-xl">34</span>
                <span className="bg-yellow-600 text-black px-2 py-1 monospace text-sm font-bold">Moderate Fear</span>
              </div>
            </div>

            <div className="p-4 brutal-border-thin">
              <h3 className="monospace font-bold mb-2">Last Month</h3>
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-bold monospace text-xl">22</span>
                <span className="bg-red-600 text-white px-2 py-1 monospace text-sm font-bold">Fear</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 brutal-border-thin bg-black text-white">
              <h3 className="monospace font-bold mb-2">Yearly High</h3>
              <p className="text-xs opacity-75">Nov 20, 2024</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-green-500 font-bold monospace text-xl">88</span>
                <span className="bg-white text-black px-2 py-1 monospace text-sm font-bold">Extreme Greed</span>
              </div>
            </div>

            <div className="p-4 brutal-border-thin bg-red-600 text-white">
              <h3 className="monospace font-bold mb-2">Yearly Low</h3>
              <p className="text-xs opacity-75">Mar 10, 2025</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold monospace text-xl">15</span>
                <span className="bg-black text-white px-2 py-1 monospace text-sm font-bold">Extreme Fear</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Visualization */}
        <div className="brutal-border bg-white mb-6 p-6">
          <div className="flex flex-wrap justify-between items-center border-b-2 border-black pb-4 mb-6">
            <h2 className="monospace font-bold text-2xl uppercase">Fear & Greed Index Chart</h2>
            <div className="flex gap-2">
              <button className="brutal-btn time-period-btn bg-black text-white px-4 py-2 text-sm">30d</button>
              <button className="brutal-btn time-period-btn px-4 py-2 text-sm">1y</button>
              <button className="brutal-btn time-period-btn px-4 py-2 text-sm">All</button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="brutal-border-thin bg-gray-100 p-4" style={{ height: "300px" }}>
            <div className="flex items-center justify-center h-full flex-col">
              <div className="text-4xl mb-4">
                {/*<FontAwesomeIcon icon={faChartLine} />*/}
              </div>
              <p className="monospace font-bold">LOADING CHART DATA...</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="brutal-border-thin p-4">
              <div className="flex items-center gap-2 mb-2">
                {/*<FontAwesomeIcon icon={faCoins} />*/}
                <h3 className="monospace font-bold uppercase">Bitcoin Price</h3>
              </div>
              <p className="text-2xl font-bold">$63,427.84</p>
              <p className="text-sm text-red-600">
                {/*<FontAwesomeIcon icon={faCaretDown} />*/} -2.34% (24h)
              </p>
            </div>

            <div className="brutal-border-thin p-4">
              <div className="flex items-center gap-2 mb-2">
                {/*<FontAwesomeIcon icon={faChartBar} />*/}
                <h3 className="monospace font-bold uppercase">Bitcoin Volume</h3>
              </div>
              <p className="text-2xl font-bold">$24.8B</p>
              <p className="text-sm text-green-600">
                {/*<FontAwesomeIcon icon={faCaretUp} />*/} +12.7% (24h)
              </p>
            </div>
          </div>
        </div>

        {/* About & API */}
        <div className="brutal-border bg-white mb-6 p-6">
          <h2 className="monospace font-bold text-2xl mb-4 uppercase border-b-2 border-black pb-2">
            About Crypto Fear & Greed Index
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="monospace font-bold text-lg mb-2">What is this index?</h3>
              <p className="monospace text-black">
                The CMC Fear & Greed Index measures cryptocurrency market sentiment (0-100 scale). Extreme fear suggests
                potential buying opportunities, while extreme greed may indicate market corrections. This contrarian
                indicator helps identify emotional extremes in crypto markets.
              </p>
            </div>

            <div>
              <h3 className="monospace font-bold text-lg mb-2">How is it calculated?</h3>
              <ul className="list-disc pl-5 monospace space-y-2 text-black">
                <li>
                  <span className="font-bold">Price Momentum</span>: Top 10 crypto performance
                </li>
                <li>
                  <span className="font-bold">Volatility</span>: BTC/ETH 30-day expected volatility
                </li>
                <li>
                  <span className="font-bold">Derivatives</span>: Options put/call ratios
                </li>
                <li>
                  <span className="font-bold">Market Composition</span>: BTC vs stablecoin ratios
                </li>
                <li>
                  <span className="font-bold">Social Trends</span>: Search & engagement metrics
                </li>
              </ul>
            </div>

            <div>
              <h3 className="monospace font-bold text-lg mb-2">Access API Data</h3>
              <div className="brutal-border-thin bg-black text-green-400 p-4 monospace text-sm overflow-x-auto">
                <p className="mb-2">
                  <span className="text-gray-400">// Fetch latest index value</span>
                </p>
                <p>
                  GET <span className="text-yellow-400">https://pro-api.coinmarketcap.com/v3/fear-and-greed</span>
                </p>
                <p className="mt-4">
                  <span className="text-gray-400">// Fetch historical data</span>
                </p>
                <p>
                  GET{" "}
                  <span className="text-yellow-400">
                    https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical
                  </span>
                </p>
                <p className="mt-2">
                  <span className="text-gray-400">?start=2024-01-01&limit=100</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Footer */}
        <footer className="brutal-border bg-black text-white p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 monospace text-sm">
            <div className="flex items-center gap-2">
              {/*<FontAwesomeIcon icon={faDatabase} />*/}
              <span>Data updates every 5 minutes</span>
            </div>
            <div>
              <span className="text-gray-400">
                API v3.1 | Last updated: <span ref={timestampRef}>2024-06-15T03:14:47Z</span>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
