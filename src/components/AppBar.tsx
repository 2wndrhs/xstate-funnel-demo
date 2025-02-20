import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import ProgressBar from './ProgressBar';

interface AppBarProps {
  progress: number; // 0 to 100
}

const AppBar = ({ progress }: AppBarProps) => {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center gap-4 px-6">
      <button onClick={handleClickBackButton} className={`flex size-6`}>
        <ChevronLeft />
      </button>
      <div className="flex-1">
        <ProgressBar width={progress} />
      </div>
      <div className="size-6" aria-hidden="true" />
    </div>
  );
};

export default AppBar;
