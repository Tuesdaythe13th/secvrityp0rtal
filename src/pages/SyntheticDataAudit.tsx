import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SyntheticDataAudit = () => {
  useEffect(() => {
    document.title = "Synthetic Data Audit - Neural Security";
  }, []);

  const containerStyle = {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "2.5em",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#2d3748",
  };

  const sectionStyle = {
    marginBottom: "30px",
  };

  const sectionTitleStyle = {
    fontSize: "1.8em",
    fontWeight: "bold",
    color: "#4a5568",
    marginBottom: "15px",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "5px",
  };

  const paragraphStyle = {
    fontSize: "1.1em",
    lineHeight: "1.6",
    color: "#718096",
  };

  const listStyle = {
    listStyleType: "disc",
    paddingLeft: "25px",
    color: "#718096",
  };

  const listItemStyle = {
    fontSize: "1.1em",
    lineHeight: "1.6",
    marginBottom: "5px",
  };

  const linkStyle = {
    color: "#3182ce",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const footerStyle = {
    textAlign: "center",
    marginTop: "50px",
    color: "#a0aec0",
  };

  return (
    <div className="bg-black text-white">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="brutal-btn px-4 py-2 bg-black text-white font-bold border-2 border-white hover:bg-purple-800 hover:border-purple-800"
        >
          ← BACK
        </Link>
      </div>

      <div style={containerStyle}>
        <h1 style={titleStyle}>Synthetic Data Audit</h1>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Overview</h2>
          <p style={paragraphStyle}>
            A synthetic data audit is a comprehensive evaluation of synthetic datasets to ensure they meet specific
            quality, privacy, and utility standards. This process is crucial for organizations using synthetic data to
            train machine learning models, test software, or conduct research without compromising sensitive information.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Key Objectives</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <strong>Data Quality Assessment:</strong> Verify that the synthetic data accurately represents the statistical
              properties of the original data.
            </li>
            <li style={listItemStyle}>
              <strong>Privacy Risk Evaluation:</strong> Ensure that the synthetic data does not inadvertently disclose
              sensitive information from the original dataset.
            </li>
            <li style={listItemStyle}>
              <strong>Utility Validation:</strong> Confirm that the synthetic data is fit for its intended purpose, such as
              training machine learning models or testing software.
            </li>
            <li style={listItemStyle}>
              <strong>Compliance Adherence:</strong> Ensure that the synthetic data generation process complies with relevant
              data protection regulations and ethical guidelines.
            </li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Audit Process</h2>
          <ol style={listStyle}>
            <li style={listItemStyle}>
              <strong>Data Profiling:</strong> Analyze the statistical properties of both the original and synthetic datasets,
              including distributions, correlations, and summary statistics.
            </li>
            <li style={listItemStyle}>
              <strong>Privacy Metric Calculation:</strong> Calculate privacy metrics such as k-anonymity, differential privacy,
              and attribute disclosure risk to quantify the privacy risks associated with the synthetic data.
            </li>
            <li style={listItemStyle}>
              <strong>Utility Testing:</strong> Evaluate the performance of machine learning models trained on synthetic data
              compared to those trained on original data.
            </li>
            <li style={listItemStyle}>
              <strong>Expert Review:</strong> Engage domain experts to review the synthetic data and assess its suitability for
              the intended use case.
            </li>
            <li style={listItemStyle}>
              <strong>Documentation Review:</strong> Review the documentation of the synthetic data generation process to
              ensure transparency and reproducibility.
            </li>
          </ol>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Tools and Techniques</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <strong>Statistical Analysis Software:</strong> Use tools like R, Python (with libraries such as Pandas and
              NumPy), and SAS to perform data profiling and statistical analysis.
            </li>
            <li style={listItemStyle}>
              <strong>Privacy Analysis Tools:</strong> Utilize specialized tools for calculating privacy metrics and assessing
              disclosure risk.
            </li>
            <li style={listItemStyle}>
              <strong>Machine Learning Frameworks:</strong> Employ frameworks like TensorFlow, PyTorch, and scikit-learn to
              train and evaluate machine learning models.
            </li>
            <li style={listItemStyle}>
              <strong>Synthetic Data Generation Tools:</strong> Evaluate the performance of different synthetic data
              generation techniques using tools like Gretel.ai, Mostly AI, and Statice.
            </li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Reporting and Recommendations</h2>
          <p style={paragraphStyle}>
            The audit report should include a detailed description of the audit process, the results of the data quality,
            privacy, and utility assessments, and recommendations for improving the synthetic data generation process.
            Recommendations may include adjusting the synthetic data generation parameters, implementing additional privacy
            controls, or refining the utility testing methodology.
          </p>
        </section>

        <footer style={footerStyle}>
          <p>
            Learn more about synthetic data audits and neural security at{" "}
            <a href="https://www.example.com" style={linkStyle}>
              Example.com
            </a>
          </p>
        </footer>
      </div>

      <style>
        {`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }

      .brutal-btn {
        border: 2px solid white;
        background: black;
        color: white;
        transition: all 0.3s ease;
      }
      
      .brutal-btn:hover {
        background: purple;
        color: white;
        border-color: purple;
      }
      `}
      </style>
    </div>
  );
};

export default SyntheticDataAudit;
