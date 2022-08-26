import { Component } from 'react'
import { Button } from '@chakra-ui/react'

export default function PrimaryButton(props: {
  text: String
  rightIcon?: React.ReactElement
}) {
  return (
    <Button
      bg="brand.primary"
      _hover={{ bg: 'brand.primary_hover' }}
      _active={{ bg: 'brand.primary_hover' }}
      color="white"
      variant="solid"
      rightIcon={props.rightIcon}
    >
      {props.text}
    </Button>
  )
}
