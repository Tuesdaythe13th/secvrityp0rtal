
interface FooterProps {
  isOnline: boolean;
  currentTime: Date;
}

const Footer = ({ isOnline, currentTime }: FooterProps) => {
  return (
    <footer className="container mx-auto py-6 border-t-4 border-black text-center">
      <p className="text-sm text-black font-bold">
        © 2024 SECVRITY.P0RT4L | BRUTALIST CYBERPUNK RED TEAMING PLATFORM
      </p>
      <p className="text-xs text-black mt-2">
        SYSTEM STATUS: {isOnline ? "ONLINE" : "OFFLINE"} | 
        LAST UPDATE: {currentTime.toLocaleTimeString()} | 
        SECURITY LEVEL: MAXIMUM
      </p>
    </footer>
  );
};

export default Footer;
