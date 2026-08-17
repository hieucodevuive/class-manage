import { ModuleType } from '@/types';
import { mainColor } from '@/configs';

interface QuickActionProps {
  href: string;
  text: string;
  icon: React.ReactNode;
  moduleType?: ModuleType;
}

export default function QuickAction({
  href,
  text,
  icon,
  moduleType = ModuleType.STUDENT,
}: QuickActionProps) {
  return (
    <a
      href={href}
      className="flex w-50 min-w-20 items-center rounded-xl border p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <div
        className={`flex h-8 w-8 items-center justify-center ${mainColor[moduleType]} rounded-lg bg-blue-50`}
      >
        {icon}
      </div>

      <span className="ml-2 text-sm">{text}</span>
    </a>
  );
}
