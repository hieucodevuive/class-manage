import { useAppStore } from '@/stores';
import { ModuleType } from '@/types';

function PanelLink({
  children,
  moduleType,
  id,
}: {
  children: React.ReactNode;
  moduleType: ModuleType;
  id: string;
}) {
  const { openPanel } = useAppStore();

  return (
    <button
      type="button"
      className="cursor-pointer font-medium hover:underline"
      onClick={() => openPanel(moduleType, id)}
    >
      {children}
    </button>
  );
}

export default PanelLink;
