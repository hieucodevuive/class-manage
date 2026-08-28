import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface ISearchInput {
  className?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({
  className,
  placeholder,
  value,
  onChange,
}: ISearchInput) {
  return (
    <Field className={cn('w-full max-w-150')}>
      <ButtonGroup>
        <Input
          className={className}
          id="input-button-group"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <Button variant="outline">
          <Search />
        </Button>
      </ButtonGroup>
    </Field>
  );
}
