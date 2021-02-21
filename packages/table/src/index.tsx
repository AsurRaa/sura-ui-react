import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}
// just test only
// made some change nnd
export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
