import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonRadio } from '@/shared/components';
import { hobbyQueryOption } from '../../service';
import { Container } from './style';

interface HobbyRadioProps {
  defaultValue?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  isReadOnly?: boolean;
  onClick?: () => void;
}

const HobbyRadio = ({ defaultValue, onChange, isReadOnly, onClick }: HobbyRadioProps) => {
  const { data } = useSuspenseQuery({
    ...hobbyQueryOption.all(),
    select: (data) =>
      data.hobbies.reduce<Record<string, string>>(
        (acc, cur) => ((acc[cur.value] = cur.name), acc),
        {}
      ),
  });

  const hangulHobby = Object.keys(data);

  const handleChange = (value: string) => {
    onChange && onChange(value);
    onClick && onClick();
  };

  return (
    <Container>
      <CommonRadio
        values={hangulHobby}
        name="취미"
        onChange={(value: string) => handleChange(data[value])}
        defaultValue={defaultValue}
        isReadOnly={isReadOnly}
      />
    </Container>
  );
};

export default HobbyRadio;
