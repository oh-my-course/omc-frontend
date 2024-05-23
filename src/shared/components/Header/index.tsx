import { useNavigate } from 'react-router-dom';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { CommonIconButton, CommonText } from '@/shared/components';
import logo from '@/assets/images/logo.png';

interface HeaderProps {
  type: 'logo' | 'back';
  path?: string;
  height?: string;
  title?: string;
}

const Header = ({ type, path, height = '4rem', title }: HeaderProps) => {
  const navigate = useNavigate();

  const headerType = {
    logo: (
      <>
        <Image src={logo} width="3rem" />
        <Text fontSize="xl" as="b" color="blue.900">
          버킷백
        </Text>
      </>
    ),
    back: (
      <>
        <CommonIconButton
          type="back"
          fontSize="1rem"
          onClick={() => (path ? navigate(path) : navigate(-1))}
        />
        <CommonText type="smallTitle">{title}</CommonText>
      </>
    ),
  };

  return (
    <Box height={height} pl="1.25rem" width="full" flexShrink={0} as="header">
      <Flex h="full" alignItems="center">
        {headerType[type]}
      </Flex>
    </Box>
  );
};

export default Header;
