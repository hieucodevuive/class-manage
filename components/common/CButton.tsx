import { Button } from '../ui/button';
interface CButtonProps {
  onClick?: () => void;
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive';
}

export default function CButton({
  onClick,
  className,
  text,
  icon,
  variant = 'default',
}: CButtonProps) {
  return (
    <Button onClick={onClick} className={className} variant={variant}>
      {icon && <span>{icon}</span>}
      {text}
    </Button>
  );
}
