import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CSelectItem {
  label: string;
  value: string;
}

interface CSelectProps {
  items: CSelectItem[];
  value?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export function CSelect({
  items = [],
  value,
  placeholder = 'Select an option',
  className,
  disabled = false,
  onValueChange,
}: CSelectProps) {
  const selectedItem = items.find((item) => item.value === value);

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value !== null) {
          onValueChange?.(value);
        }
      }}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {selectedItem?.label}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
