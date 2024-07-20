'use client'

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import{
  Link,
} from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <Container maxW={'4xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Bem-vindo ao Portal-Covid <br />
          </Heading>
          <Text
            margin={'auto'}
            width={'70%'}
            fontSize={'2xl'}
            fontWeight={'medium'}
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            Faça seu agendamento ou consulte um agendamento existente.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Flex>
              <Button
                as={Link}
                to={'/form'}
                mr={3}
                bg={'cyan.600'}
                color={'white'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'cyan.400',
                  textDecoration: 'none'
                }}>
                Quero fazer meu agendamento
              </Button>
              <Button
                as={Link}
                to={'/schedule'}
                ml={3}
                bg={'cyan.600'}
                color={'white'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'cyan.400',
                  textDecoration: 'none'
                }}>
                Quero visualizar um agendamento
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
