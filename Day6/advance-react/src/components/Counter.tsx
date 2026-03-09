import { useReducer } from 'react'
import { Button ,HStack} from '@chakra-ui/react'

const initialState = {
  count: 0,
}

function reducer(state: typeof initialState, action: { type: string , payload?: number }) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) }
    case 'decrement':
      return { count: state.count - (action.payload || 1) }
    default:
      return state
  }
}
export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <p>Count: {state.count}</p>
      <HStack gap={4}>
      <Button onClick={() => dispatch({ type: 'increment', payload: 5 })}>
        Increment
      </Button>
      <Button onClick={() => dispatch({ type: 'decrement', payload: 2 })}>
        Decrement
      </Button>
      </HStack>
    </div>
  )
}
