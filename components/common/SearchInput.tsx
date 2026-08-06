import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchInput() {
  return (
    <Field className="w-full max-w-150">
      <ButtonGroup>
        <Input
          id="input-button-group"
          placeholder="Tìm kiếm tên học sinh, lớp học..."
        />
        <Button variant="outline">
          <Search />
        </Button>
      </ButtonGroup>
    </Field>
  );
}
