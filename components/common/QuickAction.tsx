import { ModuleType } from '@/types';
import { mainColor } from '@/configs';
import CardItem from './CardItem';

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
    <CardItem canHover className="min-w-70">
      <a href={href} className="flex items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center ${mainColor[moduleType].text} ${mainColor[moduleType].background} rounded-lg bg-blue-50`}
        >
          {icon}
        </div>

        <span className="ml-2 text-sm">{text}</span>
      </a>
    </CardItem>
  );
}
