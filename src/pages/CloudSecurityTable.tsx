
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Box, OrbitControls } from "@react-three/drei";
import { categories, elements, tableLayout } from "../data/cloud-security-data";
import "../styles/CloudSecurityTable.css";

// 3D Element Component
function Element3D({
  element,
  isSelected,
  onClick,
}: {
  element: any;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<any>();
  const category = categories.find((cat) => cat.id === element.category);
  const color = category?.color || "#ffffff";

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (isSelected) {
        meshRef.current.rotation.y += 0.01;
      }
    }
  });

  return (
    <Box ref={meshRef} args={[1, 1, 0.2]} onClick={onClick} position={[0, 0, 0]}>
      <meshStandardMaterial attach="material" color={color} />
      <Text position={[0, 0, 0.11]} fontSize={0.3} color="#000000" anchorX="center" anchorY="middle">
        {element.symbol}
      </Text>
    </Box>
  );
}

// Element Card Component
function ElementCard({
  element,
  isSelected,
  onClick,
  categoryFilter,
}: {
  element: any;
  isSelected: boolean;
  onClick: () => void;
  categoryFilter: string | null;
}) {
  if (!element) return <div className="col-span-1"></div>;

  const category = categories.find((cat) => cat.id === element.category);
  const isFiltered = categoryFilter && element.category !== categoryFilter;

  return (
    <motion.div
      className={`element ${isSelected ? "selected" : ""} ${isFiltered ? "opacity-40" : ""}`}
      style={{ backgroundColor: category?.color }}
      onClick={onClick}
      whileHover={{
        scale: isFiltered ? 1.02 : 1.05,
        boxShadow: "6px 6px 0 rgba(0,0,0,1)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="element-symbol">{element.symbol}</div>
      <div className="element-name">{element.name}</div>

      {isSelected && (
        <motion.div
          className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
        />
      )}
    </motion.div>
  );
}

// Detail Panel Component
function DetailPanel({ element }: { element: any | null }) {
  if (!element) return null;

  const category = categories.find((cat) => cat.id === element.category);

  return (
    <motion.div
      className="detail-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="detail-symbol" style={{ backgroundColor: category?.color }}>
            {element.symbol}
          </div>

          <Canvas className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Element3D element={element} isSelected={true} onClick={() => {}} />
          </Canvas>
        </div>

        <div className="flex-1">
          <h3 className="detail-title">{element.name}</h3>
          <div className="detail-category">{category?.name}</div>
          <p className="detail-description mt-4">{element.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CloudSecurityTable() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);

  // Get the selected element object
  const selectedElementObj = elements.find((e) => e.id === selectedElement);

  // Handle category filter selection
  const handleCategoryFilter = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    setSelectedElement(null);
  };

  // Handle element selection
  const handleElementSelect = (elementId: string) => {
    if (selectedElement === elementId) {
      setSelectedElement(null);
    } else {
      setSelectedElement(elementId);
    }
  };

  // Render element by ID
  const renderElementById = (elementId: string | null) => {
    if (!elementId) return <div className="col-span-1"></div>;

    const element = elements.find((e) => e.id === elementId);
    if (!element) return <div className="col-span-1"></div>;

    return (
      <ElementCard
        key={element.id}
        element={element}
        isSelected={selectedElement === element.id}
        onClick={() => handleElementSelect(element.id)}
        categoryFilter={selectedCategory}
      />
    );
  };

  // Enable 3D canvas after initial render to avoid SSR issues
  useEffect(() => {
    setShowCanvas(true);
    document.title = "Cloud Security Table - Neural Security";
  }, []);

  return (
    <div className="bg-white text-black">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="brutal-btn px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-purple-800 hover:border-purple-800"
        >
          ← BACK
        </Link>
      </div>

      <div className="cloud-security-container">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">Periodic Table of Cloud Security</h1>
          <p className="text-lg uppercase">A collection of security measures for defending cloud environments</p>
        </div>

        {/* Category Filters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className="category-btn"
              style={{
                backgroundColor: selectedCategory === category.id ? category.color : "#fff",
                borderColor: selectedCategory === category.id ? "#000" : category.color,
              }}
              onClick={() => handleCategoryFilter(category.id)}
              whileHover={{ scale: 1.03, boxShadow: "4px 4px 0 rgba(0,0,0,1)" }}
              whileTap={{ scale: 0.97 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Main Table */}
        <div className="bg-black p-6 border-4 border-black">
          {/* 3D Canvas Background */}
          {showCanvas && (
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls enableZoom={false} enablePan={false} />
                <Box args={[20, 20, 0.1]} position={[0, 0, -5]}>
                  <meshStandardMaterial attach="material" color="#333333" />
                </Box>
              </Canvas>
            </div>
          )}

          {/* Main Table Grid */}
          <div className="grid grid-cols-9 gap-2 relative z-10">
            {tableLayout.mainTable.map((row, rowIndex) =>
              row.map((elementId, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="col-span-1">
                  {renderElementById(elementId)}
                </div>
              )),
            )}
          </div>

          {/* Cloud Products Row */}
          <div className="grid grid-cols-7 gap-2 mt-6">
            <div className="col-span-2"></div>
            {tableLayout.cloudProducts.map((elementId) => (
              <div key={elementId} className="col-span-1">
                {renderElementById(elementId)}
              </div>
            ))}
            <div className="col-span-2"></div>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>{selectedElementObj && <DetailPanel element={selectedElementObj} />}</AnimatePresence>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
          {categories.map((category) => (
            <motion.div key={category.id} className="legend-item" whileHover={{ x: 5 }}>
              <div className="legend-color" style={{ backgroundColor: category.color }}></div>
              <div className="text-xs uppercase">{category.name}</div>
            </motion.div>
          ))}
        </div>

        {/* Definitions Panel */}
        <div className="mt-12 p-6 border-4 border-black bg-white">
          <h2 className="text-2xl font-black mb-4 border-b-4 border-black pb-2">CLOUD SECURITY DEFINITIONS</h2>

          {selectedElement ? (
            <div className="definition-content">
              {elements
                .filter((e) => e.id === selectedElement)
                .map((element) => (
                  <div key={element.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="element-symbol-large p-6 font-bold text-2xl border-4 border-black"
                        style={{ backgroundColor: categories.find((c) => c.id === element.category)?.color }}
                      >
                        {element.symbol}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{element.name}</h3>
                        <p className="text-lg mb-4">
                          Category: {categories.find((c) => c.id === element.category)?.name}
                        </p>
                        <div className="brutal-panel p-4 bg-gray-100">
                          <p className="text-lg">{element.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-lg">Select an element from the table above to view its definition.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
